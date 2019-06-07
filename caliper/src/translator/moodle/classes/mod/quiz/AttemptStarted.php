<?php

namespace udzuki\translator\moodle\classes\mod\quiz;


use udzuki\translator\moodle\db\Models\Events;
use udzuki\translator\moodle\db\traits\Quiz;
use udzuki\translator\moodle\EventFactory;
use udzuki\translator\TranslatedEvent;

class AttemptStarted extends EventFactory
{
    function __construct()
    {
        $this->recipe = 'attempt_started';
    }

    use Quiz;

    function setObject(Events $event): void
    {
        global $db;
        $attempt = $this->readQuizAttempt($event->objectid);
        $this->object = $this->readQuiz($attempt->quiz);
        $this->generated = (object)[
            'id' => "{$db->getConnection()->getConfig('app_url')}/mod/quiz/{$attempt->quiz}/attempt/{$attempt->id}"
        ];
    }

    function process(): TranslatedEvent
    {
        return (new TranslatedEvent())
            ->setRecipe($this->recipe)
            ->setApp($this->app->id)
            ->setEventTime($this->time)
            ->setActor([
                'id' => $this->actor->id,
                'name' => $this->actor->username,
                'description' => $this->actor->description
            ])
            ->setObject([
                'id' => $this->object->id,
                'name' => $this->object->name,
                'max_grade' => $this->object->grade
            ])
            ->setGenerated([
                'id' => $this->generated->id
            ]);
    }
}