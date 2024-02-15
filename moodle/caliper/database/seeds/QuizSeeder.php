<?php

use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        App\Models\Moodle\Quiz::truncate();
        App\Models\Moodle\Quiz::create([
            'course' => 1,
            'name' => 'test quiz',
            'intro' => 'lorem ipsm',
            'introformat' => 1,
            'timeopen' => 0,
            'timeclose' => 0,
            'timelimit' => 0,
            'overduehandling' => 'autosubmit',
            'preferredbehaviour' => 'deferredfeedback',
            'attempts' => 0,

        ]);

        App\Models\Moodle\QuizAttempts::truncate();
        App\Models\Moodle\QuizAttempts::create([
            'quiz' => 1,
            'userid' => 2,
            'attempt' => 1,
            'uniqueid' => 5,
            'layout' => '1,0',
            'state' => 'inprogress',
            'timestart' => time(),
            'timefinish' => 0,
            'timemodified' => time(),
        ]);
    }
}
