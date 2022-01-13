<?php

return [
    'default' => env('DB_CONNECTION', 'pgsql'),

    'connections' => [
        'mysql' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => env('PREFIX'),
            'strict' => true,
            'engine' => null,
        ],

        'pgsql' => [
            'driver' => 'pgsql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '5432'),
            'database' => env('DB_DATABASE', 'postgres'),
            'username' => env('DB_USERNAME', 'postgres'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => env('PREFIX'),
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],

        'sqlsrv' => [
            'driver' => 'sqlsrv',
            'host' => env('DB_HOST', 'localhost'),
            'port' => env('DB_PORT', '1433'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => env('PREFIX'),
        ],

        'log' => [
            'driver' => 'pgsql',
            'host' => env('DB_LOG_HOST', '127.0.0.1'),
            'port' => env('DB_LOG_PORT', '5432'),
            'database' => env('DB_LOG_DATABASE', 'caliper_log'),
            'username' => env('DB_LOG_USERNAME', 'caliper_cli'),
            'password' => env('DB_LOG_PASSWORD', ''),
            'charset' => 'utf8',
            'schema' => 'public',
            'sslmode' => 'prefer'
        ],

        'eppn' => [
            'driver' => 'pgsql',
            'host' => env('DB_EPPN_HOST', '127.0.0.1'),
            'port' => env('DB_EPPN_PORT', '5432'),
            'database' => env('DB_EPPN_DATABASE', 'eppn'),
            'username' => env('DB_EPPN_USERNAME', 'eppnuser'),
            'password' => env('DB_EPPN_PASSWORD', ''),
            'charset' => 'utf8',
            'schema' => 'public',
            'sslmode' => 'prefer'
        ],
    ],
];
