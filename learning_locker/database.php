<?php

return [
  'fetch' => PDO::FETCH_CLASS,
  'default' => 'mongodb',
  'connections' => [
		'mongodb' => [
        'driver'   => 'mongodb',
        'host'     => 'localhost',
        'port'     => 27017,
        'username' => 'udzuki',
        'password' => 'udzuki',
        'database' => 'learninglocker'
    ],
	],
	'migrations' => 'migrations',
];
