<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Book
{
    function readBook(int $id): Models\Book
    {
        return Models\Book::find($id);
    }
}