<?php

namespace App\Models\Moodle;

use Illuminate\Database\Eloquent\Model;

class MoodleBase extends Model 
{
    const CREATED_AT = 'timecreated';
    const UPDATED_AT = 'timemodified';

    protected $dateFormat = 'U';
}
