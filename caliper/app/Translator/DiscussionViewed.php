<?php

namespace App\Translator;

use App\Models\Moodle\{
    Course,
    Event,
    Forum,
    ForumDiscussions,
    User,
};

final class DiscussionViewed extends Translator
{
    private $partOf;

    public function __construct(Event $event)
    {
        $this->actor = $this->getUser($event->userid);
        $this->object = $this->getModule($event->objecttable, $event->objectid);
        $this->partOf = $this->getModule('forum', $this->object->forum);
        $this->course = $this->getCourse($this->object->course);
        $this->eventTime = $event->timecreated->timestamp;
    }

    public function getActor(): User
    {
        return $this->actor;
    }

    public function getObject(): ForumDiscussions
    {
        return $this->object;
    }

    public function getPartOf(): Forum
    {
        return $this->partOf;
    }

    public function getIsPartOfCourse(): Course
    {
        return $this->course;
    }

    public function getObjectId(): string
    {
        return env('APP_URL')
               . '/mod/forum/discuss.php?d='
               . $this->object->id;
    }

    public function getPartOfId(): string
    {
        return env('APP_URL')
               . '/mod/forum/view.php?f='
               . $this->partOf->id;
    }
}
