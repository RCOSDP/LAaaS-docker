<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(AssignSeeder::class);
        $this->call(CourseSeeder::class);
        $this->call(EppnSeeder::class);
        $this->call(EventSeeder::class);
        $this->call(ForumSeeder::class);
        $this->call(QuizSeeder::class);
        $this->call(ScormSeeder::class);
        $this->call(ScormScoesSeeder::class);
        $this->call(ScormScoesTrackSeeder::class);
        $this->call(UserSeeder::class);
    }
}
