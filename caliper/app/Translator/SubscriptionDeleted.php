<?php

namespace App\Translator;

use App\Models\Moodle\{
        Event,
        Forum,
        User,
        Course,
    };

final class SubscriptionDeleted extends Translator
{
    public function __construct(Event $event)
    {
        $this->actor = $this->getUser($event->relateduserid);
        $this->forum = $this->getModule('forum', $event->contextinstanceid);
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

    public function getPartOf(): Course
    {
        return $this->course;
    }
}
