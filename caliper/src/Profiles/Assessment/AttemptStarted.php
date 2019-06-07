<?php

namespace udzuki\Profiles\Assessment;

use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\agent\Person;
use IMSGlobal\Caliper\entities\agent\SoftwareApplication;
use IMSGlobal\Caliper\entities\assessment\Assessment;
use IMSGlobal\Caliper\entities\assignable\Attempt;
use IMSGlobal\Caliper\events\AssessmentEvent;
use udzuki\translator\TranslatedEvent;

class AttemptStarted extends AssessmentEvent
{
    function __construct(TranslatedEvent $te)
    {
        parent::__construct();
        $this
            ->setEdApp(new SoftwareApplication($te->app))
            ->setEventTime($te->event_time)
            ->setActor(
                (new Person($te->actor['id']))
                    ->setName($te->actor['name'])
                    ->setDescription($te->actor['description'])
            )
            ->setAction(new Action(Action::STARTED))
            ->setObject(
                (new Assessment($te->object['id']))
                    ->setName($te->object['name'])
            )
            ->setGenerated(
                (new Attempt($te->generated['id']))
            );
    }
}