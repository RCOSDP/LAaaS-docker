<?php

namespace udzuki\translator\moodle\db\Models;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    protected $table = 'survey';

    public function getIdAttribute($value): string
    {
        return "{$this->getConnection()->getConfig('app_url')}/mod/survey/{$value}";
    }

    public function getCourseAttribute($value): int
    {
        return $value;
    }

    public function getNameAttribute($value): string
    {
        return $value;
    }
}