<?php

namespace Tests\Recipe;

use App\Sender;
use App\Translator\SupportedEvent;
use App\Translator\VideoLogsEvent;
use App\Translator\VideoOperation;
use PHPUnit\Framework\TestCase;


final class VideoEnabledClosedCaptioningTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $this->event = new VideoLogsEvent();
        $this->event->timestamp = '2020-01-01T12:00:00+09:00';
        $this->event->eventname = 'enabled-closed-captioning';
        $this->event->file = 'test_file';
        $this->event->query = 'test_query';
        $this->event->current = '10';
        $this->event->referrer = 'test_referrer';
        $this->event->userid = '1';
        $this->event->courseid = '1';
        $this->event->nonce = 'test';
        $this->event->videoplayerlog = 'test_videoplayerlog';
    }

    public function testCanGetCompiler()
    {
        $translatorClass = new VideoOperation();
        $translatedEvent = $translatorClass->translate($this->event);

        $compiledEvent = SupportedEvent::getRecipeClass($translatedEvent);
        $this->assertEquals(
            get_class($compiledEvent),
            'App\Recipe\video\VideoEnabledClosedCaptioning'
        );

        return [
            $translatedEvent,
            $compiledEvent
        ];
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testActorValues($dependValues)
    {
        $translatedEvent = $dependValues[0];
        $compiledEvent = $dependValues[1];

        $this->assertEquals(
            $compiledEvent->getActor()->getId(),
            $translatedEvent['user_id']
        );
        $this->assertEquals(
            $compiledEvent->getActor()->getName(),
            $translatedEvent['user_name']
        );
        $this->assertEquals(
            $compiledEvent->getActor()->getDescription(),
            $translatedEvent['user_description']
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testEventTimeValues($dependValues)
    {
        $translatedEvent = $dependValues[0];
        $compiledEvent = $dependValues[1];

        $this->assertEquals(
            date_format($compiledEvent->getEventTime(), 'd/m/Y'),
            date_format($translatedEvent['event_time'], 'd/m/Y')
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testActionValues($dependValues)
    {
        $compiledEvent = $dependValues[1];

        $this->assertEquals(
            $compiledEvent->getAction()->getValue(),
            'EnabledClosedCaptioning'
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testObjectValues($dependValues)
    {
        $translatedEvent = $dependValues[0];
        $compiledEvent = $dependValues[1];

        $this->assertEquals(
            $compiledEvent->getObject()->getId(),
            $translatedEvent['object_id']
        );
        $this->assertEquals(
            $compiledEvent->getObject()->getName(),
            $translatedEvent['object_name']
        );
        $this->assertEquals(
            $compiledEvent->getObject()->getExtensions()['courseId'],
            $translatedEvent['course_id']
        );
        $this->assertEquals(
            $compiledEvent->getObject()->getExtensions()['nonce'],
            $translatedEvent['nonce']
        );
        $this->assertEquals(
            $compiledEvent->getObject()->getExtensions()['videoplayerlog'],
            $translatedEvent['videoplayerlog']
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testTargetValues($dependValues)
    {
        $translatedEvent = $dependValues[0];
        $compiledEvent = $dependValues[1];

        $this->assertEquals(
            $compiledEvent->getTarget()->getId(),
            $translatedEvent['target_id']
        );
        $this->assertEquals(
            $compiledEvent->getTarget()->getCurrentTime(),
            $translatedEvent['current_time']
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testEdappValues($dependValues)
    {
        $translatedEvent = $dependValues[0];
        $compiledEvent = $dependValues[1];

        $this->assertEquals(
            $compiledEvent->getEdapp()->getId(),
            $translatedEvent['app_id']
        );
        $this->assertEquals(
            $compiledEvent->getEdapp()->getName(),
            $translatedEvent['app_name']
        );
        $this->assertEquals(
            $compiledEvent->getEdapp()->getDescription(),
            $translatedEvent['app_description']
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testShouldBeRegistable($dependValues)
    {
        $compiledEvent = $dependValues[1];
        $sender = new Sender();
        try {
            $sender->send($compiledEvent);
            $this->expectNotToPerformAssertions();
        } catch (RuntimeException $re) {
            $this->fail('This json could not register.');
        }
    }
}
