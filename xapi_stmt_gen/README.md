# xAPI statement definitions
## logstore_standard_log
### Common properties
If not specified, the following properties will be applied.

* actor.objectType = Agent
* actor.name = <mdl_user.username> (Converted to SHA256 hash)
* actor.account.name = <mdl_logstore_standard_log.userid>
* actor.account.homePage = <Moodle_URL>
* verb.display['en'] = <mdl_logstore_standard_log.action>
* context.contextActivities.category
  - category.objectType = Activity
  - category.id =  http://moodle.org
  - category.definition.type = http://id.tincanapi.com/activitytype/source
  - category.definition.name['en'] = Moodle
  - category.definition.description['en'] = Moodle is a open source learning platform designed to provide educators, administrators and learners with a single robust, secure and integrated system to create personalized learning environments.
* context.platform = Moodle
* context.language = en
* timestamp = <mdl_logstore_standard_log.timecreated> (Converted)

### Event-based properties(<mdl_logstore_standard_log.eventname>)
* \core\event\course_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - object.objectType = Activity
  - object.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
  - object.definition.type = http://adlnet.gov/expapi/activities/module
  - object.definition.name['en'] = course_viewed
  - object.definition.description['en'] = course_viewed

* \core\event\user_loggedin
  - verb.id = urn:x-moodle-event-action:loggedin
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = user_loggedin
  - object.definition.description['en'] = user_loggedin

* \core\event\user_login_failed
  - verb.id = urn:x-moodle-event-action:failed
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = user_login_failed
  - object.definition.description['en'] = user_login_failed

* \core\event\user_password_updated
  - verb.id = urn:x-moodle-event-action:updated
  - object.id = <Moodle_URL>/user/profile.php?id=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = user_password_updated
  - object.definition.description['en'] = user_password_updated

* \core\event\user_loggedout
  - verb.id = urn:x-moodle-event-action:loggedout
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = user_loggedout
  - object.definition.description['en'] = user_loggedout

* \core\event\user_profile_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - object.id = <Moodle_URL>/user/profile.php?id=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = user_profile_viewed
  - object.definition.description['en'] = user_profile_viewed

* \mod_quiz\event\course_module_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/quiz/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = quiz_course_module_viewed
  - object.definition.description['en'] = quiz_course_module_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/module

* \mod_forum\event\course_module_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/forum/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = forum_course_module_viewed
  - object.definition.description['en'] = forum_course_module_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/module

* \mod_book\event\course_module_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/book/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = book_course_module_viewed
  - object.definition.description['en'] = book_course_module_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/module

* \mod_resource\event\course_module_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/resource/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = resource_course_module_viewed
  - object.definition.description['en'] = resource_course_module_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/module

* \mod_workshop\event\course_module_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/workshop/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = workshop_course_module_viewed
  - object.definition.description['en'] = workshop_course_module_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/module

* \mod_quiz\event\attempt_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/quiz/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = attempt_viewed
  - object.definition.description['en'] = attempt_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/assessment

* \mod_quiz\event\attempt_summary_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/quiz/summary.php?attempt=<mdl_logstore_standard_log.objectid>&cmid<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = attempt_summary_viewed
  - object.definition.description['en'] = attempt_summary_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/assessment

* \mod_quiz\event\attempt_preview_started
  - verb.id = urn:x-moodle-event-action:started
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/quiz/attempt.php?attempt=<mdl_logstore_standard_log.objectid>&cmid<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = attempt_preview_started
  - object.definition.description['en'] = attempt_preview_started
  - object.definition.type = http://adlnet.gov/expapi/activities/assessment

* \jod_quiz\event\attempt_reviewed
  - verb.id = urn:x-moodle-event-action:reviewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/quiz/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = attempt_reviewed
  - object.definition.description['en'] = attempt_reviewed
  - object.definition.type = http://adlnet.gov/expapi/activities/assessment

* \mod_quiz\event\attempt_started
  - verb.id = urn:x-moodle-event-action:started
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/quiz/attempt.php?attempt=<mdl_logstore_standard_log.objectid>&cmid<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = attempt_started
  - object.definition.description['en'] = attempt_started
  - object.definition.type = http://adlnet.gov/expapi/activities/assessment

* \mod_quiz\event\attempt_submitted
  - verb.id = urn:x-moodle-event-action:submitted
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/quiz/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = <mdl_quiz.name> related to <mdl_quiz_attempts> found by <mdl_logstore_standard_log.objectid>
  - object.definition.description['en'] = <mdl_quiz.name> related to <mdl_quiz_attempts> found by <mdl_logstore_standard_log.objectid>
  - object.definition.type = http://adlnet.gov/expapi/activities/assessment
  - result.score.raw = <mdl_grade_grades.rawgrade>
  - result.score.min = <mdl_grade_grades.rawgrademin>
  - result.score.max = <mdl_grade_grades.rawgrademax>
  - result.success = <mdl_grade_grades.rawgrade> >= <mdl_grade_items.gradepass>
  - result.completion = <mdl_quiz_attempts.state> === 'finished'
  - result.duration = <mdl_quiz_attempts.timefinish> - <mdl_quiz_attempts.timestart> (Converted to ISO 8601 duration format)

