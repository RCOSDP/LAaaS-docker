<?php

use Illuminate\Database\Seeder;

class ScormScoesSeeder extends Seeder
{
    public function run(): void
    {
        App\Models\Moodle\ScormScoes::truncate();
        App\Models\Moodle\ScormScoes::create([
            'scorm' => 1,
            'launch' => 'test sco launch',
            'title' => 'test sco title',
        ]);
    }
}
