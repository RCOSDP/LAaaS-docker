<?php

return [
    'default' => NunoMaduro\LaravelConsoleSummary\SummaryCommand::class,
    'paths' => [app_path('Commands')],
    'add' => [
    ],
    'hidden' => [
        NunoMaduro\LaravelConsoleSummary\SummaryCommand::class,
        Symfony\Component\Console\Command\HelpCommand::class,
        Illuminate\Console\Scheduling\ScheduleRunCommand::class,
        Illuminate\Console\Scheduling\ScheduleFinishCommand::class,
        Illuminate\Foundation\Console\VendorPublishCommand::class,
        Illuminate\Database\Console\Migrations\FreshCommand::class,
        Illuminate\Database\Console\Migrations\InstallCommand::class,
        Illuminate\Database\Console\Migrations\MigrateCommand::class,
        Illuminate\Database\Console\Migrations\MigrateMakeCommand::class,
        Illuminate\Database\Console\Migrations\RefreshCommand::class,
        Illuminate\Database\Console\Migrations\ResetCommand::class,
        Illuminate\Database\Console\Migrations\StatusCommand::class,
    ],
    'remove' => [
        Illuminate\Database\Console\Migrations\RollbackCommand::class,
    ],
];