* \mod_quiz\event\report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/quiz/report.php?id=<mdl_logstore_standard_log.contextinstanceid>&mode=overview
  - object.definition.name['en'] = quiz_report_viewed
  - object.definition.description['en'] = quiz_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/assessment

* \mod_quiz\event\edit_page_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/quiz/edit.php?cmid=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = edit_page_viewed
  - object.definition.description['en'] = edit_page_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/assessment

* \mod_book\event\chapter_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/book/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = chapter_viewed
  - object.definition.description['en'] = chapter_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/book

* \booktool_print\event\chapter_printed
  - verb.id = urn:x-moodle-event-action:printed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/book/tool/print/index.php?id=<mdl_logstore_standard_log.contextinstanceid>&chapterid<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = chapter_printed
  - object.definition.description['en'] = chapter_printed
  - object.definition.type = http://adlnet.gov/expapi/activities/book

* \booktool_print\event\book_printed
  - verb.id = urn:x-moodle-event-action:printed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/book/tool/print/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = book_printed
  - object.definition.description['en'] = book_printed
  - object.definition.type = http://adlnet.gov/expapi/activities/book

* \mod_workshop\event\submission_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/workshop/submission.php?cmid=<mdl_logstore_standard_log.contextinstanceid>&id=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = submission_viewed
  - object.definition.description['en'] = submission_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/workshop

* \mod_workshop\event\submission_created
  - verb.id = urn:x-moodle-event-action:created
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/workshop/submission.php?cmid=<mdl_logstore_standard_log.contextinstanceid>&id=&edit=on
  - object.definition.name['en'] = submission_created
  - object.definition.description['en'] = submission_created
  - object.definition.type = http://adlnet.gov/expapi/activities/workshop

* \mod_workshop\event\submission_updated
  - verb.id = urn:x-moodle-event-action:updated
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/workshop/submission.php?cmid=<mdl_logstore_standard_log.contextinstanceid>&id=&edit=on
  - object.definition.name['en'] = submission_updated
  - object.definition.description['en'] = submission_updated
  - object.definition.type = http://adlnet.gov/expapi/activities/workshop

* \mod_workshop\event\phase_switched
  - verb.id = urn:x-moodle-event-action:switched
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/workshop/switchphase.php?cmid=<mdl_logstore_standard_log.contextinstanceid>&phase=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = phase_switched
  - object.definition.description['en'] = phase_switched
  - object.definition.type = http://adlnet.gov/expapi/activities/workshop

* \mod_workshop\event\assessable_uploaded
  - verb.id = urn:x-moodle-event-action:uploaded
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/workshop/submission.php?cmid=<mdl_logstore_standard_log.contextinstanceid>&id=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = workshop_assessable_uploaded
  - object.definition.description['en'] = workshop_assessable_uploaded
  - object.definition.type = http://adlnet.gov/expapi/activities/workshop

* \mod_workshop\event\submission_assessed
  - verb.id = urn:x-moodle-event-action:assessed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/workshop/assessment.php?asid=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = submission_assessed
  - object.definition.description['en'] = submission_assessed
  - object.definition.type = http://adlnet.gov/expapi/activities/workshop

* \mod_forum\event\subscription_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/forum/subscribers.php?id=<mdl_logstore_standard_log.objectid>&edit=on
  - object.definition.name['en'] = subscription_deleted
  - object.definition.description['en'] = subscription_deleted
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

* \mod_forum\event\subscription_created
  - verb.id = urn:x-moodle-event-action:created
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/forum/subscribers.php?id=<mdl_logstore_standard_log.objectid>&edit=on
  - object.definition.name['en'] = subscription_created
  - object.definition.description['en'] = subscription_created
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

* \mod_forum\event\assessable_uploaded
  - verb.id = urn:x-moodle-event-action:uploaded
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/forum/post.php?forum=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = forum_assessable_uploaded
  - object.definition.description['en'] = forum_assessable_uploaded
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

* \mod_forum\event\discussion_created
  - verb.id = urn:x-moodle-event-action:created
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/forum/post.php?forum=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = discussion_created
  - object.definition.description['en'] = discussion_created
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

*  \mod_forum\event\discussion_subscription_created
  - verb.id = urn:x-moodle-event-action:created
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/forum/post.php?forum=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = discussion_subscription_created
  - object.definition.description['en'] = discussion_subscription_created
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

* \mod_forum\event\subscribers_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/forum/subscribers.php?id=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = subscribers_viewed
  - object.definition.description['en'] = subscribers_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

* \mod_forum\event\discussion_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/forum/discuss.php?d=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = discussion_viewed
  - object.definition.description['en'] = discussion_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

* \mod_forum\event\post_updated
  - verb.id = urn:x-moodle-event-action:updated
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/forum/post.php?edit=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = post_updated
  - object.definition.description['en'] = post_updated
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

* \mod_forum\event\post_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/forum/post.php?delete=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = post_deleted
  - object.definition.description['en'] = post_deleted
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

* \mod_forum\event\discussion_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id =  <Moodle_URL>/mod/forum/post.php?delete=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = discussion_deleted
  - object.definition.description['en'] = discussion_deleted
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

