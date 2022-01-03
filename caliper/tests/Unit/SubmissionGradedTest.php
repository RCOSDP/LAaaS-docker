<?php

namespace Tests\Unit;

use App\Models\Moodle\Event;
use App\Sender;
use Tests\TestCase;

use function App\Functions\compile;
use function App\Functions\expand;
use function App\Functions\is_supported;

final class SubmissionGradedTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->app = $this->createApplication();
    }

    public function testShouldBeSupported()
    {
        $this->assertTrue(is_supported('\mod_assign\event\submission_graded'));
    }

    public function testTranslatorShouldImplementAbstractMethods()
    {
        $event = Event::where('eventname', '\mod_assign\event\submission_graded')->first();
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
        $this->assertEquals('App\Profiles\SubmissionGraded', get_class($product));

        return [
            $interProd,
            $product
        ];
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testShouldSetEventTimeAtCompiler($dependValues)
    {
        $product = $dependValues[1];
        $badTime = (new \DateTime())->setTimestamp(null);

        $this->assertNotEquals(
            date_format($badTime, 'd/m/Y'),
            date_format($product->getEventTime(), 'd/m/Y')
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testActionValues($dependValues)
    {
        $product = $dependValues[1];

        $this->assertEquals(
            $product->getAction()->getValue(),
            'Graded'
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testActorValues($dependValues)
    {
        $interProd = $dependValues[0];
        $product = $dependValues[1];

        $this->assertEquals(
            env('APP_URL')
            . '/user/profile.php?id='
            . $interProd->getActor()->id,
            $product->getActor()->getId()
        );
        $this->assertEquals(
            hash('sha256', $interProd->getActor()->username),
            $product->getActor()->getName()
        );
        $this->assertEquals(
            $interProd->getActor()->description,
            $product->getActor()->getDescription()
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testObjectValues($dependValues)
    {
        $interProd = $dependValues[0];
        $product = $dependValues[1];

        $this->assertEquals(
            $interProd->getObjectId(),
            $product->getObject()->getId()
        );
        $this->assertEquals(
            $product->getObject()->getType(),
            'Attempt'
        );
        $this->assertEquals(
            $interProd->getAssignableId(),
            $product->getObject()->getAssignable()->getId()
        );
        $this->assertEquals(
            $product->getObject()->getAssignable()->getType(),
            'AssignableDigitalResource'
        );
        $this->assertEquals(
            1,
            $product->getObject()->getCount()
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testGeneratedValues($dependValues)
    {
        $interProd = $dependValues[0];
        $product = $dependValues[1];

        $this->assertEquals(
            $interProd->getScoreId(),
            $product->getGenerated()->getId()
        );
        $this->assertEquals(
            $interProd->getScore()->given,
            $product->getGenerated()->getScoreGiven()
        );
        $this->assertEquals(
            $interProd->getScore()->comment,
            $product->getGenerated()->getComment()
        );
        $this->assertEquals(
            $product->getGenerated()->getType(),
            'Score'
        );
        $this->assertEquals(
            env('APP_URL')
            . '/user/profile.php?id='
            . $interProd->getGrader()->id,
            $product->getGenerated()->getScoredBy()->getId()
        );
        $this->assertEquals(
            hash('sha256', $interProd->getGrader()->username),
            $product->getGenerated()->getScoredBy()->getName()
        );
        $this->assertEquals(
            $interProd->getGrader()->description,
            $product->getGenerated()->getScoredBy()->getDescription()
        );
        $this->assertEquals(
            $product->getGenerated()->getScoredBy()->getType(),
            'Person'
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testEventTimeValues($dependValues)
    {
        $interProd = $dependValues[0];
        $product = $dependValues[1];

        $this->assertEquals(
            date_format($interProd->getEventTime(), 'd/m/Y'),
            date_format($product->getEventTime(), 'd/m/Y')
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testEdappValues($dependValues)
    {
        $interProd = $dependValues[0];
        $product = $dependValues[1];

        $this->assertNotNull($product->getEdApp());
        $this->assertEquals(
            $interProd->getEdapp()->id,
            $product->getEdapp()->getId()
        );
        $this->assertEquals(
            $interProd->getEdapp()->name,
            $product->getEdapp()->getName()
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testGetOriginalUsername($dependValues)
    {
        $interProd = $dependValues[0];
        $product = $dependValues[1];

        $this->assertEquals(
            $interProd->getActor()->username,
            $product->getOriginalUsername()
        );
    }

    /**
     * @depends testCanGetCompiler
     */
    public function testShouldBeRegistable($dependValues)
    {
        $product = $dependValues[1];
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
