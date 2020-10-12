<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

final class LoggingTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $this->app = $this->createApplication();
    }

    public function testExecutionLog()
    {
        Artisan::call('generate');
        $this->assertDatabaseHas(
            'execution_logs',
            [
                'id' => 1,
                'translated' => 12,
                'failed' => 1,
                'last_id' => 13,
            ],
            'log'
        );
    }
    
    public function testFailedLog()
    {
        Artisan::call('generate');
        $this->assertDatabaseHas(
            'failed_logs',
            [
                'id' => 1,
                'execution_id' => 1,
                'model' => 'forum',
                'model_id' => 65535
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
