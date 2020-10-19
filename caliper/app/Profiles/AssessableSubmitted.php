<?php

namespace App\Profiles;

use App\Translator\AssessableSubmitted as AppAssessableSubmitted;
use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\{
        agent\Person,
        agent\SoftwareApplication,
        assignable\AssignableDigitalResource,
        lis\CourseSection,
    };
use IMSGlobal\Caliper\events\AssignableEvent;

final class AssessableSubmitted extends AssignableEvent
{
    public function __construct(AppAssessableSubmitted $as)
    {
        parent::__construct();
        $actor = $as->getActor();
        $assignable = $as->getAssign();
        $partOf = $as->getIsPartOf();

        $this
            ->setAction(new Action(Action::SUBMITTED))
            ->setEventTime($as->getEventTime())
            ->setActor(
                (new Person((string) $actor->id))
                    ->setName($actor->username)
                    ->setDescription($actor->description)
            )
            ->setObject(
                (new AssignableDigitalResource((string) $assignable->id))
                    ->setName($assignable->name)
                    ->setDescription($assignable->intro)
                    ->setMaxAttempts(intval($assignable->maxattempts))
                    ->setMaxScore(intval($assignable->grade))
                    ->setDateToStartOn(new \DateTime(date('c', $assignable->allowsubmissionsfromdate)))
                    ->setDateToSubmit(new \DateTime(date('c', $assignable->duedate)))
                    ->setIsPartOf(
                        (new CourseSection((string) $partOf->id))
                            ->setName($partOf->fullname)
                    )
            )
            ->setEdApp(
                new SoftwareApplication($as->getEdApp())
            );
    }
}
