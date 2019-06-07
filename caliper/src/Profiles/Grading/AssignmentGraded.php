<?php

namespace udzuki\Profiles\Grading;

use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\agent\Person;
use IMSGlobal\Caliper\entities\agent\SoftwareApplication;
use IMSGlobal\Caliper\entities\assignable\AssignableDigitalResource;
use IMSGlobal\Caliper\entities\assignable\Attempt;
use IMSGlobal\Caliper\entities\outcome\Score;
use IMSGlobal\Caliper\events\GradeEvent;
use udzuki\translator\TranslatedEvent;

class AssignmentGraded extends GradeEvent
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
            ->setAction(new Action(Action::GRADED))
            ->setObject(
                (new Attempt($translatedEvent->object['id']))
                    ->setAssignable(
                        (new AssignableDigitalResource($translatedEvent->object['id']))
                            ->setName($translatedEvent->object['name'])
                            ->setDateToStartOn($translatedEvent->object['start'])
                            ->setDateToSubmit($translatedEvent->object['due'])
                            ->setMaxScore($translatedEvent->generated['max_sore'])
                    )
                    ->setAssignee(
                        (new Person($translatedEvent->object['assignee']['id']))
                            ->setName($translatedEvent->object['assignee']['name'])
                            ->setDescription($translatedEvent->object['assignee']['description'])
                    )
                    ->setCount($translatedEvent->object['attempt'])
            )
            ->setGenerated(
                (new Score($translatedEvent->generated['id']))
                    ->setScoreGiven($translatedEvent->generated['given_score'])
                    ->setComment($translatedEvent->generated['comment'])
            );
    }
}