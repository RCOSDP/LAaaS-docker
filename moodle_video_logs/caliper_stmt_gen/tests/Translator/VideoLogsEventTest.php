<?php

namespace Tests\Translator;

use App\Translator\VideoLogsEvent;
use PHPUnit\Framework\TestCase;


final class VideoLogsEventTest extends TestCase
{
    public function testShouldBeDefined()
    {
        $this->assertClassHasAttribute(
            'timestamp',
            VideoLogsEvent::class
        );
        $this->assertClassHasAttribute(
            'eventname',
            VideoLogsEvent::class
        );
        $this->assertClassHasAttribute(
            'file',
            VideoLogsEvent::class
        );
        $this->assertClassHasAttribute(
            'query',
            VideoLogsEvent::class
        );
        $this->assertClassHasAttribute(
            'current',
            VideoLogsEvent::class
        );
        $this->assertClassHasAttribute(
            'referrer',
            VideoLogsEvent::class
        );
        $this->assertClassHasAttribute(
            'userid',
            VideoLogsEvent::class
        );
        $this->assertClassHasAttribute(
            'courseid',
            VideoLogsEvent::class
        );
        $this->assertClassHasAttribute(
            'nonce',
            VideoLogsEvent::class
        );
        $this->assertClassHasAttribute(
            'videoplayerlog',
            VideoLogsEvent::class
        );
    }

    public function testShouldNotBeDefined()
    {
        $this->assertClassNotHasAttribute(
            'test',
            VideoLogsEvent::class
        );
    }
}
