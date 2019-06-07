<?php

namespace udzuki\translator\moodle\db\Models;


use Illuminate\Database\Eloquent\Model;

class ForumDiscussion extends Model
{
    function getIdAttribute($value): string
    {
        return "{$this->getConnection()->getConfig('app_url')}/mod/forum/{$this->forum}/discussion/{$value}";
    }

    function getNameAttribute($value): string
    {
        return $value;
    }
}