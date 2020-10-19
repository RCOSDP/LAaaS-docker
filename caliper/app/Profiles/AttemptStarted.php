<?php

namespace App\Profiles;

use App\Translator\AttemptStarted as AppAttemptStarted;
use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\{
       agent\Person,
       agent\SoftwareApplication,
       assessment\Assessment,
       assignable\Attempt,
       lis\CourseSection
    };
use IMSGlobal\Caliper\events\AssessmentEvent;

final class AttemptStarted extends AssessmentEvent
{
    public function __construct(AppAttemptStarted $as)
    {
        parent::__construct();
        $actor = $as->getActor();
        $object = $as->getObject();
        $quiz = $as->getQuiz();
        $partOf = $as->getPartOf();
        
        $this
            ->setAction(new Action(Action::STARTED))
            ->setActor(
                (new Person((string) $actor->id))
                    ->setName($actor->username)
                    ->setDescription($actor->description)
            )
            ->setObject(
                (new Assessment((string) $object->id))
                    ->setName($quiz->name)
                    ->setMaxScore(intval($quiz->grade))
                    ->setIsPartOf(
                        (new CourseSection((string) $partOf->id))
                            ->setName($partOf->fullname)
                    )
            )
            ->setGenerated(
                (new Attempt((string) $object->attempt))
                ->setCount($object->attempt)
                ->setAssignable(
                    (new Assessment((string) $object->id))->makeReference()
                )
            )
            ->setEventTime($as->getEventTime())
            ->setEdApp(
                new SoftwareApplication($as->getEdApp())
            );
    }
}
