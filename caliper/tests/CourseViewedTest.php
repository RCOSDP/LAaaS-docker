<?php


class CourseViewedTest extends \PHPUnit\Framework\TestCase
{
    protected $test_event;

    protected function setUp(): void
    {
        $this->test_event = \udzuki\translator\moodle\db\Models\Events::where([
            ['eventname', '\core\event\course_viewed'],
            ['userid', '<>', 0]
        ])->first();
    }

    public function testGetRightTranslator()
    {
        $this->assertNotNull($this->test_event, 'This event does not exist');
        $this->assertEquals('\core\event\course_viewed', $this->test_event->eventname);
        return \udzuki\translator\moodle\SupportedEvents::getTranslator($this->test_event);
    }

    /**
     * @depends testGetRightTranslator
     */
    public function testObject(\udzuki\translator\moodle\EventFactory $translator)
    {
        $result_translation = $translator->prepare($this->test_event)->process();
        $expected_keys = require(__DIR__ . '/expected_vars.php');
        foreach ($expected_keys->must_include_keys as $expected_key) {
            $this->assertArrayHasKey($expected_key, $result_translation);
        }
    }
}
