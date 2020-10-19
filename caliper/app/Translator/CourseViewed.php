<?php

namespace App\Translator;

use App\Models\Moodle;

final class CourseViewed extends Translator
{
    public function __construct(Moodle\Event $event)
    {
        $this->actor = $this->getUser($event->userid);
        $this->object = $this->getCourse($event->courseid);
        $this->courseCategory = $this->getCourseCategory($this->object->category ?? 'null');
        $this->eventTime = $event->timecreated->timestamp;
    }

    public function getActor(): Moodle\User
    {
        return $this->actor;
    }

    public function getObject(): Moodle\Course
    {
        return $this->object;
    }

    public function getCategory(): string
    {
        return $this->courseCategory;
    }
}