* \mod_forum\event\course_searched
  - verb.id = urn:x-moodle-event-action:searched
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/forum/search.php?id=<mdl_logstore_standard_log.objectid>&search=ds
  - object.definition.name['en'] = course_searched
  - object.definition.description['en'] = course_searched
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

* \mod_forum\event\post_created
  - verb.id = urn:x-moodle-event-action:created
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/forum/post.php?reply=<mdl_logstore_standard_log.objectid>#mformforum
  - object.definition.name['en'] = post_created
  - object.definition.description['en'] = post_created
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

* \mod_forum\event\discussion_subscription_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/forum/view.php?f=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = discussion_subscription_deleted
  - object.definition.description['en'] = discussion_subscription_deleted
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

* \mod_assign\event\all_submissions_downloaded
  - verb.id = urn:x-moodle-event-action:downloaded
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=grading
  - object.definition.name['en'] = all_submissions_downloaded
  - object.definition.description['en'] = all_submissions_downloaded
  - object.definition.type = http://adlnet.gov/expapi/activities/assign

* \mod_assign\event\assessable_submitted
  - verb.id = urn:x-moodle-event-action:submitted
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=editsubmission
  - object.definition.name['en'] = assign_assessable_submitted
  - object.definition.description['en'] = assign_assessable_submitted
  - object.definition.type = http://adlnet.gov/expapi/activities/assign

* \mod_assign\event\grading_table_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=grading
  - object.definition.name['en'] = grading_table_viewed
  - object.definition.description['en'] = grading_table_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/assign

* \mod_assign\event\submission_status_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = assign_submission_status_viewed
  - object.definition.description['en'] = assign_submission_status_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/assign

* \mod_assign\event\grading_form_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&rownum=0&action=grader&userid=<mdl_logstore_standard_log.userid>
  - object.definition.name['en'] = grading_form_viewed
  - object.definition.description['en'] = grading_form_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/assign

* \mod_assign\event\submission_graded
  - verb.id = urn:x-moodle-event-action:graded
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&rownum=0&action=grader&userid=<mdl_logstore_standard_log.userid>
  - object.definition.name['en'] = assign_submission_graded
  - object.definition.description['en'] = assign_submission_graded
  - object.definition.type = http://adlnet.gov/expapi/activities/assign

* \mod_assign\event\submission_locked
  - verb.id = urn:x-moodle-event-action:locked
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=grading
  - object.definition.name['en'] = submission_locked
  - object.definition.description['en'] = submission_locked
  - object.definition.type = http://adlnet.gov/expapi/activities/assign

* \mod_assign\event\extension_granted
  - verb.id = urn:x-moodle-event-action:granted
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=grading
  - object.definition.name['en'] = extension_granted
  - object.definition.description['en'] = extension_granted
  - object.definition.type = http://adlnet.gov/expapi/activities/assign

* \mod_assign\event\submission_form_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=editsubmission
  - object.definition.name['en'] = assign_submission_form_viewed
  - object.definition.description['en'] = assign_submission_form_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/assign

* \core\event\user_graded
  - verb.id = urn:x-moodle-event-action:graded
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/grade/edit/tree/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = <mdl_grade_items.itemname> related to <mdl_grade_grades> found by <mdl_logstore_standard_log.objectid>
  - object.definition.description['en'] = <mdl_grade_items.itemname> related to <mdl_grade_grades> found by <mdl_logstore_standard_log.objectid>
  - object.definition.type = http://adlnet.gov/expapi/activities/grade
  - result.score.raw = <mdl_grade_grades.rawgrade>
  - result.score.min = <mdl_grade_grades.rawgrademin>
  - result.score.max = <mdl_grade_grades.rawgrademax>
  - result.success = <mdl_grade_grades.rawgrade> >= <mdl_grade_items.gradepass>

* \assignsubmission_comments\event\comment_created
  - verb.id = urn:x-moodle-event-action:created
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = comment_created
  - object.definition.description['en'] = comment_created
  - object.definition.type = http://adlnet.gov/expapi/activities/assign

* \assignsubmission_comments\event\comment_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = comment_deleted
  - object.definition.description['en'] = comment_deleted
  - object.definition.type = http://adlnet.gov/expapi/activities/assign

* \gradereport_grader\event\grade_report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/grade/report/grader/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = grader_grade_report_viewed
  - object.definition.description['en'] = grader_grade_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/grade

* \gradereport_history\event\grade_report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/grade/report/history/index.php
  - object.definition.name['en'] = history_grade_report_viewed
  - object.definition.description['en'] = history_grade_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/grade

* \gradereport_outcomes\event\grade_report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/grade/report/outcomes/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = outcome_grade_report_viewed
  - object.definition.description['en'] = outcome_grade_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/grade

* \gradereport_overview\event\grade_report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/grade/report/overview/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = overview_grade_report_viewed
  - object.definition.description['en'] = overview_grade_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/grade

* \gradereport_singleview\event\grade_report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/grade/report/singleview/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = singleview_grade_report_viewed
  - object.definition.description['en'] = singleview_grade_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/grade

