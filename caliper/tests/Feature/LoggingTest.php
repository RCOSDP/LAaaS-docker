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
                'translated' => 17,
                'failed' => 1,
                'last_id' => 19,
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

    public function testScormScoesTrackExecutionLog()
    {
        Artisan::call('generate');
        $this->assertDatabaseHas(
            'scorm_scoes_track_execution_logs',
            [
                'id' => 1,
                'translated' => 1,
                'failed' => 1,
                'last_id' => 3,
            ],
            'log'
        );
    }

    public function testScormScoesTrackFailedLog()
    {
        Artisan::call('generate');
        $this->assertDatabaseHas(
            'scorm_scoes_track_failed_logs',
            [
                'id' => 1,
                'execution_id' => 1,
                'model' => 'scorm_scoes',
                'model_id' => 12345
            ],
            'log'
        );
    }

    public function testMultipleExecutionLog()
    {
        putenv('EVENT_COUNT=1');
        Artisan::call('generate');
        $this->assertDatabaseHas(
            'execution_logs',
            [
                'id' => 1,
                'translated' => 1,
                'failed' => 0,
                'last_id' => 1,
            ],
            'log'
        );
        $this->assertDatabaseHas(
            'execution_logs',
            [
                'id' => 2,
                'translated' => 0,
                'failed' => 1,
                'last_id' => 2,
            ],
            'log'
        );
        $this->assertDatabaseHas(
            'execution_logs',
            [
                'id' => 3,
                'translated' => 1,
                'failed' => 0,
                'last_id' => 3,
            ],
            'log'
        );
        $this->assertDatabaseHas(
            'failed_logs',
            [
                'id' => 1,
                'execution_id' => 2,
                'model' => 'forum',
                'model_id' => 65535
            ],
            'log'
        );
    }

    public function testMultipleScormScoesTrackExecutionLog()
    {
        putenv('EVENT_COUNT=1');
        Artisan::call('generate');
        $this->assertDatabaseHas(
            'scorm_scoes_track_execution_logs',
            [
                'id' => 1,
                'translated' => 1,
                'failed' => 0,
                'last_id' => 1,
            ],
            'log'
        );
        $this->assertDatabaseHas(
            'scorm_scoes_track_execution_logs',
            [
                'id' => 2,
                'translated' => 0,
                'failed' => 0,
                'last_id' => 2,
            ],
            'log'
        );
        $this->assertDatabaseHas(
            'scorm_scoes_track_execution_logs',
            [
                'id' => 3,
                'translated' => 0,
                'failed' => 1,
                'last_id' => 3,
            ],
            'log'
        );
        $this->assertDatabaseHas(
            'scorm_scoes_track_failed_logs',
            [
                'id' => 1,
                'execution_id' => 3,
                'model' => 'scorm_scoes',
                'model_id' => 12345
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
        DB::connection('log')->table('scorm_scoes_track_failed_logs')->truncate();
        DB::connection('log')->table('scorm_scoes_track_execution_logs')->truncate();
    }
}
