<?php

namespace Tests\Unit;

use App\Models\Moodle\Event;
use App\Sender;
use Tests\TestCase as TestCase;

use function App\Functions\compile;
use function App\Functions\expand;
use function App\Functions\is_supported;

final class CourseViewedTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        
        $this->app = $this->createApplication();
    }

    public function testShouldBeSupported()
    {
        $this->assertTrue(is_supported('\core\event\course_viewed'));
    }

    public function testTranslatorShouldImplementAbstractMethods()
    {
        $event = Event::where('eventname', '\core\event\course_viewed')->first();
        $interProd = expand($event);

        $this->assertTrue(
            method_exists($interProd, 'getActor')
        );

        $this->assertTrue(
            method_exists($interProd, 'getObject')
        );

        return $interProd;
    }

    /**
     * @depends testTranslatorShouldImplementAbstractMethods
     */
    public function testShouldSetEventTimeAtTranslator($interProd)
    {
        $badTime = (new \DateTime())->setTimestamp(null);
        $this->assertNotEquals(
            date_format($badTime, 'd/m/Y'),
            date_format($interProd->getEventTime(), 'd/m/Y')
        );
    }

    /**
     * @depends testTranslatorShouldImplementAbstractMethods
     */
    public function testCanGetCompiler($interProd)
    {
        $product = compile($interProd);
        $this->assertEquals('App\Profiles\CourseViewed', get_class($product));

        return $product;
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testShouldSetEventTimeAtCompiler($product)
    {
        $badTime = (new \DateTime())->setTimestamp(null);

        $this->assertNotEquals(
            date_format($badTime, 'd/m/Y'),
            date_format($product->getEventTime(), 'd/m/Y')
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testEdappShouldNotBeNull($product)
    {
        $this->assertNotNull($product->getEdApp());
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testShouldBeRegistable($product)
    {
        $sender = new Sender();
        try {
            $sender->send($product);
            $this->expectNotToPerformAssertions();
        } catch (RuntimeException $re) {
            $this->debugJson($product);
            $this->fail('This json could not register.');
        }
    }
}