* \gradereport_user\event\grade_report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/grade/report/user/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = user_grade_report_viewed
  - object.definition.description['en'] = user_grade_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/grade

* \report_log\event\report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/report/log/index.php?id=0
  - object.definition.name['en'] = log_report_viewed
  - object.definition.description['en'] = log_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/report

* \report_outline\event\report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/report/outline/user.php?course=<mdl_logstore_standard_log.courseid>&id=<mdl_logstore_standard_log.userid>&mode=outline
  - object.definition.name['en'] = outline_report_viewed
  - object.definition.description['en'] = outline_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/report

* \report_loglive\event\report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/report/loglive/index.php
  - object.definition.name['en'] = loglive_report_viewed
  - object.definition.description['en'] = loglive_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/report

* \core\event\user_list_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/user/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = user_list_viewed
  - object.definition.description['en'] = user_list_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/participants

* \mod_scorm\event\course_module_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/scorm/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = <mdl_scorm.name> found by <mdl_logstore_standard_log.objectid>
  - object.definition.description['en'] = <mdl_scorm.name> found by <mdl_logstore_standard_log.objectid>
  - object.definition.type = http://id.tincanapi.com/activitytype/legacy-learning-standard

* \mod_scorm\event\report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/scorm/report.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = <mdl_scorm.name> found by <mdl_logstore_standard_log.other['scormid']>
  - object.definition.description['en'] = <mdl_scorm.name> found by <mdl_logstore_standard_log.other['scormid']>
  - object.definition.type = http://id.tincanapi.com/activitytype/legacy-learning-standard

* \mod_scorm\event\sco_launched
  - verb.id = urn:x-moodle-event-action:launched
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <mdl_logstore_standard_log.other['loadedcontent']>
  - object.definition.name['en'] = <mdl_scorm_scoes.launch> found by <mdl_logstore_standard_log.objectid>
  - object.definition.description['en'] = <mdl_scorm_scoes.title> found by <mdl_logstore_standard_log.objectid>
  - object.definition.type = http://id.tincanapi.com/activitytype/legacy-learning-standard

* \mod_scorm\event\status_submitted
  - verb.id = urn:x-moodle-event-action:<mdl_logstore_standard_log.other['cmivalue']> ( `cmi.core.lesson_status` )
  - verb.display['en'] = <mdl_logstore_standard_log.other['cmivalue']> ( `cmi.core.lesson_status` )
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/scorm/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = <mdl_scorm.name> found by <mdl_logstore_standard_log.objectid>
  - object.definition.description['en'] = <mdl_scorm.name> found by <mdl_logstore_standard_log.objectid>
  - object.definition.type = http://id.tincanapi.com/activitytype/legacy-learning-standard

* \mod_scorm\event\scoreraw_submitted
  - verb.id = urn:x-moodle-event-action:submitted
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/scorm/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = <mdl_scorm.name> found by <mdl_logstore_standard_log.objectid>
  - object.definition.description['en'] = <mdl_scorm.name> found by <mdl_logstore_standard_log.objectid>
  - object.definition.type = http://id.tincanapi.com/activitytype/legacy-learning-standard
  - result.score.raw = <mdl_logstore_standard_log.other['cmivalue']> ( `cmi.core.score.raw` )

* \report_outline\event\activity_report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/report/outline/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = outline_activity_report_viewed
  - object.definition.description['en'] = outline_activity_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/report

* \report_log\event\user_report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/report/log/user.php?id=<mdl_logstore_standard_log.contextinstanceid>&course=<mdl_logstore_standard_log.courseid>
  - object.definition.name['en'] = log_user_report_viewed
  - object.definition.description['en'] = log_user_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/report

* \report_participation\event\report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/report/participation/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = participation_report_viewed
  - object.definition.description['en'] = participation_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/report

* \mod_workshop\event\assessment_evaluated
  - verb.id = urn:x-moodle-event-action:evaluated
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/workshop/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = workshop_assessment_evaluated
  - object.definition.description['en'] = workshop_assessment_evaluated
  - object.definition.type = http://adlnet.gov/expapi/activities/workshop

* \mod_workshop\event\assessment_reevaluated
  - verb.id = urn:x-moodle-event-action:reevaluated
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/workshop/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = workshop_assessment_reevaluated
  - object.definition.description['en'] = workshop_assessment_reevaluated
  - object.definition.type = http://adlnet.gov/expapi/activities/workshop

* \mod_workshop\event\submission_reassessed
  - verb.id = urn:x-moodle-event-action:reassessed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/workshop/assessment.php?asid=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = workshop_submission_reassessed
  - object.definition.description['en'] = workshop_submission_reassessed
  - object.definition.type = http://adlnet.gov/expapi/activities/workshop

* \core\event\user_updated
  - verb.id = urn:x-moodle-event-action:updated
  - object.id = <Moodle_URL>/user/editadvanced.php?id=<mdl_logstore_standard_log.contextinstanceid>&course=<mdl_logstore_standard_log.courseid>
  - object.definition.name['en'] = user_updated
  - object.definition.description['en'] = user_updated

