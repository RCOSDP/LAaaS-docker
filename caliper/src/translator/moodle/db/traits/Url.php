<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Url
{
    function readUrl(int $id): Models\Url
    {
        return Models\Url::find($id);
    }
}