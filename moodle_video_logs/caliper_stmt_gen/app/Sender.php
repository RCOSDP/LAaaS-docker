<?php

namespace App;

use Dotenv\Dotenv;
use IMSGlobal\Caliper\{
    Client,
    Options,
    Sensor
};
use IMSGlobal\Caliper\events\Event;


final class Sender
{
    public static function send(Event $event): void
    {
        $dotenv = Dotenv::create(__DIR__ . '/../');
        $dotenv->load();

        $option = (new Options())
            ->setApiKey(getenv('OPENLRW_APIKEY'))
            ->setHost(getenv('OPENLRW_HOST'))
            ->setJsonEncodeOptions(JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $sensor = (new Sensor('NII-RCOS'))
            ->registerClient('http', new Client('caliper', $option));
        $sensor->send($sensor, $event);
    }
}
