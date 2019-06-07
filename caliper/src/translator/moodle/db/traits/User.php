<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait User
{
    function readUser(int $id): Models\User
    {
        return Models\User::find($id);
    }
}