<?php

namespace Tests\Translator;

use App\Translator\VideoLogsEvent;
use App\Translator\VideoOperation;
use PHPUnit\Framework\TestCase;


final class VideoOperationTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $this->event = new VideoLogsEvent();
        $this->event->timestamp = '2020-01-01T12:00:00+09:00';
        $this->event->eventname = 'firstplay';
        $this->event->file = 'test_file';
        $this->event->query = 'test_query';
        $this->event->current = '10';
        $this->event->referrer = 'test_referrer';
        $this->event->userid = '1';
        $this->event->courseid = '1';
        $this->event->nonce = 'test';
        $this->event->videoplayerlog = 'test_videoplayerlog';
    }

    public function testExistsMethod()
    {
        $translatorClass = new VideoOperation();
        $this->assertTrue(
            method_exists($translatorClass, 'translate')
        );

        return $translatorClass;
    }

    /**
     * @depends testExistsMethod
     */
    public function testTranslation($translatorClass)
    {
        $translatedEvent = $translatorClass->translate($this->event);

        $this->assertEquals(
            $translatedEvent['event_name'],
            $this->event->eventname
        );
        $this->assertEquals(
            $translatedEvent['event_time'],
            new \DateTime($this->event->timestamp)
        );
        $this->assertEquals(
            $translatedEvent['user_id'],
            $this->event->userid
        );
        $this->assertEquals(
            $translatedEvent['user_name'],
            $this->event->userid
        );
        $this->assertEquals(
            $translatedEvent['user_description'],
            $translatorClass->getUserDescription()
        );
        $this->assertEquals(
            $translatedEvent['object_id'],
            $this->event->referrer
        );
        $this->assertEquals(
            $translatedEvent['object_name'],
            $this->event->file
        );
        $this->assertEquals(
            $translatedEvent['target_id'],
            $this->event->referrer
        );
        $this->assertEquals(
            $translatedEvent['current_time'],
            sprintf('PT%sS', $this->event->current)
        );
        $this->assertEquals(
            $translatedEvent['course_id'],
            $this->event->courseid
        );
        $this->assertEquals(
            $translatedEvent['nonce'],
            $this->event->nonce
        );
        $this->assertEquals(
            $translatedEvent['videoplayerlog'],
            $this->event->videoplayerlog
        );
        $this->assertEquals(
            $translatedEvent['app_id'],
            $translatorClass->getAppId()
        );
        $this->assertEquals(
            $translatedEvent['app_name'],
            $translatorClass->getAppName()
        );
        $this->assertEquals(
            $translatedEvent['app_description'],
            $translatorClass->getAppDescription()
        );
    }
}
