<?php

namespace App\Translator;

use App\Models\Moodle\{
    Course,
    Event,
    Forum,
    User,
};

final class SubscriptionCreated extends Translator
{
    public function __construct(Event $event)
    {
        $this->actor = $this->getUser($event->userid);
        $this->object = $this->getModule('forum', intval(unserialize($event->other)['forumid']));
        $this->eventTime = $event->timecreated->timestamp;
        $this->course = $this->getCourse($event->courseid);
    }

    public function getActor(): User
    {
        return $this->actor;
    }

    public function getObject(): Forum
    {
        return $this->object;
    }

    public function getPartOf(): Course
    {
        return $this->course;
    }

    public function getObjectId(): string
    {
        return env('APP_URL')
               . '/mod/forum/subscribers.php?id='
               . $this->object->id
               . '&edit=on';
    }
}
