<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Forum
{
    function readForum(int $id): Models\Forum
    {
        return Models\Forum::find($id);
    }

    function readForumSubscription(int $id): Models\Forum
    {
        $subscribed = Models\ForumSubscription::find($id);
        return $this->readForum($subscribed->forum);
    }

    function readForumDiscussion(int $id): Models\ForumDiscussion
    {
        return Models\ForumDiscussion::find($id);
    }
}