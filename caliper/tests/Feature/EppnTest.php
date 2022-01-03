<?php

namespace Tests\Feature;

use App\Caliper\Traits\Util;
use App\Models\Eppn;
use Illuminate\Support\Facades\Config;
use Tests\TestCase;

final class EppnTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $mockConfig = [
            "test.ac.jp" => "test.ac.jp key",
            "test-example.com" => "test-example.com key",
        ];
        Config::set('lrw.tenants', $mockConfig);
    }

    public function testGetFromEppnTableWithString()
    {
        putenv('DB_EPPN="true"');
        $username = 'testuser@test.ac.jp';
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 1);

        $anonymizedUsername = $util->getAnonymizedUsername($username);

        $this->assertEquals($anonymizedUsername, Eppn::all()->first()->hash);
        $this->assertEquals(Eppn::all()->count(), 1);
    }

    public function testGetFromEppnTableWithBoolean()
    {
        putenv('DB_EPPN=true');
        $username = 'testuser@test.ac.jp';
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 1);

        $anonymizedUsername = $util->getAnonymizedUsername($username);

        $this->assertEquals($anonymizedUsername, Eppn::all()->first()->hash);
        $this->assertEquals(Eppn::all()->count(), 1);
    }

    public function testUpdateEppnTable()
    {
        putenv('DB_EPPN="true"');
        $username = 'testuser@test-example.com';
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 1);

        $anonymizedUsername = $util->getAnonymizedUsername($username);

        $this->assertEquals($anonymizedUsername, hash('sha256', $username));
        $this->assertEquals(Eppn::all()->count(), 2);
        $this->assertDatabaseHas(
            'eppn',
            [
                'username' => $username,
                'hash' => hash('sha256', $username),
                'scope' => 'test-example.com',
                'acl' => 'test_example_com',
            ],
            'eppn'
        );
    }

    public function testNotUpdateEppnTable()
    {
        putenv('DB_EPPN="true"');
        $username = 'testuser@example.org';
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 2);

        $anonymizedUsername = $util->getAnonymizedUsername($username);

        $this->assertEquals($anonymizedUsername, hash('sha256', $username));
        $this->assertEquals(Eppn::all()->count(), 2);
    }

    public function testGetWithoutEppnTableWithString()
    {
        putenv('DB_EPPN="false"');
        $username = 'testuser@test.ac.jp';
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 2);

        $anonymizedUsername = $util->getAnonymizedUsername($username);

        $this->assertEquals($anonymizedUsername, hash('sha256', $username));
        $this->assertEquals(Eppn::all()->count(), 2);
    }

    public function testGetWithoutEppnTableWithBoolean()
    {
        putenv('DB_EPPN=false');
        $username = 'testuser@test.ac.jp';
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 2);

        $anonymizedUsername = $util->getAnonymizedUsername($username);

        $this->assertEquals($anonymizedUsername, hash('sha256', $username));
        $this->assertEquals(Eppn::all()->count(), 2);
    }
}
