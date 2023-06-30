<?php

namespace App\Functions;

use App\Models\Moodle\Event;
use Illuminate\Support\Str;

if (!function_exists('expand')) {
    function expand(Event $event)
    {
        $type = Str::studly(Str::getEventType($event->eventname));
        $translator = "App\Translator\\$type";
        return new $translator($event);
    }
}