* \core\event\user_loggedinas
  - verb.id = urn:x-moodle-event-action:loggedinas
  - object.id = <Moodle_URL>/user/profile.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = user_loggedinas
  - object.definition.description['en'] = user_loggedinas

* \core\event\user_enrolment_updated
  - verb.id = urn:x-moodle-event-action:updated
  - object.id = <Moodle_URL>/user/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = user_enrolment_updated
  - object.definition.description['en'] = user_enrolment_updated

* \core\event\user_enrolment_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - object.id = <Moodle_URL>/user/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = user_enrolment_deleted
  - object.definition.description['en'] = user_enrolment_deleted

* \core\event\user_enrolment_created
  - verb.id = urn:x-moodle-event-action:created
  - object.id = <Moodle_URL>/user/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = user_enrolment_created
  - object.definition.description['en'] = user_enrolment_created

* \core\event\user_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - object.id = <Moodle_URL>/admin/user.php
  - object.definition.name['en'] = user_deleted
  - object.definition.description['en'] = user_deleted

* \core\event\user_created
  - verb.id = urn:x-moodle-event-action:created
  - object.id = <Moodle_URL>/user/editadvanced.php?id=-1
  - object.definition.name['en'] = user_created
  - object.definition.description['en'] = user_created

* \core\event\dashboard_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = dashboard_viewed
  - object.definition.description['en'] = dashboard_viewed

* \core\event\course_updated
  - verb.id = urn:x-moodle-event-action:updated
  - object.id = <Moodle_URL>/course/edit.php?id=<mdl_logstore_standard_log.contextinstanceid>&returnto=catmanage
  - object.definition.name['en'] = course_updated
  - object.definition.description['en'] = course_updated

* \core\event\course_module_updated
  - verb.id = urn:x-moodle-event-action:updated
  - object.id =  <Moodle_URL>/course/modedit.php?update=<mdl_logstore_standard_log.contextinstanceid>&return=0&sr=0
  - object.definition.name['en'] = course_module_updated
  - object.definition.description['en'] = course_module_updated

* \core\event\course_module_created
  - verb.id = urn:x-moodle-event-action:created
  - object.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = course_module_created
  - object.definition.description['en'] = course_module_created


* \core\event\course_category_created
  - verb.id = urn:x-moodle-event-action:created
  - object.id = <Moodle_URL>/course/editcategory.php?parent=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = course_category_created
  - object.definition.description['en'] = course_category_created

* \core\event\cohort_updated
  - verb.id = urn:x-moodle-event-action:updated
  - object.id = <Moodle_URL>/cohort/index.php?&contextid=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = cohort_updated
  - object.definition.description['en'] = cohort_updated

* \core\event\cohort_member_removed
  - verb.id = urn:x-moodle-event-action:removed
  - object.id = <Moodle_URL>/cohort/assign.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = cohort_member_removed
  - object.definition.description['en'] = cohort_member_removed

* \core\event\cohort_member_added
  - verb.id = urn:x-moodle-event-action:added
  - object.id = <Moodle_URL>/cohort/assign.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = cohort_member_added
  - object.definition.description['en'] = cohort_member_added

* \core\event\cohort_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - object.id = <Moodle_URL>/cohort/index.php?contextid=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = cohort_deleted
  - object.definition.description['en'] = cohort_deleted

* \core\event\cohort_created
  - verb.id = urn:x-moodle-event-action:created
  - object.id = <Moodle_URL>/cohort/edit.php?contextid=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = cohort_created
  - object.definition.description['en'] = cohort_created

* \core\event\enrol_instance_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - object.id = <Moodle_URL>/course/management.php
  - object.definition.name['en'] = enrol_instance_deleted
  - object.definition.description['en'] = enrol_instance_deleted

* \core\event\role_assigned
  - verb.id = urn:x-moodle-event-action:assigned
  - object.id = <Moodle_URL>/admin/roles/assign.php?contextid=1
  - object.definition.name['en'] = role_assigned
  - object.definition.description['en'] = role_assigned

* \core\event\role_capabilities_updated
  - verb.id = urn:x-moodle-event-action:updated
  - object.id = <Moodle_URL>/admin/roles/assign.php?contextid=1
  - object.definition.name['en'] = role_capabilities_updated
  - object.definition.description['en'] = role_capabilities_updated

* \core\event\role_unassigned
  - verb.id = urn:x-moodle-event-action:unassigned
  - object.id = <Moodle_URL>/admin/roles/assign.php?contextid=1
  - object.definition.name['en'] = role_unassigned
  - object.definition.description['en'] = role_unassigned

* \tool_capability\event\report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - object.id = <Moodle_URL>/admin/tool/capability/index.php
  - object.definition.name['en'] = tool_capability_report_viewed
  - object.definition.description['en'] = tool_capability_report_viewed

* \core\event\course_content_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - object.id = <Moodle_URL>/course/delete.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = course_content_deleted
  - object.definition.description['en'] = course_content_deleted

* \core\event\course_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - object.id = <Moodle_URL>/cohort/edit.php?contextid=<mdl_logstore_standard_log.courseid>
  - object.definition.name['en'] = course_deleted
  - object.definition.description['en'] = course_deleted

