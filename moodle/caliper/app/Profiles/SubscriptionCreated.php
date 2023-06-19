<?php

namespace App\Profiles;

use App\Profiles\Profiles;
use App\Translator\SubscriptionCreated as AppSubscriptionCreated;
use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\{
    Forum,
    agent\Person,
    agent\SoftwareApplication,
    lis\CourseSection,
};
use IMSGlobal\Caliper\events\ForumEvent;

final class SubscriptionCreated extends ForumEvent
{
    use Profiles;

    public function __construct(AppSubscriptionCreated $sc)
    {
        parent::__construct();
        $actor = $sc->getActor();
        $object = $sc->getObject();
        $partOf = $sc->getPartOf();
        $edApp = $sc->getEdApp();

        $actorId = $sc->getUserId($actor->id);
        $objectId = $sc->getObjectId();
        $partOfId = $sc->getCourseId($partOf->id);

        $this->originalUsername = $sc->getUsername($actor);

        $this
            ->setAction(new Action(Action::SUBSCRIBED))
            ->setActor(
                (new Person((string) $actorId))
                    ->setName($sc->getAnonymizedUsername($actor))
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
            ->setEventTime($sc->getEventTime())
            ->setEdApp(
                (new SoftwareApplication((string) $edApp->id))
                    ->setName($edApp->name)
            );
    }
}
