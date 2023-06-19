<?php

define('__ROOT__', dirname(dirname(__FILE__)));
require_once __ROOT__ . '/vendor/autoload.php';

use App\Generator;

Generator::generate($argv[1]);
