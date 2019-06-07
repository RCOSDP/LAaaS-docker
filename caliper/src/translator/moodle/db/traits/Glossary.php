<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Glossary
{
    function readGlossary(int $id): Models\Glossary
    {
        return Models\Glossary::find($id);
    }
}