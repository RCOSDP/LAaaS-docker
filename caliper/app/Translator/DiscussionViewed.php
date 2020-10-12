<?php

namespace App\Translator;

use App\Models\Moodle\{Event, User, Forum};

final class DiscussionViewed extends Translator
{
    private $partOf;

    public function __construct(Event $event)
    {
        $this->actor = $this->getUser($event->userid);
        $this->object = $this->getModule($event->objecttable, $event->objectid);
        $this->partOf = $this->getModule('forum', $this->object->forum);
        $this->course = $this->getCourse($this->object->course);
        $this->courseCategory = $this->getCourseCategory($this->course->category ?? 'null');
        $this->eventTime = $event->timecreated->timestamp;
    }

    public function getActor(): User
    {
        return $this->actor;
    }

    public function getObject()
    {
        return $this->object;
    }

    public function getPartOf(): Forum
    {
        return $this->partOf;
    }

    public function getIsPartOfCourse()
    {
        return $this->course;
    }

    public function getCategory(): string
    {
        return $this->courseCategory;
    }
}
