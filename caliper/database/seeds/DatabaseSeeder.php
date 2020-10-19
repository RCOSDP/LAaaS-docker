<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(AssignSeeder::class);
        $this->call(CourseSeeder::class);
        $this->call(EventSeeder::class);
        $this->call(ForumSeeder::class);
        $this->call(QuizSeeder::class);
        $this->call(UserSeeder::class);
    }
}
