<?php

namespace App\Profiles;

use App\Translator\DiscussionViewed as AppDiscussionViewed;
use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\{
       Forum,
       Thread,
       agent\Person,
       agent\SoftwareApplication,
       lis\CourseSection,
    };
use IMSGlobal\Caliper\events\ViewEvent;

final class DiscussionViewed extends ViewEvent
{
    public function __construct(AppDiscussionViewed $dv)
    {
        parent::__construct();
        $actor = $dv->getActor();
        $object = $dv->getObject();
        $partOf = $dv->getPartOf();
        $course = $dv->getIsPartOfCourse();

        $this
            ->setAction(new Action(Action::VIEWED))
            ->setActor(
                (new Person((string)$actor->id))
                    ->setName($actor->username)
                    ->setDescription($actor->description)
            )
            ->setObject(
                (new Thread((string) $object->id))
                    ->setName($object->name)
                    ->setIsPartOf(
                        (new Forum((string)$partOf->id))
                            ->setName($partOf->name)
                            ->setIsPartOf(
                                (new CourseSection((string)$course->id))
                                    ->setName($course->fullname)
                            )
                    )
            )
            ->setEventTime($dv->getEventTime())
            ->setEdApp(
                new SoftwareApplication($dv->getEdApp())
            );
    }
}
