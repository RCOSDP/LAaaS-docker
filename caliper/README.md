# Learning Analysis for Moodle
## Caliper statement definitions
### logstore_standard_log
#### Common definitions
- agent.id = <MOODLE_URL>/user/profile.php?id=<mdl_logstore_standard_log.userid>
- agent.name = <mdl_user.username> (Converted to SHA256 hash)
- agent.description = <mdl_user.description>
- agent.type = Person
- eventTime = <mdl_logstore_standard_log.timecreated>(Converted)
- edApp.id = <MOODLE_URL>
- edApp.type = SoftwareApplication
- edApp.name = moodle

#### Definitions according to <mdl_logstore_standard_log.eventname>
- \core\event\dashboard_viewed
    - type = ViewEvent
    - action = Viewed
    - object.id = <MOODLE_URL>/user/profile.php?id=<mdl_logstore_standard_log.userid>
    - object.type = WebPage

- \core\event\course_viewed
    - type = ViewEvent
    - action = Viewed
    - object.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.type = WebPage

- \core\event\user_loggedin
    - type = SessionEvent
    - action = LoggedIn
    - object.id = <MOODLE_URL>
    - object.type = SoftwareApplication

- \core\event\user_loggedout
    - type = SessionEvent
    - action = LoggedOut
    - object.id = <MOODLE_URL>
    - object.type = SoftwareApplication

- \mod_assign\event\assessable_submitted
    - type = AssignableEvent
    - action = Submitted
    - object.id = <MOODLE_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.type = AssignableDigitalResource
    - object.name = <mdl_assign.name> related to <mdl_assign_submission> found by <mdl_logstore_standard_log.objectid>
    - object.description = <mdl_assign.intro>
    - object.maxAttempts = <mdl_assign.maxattempts>
    - object.maxScore = <mdl_assign.grade>
    - object.dateToStartOn = <mdl_assign.allowsubmissionsfromdate>
    - object.dateToSubmit = <mdl_assign.duedate>
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>

- \mod_assign\event\submission_graded
    - type = GradeEvent
    - action = Graded
    - object.id = <MOODLE_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&rownum=0&action=grader&userid=<mdl_logstore_standard_log.userid>
    - object.type = Attempt
    - object.count = <mdl_assign_grade.attemptnumber> found by <mdl_logstore_standard_log.objectid>
    - object.assignable.id = <MOODLE_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.assignable.type = AssignableDigitalResource
    - generated.id = <MOODLE_URL>/mod/assign/view.php?id=<mdl_logstore_standard_log.contextinstanceid>&rownum=0&action=grader&userid=<mdl_logstore_standard_log.userid>#result
    - generated.type = Score
    - generated.scoreGiven = <mdl_assign_grade.grade>
    - generated.comment = <mdl_assignfeedback_comment.commenttext> found by <mdl_assign_grade.assignment> and <mdl_assign_grade.grade>
    - generated.scoredBy.id = <MOODLE_URL>/user/profile.php?id=<mdl_user.id> found by <mdl_assign_grade.grader>
    - generated.scoredBy.type = Person
    - generated.scoredBy.name = <mdl_user.username>
    - generated.scoredBy.description = <mdl_user.description>

- \mod_book\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/book/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_chat\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/chat/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_choice\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/choice/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_data\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/data/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_feedback\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/feedback/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_folder\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/folder/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_forum\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/forum/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_forum\event\subscription_created
    - type = ForumEvent
    - action = Subscribed
    - object.id = <MOODLE_URL>/mod/forum/subscribers.php?id=<mdl_logstore_standard_log.other['forumid']>&edit=on
    - object.name = <mdl_forum.name> found by <mdl_logstore_standard_log.other['forumid']>
    - object.type = Forum
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>

- \mod_forum\event\subscription_deleted
    - type = ForumEvent
    - action = Unsubscribed
    - object.id = <MOODLE_URL>/mod/forum/subscribers.php?id=<mdl_logstore_standard_log.other['forumid']>&edit=on
    - object.name = <mdl_forum.name> found by <mdl_logstore_standard_log.other['forumid']>
    - object.type = Forum
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>

- \mod_forum\event\discussion_viewed
    - type = ViewEvent
    - action = Viewed
    - object.id = <MOODLE_URL>/mod/forum/discuss.php?d=<mdl_logstore_standard_log.objectid>
    - object.name = <mdl_forum_discussions.name> found by <mdl_logstore_standard_log.objectid>
    - object.type = Thread
    - object.isPartOf.id = <MOODLE_URL>/mod/forum/view.php?f=<mdl_forum_discussions.forum>
    - object.isPartOf.name = <mdl_forum.name> found by <mdl_forum_discussions.forum>
    - object.isPartOf.type = Forum
    - object.isPartOf.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.isPartOf.type = CourseSection
    - object.isPartOf.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>

