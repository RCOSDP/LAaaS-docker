<?php

namespace App\Translator;

use App\Models\Moodle\{
        Assign,
        AssignGrades,
        Course,
        Event,
        User,
    };

final class SubmissionGraded extends Translator
{
    private $grader;
    private $assignable;
    private $score;
    private $partOf;

    public function __construct(Event $event)
    {
        $this->actor = $this->getUser($event->userid);
        $this->object = $this->getModule($event->objecttable, $event->objectid);
        $this->assignable = $this->getModule('assign', $this->object->assignment);
        $this->grader = $this->getUser($this->object->grader);
        $this->eventTime = $event->timecreated->timestamp;
        $this->partOf = $this->getCourse($this->assignable->course);

        $this->score = new \stdClass();
        $this->score->id = $this->object->id;
        $this->score->given = floatval($this->object->grade);
        $this->score->comment = $this->getGradeComment($this->object->assignment, $this->object->id)
                                ->commenttext;
    }

    public function getActor(): User
    {
        return $this->actor;
    }

    public function getObject(): AssignGrades
    {
        return $this->object;
    }

    public function getAssignable(): Assign
    {
        return $this->assignable;
    }

    public function getGrader(): User
    {
        return $this->grader;
    }

    public function getScore()
    {
        return $this->score;
    }

    public function getPartOf(): Course
    {
        return $this->partOf;
    }
}
