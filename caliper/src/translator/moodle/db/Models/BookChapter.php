<?php

namespace udzuki\translator\moodle\db\Models;


use Illuminate\Database\Eloquent\Model;

class BookChapter extends Model
{
    function getIdAttribute($value): string
    {
        return "{$this->getConnection()->getConfig('app_url')}/mod/book/id/{$this->bookid}/chapter/{$value}";
    }
}