<?php

namespace udzuki\Profiles\Forum;

use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\agent\Person;
use IMSGlobal\Caliper\entities\agent\SoftwareApplication;
use IMSGlobal\Caliper\entities\DigitalResource;
use IMSGlobal\Caliper\events\ViewEvent;
use udzuki\translator\TranslatedEvent;

class DiscussionViewed extends ViewEvent
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
                    ->setDescription($translatedEvent->actor['description'])
            )
            ->setAction(new Action(Action::VIEWED))
            ->setObject(
                (new DigitalResource($translatedEvent->object['id']))
                    ->setName($translatedEvent->object['name'])
                    ->setIsPartOf($translatedEvent->object['part_of'])
            );
    }
}