- \mod_glossary\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/glossary/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_imscp\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/imscp/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_lesson\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/lesson/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_lti\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/lti/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_page\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/page/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_quiz\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/quiz/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_quiz\event\attempt_started
    - type = AssessmentEvent
    - action = Started
    - object.id = <MOODLE_URL>/mod/quiz/attempt.php?attempt=<mdl_logstore_standard_log.objectid>&cmid=<mdl_logstore_standard_log.contextinstanceid>
    - object.type = Assessment
    - object.name = <mdl_quiz.name> related to <mdl_quiz_attempts> found by <mdl_logstore_standard_log.objectid>
    - object.maxScore = <mdl_quiz.grade>
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - generated.id = <MOODLE_URL>/mod/quiz/attempt.php?attempt=<mdl_logstore_standard_log.objectid>&cmid=<mdl_logstore_standard_log.contextinstanceid>#result
    - generated.type = Attempt
    - generated.count = <mdl_quiz_attempts.attempt> found by <mdl_logstore_standard_log.objectid>

- \mod_quiz\event\attempt_submitted
    - type = AssessmentEvent
    - action = Submitted
    - object.id = <MOODLE_URL>/mod/quiz/attempt.php?attempt=<mdl_logstore_standard_log.objectid>&cmid=<mdl_logstore_standard_log.contextinstanceid>
    - object.type = Assessment
    - object.name = <mdl_quiz.name> related to <mdl_quiz_attempts> found by <mdl_logstore_standard_log.objectid>
    - object.maxScore = <mdl_quiz.grade>
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - generated.id = <MOODLE_URL>/mod/quiz/attempt.php?attempt=<mdl_logstore_standard_log.objectid>&cmid=<mdl_logstore_standard_log.contextinstanceid>#result
    - generated.type = Attempt
    - generated.count = <mdl_quiz_attempts.attempt>

- \mod_resource\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/resource/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_scorm\event\scoreraw_submitted
    - type = GradeEvent
    - action = Graded
    - object.id = <MOODLE_URL>/mod/scorm/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_scorm.name> found by <mdl_logstore_standard_log.objectid>
    - object.type = Attempt
    - generated.id = <MOODLE_URL>/mod/scorm/view.php?id=<mdl_logstore_standard_log.contextinstanceid>#result
    - generated.scoreGiven = <mdl_logstore_standard_log.other['cmivalue']>
    - generated.type = Score

- \mod_scorm\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/scorm/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_survey\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/survey/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_url\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/url/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_wiki\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/wiki/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

- \mod_workshop\event\course_module_viewed
    - type = NavigationEvent
    - action = NavigatedTo
    - object.id = <MOODLE_URL>/mod/workshop/view.php?id=<mdl_logstore_standard_log.contextinstanceid>
    - object.name = <mdl_logstore_standard_log.objecttable.name>
    - object.description = <mdl_logstore_standard_log.objecttable.intro>
    - object.type = DigitalResource
    - object.isPartOf.id = <MOODLE_URL>/course/view.php?id=<mdl_logstore_standard_log.courseid>
    - object.isPartOf.type = CourseSection
    - object.isPartOf.name = <mdl_course.fullname> found by <mdl_logstore_standard_log.courseid>
    - object.isPartOf.category = <mdl_course_categories.name> found by <mdl_course.category>

### scorm_scoes_track
#### Common definitions
- agent.id = <MOODLE_URL>/user/profile.php?id=<mdl_mdl_scorm_scoes_track.userid>
- agent.name = <mdl_user.username> (Converted to SHA256 hash)
- agent.description = <mdl_user.description>
- agent.type = Person
- eventTime = <mdl_scorm_scoes_track.timemodified>(Converted)
- edApp.id = <MOODLE_URL>
- edApp.type = SoftwareApplication
- edApp.name = moodle

#### Definitions according to <mdl_scorm_scoes_track.element>
- cmi.core.total_time
    - type = AssessmentEvent
    - action = Submitted
    - object.id = <mdl_logstore_standard_log.other['loadedcontent']> of latest \mod_scorm\event\sco_launched event
    - object.name = <mdl_scorm_scoes.launch> found by <mdl_scorm_scoes_track.scoid>
    - object.description = <mdl_scorm_scoes.title>
    - object.type = Assessment
    - generated.id = <mdl_logstore_standard_log.other['loadedcontent']>#result
    - generated.count = <mdl_scorm_scoes_track.attempt>
    - generated.duration = <mdl_scorm_scoes_track.value> (Converted to ISO 8601 duration format)
    - generated.type = Attempt
