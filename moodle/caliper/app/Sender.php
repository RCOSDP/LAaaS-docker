<?php

namespace App;

use IMSGlobal\Caliper\{
    Client,
    Options,
    Sensor,
};

use function App\Functions\get_lrs;

final class Sender
{
    public static function send($event): void
    {
        $option = (new Options())
                    ->setDebug(!config('production'))
                    ->setApiKey(get_lrs($event->getOriginalUsername()))
                    ->setHost(env('OPENLRW_HOST'))
                    ->setJsonEncodeOptions(JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $sensor = (new Sensor('NII-RCOS'))
            ->registerClient('http', new Client('caliper', $option));
        $sensor->send($sensor, $event);
    }
}
