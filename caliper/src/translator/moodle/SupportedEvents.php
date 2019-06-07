<?php

namespace udzuki\translator\moodle;

use udzuki\translator\moodle\db\Models\Events;

final class SupportedEvents
{
    private const SUPPORT_LIST = [
        '\core\event\course_viewed' => '\core\CourseViewed',
        '\core\event\dashboard_viewed' => '\core\DashboardViewed',
        '\core\event\user_loggedin' => '\core\UserLoggedIn',
        '\core\event\user_loggedout' => '\core\UserLoggedOut',
        '\mod_assign\event\assessable_submitted' => '\mod\assign\AssignmentSubmitted',
        '\mod_assign\event\submission_graded' => '\mod\assign\AssignmentGraded',
        '\mod_book\event\course_module_viewed' => '\mod\book\CourseModuleViewed',
        '\mod_chat\event\course_module_viewed' => '\mod\chat\CourseModuleViewed',
        '\mod_choice\event\course_module_viewed' => '\mod\choice\CourseModuleViewed',
        '\mod_data\event\course_module_viewed' => '\mod\data\CourseModuleViewed',
        '\mod_facetoface\event\course_module_viewed' => '\mod\facetoface\CourseModuleViewed',
        '\mod_feedback\event\course_module_viewed' => '\mod\feedback\CourseModuleViewed',
        '\mod_folder\event\course_module_viewed' => '\mod\folder\CourseModuleViewed',
        '\mod_forum\event\subscription_created' => '\mod\forum\Subscribed',
        '\mod_forum\event\subscription_deleted' => '\mod\forum\Unsubscribed',
        '\mod_forum\event\discussion_viewed' => '\mod\forum\DiscussionViewed',
        '\mod_forum\event\course_module_viewed' => '\mod\forum\CourseModuleViewed',
        '\mod_glossary\event\course_module_viewed' => '\mod\glossary\CourseModuleViewed',
        '\mod_imscp\event\course_module_viewed' => '\mod\imscp\CourseModuleViewed',
        '\mod_lesson\event\course_module_viewed' => '\mod\lesson\CourseModuleViewed',
        '\mod_lti\event\course_module_viewed' => '\mod\lti\CourseModuleViewed',
        '\mod_page\event\course_module_viewed' => '\mod\page\CourseModuleViewed',
        '\mod_quiz\event\attempt_started' => '\mod\quiz\AttemptStarted',
        '\mod_quiz\event\attempt_submitted' => '\mod\quiz\AttemptSubmitted',
        '\mod_quiz\event\course_module_viewed' => '\mod\quiz\CourseModuleViewed',
        '\mod_resource\event\course_module_viewed' => '\mod\resource\CourseModuleViewed',
        '\mod_scorm\event\course_module_viewed' => '\mod\scorm\CourseModuleViewed',
        '\mod_survey\event\course_module_viewed' => '\mod\survey\CourseModuleViewed',
        '\mod_url\event\course_module_viewed' => '\mod\url\CourseModuleViewed',
        '\mod_wiki\event\course_module_viewed' => '\mod\wiki\CourseModuleViewed',
        '\mod_workshop\event\course_module_viewed' => '\mod\workshop\CourseModuleViewed'
    ];

    static function isNotSystem(int $userId): bool
    {
        return $userId === 0;
    }

    static function isSupported(string $eventName): bool
    {
        return array_key_exists($eventName, self::SUPPORT_LIST);
    }

    static function getTranslator(Events $event): EventFactory
    {
        $translator = '\udzuki\translator\moodle\classes' . self::SUPPORT_LIST[$event->eventname];

        return new $translator();
    }
}

