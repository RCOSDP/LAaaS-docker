<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Config;
use Tests\TestCase;

use function App\Functions\get_lrs;

final class GetLrsTest extends TestCase
{
    public function testGetEppnScope()
    {
        $test = new MockEvent('user@testscope');
        $test2 = new MockEvent('user@test.ac.jp');
        $test3 = new MockEvent('noeppn');

        $mockConfig = [
            "default" => "default key",
            "test.ac.jp" => "test.ac.jp key",
        ];
        Config::shouldReceive('get')
            ->with('lrw.tenants')
            ->andReturn($mockConfig);

        $tenants = Config::get('lrw.tenants');
        $this->assertEquals($tenants['default'], get_lrs($test->getUserName()));
        $this->assertEquals($tenants['test.ac.jp'], get_lrs($test2->getUserName()));
        $this->assertEquals($tenants['default'], get_lrs($test3->getUserName()));
    }
}

class MockEvent
{
    private $username;
    public function __construct(string $uname)
    {
        $this->username = $uname;
    }

    public function getUserName(): string
    {
        return $this->username;
    }
}
