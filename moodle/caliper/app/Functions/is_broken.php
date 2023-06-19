<?php

namespace App\Functions;

if (!function_exists('is_broken')) {
    function is_broken($value): bool
    {
        return get_class($value) === 'App\Profiles\BrokenData';
    }
}
