<?php

namespace App\Translator;

use App\Translator\BaseEvent;
use App\Translator\VideoLogsEvent;


class VideoOperation extends BaseEvent
{
    public function translate(VideoLogsEvent $event): array
    {
        return [
            'event_name' => $event->eventname,
            'event_time' => new \DateTime($event->timestamp),
            'user_id' => $event->userid,
            'user_name' => $event->userid,
            'user_description' => $this->getUserDescription(),
            'object_id' => $event->referrer,
            'object_name' => $event->file,
            'target_id' => $event->referrer,
            'current_time' => sprintf('PT%sS', $event->current),
            'course_id' => $event->courseid,
            'nonce' => $event->nonce,
            'videoplayerlog' => $event->videoplayerlog,
            'app_id' => $this->getAppId(),
            'app_name' => $this->getAppName(),
            'app_description' => $this->getAppDescription()
        ];
    }

    public function getAppId(): string
    {
        return $this->app_id;
    }

    public function getAppName(): string
    {
        return $this->app_name;
    }

    public function getAppDescription(): string
    {
        return $this->app_description;
    }

    public function getUserDescription(): string
    {
        return $this->user_description;
    }
}
