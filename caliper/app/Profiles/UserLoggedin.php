<?php

namespace App\Profiles;

use App\Profiles\Profiles;
use App\Translator\UserLoggedin as AppUserLoggedin;
use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\agent\{
    Person,
    SoftwareApplication,
};
use IMSGlobal\Caliper\events\SessionEvent;

final class UserLoggedin extends SessionEvent
{
    use Profiles;

    public function __construct(AppUserLoggedin $ul)
    {
        parent::__construct();
        $actor = $ul->getActor();
        $object = $ul->getObject();
        $edApp = $ul->getEdApp();

        $actorId = $ul->getUserId($actor->id);

        $this->originalUsername = $ul->getUsername($actor);

        $this
            ->setAction(new Action(Action::LOGGED_IN))
            ->setActor(
                (new Person((string) $actorId))
                    ->setName($ul->getAnonymizedUsername($actor))
                    ->setDescription($actor->description ?? '')
            )
            ->setObject(
                new SoftwareApplication((string) $object->id)
            )
            ->setEventTime($ul->getEventTime())
            ->setEdApp(
                (new SoftwareApplication((string) $edApp->id))
                    ->setName($edApp->name)
            );
    }
}
