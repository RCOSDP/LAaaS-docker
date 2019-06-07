<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Scormadaptivequiz
{
    function readScormadaptivequiz(int $id): Models\Scormadaptivequiz
    {
        return Models\Scormadaptivequiz::find($id);
    }
}