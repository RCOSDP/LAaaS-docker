<?php

namespace App\Translator;

use App\Models\Moodle\{
    Event,
    Scorm,
    User,
};

final class ScorerawSubmitted extends Translator
{
    private $objectId;
    private $score;
    private $event;

    public function __construct(Event $event)
    {
        $this->event = $event;
        $this->actor = $this->getUser($event->userid);
        $this->object = $this->getModule('scorm', $event->objectid);
        $this->score = new \stdClass();
        $this->score->id = $this->object->id;
        $this->score->given = floatval(unserialize($event->other)['cmivalue']);
        $this->eventTime = $event->timecreated->timestamp;
    }

    public function getActor(): User
    {
        return $this->actor;
    }

    public function getObject(): Scorm
    {
        return $this->object;
    }

    public function getScore()
    {
        return $this->score;
    }

    public function getObjectId(): string
    {
        return env('APP_URL')
               . '/mod/scorm/view.php?id='
               . $this->event->contextinstanceid;
    }

    public function getScoreId(): string
    {
        return $this->getObjectId() . '#result';
    }
}
