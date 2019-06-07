<?php

echo "required extension checking...\n";
$required_ext = [
    'pdo',
    'pgsql',
    'mbstring',
];
$should_dl_ext = [];
$mask = "%-10.10s %-5.5s %-30.30s\n";
foreach ($required_ext as $ext) {
    if (extension_loaded($ext)) {
        printf($mask, $ext, '....', "\e[1;32;40mOK\e[0m");
    } else {
        printf($mask, $ext, '....', "\e[1;31;40mNot Found\e[0m");
        array_push($should_dl_ext, $ext);
    }
}

if (!empty($should_dl_ext)) {
    echo "you should download extensions below.\n";
    foreach ($should_dl_ext as $sdl) {
        echo "{$sdl}\n";
    }
}