<?php
class_alias(\Illuminate\Database\Capsule\Manager::class, "DB");

$conf = require(__ROOT__ . '/config/moodle/config.php');
if (is_null($conf)) {
    echo "ERROR: failed to decode `config.json`. Make sure the file exists or Check the syntax.\n";
    die('process aborted.');
}

$db = new DB();
$ormConf = [
    'driver' => $conf['db']['driver'],
    'host' => $conf['db']['host'],
    'database' => $conf['db']['name'],
    'username' => $conf['db']['user'],
    'password' => $conf['db']['password'],
    'prefix' => $conf['db']['prefix'],
    'charset' => 'utf8',
    'collation' => 'utf8mb4_general_ci',
    'app_url' => $conf['app']['host'],
];

$db->addConnection($ormConf);
$db->setAsGlobal();
$db->bootEloquent();
