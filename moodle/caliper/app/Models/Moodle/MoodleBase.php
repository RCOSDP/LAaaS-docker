<?php

namespace App\Models\Moodle;

use Illuminate\Database\Eloquent\Model;

class MoodleBase extends Model
{
    public const CREATED_AT = 'timecreated';
    public const UPDATED_AT = 'timemodified';

    protected $dateFormat = 'U';
}
