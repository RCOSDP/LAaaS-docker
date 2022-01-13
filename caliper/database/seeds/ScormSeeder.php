<?php

use Illuminate\Database\Seeder;

class ScormSeeder extends Seeder
{
    public function run(): void
    {
        App\Models\Moodle\Scorm::truncate();
        App\Models\Moodle\Scorm::create([
            'course' => 1,
            'name' => 'test scorm',
            'intro' => 'test scorm intro',
        ]);
    }
}
