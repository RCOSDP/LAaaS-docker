<?php

namespace App\Translator;

use App\Models\Moodle\{
        Assign,
        AssignSubmission,
        Course,
        Event,
        User,
};

final class AssessableSubmitted extends Translator
{
    private $assign;

    public function __construct(Event $event)
    {
        $this->actor = $this->getUser($event->userid);
        $this->object = $this->getModule($event->objecttable, $event->objectid);
        $this->assign = $this->getModule('assign', $this->object->assignment);
        $this->course = $this->getCourse($this->assign->course);
        $this->eventTime = $event->timecreated->timestamp;
    }

    public function getActor(): User
    {
        return $this->actor;
    }

    public function getObject(): AssignSubmission
    {
        return $this->object;
    }

    public function getAssign(): Assign
    {
        return $this->assign;
    }

    public function getIsPartOf(): Course
    {
        return $this->course;
    }
}
