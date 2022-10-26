<?php

namespace App\Profiles;

use App\Profiles\Profiles;
use App\Translator\CourseViewed as AppCourseViewed;
use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\{
    agent\Person,
    agent\SoftwareApplication,
    reading\WebPage,
};
use IMSGlobal\Caliper\events\ViewEvent;

final class CourseViewed extends ViewEvent
{
    use Profiles;

    public function __construct(AppCourseViewed $cv)
    {
        parent::__construct();
        $actor = $cv->getActor();
        $object = $cv->getObject();
        $edApp = $cv->getEdApp();

        $actorId = $cv->getUserId($actor->id);
        $objectId = $cv->getCourseId($object->id);

        $this->originalUsername = $cv->getUsername($actor);

        $this
            ->setAction(new Action(Action::VIEWED))
            ->setActor(
                (new Person((string) $actorId))
                    ->setName($cv->getAnonymizedUsername($actor))
                    ->setDescription($actor->description ?? '')
            )
            ->setObject(
                (new WebPage((string) $objectId))
                    ->setName($object->fullname)
            )
            ->setEventTime($cv->getEventTime())
            ->setEdApp(
                (new SoftwareApplication((string) $edApp->id))
                    ->setName($edApp->name)
            );
    }
}
