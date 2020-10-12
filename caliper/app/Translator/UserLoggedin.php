<?php

namespace App\Translator;

use App\Models\Moodle\{Event, User};

final class UserLoggedin extends Translator
{
    public function __construct(Event $event)
    {
        $this->actor = $this->getUser($event->userid);
        $this->object = $this->getEdApp();
        $this->eventTime = $event->timecreated->timestamp;
    }

    public function getActor(): User
    {
        return $this->actor;
    }

    public function getObject(): string
    {
        return $this->object;
    }
}
