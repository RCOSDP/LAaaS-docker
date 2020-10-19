<?php

namespace Tests\Unit;

use App\Models\Moodle\Event;
use App\Profiles\BrokenData;
use Illuminate\Console\Command as IlluminateCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\Console\Output\OutputInterface;
use Tests\TestCase as TestCase;

use function App\Functions\expand;
use function App\Functions\is_broken;

final class BrokenDataTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        
        $this->app = $this->createApplication();
        $dummyOutput = new ConsoleOutput();
        $dummyProgress = new ProgressBar($dummyOutput);
        $this->interProd = Event::where([['eventname', '\mod_forum\event\course_module_viewed'],['objectid', 65535]])
                            ->get()
                            ->translate($dummyProgress)
                            ->first();
    }

    public function testShouldCatchIfDataNotFound()
    {
        $this->assertEquals('App\Profiles\BrokenData', get_class($this->interProd));

        return $this->interProd;
    }

    /**
     * @depends testShouldCatchIfDataNotFound
     */
    public function testValidatorShouldReturnTrueWhenBrokenAndFalseIfNot($broken)
    {
        $this->assertTrue(is_broken($broken));

        $valid = Event::where('eventname', '\core\event\course_viewed')->first();

        $this->assertFalse(is_broken($valid));

        return $broken;
    }

    /**
     * @depends testValidatorShouldReturnTrueWhenBrokenAndFalseIfNot
     */
    public function testShouldContainMetaData($broken)
    {
        $this->assertNotNull($broken->getMissingModel());
        $this->assertEquals(65535, $broken->getMissingId());
    }
}
