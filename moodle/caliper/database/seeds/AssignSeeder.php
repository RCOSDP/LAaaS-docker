<?php

use App\Models\Moodle\Assign;
use App\Models\Moodle\AssignfeedbackComment;
use App\Models\Moodle\AssignGrades;
use App\Models\Moodle\AssignSubmission;
use Illuminate\Database\Seeder;

class AssignSeeder extends Seeder
{
    public function run(): void
    {
        AssignSubmission::truncate();
        AssignSubmission::create([
            'assignment' => 1,
            'userid' => 4,
            'timecreated' => time(),
            'timemodified' => time(),
            'status' => 'submitted',
            'attemptnumber'  => 0,
            'latest' => 1,
        ]);

        Assign::truncate();
        Assign::create([
            'course' => 1,
            'name' => 'test assign',
            'intro' => 'this is test assignment.',
            'duedate' => time() + (7 * 0 * 0 * 0),
            'allowsubmissionsfromdate' => time(),
            'grade' => 100,
            'timemodified' => time(),
            'gradingduedate' => time() + (8 * 0 * 0 * 0),
            'maxattempts' => -1,
        ]);

        AssignGrades::truncate();
        AssignGrades::create([
            'assignment' => 1,
            'userid' => 4,
            'timecreated' => time(),
            'timemodified' => time(),
            'grader' => 2,
            'grade' => 90.0,
            'attemptnumber' => 0,
        ]);

        AssignfeedbackComment::truncate();
        AssignfeedbackComment::create([
            'assignment' => 1,
            'grade' => 1,
            'commenttext' => 'you are nice.',
            'commentformat' => 1,
        ]);
    }
}
