<?php

namespace App\Translator;

use App\Models\Moodle\{
    Event,
    User,
};

final class DashboardViewed extends Translator
{
    public function __construct(Event $event)
    {
        $this->actor = $this->getUser($event->userid);
        $this->object = $this->actor;
        $this->eventTime = $event->timecreated->timestamp;
    }

    public function getActor(): User
    {
        return $this->actor;
    }

    public function getObject(): User
    {
        return $this->object;
    }
}
