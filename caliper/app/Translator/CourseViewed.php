<?php

namespace App\Translator;

use App\Models\Moodle\{
    Course,
    Event,
    User,
};

final class CourseViewed extends Translator
{
    public function __construct(Event $event)
    {
        $this->actor = $this->getUser($event->userid);
        $this->object = $this->getCourse($event->courseid);
        $this->eventTime = $event->timecreated->timestamp;
    }

    public function getActor(): User
    {
        return $this->actor;
    }

    public function getObject(): Course
    {
        return $this->object;
    }
}
