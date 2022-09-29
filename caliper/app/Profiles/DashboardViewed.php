<?php

namespace App\Profiles;

use App\Profiles\Profiles;
use App\Translator\DashboardViewed as AppDashboardViewed;
use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\{
    agent\Person,
    agent\SoftwareApplication,
    reading\WebPage,
};
use IMSGlobal\Caliper\events\ViewEvent;

final class DashboardViewed extends ViewEvent
{
    use Profiles;

    public function __construct(AppDashboardViewed $dv)
    {
        parent::__construct();
        $actor = $dv->getActor();
        $object = $dv->getObject();
        $edApp = $dv->getEdApp();

        $actorId = $dv->getUserId($actor->id);
        $objectId = $dv->getUserId($object->id);

        $this->originalUsername = $actor->username;

        $this
            ->setAction(new Action(Action::VIEWED))
            ->setActor(
                (new Person((string) $actorId))
                    ->setName($dv->getAnonymizedUsername($actor))
                    ->setDescription($actor->description ?? '')
            )
            ->setObject(
                (new WebPage((string) $objectId))
            )
            ->setEventTime($dv->getEventTime())
            ->setEdApp(
                (new SoftwareApplication((string) $edApp->id))
                    ->setName($edApp->name)
            );
    }
}
