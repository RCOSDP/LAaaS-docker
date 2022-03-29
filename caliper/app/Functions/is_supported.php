<?php

namespace App\Functions;

if (!function_exists('is_supported')) {
    function is_supported(string $eventName): bool
    {
        return in_array(
            $eventName,
            [
            '\core\event\course_viewed',
            '\core\event\dashboard_viewed',
            '\core\event\user_loggedin',
            '\core\event\user_loggedout',
            '\mod_assign\event\assessable_submitted',
            '\mod_assign\event\submission_graded',
            '\mod_book\event\course_module_viewed',
            '\mod_chat\event\course_module_viewed',
            '\mod_choice\event\course_module_viewed',
            '\mod_data\event\course_module_viewed',
            '\mod_feedback\event\course_module_viewed',
            '\mod_folder\event\course_module_viewed',
            '\mod_forum\event\subscription_created',
            '\mod_forum\event\subscription_deleted',
            '\mod_forum\event\discussion_viewed',
            '\mod_forum\event\course_module_viewed',
            '\mod_glossary\event\course_module_viewed',
            '\mod_imscp\event\course_module_viewed',
            '\mod_lesson\event\course_module_viewed',
            '\mod_lti\event\course_module_viewed',
            '\mod_page\event\course_module_viewed',
            '\mod_quiz\event\attempt_started',
            '\mod_quiz\event\attempt_submitted',
            '\mod_quiz\event\course_module_viewed',
            '\mod_resource\event\course_module_viewed',
            '\mod_scorm\event\scoreraw_submitted',
            '\mod_scorm\event\course_module_viewed',
            '\mod_survey\event\course_module_viewed',
            '\mod_url\event\course_module_viewed',
            '\mod_wiki\event\course_module_viewed',
            '\mod_workshop\event\course_module_viewed',
            'cmi.core.total_time',
            ],
            true
        );
    }
}
