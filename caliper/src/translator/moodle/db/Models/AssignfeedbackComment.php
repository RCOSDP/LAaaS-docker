<?php


namespace udzuki\translator\moodle\db\Models;


use Illuminate\Database\Eloquent\Model;

class AssignfeedbackComment extends Model
{
    function getCommenttextAttribute($value): string
    {
        return $value;
    }

}