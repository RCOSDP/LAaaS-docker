<?php

namespace App\Translator;


class VideoLogsEvent
{
    public
        $timestamp,
        $eventname,
        $file,
        $query,
        $current,
        $referrer,
        $userid,
        $courseid,
        $nonce,
        $videoplayerlog;
}
