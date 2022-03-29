<?php

use App\Models\Moodle\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    private function event_factory(
        string $eventname,
        int $uid = 1,
        string $oTable = null,
        int $oId = null,
        string $other = null
    ): array {
        return [
            'eventname' => $eventname,
            'userid' => $uid,
            'component' => 'component',
            'target' => 'target',
            'objecttable' => $oTable,
            'objectid' => $oId,
            'action' => 'viewed',
            'crud' => 'r',
            'edulevel' => 0,
            'contextid' => 0,
            'contextlevel' => 0,
            'contextinstanceid' => 1,
            'courseid' => 1,
            'relateduserid' => 1,
            'other' => $other,
            'timecreated' => time(),
            'ip' => '127.0.0.1'
        ];
    }

    public function run(): void
    {
        Event::truncate();
        Event::create($this->event_factory('\mod_forum\event\course_module_viewed', 1, 'forum', 1));
        Event::create($this->event_factory('\mod_forum\event\course_module_viewed', 2, 'forum', 65535));
        Event::create($this->event_factory('\mod_forum\event\discussion_viewed', 3, 'forum_discussions', 1));
        Event::create($this->event_factory(
            '\mod_forum\event\subscription_created',
            4,
            'forum_subscriptions',
            1,
            'a:1:{s:7:"forumid";s:1:"1";}'
        ));
        Event::create($this->event_factory(
            '\mod_forum\event\subscription_deleted',
            5,
            'forum_subscriptions',
            1,
            'a:1:{s:7:"forumid";s:1:"1";}'
        ));
        Event::create($this->event_factory('\mod_assign\event\assessable_submitted', 6, 'assign_submission', 1));
        Event::create($this->event_factory('\mod_assign\event\submission_graded', 7, 'assign_grades', 1));
        Event::create($this->event_factory('\mod_quiz\event\attempt_started', 8, 'quiz_attempts', 1));
        Event::create($this->event_factory('\mod_quiz\event\attempt_submitted', 9, 'quiz_attempts', 1));
        Event::create($this->event_factory(
            '\mod_scorm\event\scoreraw_submitted',
            10,
            'scorm_scoes_track',
            1,
            'a:3:{s:9:"attemptid";i:1;s:10:"cmielement";s:18:"cmi.core.score.raw";s:8:"cmivalue";s:3:"100";}'
        ));
        Event::create($this->event_factory(
            '\mod_scorm\event\sco_launched',
            10,
            'scorm_scoes',
            1,
            'a:2:{s:10:"instanceid";s:2:"31";s:13:"loadedcontent";'
            . 's:71:"https://test.jp/pluginfile.php/4609/mod_scorm/content/1/text/01_01.html";}'
        ));
        Event::create($this->event_factory('\core\event\course_viewed'));
        Event::create($this->event_factory('\core\event\dashboard_viewed'));
        Event::create($this->event_factory('\core\event\user_loggedin', 1, 'user', 1));
        Event::create($this->event_factory('\core\event\user_loggedout', 1, 'user', 1));
    }
}