* \core\event\course_module_completion_updated
  - verb.id = urn:x-moodle-event-action:updated
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=editsubmission
  - object.definition.name['en'] = course_module_completion_updated
  - object.definition.description['en'] = course_module_completion_updated

* \core\event\course_section_updated
  - verb.id = urn:x-moodle-event-action:updated
  - object.id = <Moodle_URL>/course/editsection.php?id=<mdl_logstore_standard_log.objectid>&sr
  - object.definition.name['en'] = course_section_updated
  - object.definition.description['en'] = course_section_updated

* \core\event\email_failed
  - verb.id = urn:x-moodle-event-action:failed
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=editsubmission
  - object.definition.name['en'] = email_failed
  - object.definition.description['en'] = email_failed

* \core\event\enrol_instance_created
  - verb.id = urn:x-moodle-event-action:created
  - object.id = <Moodle_URL>/course/edit.php?category=1&returnto=catmanage
  - object.definition.name['en'] = enrol_instance_created
  - object.definition.description['en'] = enrol_instance_created

* \core\event\message_sent
  - verb.id = urn:x-moodle-event-action:sent
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=editsubmission
  - object.definition.name['en'] = message_sent
  - object.definition.description['en'] = message_sent

* \core\event\calendar_event_created
  - verb.id = urn:x-moodle-event-action:created
  - object.id = <Moodle_URL>

* \core\event\calendar_event_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = calendar_event_deleted
  - object.definition.description['en'] = calendar_event_deleted

* \core\event\calendar_event_updated
  - verb.id = urn:x-moodle-event-action:updated
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = calendar_event_updated
  - object.definition.description['en'] = calendar_event_updated

* \assignsubmission_file\event\assessable_uploaded
  - verb.id = urn:x-moodle-event-action:uploaded
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=editsubmission
  - object.definition.name['en'] = assign_file_assessable_uploaded
  - object.definition.description['en'] = assign_file_assessable_uploaded
  - object.definition.type = http://adlnet.gov/expapi/activities/assignsubmission

* \assignsubmission_file\event\submission_created
  - verb.id = urn:x-moodle-event-action:created
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=editsubmission
  - object.definition.name['en'] = assignsubmission_file_submission_created
  - object.definition.description['en'] = assignsubmission_file_submission_created
  - object.definition.type = http://adlnet.gov/expapi/activities/assignsubmission

* \assignsubmission_file\event\submission_updated
  - verb.id = urn:x-moodle-event-action:updated
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=editsubmission
  - object.definition.name['en'] = assignsubmission_file_submission_updated
  - object.definition.description['en'] = assignsubmission_file_submission_updated
  - object.definition.type = http://adlnet.gov/expapi/activities/assignsubmission

* \assignsubmission_onlinetext\event\assessable_uploaded
  - verb.id = urn:x-moodle-event-action:uploaded
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=editsubmission
  - object.definition.name['en'] = onlinetext_assign_assessable_uploaded
  - object.definition.description['en'] = onlinetext_assign_assessable_uploaded
  - object.definition.type = http://adlnet.gov/expapi/activities/assignsubmission

* \assignsubmission_onlinetext\event\submission_created
  - verb.id = urn:x-moodle-event-action:created
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=editsubmission
  - object.definition.name['en'] = onlinetext_assign_submission_created
  - object.definition.description['en'] = onlinetext_assign_submission_created
  - object.definition.type = http://adlnet.gov/expapi/activities/assignsubmission

* \assignsubmission_onlinetext\event\submission_updated
  - verb.id = urn:x-moodle-event-action:updated
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&action=editsubmission
  - object.definition.name['en'] = onlinetext_assign_submission_updated
  - object.definition.description['en'] = onlinetext_assign_submission_updated
  - object.definition.type = http://adlnet.gov/expapi/activities/assignsubmission

* \core\event\course_user_report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/course/user.php?mode=grade&id=<mdl_logstore_standard_log.contextinstanceid>&user=<mdl_logstore_standard_log.userid>
  - object.definition.name['en'] = course_user_report_viewed
  - object.definition.description['en'] = course_user_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/report

* \core\event\course_restored
  - verb.id = urn:x-moodle-event-action:restored
  - object.id = <Moodle_URL>/backup/restorefile.php
  - object.definition.name['en'] = course_restored
  - object.definition.description['en'] = course_restored

* \core\event\group_created
  - verb.id = urn:x-moodle-event-action:created
  - object.id = <Moodle_URL>/group/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = group_created
  - object.definition.description['en'] = group_created

* \core\event\group_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - object.id = <Moodle_URL>/group/index.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = group_deleted
  - object.definition.description['en'] = group_deleted

* \core\event\group_member_added
  - verb.id = urn:x-moodle-event-action:added
  - object.id = <Moodle_URL>/group/members.php?group=<mdl_logstore_standard_log.objectid>
  - object.definition.name['en'] = group_member_added
  - object.definition.description['en'] = group_member_added

* \core\event\message_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - object.id = <Moodle_URL>/message/index.php?user=<mdl_logstore_standard_log.userid>&id=<mdl_logstore_standard_log.courseid>
  - object.definition.name['en'] = message_viewed
  - object.definition.description['en'] = message_viewed

