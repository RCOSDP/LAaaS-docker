<?php


namespace udzuki\translator\moodle\db\Models;


use Illuminate\Database\Eloquent\Model;

class AssignGrade extends Model
{
    function getAssignmentAttribute($value): int
    {
        return $value;
    }
}