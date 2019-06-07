<?php


namespace udzuki\translator\moodle\classes\mod\quiz;


use udzuki\translator\moodle\db\Models\Events;
use udzuki\translator\moodle\db\traits\Quiz;
use udzuki\translator\moodle\EventFactory;
use udzuki\translator\TranslatedEvent;

class AttemptSubmitted extends EventFactory
{
    function __construct()
    {
        $this->recipe = 'attempt_submitted';
    }

    use Quiz;

    function setObject(Events $event): void
    {
        $this->object = $this->readQuizAttempt($event->objectid);
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
            ]);
    }
}