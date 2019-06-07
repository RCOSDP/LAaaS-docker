<?php

namespace udzuki\translator\moodle\db\Models;

use Illuminate\Database\Eloquent\Model;

class Assign extends Model
{
    protected $table = 'assign';

    public function getIdAttribute($value): string
    {
        return "{$this->getConnection()->getConfig('app_url')}/mod/assign/{$value}";
    }

    public function getCourseAttribute($value): int
    {
        return $value;
    }

    public function getNameAttribute($value): string
    {
        return $value;
    }

    public function getDuedateAttribute($value): int
    {
        return $value;
    }

    public function getAllowsubmissionsfromdateAttribute($value): int
    {
        return $value;
    }

    public function getGradeAttribute($value): int
    {
        return $value;
    }

    public function getTypeAttribute(): string
    {
        return 'assign';
    }
}