<?php

namespace App\Providers;

use App\Profiles\BrokenData;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\{Collection, ServiceProvider};

use function App\Functions\{compile, expand};

final class MacroTranslateServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Collection::macro('translate', function () {

            $result =  $this->map(function ($event) {
                try {
                    $interProd = expand($event);
                    return compile($interProd);
                } catch (ModelNotFoundException $mnfe) {
                    return new BrokenData($mnfe);
                }
            });

            return $result;
        });
    }
}
