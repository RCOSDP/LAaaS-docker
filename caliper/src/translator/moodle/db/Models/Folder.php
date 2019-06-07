<?php

namespace udzuki\translator\moodle\db\Models;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    protected $table = 'folder';

    public function getIdAttribute($value): string
    {
        return "{$this->getConnection()->getConfig('app_url')}/mod/folder/{$value}";
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