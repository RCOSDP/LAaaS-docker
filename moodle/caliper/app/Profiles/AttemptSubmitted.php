<?php

namespace App\Profiles;

use App\Profiles\Profiles;
use App\Translator\AttemptSubmitted as AppAttemptSubmitted;
use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\{
    agent\Person,
    agent\SoftwareApplication,
    assessment\Assessment,
    assignable\Attempt,
    lis\CourseSection,
};
use IMSGlobal\Caliper\events\AssessmentEvent;

final class AttemptSubmitted extends AssessmentEvent
{
    use Profiles;

    public function __construct(AppAttemptSubmitted $as)
    {
        parent::__construct();
        $actor = $as->getActor();
        $object = $as->getObject();
        $quiz = $as->getQuiz();
        $partOf = $as->getPartOf();
        $edApp = $as->getEdApp();

        $actorId = $as->getUserId($actor->id);
        $objectId = $as->getObjectId();
        $partOfId = $as->getCourseId($partOf->id);
        $generatedId = $as->getGeneratedId();

        $this->originalUsername = $as->getUsername($actor);

        $this
            ->setAction(new Action(Action::SUBMITTED))
            ->setActor(
                (new Person((string) $actorId))
                    ->setName($as->getAnonymizedUsername($actor))
                    ->setDescription($actor->description ?? '')
            )
            ->setObject(
                (new Assessment((string) $objectId))
                    ->setName($quiz->name)
                    ->setMaxScore(intval($quiz->grade))
                    ->setIsPartOf(
                        (new CourseSection((string) $partOfId))
                            ->setName($partOf->fullname)
                    )
            )
            ->setGenerated(
                (new Attempt((string) $generatedId))
                    ->setCount($object->attempt)
            )
            ->setEventTime($as->getEventTime())
            ->setEdApp(
                (new SoftwareApplication((string) $edApp->id))
                    ->setName($edApp->name)
            );
    }
}
