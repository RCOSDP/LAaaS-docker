<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Wiki
{
    function readWiki(int $id): Models\Wiki
    {
        return Models\Wiki::find($id);
    }
}