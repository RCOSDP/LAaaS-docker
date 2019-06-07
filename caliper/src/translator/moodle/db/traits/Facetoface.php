<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Facetoface
{
    function readFacetoface(int $id): Models\Facetoface
    {
        return Models\Facetoface::find($id);
    }
}