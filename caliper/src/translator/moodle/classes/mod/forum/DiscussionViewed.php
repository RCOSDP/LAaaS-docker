<?php

namespace udzuki\translator\moodle\classes\mod\forum;

use udzuki\translator\moodle\db\Models\Events;
use udzuki\translator\moodle\db\traits\Forum;
use udzuki\translator\moodle\EventFactory;
use udzuki\translator\TranslatedEvent;

class DiscussionViewed extends EventFactory
{

    function __construct()
    {
        $this->recipe = 'forum_discussion_viewed';
    }

    use Forum;

    function setObject(Events $event): void
    {
        $this->object = $this->readForumDiscussion($event->objectid);
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
                'description' => $this->actor->description,
            ])
            ->setObject([
                'id' => $this->object->id,
                'name' => $this->object->name,
                'part_of' => $this->readForum($this->object->forum)->id
            ]);
    }
}