<?php

namespace App\Profiles;

use App\Profiles\Profiles;
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
    use Profiles;

    public function __construct(AppAssessableSubmitted $as)
    {
        parent::__construct();
        $actor = $as->getActor();
        $assignable = $as->getAssign();
        $partOf = $as->getIsPartOf();
        $edApp = $as->getEdApp();

        $actorId = $as->getUserId($actor->id);
        $objectId = $as->getObjectId();
        $partOfId = $as->getCourseId($partOf->id);

        $this->originalUsername = $actor->username;

        $this
            ->setAction(new Action(Action::SUBMITTED))
            ->setEventTime($as->getEventTime())
            ->setActor(
                (new Person((string) $actorId))
                    ->setName($as->getAnonymizedUsername($actor))
                    ->setDescription($actor->description ?? '')
            )
            ->setObject(
                (new AssignableDigitalResource((string) $objectId))
                    ->setName($assignable->name)
                    ->setDescription($assignable->intro ?? '')
                    ->setMaxAttempts(intval($assignable->maxattempts))
                    ->setMaxScore(intval($assignable->grade))
                    ->setDateToStartOn(new \DateTime(date('c', $assignable->allowsubmissionsfromdate)))
                    ->setDateToSubmit(new \DateTime(date('c', $assignable->duedate)))
                    ->setIsPartOf(
                        (new CourseSection((string) $partOfId))
                            ->setName($partOf->fullname)
                    )
            )
            ->setEdApp(
                (new SoftwareApplication((string) $edApp->id))
                    ->setName($edApp->name)
            );
    }
}
