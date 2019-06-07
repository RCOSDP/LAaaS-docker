<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Page
{
    function readPage(int $id): Models\Page
    {
        return Models\Page::find($id);
    }
}