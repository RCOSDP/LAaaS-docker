<?php

namespace Tests\Feature;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Tests\TestCase;

final class MacroExtendTest extends TestCase
{

    public function testCollectionShouldHaveTranslateMacro()
    {
        $this->assertTrue(Collection::hasMacro('translate'));

        $this->assertTrue(Collection::hasMacro('send'));

        $this->assertTrue(Str::hasMacro('getEventType'));
    }

    public function testStrShouldHaveGeteventtypeMacro()
    {
        $eventName1 = '\core\event\course_viewed';
        $eventName2 = '\mod_assign\event\course_module_viewed';

        $expect1 = 'course_viewed';
        $expect2 = 'course_module_viewed';

        $this->assertEquals($expect1, Str::getEventType($eventName1));
        $this->assertEquals($expect2, Str::getEventType($eventName2));
    }
}
