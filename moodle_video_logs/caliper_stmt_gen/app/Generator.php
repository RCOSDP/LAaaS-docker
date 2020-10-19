<?php

namespace App;

use App\Sender;
use App\Translator\SupportedEvent;
use App\Translator\VideoLogsEvent;
use App\Translator\VideoOperation;


final class Generator
{
    public static function generate(string $fileName) : void
    {
        if (($handle = fopen(dirname(__FILE__) . $fileName, 'r')) !== FALSE) {
            echo "Translating...\n";
            $translatedEventNum = 0;
            while ($line = fgetcsv($handle)) {
                // Skip header
                if ($line[0] == 'timestamp') {
                    continue;
                }

                $event = new VideoLogsEvent();
                $event->timestamp = $line[0];
                $event->eventname = $line[1];
                $event->file = $line[2];
                $event->query = $line[3];
                $event->current = $line[4];
                $event->referrer = $line[5];
                $event->userid = $line[6];
                $event->courseid = $line[7];
                $event->nonce = $line[8];
                $event->videoplayerlog = $line[9];

                if (!SupportedEvent::isSupported($event->eventname)) {
                    echo "[Ignored] unsupported event: {$event->eventname}\n";
                    continue;
                }

                $translatorClass = new VideoOperation();
                try {
                    $translatedEvent = $translatorClass->translate($event);
                    $translatedEvent = SupportedEvent::getRecipeClass(
                        $translatedEvent
                    );
                } catch (\Exception $e) {
                    echo "Error translating event: {$e->getMessage()}\n";
                    continue;
                }

                try {
                    Sender::send($translatedEvent);
                    $translatedEventNum += 1;
                } catch (\RuntimeException $re) {
                    echo "Error sending event: {$re->getMessage()}\n";
                }
            }
            fclose($handle);
            echo "Finished: " . $translatedEventNum . " events are translated\n";
        }
    }
}
