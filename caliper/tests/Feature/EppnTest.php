<?php

namespace Tests\Feature;

use App\Caliper\Traits\Util;
use App\Models\Eppn;
use App\Models\Moodle\{
    Event,
    User
};
use Illuminate\Support\Facades\Config;
use Tests\TestCase;

use function App\Functions\{
    compile,
    expand,
};

final class EppnTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $mockConfig = [
            "test.ac.jp" => "test.ac.jp key",
            "test-example.com" => "test-example.com key",
            "example.com" => "example.com key",
        ];
        Config::set('lrw.tenants', $mockConfig);
    }

    public function testGetFromEppnTableWithString()
    {
        putenv('DB_EPPN="true"');
        $username = 'testuser@test.ac.jp';
        $user = User::create([
            'username' => $username,
        ]);
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 1);

        $anonymizedUsername = $util->getAnonymizedUsername($user);

        $this->assertEquals($anonymizedUsername, Eppn::all()->first()->hash);
        $this->assertEquals(Eppn::all()->count(), 1);
    }

    public function testGetFromEppnTableWithBoolean()
    {
        putenv('DB_EPPN=true');
        $username = 'testuser@test.ac.jp';
        $user = User::create([
            'username' => $username,
        ]);
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 1);

        $anonymizedUsername = $util->getAnonymizedUsername($user);

        $this->assertEquals($anonymizedUsername, Eppn::all()->first()->hash);
        $this->assertEquals(Eppn::all()->count(), 1);
    }

    public function testUpdateEppnTable()
    {
        putenv('DB_EPPN="true"');
        $username = 'testuser@test-example.com';
        $user = User::create([
            'username' => $username,
        ]);
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 1);

        $anonymizedUsername = $util->getAnonymizedUsername($user);

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
        $user = User::create([
            'username' => $username,
        ]);
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 2);

        $anonymizedUsername = $util->getAnonymizedUsername($user);

        $this->assertEquals($anonymizedUsername, hash('sha256', $username));
        $this->assertEquals(Eppn::all()->count(), 2);
    }

    public function testGetWithoutEppnTableWithString()
    {
        putenv('DB_EPPN="false"');
        $username = 'testuser@test.ac.jp';
        $user = User::create([
            'username' => $username,
        ]);
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 2);

        $anonymizedUsername = $util->getAnonymizedUsername($user);

        $this->assertEquals($anonymizedUsername, hash('sha256', $username));
        $this->assertEquals(Eppn::all()->count(), 2);
    }

    public function testGetWithoutEppnTableWithBoolean()
    {
        putenv('DB_EPPN=false');
        $username = 'testuser@test.ac.jp';
        $user = User::create([
            'username' => $username,
        ]);
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 2);

        $anonymizedUsername = $util->getAnonymizedUsername($user);

        $this->assertEquals($anonymizedUsername, hash('sha256', $username));
        $this->assertEquals(Eppn::all()->count(), 2);
    }

    public function testGetFromEppnTableWithLti()
    {
        putenv('DB_EPPN=true');
        $username = 'testuser@test.ac.jp';
        $user = User::create([
            'auth' => 'lti',
            'username' => 'test',
            'alternatename' => $username,
        ]);
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 2);

        $anonymizedUsername = $util->getAnonymizedUsername($user);

        $this->assertEquals(
            $anonymizedUsername,
            Eppn::where('username', $username)->first()->hash
        );
        $this->assertEquals(Eppn::all()->count(), 2);
    }

    public function testUpdateEppnTableWithLti()
    {
        putenv('DB_EPPN=true');
        $username = 'testuser@example.com';
        $user = User::create([
            'auth' => 'lti',
            'username' => 'test',
            'alternatename' => $username,
        ]);
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 2);

        $anonymizedUsername = $util->getAnonymizedUsername($user);

        $this->assertEquals($anonymizedUsername, hash('sha256', $username));
        $this->assertEquals(Eppn::all()->count(), 3);
        $this->assertDatabaseHas(
            'eppn',
            [
                'username' => $username,
                'hash' => hash('sha256', $username),
                'scope' => 'example.com',
                'acl' => 'example_com',
            ],
            'eppn'
        );
    }

    public function testNotUpdateEppnTableWhenAlternatenameIsNullWithLti()
    {
        putenv('DB_EPPN=true');
        $user = User::create([
            'auth' => 'lti',
            'username' => 'test',
        ]);
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 3);

        $anonymizedUsername = $util->getAnonymizedUsername($user);

        $this->assertEquals($anonymizedUsername, '');
        $this->assertEquals(Eppn::all()->count(), 3);
    }

    public function testGetWithoutEppnTableWithLti()
    {
        putenv('DB_EPPN=false');
        $username = 'testuser@test.ac.jp';
        $user = User::create([
            'auth' => 'lti',
            'username' => $username,
            'alternatename' => 'test',
        ]);
        $util = new class {
            use Util;
        };

        $this->assertEquals(Eppn::all()->count(), 3);

        $anonymizedUsername = $util->getAnonymizedUsername($user);

        $this->assertEquals($anonymizedUsername, hash('sha256', $username));
        $this->assertEquals(Eppn::all()->count(), 3);
    }

    public function testGetLtiUsernameWithEppn()
    {
        putenv('DB_EPPN=true');
        $event = Event::where('userid', 11)->first();
        $user = User::where('id', 11)->first();
        $interProd = expand($event);
        $product = compile($interProd);
        $this->assertEquals(
            hash('sha256', $user->alternatename),
            $product->getActor()->getName()
        );
        $this->assertEquals(
            $user->alternatename,
            $product->getOriginalUsername()
        );
    }

    public function testGetLtiUsernameWhenAlternatenameIsNullWithEppn()
    {
        putenv('DB_EPPN=true');
        $event = Event::where('userid', 12)->first();
        $interProd = expand($event);
        $product = compile($interProd);
        $this->assertEquals(
            '',
            $product->getActor()->getName()
        );
        $this->assertEquals(
            '',
            $product->getOriginalUsername()
        );
    }

    public function testGetLtiUsernameWithoutEppn()
    {
        putenv('DB_EPPN=false');
        $event = Event::where('userid', 11)->first();
        $user = User::where('id', 11)->first();
        $interProd = expand($event);
        $product = compile($interProd);
        $this->assertEquals(
            hash('sha256', $user->username),
            $product->getActor()->getName()
        );
        $this->assertEquals(
            $user->username,
            $product->getOriginalUsername()
        );
    }
}
