<?php

namespace Tests\Generator;

use App\Generator;
use PHPUnit\Framework\TestCase;


final class GenerateTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $this->api = getenv("OPENLRW_APIKEY");
    }

    public function testGenerate()
    {
        ob_start();
        Generator::generate('/../tests/files/videojs_caliper_test.csv');
        $this->assertEquals(
            preg_match('/\[Ignored\]/', ob_get_contents()),
            0
        );
        $this->assertEquals(
            preg_match('/Error/', ob_get_contents()),
            0
        );
        ob_end_clean();
    }

    public function testGenerateWithInvalidEvent()
    {
        ob_start();
        Generator::generate('/../tests/files/videojs_caliper_test_with_invalid_event.csv');
        $this->assertEquals(
            preg_match(
                '/\[Ignored\] unsupported event/',
                ob_get_contents()
            ),
            1
        );
        ob_end_clean();
    }

    public function testCanNotTranslate()
    {
        ob_start();
        Generator::generate('/../tests/files/videojs_caliper_test_with_error.csv');
        $this->assertEquals(
            preg_match(
                '/Error translating event/',
                ob_get_contents()
            ),
            1
        );
        ob_end_clean();
    }

    public function testCanNotSend()
    {
        putenv("OPENLRW_APIKEY=test");
        ob_start();
        Generator::generate('/../tests/files/videojs_caliper_test.csv');
        $this->assertEquals(
            preg_match(
                '/Error sending event/',
                ob_get_contents()
            ),
            1
        );
        ob_end_clean();
    }

    public function tearDown(): void
    {
        putenv("OPENLRW_APIKEY=$this->api");
    }
}
