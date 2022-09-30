<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        App\Models\Moodle\User::truncate();

        $users = [
            '@wellknown.ac.jp',
            '@unknown.org',
            'justauser'
        ];
        $faker = Faker::create('en_US');
        foreach (range(1, 10) as $i) {
            App\Models\Moodle\User::create([
                'username' => $faker->name() . $users[$i % 3],
                'firstname' => $faker->firstName(),
                'lastname' => $faker->lastName,
                'description' => $faker->sentence(),
                'email' => $faker->unique()->safeEmail,
                'alternatename' => $faker->name() . $users[$i % 3],
            ]);
        }
        App\Models\Moodle\User::create([
            'auth' => 'lti',
            'username' => 'username@wellknown.ac.jp',
            'alternatename' => 'alternatename@wellknown.ac.jp',
        ]);
        App\Models\Moodle\User::create([
            'auth' => 'lti',
            'username' => 'username@wellknown.ac.jp',
        ]);
    }
}
