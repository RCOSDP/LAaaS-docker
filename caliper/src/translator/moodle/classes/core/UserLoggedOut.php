<?php

namespace udzuki\translator\moodle\classes\core;

use udzuki\translator\moodle\db\Models\Events;
use udzuki\translator\moodle\EventFactory;
use udzuki\translator\TranslatedEvent;

class UserLoggedOut extends EventFactory
{
    function __construct()
    {
        $this->recipe = 'user_loggedout';
    }

    function setObject(Events $event): void
    {
        $this->object = $this->setApp();
    }

    public function process(): TranslatedEvent
    {
        return (new TranslatedEvent())
            ->setRecipe($this->recipe)
            ->setApp($this->app->id)
            ->setEventTime($this->time)
            ->setActor([
                'id' => $this->actor->id,
                'name' => $this->actor->username,
                'description' => $this->actor->description,
            ])
            ->setObject([]);
    }
}