* \tool_recyclebin\event\category_bin_item_created
  - verb.id = urn:x-moodle-event-action:created
  - object.id = <Moodle_URL>/course/management.php
  - object.definition.name['en'] = category_bin_item_created
  - object.definition.description['en'] = category_bin_item_created

* \core\event\course_category_updated
  - verb.id = urn:x-moodle-event-action:updated
  - object.id = <Moodle_URL>/course/editcategory.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = course_category_updated
  - object.definition.description['en'] = course_category_updated

* \mod_feedback\event\course_module_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/feedback/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = feedback_course_module_viewed
  - object.definition.description['en'] = feedback_course_module_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/module

* \mod_page\event\course_module_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/page/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] = page_course_module_viewed
  - object.definition.description['en'] = page_course_module_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/module

* \mod_url\event\course_module_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>/mod/url/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
  - object.definition.name['en'] =
  - object.definition.description['en'] =
  - object.definition.type = http://adlnet.gov/expapi/activities/module

* \mod_hsvideo\event\hsvideo_play_sent
  - verb.id = urn:x-moodle-event-action:played
  - object.objectType = Activity
  - object.id = <Moodle_URL>/mod/hsvideo/view.php?id=<mdl_logstore_standard_log.courseid>
  - object.definition.type = http://activitystreams/schema/1.0/video
  - object.definition.name['en'] = url_course_module_viewed
  - object.definition.description['en'] = url_course_module_viewed

* \mod_hsvideo\event\hsvideo_progress_end_sent
  - verb.id = urn:x-moodle-event-action:progress_bar_move_ended
  - object.objectType = Activity
  - object.id = <Moodle_URL>/mod/hsvideo/view.php?id=<mdl_logstore_standard_log.courseid>
  - object.definition.type = http://activitystreams/schema/1.0/video
  - object.definition.name['en'] = hsvideo_progress_end_sent
  - object.definition.description['en'] = hsvideo_progress_end_sent

* \mod_hsvideo\event\hsvideo_progress_start_sent
  - verb.id = urn:x-moodle-event-action:progress_bar_move_started
  - object.objectType = Activity
  - object.id = <Moodle_URL>/mod/hsvideo/view.php?id=<mdl_logstore_standard_log.courseid>
  - object.definition.type = http://activitystreams/schema/1.0/video
  - object.definition.name['en'] = hsvideo_progress_start_sent
  - object.definition.description['en'] = hsvideo_progress_start_sent

* \mod_hsvideo\event\hsvideo_replay_sent
  - verb.id = urn:x-moodle-event-action:replayed
  - object.objectType = Activity
  - object.id = <Moodle_URL>/mod/hsvideo/view.php?id=<mdl_logstore_standard_log.courseid>
  - object.definition.type = http://activitystreams/schema/1.0/video
  - object.definition.name['en'] = hsvideo_replay_sent
  - object.definition.description['en'] = hsvideo_replay_sent

* \mod_hsvideo\event\hsvideo_pause_sent
  - verb.id = urn:x-moodle-event-action:paused
  - object.objectType = Activity
  - object.id = <Moodle_URL>/mod/hsvideo/view.php?id=<mdl_logstore_standard_log.courseid>
  - object.definition.type = http://activitystreams/schema/1.0/video
  - object.definition.name['en'] = hsvideo_pause_sent
  - object.definition.description['en'] = hsvideo_pause_sent

* \mod_hsvideo\event\hsvideo_stop_sent
  - verb.id = urn:x-moodle-event-action:stopped
  - object.objectType = Activity
  - object.id = <Moodle_URL>/mod/hsvideo/view.php?id=<mdl_logstore_standard_log.courseid>
  - object.definition.type = http://activitystreams/schema/1.0/video
  - object.definition.name['en'] = hsvideo_stop_sent
  - object.definition.description['en'] = hsvideo_stop_sent

* \mod_hsvideo\event\hsvideo_view
  - verb.id = urn:x-moodle-event-action:viewed
  - object.objectType = Activity
  - object.id = <Moodle_URL>/mod/hsvideo/view.php?id=<mdl_logstore_standard_log.courseid>
  - object.definition.type = http://activitystreams/schema/1.0/video
  - object.definition.name['en'] = hsvideo_view
  - object.definition.description['en'] = hsvideo_view

* \mod_assign\event\batch_set_workflow_state_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - object.objectType = Activity
  - object.id = <Moodle_URL>
  - object.definition.type = http://adlnet.gov/expapi/activities/assign
  - object.definition.name['en'] = batch_set_workflow_state_viewed
  - object.definition.description['en'] = batch_set_workflow_state_viewed

* \mod_assign\event\course_module_instance_list_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - object.objectType = Activity
  - object.id = <Moodle_URL>
  - object.definition.type = http://adlnet.gov/expapi/activities/assign
  - object.definition.name['en'] = course_module_instance_list_viewed
  - object.definition.description['en'] = course_module_instance_list_viewed

