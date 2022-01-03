<?php

namespace App\Translator;

use App\Models\Moodle\{
    Course,
    Event,
    User,
};

final class CourseModuleViewed extends Translator
{
    private $objectId;
    private $partOf;
    private $event;

    public function __construct(Event $event)
    {
        $this->event = $event;
        $this->actor = $this->getUser($event->userid);
        $this->object = $this->getModule($event->objecttable, $event->objectid);
        $this->partOf = $this->getCourse($this->object->course);
        $this->courseCategory = $this->getCourseCategory($this->partOf->category ?? 'null');
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

    public function getPartOf(): Course
    {
        return $this->partOf;
    }

    public function getCategory(): string
    {
        return $this->courseCategory;
    }

    public function getObjectId(): string
    {
        return env('APP_URL')
               . '/mod/'
               . $this->event->objecttable
               . '/view.php?id='
               . $this->event->contextinstanceid;
    }
}
