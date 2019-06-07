<?php
use udzuki\translator\moodle\classes\core\UserLoggedIn;
use PHPUnit\Framework\TestCase;
use udzuki\translator\moodle\db\Models;
use udzuki\translator\moodle\SupportedEvents;

class UserLoggedInTest extends TestCase
{
    /**
     * @var Models\Events $test_event
     */
    protected $test_event;
    public function setUp(): void
    {
        $this->test_event = Models\Events::where([
            ['eventname', '=', '\core\event\user_loggedin'],
            ['userid', '<>', 0]
            ])->first();
    }

    public function testGetRightTranslator()
    {
       $this->assertIsObject($this->test_event);
        $this->assertEquals('\core\event\user_loggedin', $this->test_event->eventname);
        $testTranslator = SupportedEvents::getTranslator($this->test_event);
        return $testTranslator;
    }

    /**
     * @depends testGetRightTranslator
     */
    public function testObject(\udzuki\translator\moodle\EventFactory $translator)
    {
        $result_translation = $translator->prepare($this->test_event)->process();
        $expected_keys = require(__DIR__ . '/expected_vars.php');
        foreach ($expected_keys->must_include_keys as $expected_key)
        {
            $this->assertArrayHasKey($expected_key, $result_translation);
        }
    }
}
