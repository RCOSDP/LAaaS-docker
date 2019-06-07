<?php

namespace udzuki\translator\moodle\classes\mod\page;

use udzuki\translator\moodle\db\Models\Events;
use udzuki\translator\moodle\db\traits;
use udzuki\translator\moodle\EventFactory;
use udzuki\translator\TranslatedEvent;

class CourseModuleViewed extends EventFactory
{
    function __construct()
    {
        $this->recipe = 'course_module_viewed';
    }

    use traits\Page;

    function setObject(Events $event): void
    {
        $this->object = $this->readPage($event->objectid);
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
            ->setObject([
                'id' => $this->object->id,
                'type' => $this->object->type,
                'name' => $this->object->name,
            ]);
    }
}