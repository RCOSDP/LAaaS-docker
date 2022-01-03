<?php

namespace App\Profiles;

use App\Profiles\Profiles;
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
    use Profiles;

    public function __construct(AppDiscussionViewed $dv)
    {
        parent::__construct();
        $actor = $dv->getActor();
        $object = $dv->getObject();
        $partOf = $dv->getPartOf();
        $course = $dv->getIsPartOfCourse();
        $edApp = $dv->getEdApp();

        $actorId = $dv->getUserId($actor->id);
        $objectId = $dv->getObjectId();
        $partOfId = $dv->getPartOfId();
        $courseId = $dv->getCourseId($course->id);

        $this->originalUsername = $actor->username;

        $this
            ->setAction(new Action(Action::VIEWED))
            ->setActor(
                (new Person((string) $actorId))
                    ->setName($dv->getAnonymizedUsername($actor->username))
                    ->setDescription($actor->description ?? '')
            )
            ->setObject(
                (new Thread((string) $objectId))
                    ->setName($object->name)
                    ->setIsPartOf(
                        (new Forum((string) $partOfId))
                            ->setName($partOf->name)
                            ->setIsPartOf(
                                (new CourseSection((string) $courseId))
                                    ->setName($course->fullname)
                            )
                    )
            )
            ->setEventTime($dv->getEventTime())
            ->setEdApp(
                (new SoftwareApplication((string) $edApp->id))
                    ->setName($edApp->name)
            );
    }
}
