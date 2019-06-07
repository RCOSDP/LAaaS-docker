<?php

namespace udzuki\Profiles\Assessment;

use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\agent\Person;
use IMSGlobal\Caliper\entities\agent\SoftwareApplication;
use IMSGlobal\Caliper\entities\assessment\Assessment;
use IMSGlobal\Caliper\events\AssessmentEvent;
use udzuki\translator\TranslatedEvent;

class AttemptSubmitted extends AssessmentEvent
{
    public function __construct(TranslatedEvent $translatedEvent)
    {
        parent::__construct();
        $this
            ->setEdApp((new SoftwareApplication($translatedEvent->app)))
            ->setEventTime($translatedEvent->event_time)
            ->setActor(
                (new Person($translatedEvent->actor['id']))
                    ->setName($translatedEvent->actor['name'])
                    ->setDescription($translatedEvent->actor['description'])
            )
            ->setAction(new Action(Action::SUBMITTED))
            ->setObject(
                (new Assessment($translatedEvent->object['id']))
            );
    }
}