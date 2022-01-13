<?php

namespace App\Translator;

use App\Models\Moodle\{
    ScormScoes,
    ScormScoesTrack,
    User,
};

final class CmiCoreTotalTime extends Translator
{
    private $scoLaunchedEvent;

    public function __construct(ScormScoesTrack $event)
    {
        $this->actor = $this->getUser($event->userid);
        $this->object = $this->getModule('scorm_scoes', $event->scoid);
        $this->scoLaunchedEvent = $this->getScoLaunchedEvent($event->scoid);
        $this->generated = new \stdClass();
        $this->generated->count = $event->attempt;
        $duration = explode(':', $event->value);
        $this->generated->duration = sprintf(
            'PT%sS',
            (int) $duration[0] * 360 + (int) $duration[1] * 60 + (float) $duration[2]
        );
        $this->eventTime = $event->timemodified->timestamp;
    }

    public function getActor(): User
    {
        return $this->actor;
    }

    public function getObject(): ScormScoes
    {
        return $this->object;
    }

    public function getGenerated()
    {
        return $this->generated;
    }

    public function getObjectId(): string
    {
        return unserialize($this->scoLaunchedEvent->other)['loadedcontent'];
    }

    public function getGeneratedId(): string
    {
        return $this->getObjectId() . '#result';
    }
}
