<?php

namespace App\Providers;

use Illuminate\Support\{ServiceProvider, Str};

final class MacroStrServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Str::macro('getEventType', function (string $value) {
            return explode('\\', $value)[3];
        });
    }
}
