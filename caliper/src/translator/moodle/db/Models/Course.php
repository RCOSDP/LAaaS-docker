<?php

namespace udzuki\translator\moodle\db\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $table = 'course';

    public function getIdAttribute($value): string
    {
        return "{$this->getConnection()->getConfig('app_url')}/course/{$value}";
    }

    public function getFullnameAttribute($value): string
    {
        return $value;
    }

    public function getShortnameAttribute($value): string
    {
        return $value;
    }
}
