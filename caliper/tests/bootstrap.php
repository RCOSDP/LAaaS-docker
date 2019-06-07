<?php
require __DIR__ . '/../vendor/autoload.php';

$conf = require(__DIR__ . '/config_test.php');

$db = new \Illuminate\Database\Capsule\Manager();
$test_conf = [
    'driver' => $conf['db']['driver'],
    'host' => $conf['db']['host'],
    'database' => $conf['db']['name'],
    'username' => $conf['db']['user'],
    'password' => $conf['db']['password'],
    'prefix' => $conf['db']['prefix'],
    'charset' => 'utf8',
    'collation' => 'utf8mb4_general_ci',
];

$db->addConnection($test_conf);
$db->setAsGlobal();
$db->bootEloquent();
