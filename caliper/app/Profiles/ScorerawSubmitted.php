<?php

namespace App\Profiles;

use App\Profiles\Profiles;
use App\Translator\ScorerawSubmitted as AppScorerawSubmitted;
use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\{
    agent\Person,
    agent\SoftwareApplication,
    assignable\Attempt,
    outcome\Score,
};
use IMSGlobal\Caliper\events\GradeEvent;

final class ScorerawSubmitted extends GradeEvent
{
    use Profiles;

    public function __construct(AppScorerawSubmitted $ss)
    {
        parent::__construct();
        $actor = $ss->getActor();
        $object = $ss->getObject();
        $score = $ss->getScore();
        $edApp = $ss->getEdApp();

        $actorId = $ss->getUserId($actor->id);
        $objectId = $ss->getObjectId();
        $scoreId = $ss->getScoreId();

        $this->originalUsername = $actor->username;

        $this
            ->setAction(new Action(Action::GRADED))
            ->setActor(
                (new Person((string) $actorId))
                    ->setName($ss->getAnonymizedUsername($actor->username))
                    ->setDescription($actor->description ?? '')
            )
            ->setObject(
                (new Attempt((string) $objectId))
                    ->setName($object->name)
            )
            ->setGenerated(
                (new Score((string) $scoreId))
                    ->setScoreGiven($score->given)
            )
            ->setEventTime($ss->getEventTime())
            ->setEdApp(
                (new SoftwareApplication((string) $edApp->id))
                    ->setName($edApp->name)
            );
    }
}
