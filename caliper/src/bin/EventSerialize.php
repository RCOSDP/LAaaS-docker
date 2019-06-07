<?php

namespace udzuki\bin;

use IMSGlobal\Caliper\{events\Event};
use udzuki\translator\TranslatedEvent;

final class EventSerialize
{
    private static function getProfile(string $recipe): string
    {
        $routes = [
            'dashboard_viewed' => '\Reading\DashboardViewed',
            'course_viewed' => '\Reading\CourseViewed',
            'course_module_viewed' => '\Reading\CourseModuleViewed',
            'user_loggedin' => '\Session\UserLoggedIn',
            'user_loggedout' => '\Session\UserLoggedOut',
            'assignment_submitted' => '\Assignable\AssignmentSubmitted',
            'assignment_graded' => '\Grading\AssignmentGraded',
            'attempt_started' => '\Assessment\AttemptStarted',
            'attempt_submitted' => '\Assessment\AttemptSubmitted',
            'forum_subscribed' => '\Forum\Subscribed',
            'forum_unsubscribed' => '\Forum\Unsubscribed',
            'forum_discussion_viewed' => '\Reading\ForumDiscussionViewed',
        ];
        return $routes[$recipe];
    }

    public static function createEvent(TranslatedEvent $translatedEvent): Event
    {
        $profile = 'udzuki\Profiles' . self::getProfile($translatedEvent->recipe);
        return new $profile($translatedEvent);
    }
}
