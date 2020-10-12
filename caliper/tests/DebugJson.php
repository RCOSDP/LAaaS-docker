<?php

namespace Tests;

use IMSGlobal\Caliper\Client;
use IMSGlobal\Caliper\Options;
use IMSGlobal\Caliper\request\HttpRequestor;
use IMSGlobal\Caliper\Sensor;

trait DebugJson
{
    public function debugJson($data)
    {
        $option = (new Options())
            ->setDebug(true)
            ->setJsonEncodeOptions(JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $dummySensor = (new Sensor('test'))
            ->registerClient('http', new Client('test', $option));
        
        $http = new HttpRequestor($option);
        $envelope = $http->createEnvelope($dummySensor, $data);
        $json = $http->serializeData($envelope);
        echo $json;
        return $json;
    }
}
