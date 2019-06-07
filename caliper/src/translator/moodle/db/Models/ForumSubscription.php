<?php

namespace udzuki\translator\moodle\db\Models;


use Illuminate\Database\Eloquent\Model;

class ForumSubscription extends Model
{
    function getUseridAttribute($value): int
    {
        return $value;
    }

    function getForum($value): int
    {
        return $value;
    }

}