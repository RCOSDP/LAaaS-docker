<?php

namespace App\Recipe\video;

use IMSGlobal\Caliper\actions\Action;
use IMSGlobal\Caliper\entities\agent;
use IMSGlobal\Caliper\entities\media\MediaLocation;
use IMSGlobal\Caliper\events\ViewEvent;


class VideoViewed extends ViewEvent
{
    public function __construct(array $translatedEvent)
    {
        parent::__construct();
        $actor =
            (new agent\Person($translatedEvent['user_id']))
                ->setName($translatedEvent['user_name'])
                ->setDescription($translatedEvent['user_description']);

        $object =
            (new MediaLocation($translatedEvent['object_id']))
                ->setName($translatedEvent['object_name'])
                ->setCurrentTime($translatedEvent['current_time'])
                ->setExtensions([
                    'courseId' => $translatedEvent['course_id'],
                    'nonce' => $translatedEvent['nonce'],
                    'videoplayerlog' => $translatedEvent['videoplayerlog']
                ]);

        $edApp =
            (new agent\SoftwareApplication($translatedEvent['app_id']))
                ->setName($translatedEvent['app_name'])
                ->setDescription($translatedEvent['app_description']);

        $this
            ->setEventTime($translatedEvent['event_time'])
            ->setActor($actor)
            ->setAction(new Action(Action::VIEWED))
            ->setObject($object)
            ->setEdApp($edApp);
    }
}
