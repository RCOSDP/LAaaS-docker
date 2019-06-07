<?php

namespace udzuki\test;
return (object)[
    "must_include_keys" => [
        "recipe",
        "app",
        "event_time",
        'actor',
        'object'
    ],
    'actor_must_include_keys' => [
        'id',
        'name',
        'description'
    ],
    "event_must_include_properties" => [
        "edApp",
        "eventTime",
        "Actor",
        "Action",
        "Object",
    ]
];
