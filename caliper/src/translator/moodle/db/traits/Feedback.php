<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Feedback
{
    function readFeedback(int $id): Models\Feedback
    {
        return Models\Feedback::find($id);
    }
}