* \mod_assign\event\feedback_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - object.objectType = Activity
  - object.id = <Moodle_URL>
  - object.definition.type = http://adlnet.gov/expapi/activities/assign
  - object.definition.name['en'] = feedback_viewed
  - object.definition.description['en'] = feedback_viewed

* \mod_assign\event\submission_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - object.objectType = Activity
  - object.id = <Moodle_URL>
  - object.definition.type = http://adlnet.gov/expapi/activities/assign
  - object.definition.name['en'] = assign_submission_viewed
  - object.definition.description['en'] = assign_submission_viewed

* \mod_assign\event\workflow_state_updated
  - verb.id = urn:x-moodle-event-action:updated
  - object.objectType = Activity
  - object.id = <Moodle_URL>
  - object.definition.type = http://adlnet.gov/expapi/activities/assign
  - object.definition.name['en'] = workflow_state_updated
  - object.definition.description['en'] = workflow_state_updated

* \report_stats\event\report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = report_stats_report_viewed
  - object.definition.description['en'] = report_stats_report_viewed

* \report_stats\event\user_report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = report_stats_user_report_viewed
  - object.definition.description['en'] = report_stats_user_report_viewed

* \tool_langimport\event\langpack_updated
  - verb.id = urn:x-moodle-event-action:updated
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = langpack_updated
  - object.definition.description['en'] = langpack_updated

* \tool_recyclebin\event\category_bin_item_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = category_bin_item_deleted
  - object.definition.description['en'] = category_bin_item_deleted

* \tool_recyclebin\event\course_bin_item_created
  - verb.id = urn:x-moodle-event-action:created
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = course_bin_item_created
  - object.definition.description['en'] = course_bin_item_created

* \tool_recyclebin\event\course_bin_item_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = course_bin_item_deleted
  - object.definition.description['en'] = course_bin_item_deleted

* \core\event\browser_agent_view
  - verb.id = urn:x-moodle-event-action:viewed
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = browser_agent_view
  - object.definition.description['en'] = browser_agent_view

* \core\event\course_module_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = course_module_deleted
  - object.definition.description['en'] = course_module_deleted

* \core\event\grade_deleted
  - verb.id = urn:x-moodle-event-action:deleted
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = grade_deleted
  - object.definition.description['en'] = grade_deleted
  - object.definition.type = http://adlnet.gov/expapi/activities/grade

* \mod_feedback\event\response_submitted
  - verb.id = urn:x-moodle-event-action:submitted
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = response_submitted
  - object.definition.description['en'] = response_submitted
  - object.definition.type = http://adlnet.gov/expapi/activities/feedback

* \mod_forum\event\user_report_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = forum_user_report_viewed
  - object.definition.description['en'] = forum_user_report_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

* \mod_quiz\event\attempt_abandoned
  - verb.id = urn:x-moodle-event-action:abandoned
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = attempt_abandoned
  - object.definition.description['en'] = attempt_abandoned
  - object.definition.type = http://adlnet.gov/expapi/activities/assessment

* \mod_forum\event\course_module_instance_list_viewed
  - verb.id = urn:x-moodle-event-action:viewed
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
  - object.id = <Moodle_URL>
  - object.definition.name['en'] = course_module_list_viewed
  - object.definition.description['en'] = course_module_list_viewed
  - object.definition.type = http://adlnet.gov/expapi/activities/forum

## scorm_scoes_track
### Common properties
If not specified, the following properties will be applied.

* actor.objectType = Agent
* actor.name = <mdl_user.username> (Converted to SHA256 hash)
* actor.account.name = <mdl_scorm_scoes_track.userid>
* actor.account.homePage = <Moodle_URL>
* context.contextActivities.category
  - category.objectType = Activity
  - category.id =  http://moodle.org
  - category.definition.type = http://id.tincanapi.com/activitytype/source
  - category.definition.name['en'] = Moodle
  - category.definition.description['en'] = Moodle is a open source learning platform designed to provide educators, administrators and learners with a single robust, secure and integrated system to create personalized learning environments.
* context.platform = Moodle
* context.language = en
* timestamp = <mdl_scorm_scoes_track.timemodified> (Converted)

### Element-based properties(<mdl_scorm_scoes_track.element>)

* cmi.core.total_time
  - verb.id = urn:x-moodle-event-action:attended
  - verb.display['en'] = attended
  - context.contextActivities.grouping
    - grouping.objectType = Activity
    - grouping.id = <Moodle_URL>/course/view.php?id=<mdl_scorm.course>
    - grouping.definition.type = <Moodle_URL>/activitytype/course
    - grouping.definition.name['en'] = <mdl_course.fullname> found by <mdl_scorm.course>
  - object.id = <mdl_logstore_standard_log.other['loadedcontent']> of latest `\mod_scorm\event\sco_launched` event
  - object.definition.name['en'] = <mdl_scorm_scoes.launch> found by <mdl_scorm_scoes_track.scoid>
  - object.definition.description['en'] = <mdl_scorm_scoes.title> found by <mdl_scorm_scoes_track.scoid>
  - object.definition.type = http://id.tincanapi.com/activitytype/legacy-learning-standard
  - result.duration = <mdl_scorm_scoes_track.value> (Converted to ISO 8601 duration format)
