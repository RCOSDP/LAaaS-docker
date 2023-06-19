<?php

return [
    'name' => 'Caliper-cli',
    'version' => app('git.version'),
    'production' => false,
    'providers' => [
        App\Providers\SenderServiceProvider::class,
        App\Providers\MacroStrServiceProvider::class,
        App\Providers\MacroTranslateServiceProvider::class,
    ],
];
