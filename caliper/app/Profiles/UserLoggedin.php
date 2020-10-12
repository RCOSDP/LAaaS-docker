<?php

namespace App\Profiles;

use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\agent\{
        Person,
        SoftwareApplication,
    };
use IMSGlobal\Caliper\events\SessionEvent;

final class UserLoggedin extends SessionEvent
{
    public function __construct($dv)
    {
        parent::__construct();
        $actor = $dv->getActor();

        $this
            ->setAction(new Action(Action::LOGGED_IN))
            ->setActor(
                (new Person((string)$actor->id))
                ->setName($actor->username)
                ->setDescription($actor->description)
            )
            ->setObject(
                (new SoftwareApplication($dv->getObject()))
            )
            ->setEventTime($dv->getEventTime())
            ->setEdApp(
                new SoftwareApplication($dv->getEdApp())
            );
    }
}
