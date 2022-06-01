<?php

namespace App\Commands;

use App\Models\{
    ExecutionLog,
    FailedLog,
    Moodle\Event,
    Moodle\ScormScoesTrack,
    ScormScoesTrackExecutionLog,
    ScormScoesTrackFailedLog,
};
use App\Profiles\BrokenData;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Str;
use LaravelZero\Framework\Commands\Command;
use Symfony\Component\Console\Helper\ProgressBar;

use function App\Functions\{
    is_supported,
    is_broken
};

final class Generate extends Command
{

    protected $signature = 'generate {name=Artisan}';

    protected $description = 'generate caliper formatted event';

    public function handle()
    {
        $this->translateEvent();
        $this->translateScormScoesTrack();
    }

    private function translateEvent()
    {
        $eventCount = env('EVENT_COUNT', 10000);
        $excludedOriginsStr = env('EXCLUDED_ORIGINS', '');
        $excludedOrigins = $excludedOriginsStr === '' ? [] : explode(',', $excludedOriginsStr);

        $executionLog = new ExecutionLog();
        $failedLog = new FailedLog();

        $all = Event::column()
                ->offset($this->getOffset($executionLog))
                ->limit($eventCount)
                ->get();
        $offset = $this->getOffset($executionLog) + $all->count();

        if ($all->isEmpty()) {
            if ($this->getOffset($executionLog) === 0) {
                $this->info('It seems there is no event in DB.');
            } else {
                $this->info('Standard logs have already been translated.');
            }
            return;
        }

        $translateCount = Event::count() - $this->getOffset($executionLog);
        $translateBar = $this->createProgresBar($translateCount);

        $this->info("\ntranslating logstore_standard_log...");

        do {
            $latestEventId = $all->last()->id;

            $target = $all
                        ->reject(function ($event) {
                            return $event->userid === 0;
                        })
                        ->filter(function ($event) use ($excludedOrigins) {
                            return !in_array($event->origin, $excludedOrigins);
                        })
                        ->filter(function ($event) {
                            return is_supported($event->eventname);
                        });

            $translated = $target->translate();

            $failed = $translated
                        ->filter(function ($translatedEvent) {
                            return is_broken($translatedEvent);
                        });

            $compiled = $translated
                        ->reject(function ($compiled) {
                            return is_broken($compiled);
                        });

            $compiled->send();

            $this->logging(
                $offset,
                $compiled->count(),
                $failed,
                $executionLog,
                $failedLog
            );

            $translateBar->advance($all->count());

            $all = Event::column()
                    ->offset($offset)
                    ->limit($eventCount)
                    ->get();
            $offset = $offset + $all->count();
        } while ($all->isNotEmpty());
        $translateBar->finish();
        $this->info("\ncompleted");
    }

    private function translateScormScoesTrack()
    {
        $eventCount = env('EVENT_COUNT', 10000);

        $executionLog = new ScormScoesTrackExecutionLog();
        $failedLog = new ScormScoesTrackFailedLog();

        $all = ScormScoesTrack::column()
                ->offset($this->getOffset($executionLog))
                ->limit($eventCount)
                ->get();
        $offset = $this->getOffset($executionLog) + $all->count();

        if ($all->isEmpty()) {
            if ($this->getOffset($executionLog) === 0) {
                $this->info('It seems there is no scorm scoes track event in DB.');
            } else {
                $this->info('Scorm scoes track logs have already been translated.');
            }
            return;
        }

        $translateCount = ScormScoesTrack::count() - $this->getOffset($executionLog);
        $translateBar = $this->createProgresBar($translateCount);

        $this->info("\ntranslating scorm_scoes_track...");

        do {
            $latestEventId = $all->last()->id;

            $target = $all
                        ->reject(function ($event) {
                            return $event->userid === 0;
                        })
                        ->filter(function ($event) {
                            return is_supported($event->element);
                        });

            $translated =  $target->map(function ($event) {
                try {
                    $type = Str::studly(str_replace('.', '_', $event->element));
                    $translator = "App\Translator\\$type";
                    $interProd = new $translator($event);
                    $compiler = "App\Profiles\\$type";
                    return new $compiler($interProd);
                } catch (ModelNotFoundException $mnfe) {
                    return new BrokenData($mnfe);
                }
            });

            $failed = $translated
                        ->filter(function ($translatedEvent) {
                            return is_broken($translatedEvent);
                        });

            $compiled = $translated
                        ->reject(function ($compiled) {
                            return is_broken($compiled);
                        });

            $compiled->send();

            $this->logging(
                $offset,
                $compiled->count(),
                $failed,
                $executionLog,
                $failedLog
            );

            $translateBar->advance($all->count());

            $all = ScormScoesTrack::column()
                    ->offset($offset)
                    ->limit($eventCount)
                    ->get();
            $offset = $offset + $all->count();
        } while ($all->isNotEmpty());
        $translateBar->finish();
        $this->info("\ncompleted");
    }

    private function getOffset($executionLog): int
    {
        $last = $executionLog::orderBy('id', 'desc')->first();
        return $last->last_id ?? 0;
    }

    private function createProgresBar(int $count): ProgressBar
    {
        $progressBar = $this->output->createProgressBar($count);
        $progressBar->setBarCharacter('<fg=green>=</>');
        $progressBar->setEmptyBarCharacter("<fg=red>|</>");
        $progressBar->setProgressCharacter("<fg=green>></>");
        $progressBar->setFormat(
            "%current%/%max% [%bar%] %percent:3s%%\n"
        );
        return $progressBar;
    }

    private function logging(
        int $last_id,
        int $translated,
        $failed,
        $executionLog,
        $failedLog
    ) {
        $executionLog::create([
            'last_id' => $last_id,
            'translated' => $translated,
            'failed' => $failed->count(),
        ]);

        $exe_id = $executionLog::orderBy('id', 'desc')->first()->id;

        $failed->map(function ($fail) use ($exe_id, $failedLog) {
            $failedLog::create([
                'execution_id' => $exe_id,
                'model' => $fail->getMissingModel(),
                'model_id' => $fail->getMissingId(),
            ]);
        });
    }
}
