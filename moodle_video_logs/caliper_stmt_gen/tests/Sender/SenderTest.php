<?php

namespace Tests\Sender;

use App\Sender;
use App\Translator\SupportedEvent;
use App\Translator\VideoLogsEvent;
use App\Translator\VideoOperation;
use PHPUnit\Framework\TestCase;


final class SenderTest extends TestCase
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

        $this->api = getenv("OPENLRW_APIKEY");
    }

    public function testShouldBeRegistable()
    {
        $translatorClass = new VideoOperation();
        $translatedEvent = $translatorClass->translate($this->event);

        $compiledEvent = SupportedEvent::getRecipeClass(
            $translatedEvent
        );

        $sender = new Sender();
        try {
            $sender->send($compiledEvent);
            $this->expectNotToPerformAssertions();
        } catch (RuntimeException $re) {
            $this->fail('This json could not register.');
        }

        return $compiledEvent;
    }

    /**
     * @depends testShouldBeRegistable
     */
    public function testCouldNotRegister($compiledEvent)
    {
        $this->expectException(\Exception::class);
        putenv("OPENLRW_APIKEY=test");

        $sender = new Sender();
        $sender->send($compiledEvent);
    }

    public function tearDown(): void
    {
        putenv("OPENLRW_APIKEY=$this->api");
    }
}
