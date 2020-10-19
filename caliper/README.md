# Learning Analysis for Moodle
## caliper statement generator
### Statement definitions
#### common defenitions
- agent.id = <MOODLE_URL>/user/<mdl_logstore_standard_log.userid>
- agent.name = <mdl_user.username>
- agent.description = <mdl_user.description>
- eventTime = <mdl_logstore_standard_log.timecreated>(Converted)
- edApp.id = <MOODLE_URL>
- edApp.type = SoftwareApplication

#### Definitions according to <mdl_logstore_standard_log.eventname>
- \core\event\dashboard_viewed
    - type = NavigationEvent
    - action = Viewed
    - object = edApp

- \core\event\course_viewed
    - type = NavigationEvent
    - action = Viewed
    - object.id = <MOODLE_URL>/course/<mdl_logstore_standard_log.objectid>
    - object.name = <mdl_course.fullname>

- \core\event\user_loggedin
    - type = SessionEvent
    - action = LoggedIn
    - object = edApp

- \core\event\user_loggedout
    - type = SessionEvent
    - action = LoggedIn
    - object = edApp

- \mdl_assign\event\assessable_submitted
    - type = AssignableEvent
    - action = Submitted
    - object.id = <MOODLE_URL>/mod/assign/<mdl_assign_submission.assignment>
    - object.name = <mdl_assign.name>
    - object.start = <mdl_assign.allowsubmissionsfromdate>
    - object.due = <mdl_assign.duedate>
    - generated.id = object.id/attempt/<mdl_assign_submission.attemptnumber>
    - generated.count = <mdl_assign_submission.attemptnumber>
    - generated.assignee.id = <MOODLE_URL>/user/<mdl_assign_submission.userid>
    - generated.assignee.name = <mdl_user.username>
    - generated.assignee.description = <mdl_user.description>

- \mdl_assign\event\submission_graded
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/user/<mdl_logstore_standard_log.userid>/attempt/<mdl_assign_grade.attemptnumber>
    - object.name = <mdl_assign.intro>
    - object.attempt = <mdl_assign_grade.attemptnumber>
    - object.start = <mdl_assign.allowsubmissionsfromdate>
    - object.due = <mdl_assign.duedate>
    - object.assignee.id = <mdl_assign_grade.userid>
    - object.assignee.name = <mdl_user.username>
    - object.assignee.description = <mdl_user.description>
    - generated.id = object.id/result
    - generated.max_score = <mdl_assign.grade>
    - generated.score = <mdl_assign_graded.grade>
    - generated.comment = <mdl_assignfeedback_comment.commenttext>

- \mdl_assign\event\submission_graded
    - type = GradedEvent
    - action = Graded
    - object.id = <MOODLE_URL>/mod/assign/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>


- \mdl_book\event\course_module_viewed
    - type = navigationevent
    - action = navigatedto
    - object.id = <moodle_url>/mod/book/<mdl_logstore_standard_log.objectid>
    - object.name = <moodle_url>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = eventtype::<module_type>

- \mdl_chat\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/chat/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_choice\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/choice/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_data\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/data/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_facetoface\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/facetoface/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_feedback\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/feedback/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_folder\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/folder/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_forum\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/forum/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_forum\event\subscription_created
    - type = ForumEvent
    - action = Subscribed
    - object.id = <MOODLE_URL>/mod/forum/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_forum\event\subscription_deleted
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/forum/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_forum\event\discuttion_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/forum/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_glossary\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/glossary/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_imscp\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/imscp/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_lesson\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/lesson/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_lti\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/lti/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_page\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/page/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_quiz\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/quiz/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_quiz\event\attempt_started
    - type = AssessmentEvent
    - action = Started
    - object.id = <MOODLE_URL>/mod/quiz/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>
    - generated.id = <MOODLE_URL>/mod/attempt/<mdl_quiz_attempts.attempt>

- \mdl_quiz\event\attempt_submitted
    - type = AssessmentEvent
    - action = Submitted
    - object.id = <MOODLE_URL>/mod/quiz/<mdl_logstore_standard_log.objectid>

- \mdl_resource\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/resource/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_scorm\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/scorm/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_survey\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/survey/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_url\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/url/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_wiki\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/wiki/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

- \mdl_workshop\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/workshop/<mdl_logstore_standard_log.objectid>
    - object.name = <MOODLE_URL>/<mdl_logstore_standard_log.objecttable.name>
    - object.type = EventType::<module_type>

