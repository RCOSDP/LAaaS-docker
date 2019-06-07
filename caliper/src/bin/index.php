<?php
declare(strict_types=1);

namespace udzuki\bin;

define('__ROOT__', dirname(__DIR__));
require_once dirname(__ROOT__) . "/vendor/autoload.php";
require __ROOT__ . '/translator/moodle/db/bootstrap.php';
require __ROOT__ . '/bin/Logger.php';
global $logger;
$conf = require __ROOT__ . '/config/moodle/config.php';

use udzuki\translator\moodle\{db\Models, SupportedEvents};

$sender = Sender::setup($conf['openlrw']);

echo "\e[1;32;40mcaliper statement generator is now running...\e[0m\n";

Models\Events::chunk(20, function ($events) use ($sender, $logger) {
    # system user(id = 0) is ignored.
    foreach ($events as $event) {
        if (SupportedEvents::isNotSystem($event->userid) || !SupportedEvents::isSupported($event->eventname)) {
            continue;
        }

        $translator = SupportedEvents::getTranslator($event);
        try {
            $translatedEvent = $translator
                ->prepare($event)
                ->process();
        } catch (\Error $e) {
            // case: some data has been removed
            $logger->info(table_row($event, $e));
            continue;
        }
        $caliperEvent = EventSerialize::createEvent($translatedEvent);
        $sender->send($caliperEvent);
    }
});

echo "\e[1;32;40mfinished. \e[0m\n";
echo "You can see skipped events log because of missing data at log/skipped.log\n";