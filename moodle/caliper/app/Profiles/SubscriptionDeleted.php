<?php

namespace App\Profiles;

use App\Profiles\Profiles;
use App\Translator\SubscriptionDeleted as AppSubscriptionDeleted;
use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\{
    Forum,
    agent\Person,
    agent\SoftwareApplication,
    lis\CourseSection,
};
use IMSGlobal\Caliper\events\ForumEvent;

final class SubscriptionDeleted extends ForumEvent
{
    use Profiles;

    public function __construct(AppSubscriptionDeleted $sd)
    {
        parent::__construct();
        $actor = $sd->getActor();
        $object = $sd->getObject();
        $partOf = $sd->getPartOf();
        $edApp = $sd->getEdApp();

        $actorId = $sd->getUserId($actor->id);
        $objectId = $sd->getObjectId();
        $partOfId = $sd->getCourseId($partOf->id);

        $this->originalUsername = $sd->getUsername($actor);

        $this
            ->setAction(new Action(Action::UNSUBSCRIBED))
            ->setActor(
                (new Person((string) $actorId))
                    ->setName($sd->getAnonymizedUsername($actor))
                    ->setDescription($actor->description ?? '')
            )
            ->setObject(
                (new Forum((string) $objectId))
                    ->setName($object->name)
                    ->setIsPartOf(
                        (new CourseSection((string) $partOfId))
                            ->setName($partOf->fullname)
                    )
            )
            ->setEventTime($sd->getEventTime())
            ->setEdApp(
                (new SoftwareApplication((string) $edApp->id))
                    ->setName($edApp->name)
            );
    }
}
