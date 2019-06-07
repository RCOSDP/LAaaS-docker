<?php

namespace udzuki\bin;

use IMSGlobal\Caliper\{Client, events\Event, Options, Sensor};

final class Sender
{
    private static $option;
    private static $sensor;
    private static $instance = null;

    private function __construct(array $config)
    {
        self::$option = (
        (new Options())
            ->setDebug(true)
            ->setApiKey($config['apiKey'])
            ->setHost($config['host'])
        );

        self::$sensor =
            (new Sensor('NII-RCOS'))
                ->registerClient('http', new Client('caliper', self::$option));
    }

    public static function setup(array $config): self
    {
        self::$instance = new Sender($config);
        return self::$instance;
    }

    public static function send(Event $event): void
    {
        if (is_null(self::$instance)) {
            die("ERROR: Sender was not initialized yet.\n");
        }

        self::$sensor->send(self::$sensor, $event);
    }
}
