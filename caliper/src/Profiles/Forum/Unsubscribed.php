<?php

namespace udzuki\Profiles\Forum;

use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\agent\Person;
use IMSGlobal\Caliper\entities\agent\SoftwareApplication;
use IMSGlobal\Caliper\entities\Forum;
use IMSGlobal\Caliper\events\ForumEvent;
use udzuki\translator\TranslatedEvent;

class Unsubscribed extends ForumEvent
{
    public function __construct(TranslatedEvent $translatedEvent)
    {
        parent::__construct();
        $this
            ->setEdApp(new SoftwareApplication($translatedEvent->app))
            ->setEventTime($translatedEvent->event_time)
            ->setActor(
                (new Person($translatedEvent->actor['id']))
                    ->setName($translatedEvent->actor['name'])
                    ->setDescription($translatedEvent->actor['name'])
            )
            ->setAction(new Action(Action::UNSUBSCRIBED))
            ->setObject(
                (new Forum($translatedEvent->object['id']))
                    ->setName($translatedEvent->object['name'])
                    ->setDescription($translatedEvent->object['description'])
                    ->setIsPartOf(new Forum($translatedEvent->object['part_of']))
            );
    }
}