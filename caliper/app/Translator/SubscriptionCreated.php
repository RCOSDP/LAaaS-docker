<?php

namespace App\Translator;

use App\Models\Moodle\{
        Event,
        Forum,
        User,
        Course,
    };

final class SubscriptionCreated extends Translator
{
    public function __construct(Event $event)
    {
        $this->object = $this->getModule($event->objecttable, $event->objectid);
        $this->actor = $this->getUser($this->object->userid);
        $this->forum = $this->getModule('forum', $this->object->forum);
        $this->eventTime = $event->timecreated->timestamp;
        $this->course = $this->getCourse($event->courseid);
    }

    public function getActor(): User
    {
        return $this->actor;
    }

    public function getObject(): Forum
    {
        return $this->forum;
    }

    public function getPartOf(): course
    {
        return $this->course;
    }
}
