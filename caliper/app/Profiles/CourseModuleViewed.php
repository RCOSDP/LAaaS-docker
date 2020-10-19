<?php

namespace App\Profiles;

use App\Translator\CourseModuleViewed as AppCourseModuleViewed;
use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\{
       DigitalResource,
       agent\Person,
       agent\SoftwareApplication,
       lis\CourseSection,
    };
use IMSGlobal\Caliper\events\NavigationEvent;

final class CourseModuleViewed extends NavigationEvent
{
    public function __construct(AppCourseModuleViewed $cmv)
    {
        parent::__construct();
        $actor = $cmv->getActor();
        $object = $cmv->getObject();
        $partof = $cmv->getPartOf();
        $category = $cmv->getCategory();

        $this
            ->setAction(new Action(Action::NAVIGATED_TO))
            ->setActor(
                (new Person((string) $actor->id))
                    ->setName($actor->username)
                    ->setDescription($actor->description)
            )
            ->setObject(
                (new DigitalResource((string) $object->id))
                    ->setName($object->name)
                    ->setDescription($object->intro ?? 'null')
                    ->setIsPartOf(
                        (new CourseSection((string)$partof->id))
                            ->setName($partof->fullname)
                            ->setCategory($category)
                    )
            )
            ->setEventTime($cmv->getEventTime())
            ->setEdApp(
                new SoftwareApplication($cmv->getEdApp())
            );
    }
}
