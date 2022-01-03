<?php

namespace App\Profiles;

use App\Profiles\Profiles;
use App\Translator\CmiCoreTotalTime as AppCmiCoreTotalTime;
use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\{
    agent\Person,
    agent\SoftwareApplication,
    assessment\Assessment,
    assignable\Attempt,
};
use IMSGlobal\Caliper\events\AssessmentEvent;

final class CmiCoreTotalTime extends AssessmentEvent
{
    use Profiles;

    public function __construct(AppCmiCoreTotalTime $cctt)
    {
        parent::__construct();
        $actor = $cctt->getActor();
        $object = $cctt->getObject();
        $generated = $cctt->getGenerated();
        $edApp = $cctt->getEdApp();

        $actorId = $cctt->getUserId($actor->id);
        $objectId = $cctt->getObjectId();
        $generatedId = $cctt->getGeneratedId();

        $this->originalUsername = $actor->username;

        $this
            ->setAction(new Action(Action::SUBMITTED))
            ->setActor(
                (new Person((string) $actorId))
                    ->setName($cctt->getAnonymizedUsername($actor->username))
                    ->setDescription($actor->description ?? '')
            )
            ->setObject(
                (new Assessment((string) $objectId))
                    ->setName($object->launch)
                    ->setDescription($object->title)
            )
            ->setGenerated(
                (new Attempt((string) $generatedId))
                    ->setDuration($generated->duration)
                    ->setCount($generated->count)
            )
            ->setEventTime($cctt->getEventTime())
            ->setEdApp(
                (new SoftwareApplication((string) $edApp->id))
                    ->setName($edApp->name)
            );
    }
}
