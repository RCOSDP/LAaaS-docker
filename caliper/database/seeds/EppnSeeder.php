<?php

use Illuminate\Database\Seeder;

class EppnSeeder extends Seeder
{
    public function run(): void
    {
        App\Models\Eppn::truncate();
        App\Models\Eppn::create([
            'username' => 'testuser@test.ac.jp',
            'hash' => 'test_hash',
            'scope' => 'test.ac.jp',
            'acl' => 'test_ac_jp'
        ]);
    }
}
