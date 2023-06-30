<?php

namespace App\Profiles;

use App\Profiles\Profiles;
use App\Translator\SubmissionGraded as AppSubmissionGraded;
use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\{
    agent\Person,
    agent\SoftwareApplication,
    assignable\AssignableDigitalResource,
    assignable\Attempt,
    outcome\Score,
};
use IMSGlobal\Caliper\events\GradeEvent;

final class SubmissionGraded extends GradeEvent
{
    use Profiles;

    public function __construct(AppSubmissionGraded $sg)
    {
        parent::__construct();
        $actor = $sg->getActor();
        $object = $sg->getObject();
        $grader = $sg->getGrader();
        $score = $sg->getScore();
        $edApp = $sg->getEdApp();

        $actorId = $sg->getUserId($actor->id);
        $objectId = $sg->getObjectId();
        $assignableId = $sg->getAssignableId();
        $graderId = $sg->getUserId($grader->id);
        $scoreId = $sg->getScoreId();

        $this->originalUsername = $sg->getUsername($actor);

        $this
            ->setAction(new Action(Action::GRADED))
            ->setActor(
                (new Person((string) $actorId))
                    ->setName($sg->getAnonymizedUsername($actor))
                    ->setDescription($actor->description ?? '')
            )
            ->setObject(
                (new Attempt((string) $objectId))
                    ->setAssignable(
                        (new AssignableDigitalResource((string) $assignableId))
                    )
                    ->setCount(($object->attemptnumber === 0 ? 1 : $object->attemptnumber))
            )
            ->setGenerated(
                (new Score((string) $scoreId))
                    ->setScoreGiven($score->given)
                    ->setComment($score->comment)
                    ->setScoredBy(
                        (new Person((string) $graderId))
                            ->setName($sg->getAnonymizedUsername($grader))
                            ->setDescription($grader->description ?? '')
                    )
            )
            ->setEventTime($sg->getEventTime())
            ->setEdApp(
                (new SoftwareApplication((string) $edApp->id))
                    ->setName($edApp->name)
            );
    }
}
