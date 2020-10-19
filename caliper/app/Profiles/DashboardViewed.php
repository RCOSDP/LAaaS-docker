<?php

namespace App\Profiles;

use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\{
        agent\Person,
        agent\SoftwareApplication,
        reading\WebPage,
        
    };
use IMSGlobal\Caliper\events\ViewEvent;

final class DashboardViewed extends ViewEvent
{
    public function __construct($dv)
    {
        parent::__construct();
        $actor = $dv->getActor();
        $object = $dv->getObject();

        $this
            ->setAction(new Action(Action::VIEWED))
            ->setActor(
                (new Person((string)$actor->id))
                ->setName($actor->username)
                ->setDescription($actor->description)
            )
            ->setObject(
                (new WebPage((string)$object->id))
            )
            ->setEventTime($dv->getEventTime())
            ->setEdApp(
                new SoftwareApplication($dv->getEdApp())
            );
    }
}
