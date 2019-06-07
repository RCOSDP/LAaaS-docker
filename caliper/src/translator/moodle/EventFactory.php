<?php

namespace udzuki\translator\moodle;

use udzuki\translator\moodle\db\Models\Events;
use udzuki\translator\moodle\db\traits\Course;
use udzuki\translator\moodle\db\traits\User;
use udzuki\translator\TranslatedEvent;

abstract class EventFactory
{
    protected $recipe;
    protected $actor;
    protected $action;
    protected $object;
    protected $generated;
    protected $course;
    protected $app;
    protected $time;

    /**
     * common functions
     */
    use User;

    protected function setUser(int $id): self
    {
        $this->actor = $this->readUser($id);
        return $this;
    }

    use Course;

    protected function setCourse(int $id): self
    {
        $this->course = $this->readCourse($id);
        return $this;
    }

    protected function setApp(): self
    {
        $TOP_PAGE_ID = 1;
        $this->app = $this->readCourse($TOP_PAGE_ID);
        return $this;
    }

    protected function setEventTime(int $time): self
    {
        $this->time = (new \DateTime())->setTimestamp($time);
        return $this;
    }

    function prepare(Events $event): self
    {
        $this
            ->setApp()
            ->setEventTime($event->timecreated)
            ->setCourse($event->courseid)
            ->setUser($event->userid)
            ->setObject($event);

        return $this;
    }

    /**
     * abstract function
     */
    abstract function setObject(Events $event): void;

    abstract function process(): TranslatedEvent;
}