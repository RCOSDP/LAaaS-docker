<?php

namespace Tests;

use Illuminate\Support\Facades\Artisan;

trait SetupDB
{
    protected static $setUpHasRunOnce = false;

    public function setUp(): void
    {
        parent::setUp();
        if (!static::$setUpHasRunOnce) {
            Artisan::call('db:seed', ['--class' => 'DatabaseSeeder']);
            static::$setUpHasRunOnce = true;
        }
    }
}
