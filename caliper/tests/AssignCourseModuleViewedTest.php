<?php

use udzuki\translator\moodle\classes\mod\assign\CourseModuleViewed;

class AssignCourseModuleViewedTest extends \PHPUnit\Framework\TestCase
{
    protected $test_event;
    public function setUp(): void
    {
        $this->test_event = udzuki\translator\moodle\db\Models\Events::where([
            ['eventname', '\mod_assign\event\course_module_viewed'],
            ['userid', '<>', 0]
        ])->first();
    }

    public function testRightTranslator()
    {
        $this->assertNotNull($this->test_event, "this event does not exist.");
        $this->assertEquals('\mod_assign\event\course_module_viewed', $this->test_event->eventname);
        $testTranslator = \udzuki\translator\moodle\SupportedEvents::getTranslator($this->test_event);
        return $testTranslator;
    }

    /**
     * @depends testRightTranslator
     */
    public function testObject(\udzuki\translator\moodle\EventFactory $translator)
    {
        $result_translation = $translator->prepare($this->test_event)->process();
        $expected_keys = require(__DIR__ . '/expected_vars.php');
        foreach ($expected_keys->must_include_keys as $expected_key){
            $this->assertArrayHasKey($expected_key, $result_translation);
        }
        foreach ($expected_keys->actor_must_include_keys as $expected_key){
            $this->assertArrayHasKey($expected_key, $result_translation['actor']);
        }
    }

}
