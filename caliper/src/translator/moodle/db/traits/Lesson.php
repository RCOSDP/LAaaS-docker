<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Lesson
{
    function readLesson(int $id): Models\Lesson
    {
        return Models\Lesson::find($id);
    }
}