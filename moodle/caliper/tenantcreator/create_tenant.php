<?php

require_once('./vendor/autoload.php');

use OpenLRW\OpenLRW;
use Dotenv\Dotenv;

$env = Dotenv::create(__DIR__);
$env->load();

$url = getenv('URL');
$key = getenv('DEFAULT_ORG_APIKEY');
$pwd = getenv('DEFAULT_ORG_APISECRET');

$client = new OpenLRW($url, $key, $pwd);

// get default org's jwt
$jwt = $client->generateJwt();
$header = [
    'Authorization' => "Bearer {$jwt}",
    'Content-Type' => 'application/json',
];

$insts = require 'tenant.php';

$allTenants = $client->httpGet('/api/tenants', $header);
$allTenantNames = [];
foreach ($allTenants as $tenant) {
    array_push($allTenantNames, $tenant->name);
}

foreach ($insts as $institution) {
    //skip existing org
    if (in_array($institution['name'], $allTenantNames)) {
        continue;
    }

    $newTenant = [
        'name' => $institution['name'],
        'description' => $institution['description'],
    ];

    //create tenant
    $tenant = $client->httpPost('/api/tenants', $newTenant, $header);

    $newOrg = [
        'name' => $institution['name'],
        "metadata" => [
            "https://matthews/tenant" => $tenant->id
        ]
    ];

    //create org with new tenant
    $org = $client->httpPost("/api/orgs/tenant/{$tenant->id}", $newOrg, $header);

    $newUser = [
        'tenantId' => $tenant->id,
        'orgId' => $org->sourcedId,
        'username' => $institution['name'],
        'password' => substr(bin2hex(random_bytes(20)), 0, 20),
    ];

    //create new adminuser for org and tenant
    $user = $client->httpPost('/api/adminuser/create', $newUser, $header);

    $data = [
        'username' => $user->username,
        'password' => $user->password
    ];
}
