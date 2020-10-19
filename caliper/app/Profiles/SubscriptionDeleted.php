<?php

namespace App\Profiles;

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
    public function __construct(AppSubscriptionDeleted $sc)
    {
        parent::__construct();
        $actor = $sc->getActor();
        $object = $sc->getObject();
        $partOf = $sc->getPartOf();

        $this
            ->setAction(new Action(Action::UNSUBSCRIBED))
            ->setActor(
                (new Person((string) $actor->id))
                    ->setName($actor->username)
                    ->setDescription($actor->description)
            )
            ->setObject(
                (new Forum((string) $object->id))
                    ->setName($object->name)
                    ->setIsPartOf(
                        (new CourseSection((string) $partOf->id))
                            ->setName($partOf->fullname)
                    )
            )
            ->setEventTime($sc->getEventTime())
            ->setEdApp(
                (new SoftwareApplication($sc->getEdApp()))//->makeReference()
            );
    }
}
