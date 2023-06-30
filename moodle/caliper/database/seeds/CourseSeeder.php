<?php

use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        App\Models\Moodle\Course::truncate();
        App\Models\Moodle\Course::create([
            'category' => 1,
            'fullname' => 'test course',
        ]);

        App\Models\Moodle\CourseCategory::truncate();
        App\Models\Moodle\CourseCategory::create([
            'name' => 'test category',
        ]);
    }
}
