<?php

namespace App\Profiles;

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
    public function __construct(AppCourseViewed $courseViewed)
    {
        parent::__construct();
        $actor = $courseViewed->getActor();
        $object = $courseViewed->getObject();

        $this
            ->setAction(new Action(Action::VIEWED))
            ->setActor(
                (new Person((string) $actor->id))
                    ->setName($actor->username)
                    ->setDescription($actor->description)
            )
            ->setObject(
                (new WebPage((string) $object->id))
                    ->setName($object->fullname)
            )
            ->setEventTime($courseViewed->getEventTime())
            ->setEdApp(
                new SoftwareApplication($courseViewed->getEdApp())
            );
    }
}
