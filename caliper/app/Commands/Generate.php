<?php

namespace App\Commands;

use App\Models\{
    ExecutionLog,
    FailedLog,
    Moodle\Event
};
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
        $eventCount = env('EVENT_COUNT', 10000);

        $all = Event::column()
                ->offset($this->getOffset())
                ->limit($eventCount)
                ->get();
        $offset = $this->getOffset() + $all->count();

        if ($all->isEmpty()) {
            if ($this->getOffset() === 0) {
                $this->info('It seems there is no event in DB.');
            } else {
                $this->info('Already translated.');
            }
            return;
        }

        $translateCount = Event::count() - $this->getOffset();
        $translateBar = $this->createProgresBar($translateCount);

        $this->info("\ntranslating...");

        do {
            $latestEventId = $all->last()->id;

            $target = $all
                        ->reject(function ($event) {
                            return $event->userid === 0;
                        })
                        ->filter(function ($event) {
                            return is_supported($event->eventname);
                        });

            $translated = $target->translate();

            $failed = $translated
                        ->filter(function ($translatedEvent) {
                            return is_broken($translatedEvent);
                        });

            $compiled = $translated->reject(function ($compiled) {
                            return is_broken($compiled);
            });

            $compiled->send();

            $this->logging($offset, $compiled->count(), $failed);

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

    private function getOffset(): int
    {
        $last = ExecutionLog::all()->last();
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

    private function logging(int $last_id, int $translated, $failed)
    {

        ExecutionLog::create([
            'last_id' => $last_id,
            'translated' => $translated,
            'failed' => $failed->count(),
        ]);

        $exe_id = ExecutionLog::latest()->first()->id;

        $failed->map(function ($fail) use ($exe_id) {
            FailedLog::create([
                'execution_id' => $exe_id,
                'model' => $fail->getMissingModel(),
                'model_id' => $fail->getMissingId(),
            ]);
        });
    }
}
