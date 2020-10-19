<?php

namespace App\Profiles;

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
    public function __construct(AppSubmissionGraded $sg)
    {
        parent::__construct();
        $actor = $sg->getActor();
        $object = $sg->getObject();
        $assignable = $sg->getAssignable();
        $grader = $sg->getGrader();
        $score = $sg->getScore();

        $this
            ->setAction(new Action(Action::GRADED))
            ->setActor(
                (new Person((string) $actor->id))
                    ->setName($actor->username)
                    ->setDescription($actor->description)
            )
            ->setObject(
                (new Attempt((string) $object->id))
                    ->setAssignable(
                        (new AssignableDigitalResource((string) $assignable->id))->makeReference()
                    )
                    ->setCount(($object->attemptnumber === 0 ? 1 : $object->attemptnumber))
            )
            ->setGenerated(
                (new Score((string) $score->id))
                    ->setScoreGiven($score->given)
                    ->setComment($score->comment)
                    ->setScoredBy(
                        (new Person((string) $grader->id))
                            ->setName($grader->username)
                            ->setDescription($grader->description)
                    )
            )
            ->setEventTime($sg->getEventTime())
            ->setEdApp(
                new SoftwareApplication($sg->getEdApp())
            );
    }
}
