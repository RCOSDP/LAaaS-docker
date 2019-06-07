<?php

namespace udzuki\bin;

use Monolog\Formatter\LineFormatter;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use udzuki\translator\moodle\db\Models\Events;

$logger = new Logger('caliper');
$line = new LineFormatter("%message%\n", null, true, true);
$stream = new StreamHandler(dirname(dirname(__DIR__)) . '/log/skipped.log', Logger::DEBUG);
$stream->setFormatter($line);

$logger->pushHandler($stream);

$format = "|%8.8s| %-40.40s | %-20.20s | %-30.30s | %-20.20s | %5.5s | %6.6s |";

$logger->info(sprintf($format, "Event ID", "Event Name", "Raised at", "Message", "Object", "ID", "UserId"));
$logger->info(sprintf($format, '--------', str_repeat('-', 40), str_repeat('-', 20),
    str_repeat('-', 30), str_repeat('-', 20), '-----', '------'));

function table_row(Events $event, \Error $e): string
{
    global $format;
    return sprintf($format, $event->id, $event->eventname, strstr($e->getFile(), 'traits'),
        reason($e->getMessage()), $event->objecttable, $event->objectid, $event->userid);
}

function reason($errstr): string
{
    $tmp = strstr($errstr, 'read');
    $trait = substr(strstr($tmp, '()', true), strlen('read'));

    if ($trait === 'User') {
        return 'user not found';
    } elseif (strpos($errstr, 'null return')) {
        return "{$trait} not found";
    } elseif (strpos($errstr, 'null given')) {
        return "invalid data given at {$trait}";
    } else {
        return strstr($errstr, 'read');
    }
}