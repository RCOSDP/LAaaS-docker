<?php

namespace App\Profiles;

use App\Profiles\Profiles;
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
    use Profiles;

    public function __construct(AppCourseModuleViewed $cmv)
    {
        parent::__construct();
        $actor = $cmv->getActor();
        $object = $cmv->getObject();
        $partOf = $cmv->getPartOf();
        $category = $cmv->getCategory();
        $edApp = $cmv->getEdApp();

        $actorId = $cmv->getUserId($actor->id);
        $objectId = $cmv->getObjectId();
        $partOfId = $cmv->getCourseId($partOf->id);

        $this->originalUsername = $actor->username;

        $this
            ->setAction(new Action(Action::NAVIGATED_TO))
            ->setActor(
                (new Person((string) $actorId))
                    ->setName($cmv->getAnonymizedUsername($actor->username))
                    ->setDescription($actor->description ?? '')
            )
            ->setObject(
                (new DigitalResource((string) $objectId))
                    ->setName($object->name)
                    ->setDescription($object->intro ?? '')
                    ->setIsPartOf(
                        (new CourseSection((string) $partOfId))
                            ->setName($partOf->fullname)
                            ->setCategory($category)
                    )
            )
            ->setEventTime($cmv->getEventTime())
            ->setEdApp(
                (new SoftwareApplication((string) $edApp->id))
                    ->setName($edApp->name)
            );
    }
}
