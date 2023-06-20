<?php

namespace App\Translator;

use IMSGlobal\Caliper\events\Event;


class SupportedEvent
{
    static $events =
        [
            'firstplay' => '\VideoStarted',
            'started' => '\VideoStarted',
            'resumed' => '\VideoResumed',
            'pause' => '\VideoPaused',
            'seeked' => '\VideoJumpedTo',
            'ratechange' => '\VideoChangedSpeed',
            'ended' => '\VideoEnded',
            'enabled-closed-captioning' => '\VideoEnabledClosedCaptioning',
            'disabled-closed-captioning' => '\VideoDisabledClosedCaptioning',
            'forward' => '\VideoForwardedTo',
            'back' => '\VideoJumpedTo',
            'beforeunload-ended' => '\VideoEnded',
            'pagehide-ended' => '\VideoEnded',
            'unload-ended' => '\VideoEnded',
            'hidden-ended' => '\VideoEnded',
            'force-ended' => '\VideoEnded',
            'current-time' => '\VideoViewed',
            'changepage' => '\VideoJumpedTo'
        ];

    public static function isSupported(string $eventName): bool
    {
        return isset(static::$events[$eventName]);
    }

    public static function getRecipeClass(array $translatedEvent): Event
    {
        $className = 'App\Recipe\video';
        $className .= static::$events[$translatedEvent['event_name']];
        return new $className($translatedEvent);
    }
}
