<?php

use Illuminate\Database\Seeder;

class ScormScoesTrackSeeder extends Seeder
{
    public function run(): void
    {
        App\Models\Moodle\ScormScoesTrack::truncate();
        App\Models\Moodle\ScormScoesTrack::create([
            'userid' => 1,
            'scormid' => 1,
            'scoid' => 1,
            'attempt' => 1,
            'element' => 'cmi.core.total_time',
            'value' => '00:00:11.85'
        ]);
        App\Models\Moodle\ScormScoesTrack::create([
            'userid' => 1,
            'scormid' => 1,
            'scoid' => 1,
            'attempt' => 1,
            'element' => 'cmi.core.score.raw',
            'value' => '100'
        ]);
        App\Models\Moodle\ScormScoesTrack::create([
            'userid' => 1,
            'scormid' => 12345,
            'scoid' => 12345,
            'attempt' => 1,
            'element' => 'cmi.core.total_time',
            'value' => '00:01:23.45'
        ]);
    }
}
