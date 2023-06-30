<?php

namespace App\Translator;

use App\Models\Moodle\{
    Assign,
    AssignGrades,
    Event,
    User,
};

final class SubmissionGraded extends Translator
{
    private $grader;
    private $score;
    private $event;

    public function __construct(Event $event)
    {
        $this->event = $event;
        $this->actor = $this->getUser($event->userid);
        $this->object = $this->getModule($event->objecttable, $event->objectid);
        $this->grader = $this->getUser($this->object->grader);
        $this->eventTime = $event->timecreated->timestamp;

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

    public function getGrader(): User
    {
        return $this->grader;
    }

    public function getScore()
    {
        return $this->score;
    }

    public function getObjectId(): string
    {
        return env('APP_URL')
               . '/mod/assign/view.php?id='
               . $this->event->contextinstanceid
               . '&rownum=0&action=grader&userid='
               . $this->event->userid;
    }

    public function getAssignableId(): string
    {
        return env('APP_URL')
               . '/mod/assign/view.php?id='
               . $this->event->contextinstanceid;
    }

    public function getScoreId(): string
    {
        return $this->getObjectID() . '#result';
    }
}
