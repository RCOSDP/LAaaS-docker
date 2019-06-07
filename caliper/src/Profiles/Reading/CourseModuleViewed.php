<?php

namespace udzuki\Profiles\Reading;

use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\agent\Person;
use IMSGlobal\Caliper\entities\agent\SoftwareApplication;
use IMSGlobal\Caliper\entities\DigitalResource;
use IMSGlobal\Caliper\events\NavigationEvent;
use udzuki\translator\TranslatedEvent;

class CourseModuleViewed extends NavigationEvent
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
            ->setAction(new Action(Action::NAVIGATED_TO))
            ->setObject(
                (new DigitalResource($translatedEvent->object['id']))
                    ->setName($translatedEvent->object['name'])
            # ->setType(new Type($translatedEvent->object['type']))
            );
    }
}