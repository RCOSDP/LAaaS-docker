<?php

namespace udzuki\Profiles\Reading;

use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\agent\Person;
use IMSGlobal\Caliper\entities\agent\SoftwareApplication;
use IMSGlobal\Caliper\entities\reading\WebPage;
use IMSGlobal\Caliper\events\NavigationEvent;
use udzuki\translator\TranslatedEvent;

class DashboardViewed extends NavigationEvent
{
    public function __construct(TranslatedEvent $translatedEvent)
    {
        parent::__construct();
        $this
            ->setEventTime($translatedEvent->event_time)
            ->setEdApp(new SoftwareApplication($translatedEvent->app))
            ->setAction(new Action(Action::VIEWED))
            ->setActor(
                (new Person($translatedEvent->actor['id']))
                    ->setName($translatedEvent->actor['name'])
                    ->setDescription($translatedEvent->actor['description'])
            )
            ->setObject(new WebPage($translatedEvent->object['id']));
    }
}