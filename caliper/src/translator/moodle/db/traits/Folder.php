<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Folder
{
    function readFolder(int $id): Models\Folder
    {
        return Models\Folder::find($id);
    }
}