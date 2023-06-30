<?php

use Illuminate\Database\Seeder;

class ForumSeeder extends Seeder
{
    public function run(): void
    {
        App\Models\Moodle\Forum::truncate();
        App\Models\Moodle\Forum::create([
            'course' => 1,
            'type' => 'news',
            'name' => 'test forum',
            'intro' => 'description',
        ]);

        App\Models\Moodle\ForumSubscriptions::truncate();
        App\Models\Moodle\ForumSubscriptions::create([
            'userid' => 5,
            'forum' => 1,
        ]);

        App\Models\Moodle\ForumDiscussions::truncate();
        App\Models\Moodle\ForumDiscussions::create([
            'course' => 1,
            'forum' => 1,
            'name' => 'test forum discussion',
            'userid' => 1,
            'usermodified' => 3
        ]);
    }
}
