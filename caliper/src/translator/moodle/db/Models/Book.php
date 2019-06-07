<?php

namespace udzuki\translator\moodle\db\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = 'book';

    public function getIdAttribute($value): string
    {
        return "{$this->getConnection()->getConfig('app_url')}/mod/book/{$value}";
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