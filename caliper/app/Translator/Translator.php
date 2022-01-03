<?php

namespace App\Translator;

use App\Caliper\Traits\Util;
use DateTime;

abstract class Translator
{
    use Util;

    protected $actor;
    protected $object;
    protected $eventTime;
    protected $generated;
    protected $course;
    protected $courseCategory;

    abstract public function getActor();
    abstract public function getObject();


    public function getEventTime(): DateTime
    {
        return (new DateTime())->setTimestamp($this->eventTime);
    }
}
