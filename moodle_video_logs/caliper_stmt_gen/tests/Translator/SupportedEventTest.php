<?php

namespace Tests\Translator;

use App\Translator\SupportedEvent;
use App\Translator\VideoLogsEvent;
use App\Translator\VideoOperation;
use PHPUnit\Framework\TestCase;


final class SupportedEventTest extends TestCase
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
        $supportClass = new SupportedEvent();
        $this->assertTrue(
            method_exists($supportClass, 'isSupported')
        );
        $this->assertTrue(
            method_exists($supportClass, 'getRecipeClass')
        );
    }

    public function testIsSupported()
    {
        $this->assertTrue(
            SupportedEvent::isSupported('firstplay')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('started')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('resumed')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('pause')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('seeked')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('ratechange')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('ended')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('enabled-closed-captioning')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('disabled-closed-captioning')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('forward')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('back')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('beforeunload-ended')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('pagehide-ended')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('unload-ended')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('hidden-ended')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('force-ended')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('current-time')
        );
        $this->assertTrue(
            SupportedEvent::isSupported('changepage')
        );
    }

    public function testIsNotSupported()
    {
        $this->assertFalse(
            SupportedEvent::isSupported('test')
        );
    }

    public function testCanGetRecipeClass()
    {
        $translatorClass = new VideoOperation();

        try {
            $this->event->eventname = 'firstplay';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'started';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'resumed';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'pause';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'seeked';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'ratechange';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'ended';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'enabled-closed-captioning';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'disabled-closed-captioning';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'forward';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'back';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'beforeunload-ended';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'pagehide-ended';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'unload-ended';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'hidden-ended';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'force-ended';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'current-time';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->event->eventname = 'changepage';
            $translatedEvent = $translatorClass->translate($this->event);
            SupportedEvent::getRecipeClass($translatedEvent);

            $this->expectNotToPerformAssertions();
        } catch (\Error $e) {
            $this->fail('Could not get recipe class.');
        }

        return $translatorClass;
    }

    /**
     * @depends testCanGetRecipeClass
     */
    public function testCanNotGetRecipeClass($translatorClass)
    {
        $this->expectException(\Error::class);

        $this->event->eventname = 'test';
        $translatedEvent = $translatorClass->translate($this->event);
        SupportedEvent::getRecipeClass($translatedEvent);
    }
}
