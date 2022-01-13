<?php

namespace Tests\Unit;

use App\Models\Moodle\ScormScoesTrack;
use App\Profiles\CmiCoreTotalTime as CmiCoreTotalTimeProfile;
use App\Sender;
use App\Translator\CmiCoreTotalTime as CmiCoreTotalTimeTranslator;
use Tests\TestCase;

use function App\Functions\is_supported;

final class CmiCoreTotalTimeTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->app = $this->createApplication();
    }

    public function testShouldBeSupported()
    {
        $this->assertTrue(is_supported('cmi.core.total_time'));
    }

    public function testTranslatorShouldImplementAbstractMethods()
    {
        $event = ScormScoesTrack::where('element', 'cmi.core.total_time')->first();
        $interProd = new CmiCoreTotalTimeTranslator($event);

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
        $product = new CmiCoreTotalTimeProfile($interProd);
        $this->assertEquals('App\Profiles\CmiCoreTotalTime', get_class($product));

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
            'Submitted'
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
            $interProd->getObject()->launch,
            $product->getObject()->getName()
        );
        $this->assertEquals(
            $interProd->getObject()->title,
            $product->getObject()->getDescription()
        );
        $this->assertEquals(
            $product->getObject()->getType(),
            'Assessment'
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
            $interProd->getGeneratedId(),
            $product->getGenerated()->getId()
        );
        $this->assertEquals(
            $interProd->getGenerated()->duration,
            $product->getGenerated()->getDuration()
        );
        $this->assertEquals(
            $interProd->getGenerated()->count,
            $product->getGenerated()->getCount()
        );
        $this->assertEquals(
            $product->getGenerated()->getType(),
            'Attempt'
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
