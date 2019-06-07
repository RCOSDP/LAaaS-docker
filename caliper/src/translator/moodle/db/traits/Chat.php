<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Chat
{
    function readChat(int $id): Models\Chat
    {
        return Models\Chat::find($id);
    }
}