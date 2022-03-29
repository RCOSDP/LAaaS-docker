<?php

namespace App\Profiles;

trait Profiles
{
    private $originalUsername;

    public function getOriginalUsername(): string
    {
        return $this->originalUsername;
    }
}
