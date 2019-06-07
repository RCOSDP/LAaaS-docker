<?php


namespace udzuki\translator\moodle\db\Models;


use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table = 'question';

    public function getIdAttribute($value): string
    {
        return "{$this->getConnection()->getConfig('app_url')}/mod/question/{$value}";
    }
}