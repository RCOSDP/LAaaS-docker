<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

final class ExcludedOriginsTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $this->app = $this->createApplication();
    }

    public function testExcludedOriginsWithParams()
    {
        putenv('EXCLUDED_ORIGINS=origin1,origin2');
        Artisan::call('generate');
        $this->assertDatabaseHas(
            'execution_logs',
            [
                'id' => 1,
                'translated' => 13,
                'failed' => 1,
                'last_id' => 17,
            ],
            'log'
        );
    }

    public function testExcludedOriginsWithoutParams()
    {
        putenv('EXCLUDED_ORIGINS=');
        Artisan::call('generate');
        $this->assertDatabaseHas(
            'execution_logs',
            [
                'id' => 1,
                'translated' => 15,
                'failed' => 1,
                'last_id' => 17,
            ],
            'log'
        );
    }

    public function tearDown(): void
    {
        parent::tearDown();
        $this->createApplication();
        DB::connection('log')->table('failed_logs')->truncate();
        DB::connection('log')->table('execution_logs')->truncate();
    }
}
