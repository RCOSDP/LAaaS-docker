<?php

namespace App\Providers;

use App\Sender;
use Illuminate\Support\{Collection, ServiceProvider};

final class SenderServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Collection::macro('send', function () {

            $this->map(function ($envelope) {
                    Sender::send($envelope);
            });

        });
    }
}
