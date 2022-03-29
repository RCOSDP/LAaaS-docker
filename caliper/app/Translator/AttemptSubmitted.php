<?php

namespace App\Translator;

use App\Models\Moodle\{
    Course,
    Event,
    Quiz,
    QuizAttempts,
    User,
};

final class AttemptSubmitted extends Translator
{
    private $partOf;
    private $quiz;
    private $event;

    public function __construct(Event $event)
    {
        $this->event = $event;
        $this->actor = $this->getUser($event->userid);
        $this->object = $this->getModule($event->objecttable, $event->objectid);
        $this->quiz = $this->getModule('quiz', $this->object->quiz);
        $this->partOf = $this->getCourse($this->quiz->course);
        $this->eventTime = $event->timecreated->timestamp;
    }

    public function getActor(): User
    {
        return $this->actor;
    }

    public function getObject(): QuizAttempts
    {
        return $this->object;
    }

    public function getQuiz(): Quiz
    {
        return $this->quiz;
    }

    public function getPartOf(): Course
    {
        return $this->partOf;
    }

    public function getObjectId(): string
    {
        return env('APP_URL')
               . '/mod/quiz/attempt.php?attempt='
               . $this->event->objectid
               . '&cmid='
               . $this->event->contextinstanceid;
    }

    public function getGeneratedId(): string
    {
        return $this->getObjectId() . '#result';
    }
}
