<?php

namespace App\Profiles;

use App\Profiles\Profiles;
use App\Translator\UserLoggedout as AppUserLoggedout;
use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\agent\{
    Person,
    SoftwareApplication,
};
use IMSGlobal\Caliper\events\SessionEvent;

final class UserLoggedout extends SessionEvent
{
    use Profiles;

    public function __construct(AppUserLoggedout $ul)
    {
        parent::__construct();
        $actor = $ul->getActor();
        $object = $ul->getObject();
        $edApp = $ul->getEdApp();

        $actorId = $ul->getUserId($actor->id);

        $this->originalUsername = $actor->username;

        $this
            ->setAction(new Action(Action::LOGGED_OUT))
            ->setActor(
                (new Person((string) $actorId))
                    ->setName($ul->getAnonymizedUsername($actor->username))
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
