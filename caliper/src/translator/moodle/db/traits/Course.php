<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Course
{
    function readCourse(int $id): Models\Course
    {
        if ($id === 0) {
            $id++;
        }
        return Models\Course::find($id);
    }

    function readSite(): Models\Course
    {
        return $this->readCourse(1);
    }
}