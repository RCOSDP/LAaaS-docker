<?php

namespace App\Functions;

use ReflectionClass;

if (!function_exists('compile')) {
    function compile($interProd)
    {
        //the fastest way to get class name in php!
        $type = (new ReflectionClass($interProd))->getShortName();

        $compiler = "App\Profiles\\$type";
        return new $compiler($interProd);
    }
}
