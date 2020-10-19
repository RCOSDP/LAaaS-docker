'use strict';
const adl = require('adl-xapiwrapper');
const config = require('./config/app');
const db = require('./db-config');
const log4js = require('log4js');
const logger = log4js.getLogger();
const sleep = require('system-sleep');
const uuid = require('node-uuid');

const COURSE = db.import('./models/mdl_course');
const GRADE_ITEMS = db.import('./models/mdl_grade_items');
const GRADE_GRADES = db.import('./models/mdl_grade_grades');
const LOGSTORE_STANDARD_LOG = db.import('./models/mdl_logstore_standard_log');
const QUIZ = db.import('./models/mdl_quiz');
const QUIZ_ATTEMPTS = db.import('./models/mdl_quiz_attempts');
const USER = db.import('./models/mdl_user');
const XAPI_RECORDS_PROCESSED = db.import('./models/xapi_records_processed');

log4js.configure('config/log4js.json');
if (process.env.XAPI_GEN_LOG_LEVEL !== undefined) {
  logger.level = process.env.XAPI_GEN_LOG_LEVEL;
}

logger.info('Start xAPI statement generator.');

// defining xAPI variables
const courseViewed = [
  'course_viewed',
  '\\core\\event\\course_viewed',
  'コースが閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const userLoggedin = [
  'user_loggedin',
  '\\core\\event\\user_loggedin',
  'ユーザがログインしました。',
  'urn:x-moodle-event-action:loggedin'
];
const userLoggedout = [
  'user_loggedout',
  '\\core\\event\\user_loggedout',
  'ユーザがログアウトしました。',
  'urn:x-moodle-event-action:loggedout'
];
const userLoginFailed = [
  'user_login_failed',
  '\\core\\event\\user_login_failed',
  'ユーザがログインに失敗しました。',
  'urn:x-moodle-event-action:failed'
];
const userPasswordUpdated = [
  'user_password_updated',
  '\\core\\event\\user_password_updated',
  'ユーザパスワードが更新されました。',
  'urn:x-moodle-event-action:updated'
];
const quizCourseModuleViewed = [
  'quiz_course_module_viewed',
  '\\mod_quiz\\event\\course_module_viewed',
  'コースモジュールが閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const forumCourseModuleViewed = [
  'forum_course_module_viewed',
  '\\mod_forum\\event\\course_module_viewed',
  'コースモジュールが閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const bookCourseModuleViewed = [
  'book_course_module_viewed',
  '\\mod_book\\event\\course_module_viewed',
  'コースモジュールが閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const resourceCourseModuleViewed = [
  'resource_course_module_viewed',
  '\\mod_resource\\event\\course_module_viewed',
  'コースモジュールが閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const scormCourseModuleViewed = [
  'scorm_course_module_viewed',
  '\\mod_scorm\\event\\course_module_viewed',
  'コースモジュールが閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const workshopCourseModuleViewed = [
  'workshop_course_module_viewed',
  '\\mod_workshop\\event\\course_module_viewed',
  'コースモジュールが閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const attemptViewed = [
  'attempt_viewed',
  '\\mod_quiz\\event\\attempt_viewed',
  '小テスト受験が閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const attemptSummaryViewed = [
  'attempt_summary_viewed',
  '\\mod_quiz\\event\\attempt_summary_viewed',
  '小テスト受験が閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const attemptReviewed = [
  'attempt_reviewed',
  '\\mod_quiz\\event\\attempt_reviewed',
  '小テスト受験が閲覧されました。',
  'urn:x-moodle-event-action:reviewed'
];
const attemptStarted = [
  'attempt_started',
  '\\mod_quiz\\event\\attempt_started',
  '小テスト受験が閲覧されました。',
  'urn:x-moodle-event-action:started'
];
const attemptSubmitted = [
  'attempt_submitted',
  '\\mod_quiz\\event\\attempt_submitted',
  '小テスト受験が送信されました。',
  'urn:x-moodle-event-action:submitted'
];
const attemptPreviewStarted = [
  'attempt_preview_started',
  '\\mod_quiz\\event\\attempt_preview_started',
  '小テスト受験プレビューが開始しました。',
  'urn:x-moodle-event-action:started'
];
const editPageViewed = [
  'edit_page_viewed',
  '\\mod_quiz\\event\\edit_page_viewed',
  '小テスト編集ページが閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const quizReportViewed = [
  'quiz_report_viewed',
  '\\mod_quiz\\event\\report_viewed',
  '小テストレポートが閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const userProfileViewed = [
  'user_profile_viewed',
  '\\core\\event\\user_profile_viewed',
  'ユーザープロフィールが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const chapterViewed = [
  'chapter_viewed',
  '\\mod_book\\event\\chapter_viewed',
  '章が閲覧されました',
  'urn:x-moodle-event-action:viewed'
];
const chapterPrinted = [
  'chapter_printed',
  '\\booktool_print\\event\\chapter_printed',
  'この章は印刷されています',
  'urn:x-moodle-event-action:printed'
];
const bookPrinted = [
  'book_printed',
  '\\booktool_print\\event\\book_printed',
  'この本は印刷されています',
  'urn:x-moodle-event-action:printed'
];
const submissionViewed = [
  'submission_viewed',
  '\\mod_workshop\\event\\submission_viewed',
  'ワークショップの提出を見た',
  'urn:x-moodle-event-action:viewed'
];
const submissionCreated = [
  'submission_created',
  '\\mod_workshop\\event\\submission_created',
  'ワークショップの提出が作成されました',
  'urn:x-moodle-event-action:created'
];
const submissionUpdated = [
  'submission_updated',
  '\\mod_workshop\\event\\submission_updated',
  'ワークショップの提出が更新されました',
  'urn:x-moodle-event-action:updated'
];
const phaseSwitched = [
  'phase_switched',
  '\\mod_workshop\\event\\phase_switched',
  'ワークショップ段階が切り替えられました',
  'urn:x-moodle-event-action:switched'
];
const workshopAssessableUploaded = [
  'workshop_assessable_uploaded',
  '\\mod_workshop\\event\\assessable_uploaded',
  'ワークショップアセスメントがアップロードされました',
  'urn:x-moodle-event-action:uploaded'
];
const submissionAssessed = [
  'submission_assessed',
  '\\mod_workshop\\event\\submission_assessed',
  'ワークショップの提出が評価されました',
  'urn:x-moodle-event-action:assessed'
];
const subscriptionDeleted = [
  'subscription_deleted',
  '\\mod_forum\\event\\subscription_deleted',
  'フォーラム登録が削除されました',
  'urn:x-moodle-event-action:deleted'
];
const subscriptionCreated = [
  'subscription_created',
  '\\mod_forum\\event\\subscription_created',
  'フォーラムサブスクリプションが作成されました',
  'urn:x-moodle-event-action:created'
];
const forumAssessableUploaded= [
  'forum_assessable_uploaded',
  '\\mod_forum\\event\\assessable_uploaded',
  'フォーラム評価ツールがアップロードされました',
  'urn:x-moodle-event-action:uploaded'
];
const discussionCreated= [
  'discussion_created',
  '\\mod_forum\\event\\discussion_created',
  'フォーラムディスカッションが作成されました',
  'urn:x-moodle-event-action:created'
];
const discussionSubscriptionCreated = [
  'discussion_subscription_created',
  '\\mod_forum\\event\\discussion_subscription_created',
  'フォーラムディスカッションサブスクリプションを作成しました',
  'urn:x-moodle-event-action:created'
];
const subscribersViewed = [
  'subscribers_viewed',
  '\\mod_forum\\event\\subscribers_viewed',
  'フォーラムの購読者が閲覧されました',
  'urn:x-moodle-event-action:viewed'
];
const discussionViewed = [
  'discussion_viewed',
  '\\mod_forum\\event\\discussion_viewed',
  'フォーラムディスカッションが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const postUpdated = [
  'post_updated',
  '\\mod_forum\\event\\post_updated',
  'フォーラム投稿が更新されました',
  'urn:x-moodle-event-action:updated'
];
const postDeleted = [
  'post_deleted',
  '\\mod_forum\\event\\post_deleted',
  'フォーラム投稿が削除されました',
  'urn:x-moodle-event-action:deleted'
];
const discussionDeleted = [
  'discussion_deleted',
  '\\mod_forum\\event\\discussion_deleted',
  'フォーラムディスカッションが削除されました',
  'urn:x-moodle-event-action:deleted'
];
const courseSearched = [
  'course_searched',
  '\\mod_forum\\event\\course_searched',
  'コースフォーラムが検索されました',
  'urn:x-moodle-event-action:searched'
];
const postCreated = [
  'post_created',
  '\\mod_forum\\event\\post_created',
  'フォーラム投稿が作成されました',
  'urn:x-moodle-event-action:created'
];
const discussionSubscriptionDeleted = [
  'discussion_subscription_deleted',
  '\\mod_forum\\event\\discussion_subscription_deleted',
  'ディスカッションサブスクリプションが削除',
  'urn:x-moodle-event-action:deleted'
];
const allSubmissionsDownloaded = [
  'all_submissions_downloaded',
  '\\mod_assign\\event\\all_submissions_downloaded',
  'すべての課題提出がダウンロードされる',
  'urn:x-moodle-event-action:downloaded'
];
const assignAssessableSubmitted = [
  'assign_assessable_submitted',
  '\\mod_assign\\event\\assessable_submitted',
  '割り当て査定が提出されました',
  'urn:x-moodle-event-action:submitted'
];
const gradingTableViewed = [
  'grading_table_viewed',
  '\\mod_assign\\event\\grading_table_viewed',
  'グレーディングテーブルを閲覧しました',
  'urn:x-moodle-event-action:viewed'
];
const assignSubmissionStatusViewed = [
  'assign_submission_status_viewed',
  '\\mod_assign\\event\\submission_status_viewed',
  '課題提出が閲覧されました',
  'urn:x-moodle-event-action:viewed'
];
const gradingFormViewed = [
  'grading_form_viewed',
  '\\mod_assign\\event\\grading_form_viewed',
  'グレーディングフォームが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const assignSubmissionGraded = [
  'assign_submission_graded',
  '\\mod_assign\\event\\submission_graded',
  '課題提出が採点された',
  'urn:x-moodle-event-action:graded'
];
const submissionLocked = [
  'submission_locked',
  '\\mod_assign\\event\\submission_locked',
  '割り当ての提出がロックされています',
  'urn:x-moodle-event-action:locked'
];
const extensionGranted = [
  'extension_granted',
  '\\mod_assign\\event\\extension_granted',
  '割り当て提出拡張が許可されました',
  'urn:x-moodle-event-action:granted'
];
const assignSubmissionFormViewed = [
  'assign_submission_form_viewed',
  '\\mod_assign\\event\\submission_form_viewed',
  '課題提出フォームが閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const userGraded = [
  'user_graded',
  '\\core\\event\\user_graded',
  'ユーザーは段階的に評価されています',
  'urn:x-moodle-event-action:graded'
];
const commentCreated = [
  'comment_created',
  '\\assignsubmission_comments\\event\\comment_created',
  '割り当て送信コミットが作成されました',
  'urn:x-moodle-event-action:created'
];
const commentDeleted = [
  'comment_deleted',
  '\\assignsubmission_comments\\event\\comment_deleted',
  '割り当て送信コミットが削除されました',
  'urn:x-moodle-event-action:deleted'
];
const graderGradeReportViewed = [
  'grader_grade_report_viewed',
  '\\gradereport_grader\\event\\grade_report_viewed',
  'グレード・グレード・レポートを閲覧しました',
  'urn:x-moodle-event-action:viewed'
];
const historyGradeReportViewed = [
  'history_grade_report_viewed',
  '\\gradereport_history\\event\\grade_report_viewed',
  '履歴書の報告が閲覧されました',
  'urn:x-moodle-event-action:viewed'
];
const outcomeGradeReportViewed = [
  'outcome_grade_report_viewed',
  '\\gradereport_outcomes\\event\\grade_report_viewed',
  '結果成績レポートが閲覧されました',
  'urn:x-moodle-event-action:viewed'
];
const overviewGradeReportViewed = [
  'overview_grade_report_viewed',
  '\\gradereport_overview\\event\\grade_report_viewed',
  '全体的な成績報告書が閲覧されました',
  'urn:x-moodle-event-action:viewed'
];
const singleviewGradeReportViewed = [
  'singleview_grade_report_viewed',
  '\\gradereport_singleview\\event\\grade_report_viewed',
  '1つのビューの等級レポートが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const userGradeReportViewed = [
  'user_grade_report_viewed',
  '\\gradereport_user\\event\\grade_report_viewed',
  'ユーザーグレードのレポートが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const logReportViewed = [
  'log_report_viewed',
  '\\report_log\\event\\report_viewed',
  'ログレポートが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const outlineReportViewed = [
  'outline_report_viewed',
  '\\report_outline\\event\\report_viewed',
  '概要レポートが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const logliveReportViewed = [
  'loglive_report_viewed',
  '\\report_loglive\\event\\report_viewed',
  'ログレポートが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const userListViewed = [
  'user_list_viewed',
  '\\core\\event\\user_list_viewed',
  'ユーザーリストが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const scormReportViewed = [
  'scorm_report_viewed',
  '\\mod_scorm\\event\\report_viewed',
  'scormレポートが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const scoLaunched = [
  'sco_launched',
  '\\mod_scorm\\event\\sco_launched',
  '嵐が始まった',
  'urn:x-moodle-event-action:launched'
];
const scormStatusSubmitted = [
  'scorm_status_submitted',
  '\\mod_scorm\\event\\status_submitted',
  'scormのステータスが送信されました',
  'urn:x-moodle-event-action:submitted'
];
const outlineActivityReportViewed = [
  'outline_activity_report_viewed',
  '\\report_outline\\event\\activity_report_viewed',
  'アウトラインアクティビティレポートが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const logUserReportViewed = [
  'log_user_report_viewed',
  '\\report_log\\event\\user_report_viewed',
  'ログユーザーレポートが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const participationReportViewed = [
  'participation_report_viewed',
  '\\report_participation\\event\\report_viewed',
  '参加報告を閲覧しました',
  'urn:x-moodle-event-action:viewed'
];
const workshopAssessmentEvaluated = [
  'workshop_assessment_evaluated',
  '\\mod_workshop\\event\\assessment_evaluated',
  'ワークショップアセスメントが評価されました',
  'urn:x-moodle-event-action:evaluated'
];
const workshopAssessmentReevaluated = [
  'workshop_assessment_reevaluated',
  '\\mod_workshop\\event\\assessment_reevaluated',
  'ワークショップ査定可能性が再評価された',
  'urn:x-moodle-event-action:reevaluated'
];
const workshopSubmissionReassessed = [
  'workshop_submission_reassessed',
  '\\mod_workshop\\event\\submission_reassessed',
  'ワークショップの提出が再評価された',
  'urn:x-moodle-event-action:reassessed'
];
const userUpdated = [
  'user_updated',
  '\\core\\event\\user_updated',
  'ユーザーが更新されました',
  'urn:x-moodle-event-action:updated'
];
const userLoggedinas = [
  'user_loggedinas',
  '\\core\\event\\user_loggedinas',
  'ユーザープロフィールが表示されました',
  'urn:x-moodle-event-action:loggedinas'
];
const userEnrolmentUpdated = [
  'user_enrolment_updated',
  '\\core\\event\\user_enrolment_updated',
  'ユーザー登録が更新されました',
  'urn:x-moodle-event-action:updated'
];
const userEnrolmentDeleted = [
  'user_enrolment_deleted',
  '\\core\\event\\user_enrolment_deleted',
  'ユーザー登録が削除されました',
  'urn:x-moodle-event-action:deleted'
];
const userEnrolmentCreated = [
  'user_enrolment_created',
  '\\core\\event\\user_enrolment_created',
  'ユーザー登録が作成されました',
  'urn:x-moodle-event-action:created'
];
const userDeleted = [
  'user_deleted',
  '\\core\\event\\user_deleted',
  'ユーザーが削除されました',
  'urn:x-moodle-event-action:deleted'
];
const userCreated = [
  'user_created',
  '\\core\\event\\user_created',
  'ユーザーが作成されました',
  'urn:x-moodle-event-action:created'
];
const dashboardViewed = [
  'dashboard_viewed',
  '\\core\\event\\dashboard_viewed',
  'ダッシュボードが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const courseUpdated = [
  'course_updated',
  '\\core\\event\\course_updated',
  'コースが更新されました',
  'urn:x-moodle-event-action:updated'
];
const courseModuleUpdated = [
  'course_module_updated',
  '\\core\\event\\course_module_updated',
  'コースモジュールが更新されました',
  'urn:x-moodle-event-action:updated'
];
const courseModuleCreated = [
  'course_module_created',
  '\\core\\event\\course_module_created',
  'コースモジュールが作成されました',
  'urn:x-moodle-event-action:created'
];
const courseCategoryCreated = [
  'course_category_created',
  '\\core\\event\\course_category_created',
  'コースカテゴリが作成されました',
  'urn:x-moodle-event-action:created'
];
const cohortUpdated = [
  'cohort_updated',
  '\\core\\event\\cohort_updated',
  'コホートが更新されました',
  'urn:x-moodle-event-action:updated'
];
const cohortMemberRemoved = [
  'cohort_member_removed',
  '\\core\\event\\cohort_member_removed',
  'コホート会員が削除されました',
  'urn:x-moodle-event-action:removed'
];
const cohortMemberAdded = [
  'cohort_member_added',
  '\\core\\event\\cohort_member_added',
  'コホート会員が追加されました',
  'urn:x-moodle-event-action:added'
];
const cohortDeleted = [
  'cohort_deleted',
  '\\core\\event\\cohort_deleted',
  'コホートが削除されました',
  'urn:x-moodle-event-action:deleted'
];
const cohortCreated = [
  'cohort_created',
  '\\core\\event\\cohort_created',
  'コホートが作成されました',
  'urn:x-moodle-event-action:created'
];
const calendarEventCreated = [
  'calendar_event_created',
  '\\core\\event\\calendar_event_created',
  'カレンダーイベントが作成されました',
  'urn:x-moodle-event-action:created'
];
const calendarEventDeleted = [
  'calendar_event_deleted',
  '\\core\\event\\calendar_event_deleted',
  'カレンダーイベントが削除されました',
  'urn:x-moodle-event-action:deleted'
];
const calendarEventUpdated = [
  'calendar_event_updated',
  '\\core\\event\\calendar_event_updated',
  'カレンダーイベントが更新されました',
  'urn:x-moodle-event-action:updated'
];
const enrolInstanceDeleted = [
  'enrol_instance_deleted',
  '\\core\\event\\enrol_instance_deleted',
  '登録インスタンスが削除されました',
  'urn:x-moodle-event-action:deleted'
];
const roleAssigned = [
  'role_assigned',
  '\\core\\event\\role_assigned',
  'ロールが割り当てられている',
  'urn:x-moodle-event-action:assigned'
];
const roleCapabilitiesUpdated = [
  'role_capabilities_updated',
  '\\core\\event\\role_capabilities_updated',
  'ロール機能が更新されました',
  'urn:x-moodle-event-action:updated'
];
const roleUnassigned = [
  'role_unassigned',
  '\\core\\event\\role_unassigned',
  '役割が割り当てられていません',
  'urn:x-moodle-event-action:unassigned'
];
const toolCapabilityReportViewed = [
  'tool_capability_report_viewed',
  '\\tool_capability\\event\\report_viewed',
  'ツール機能レポートが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const courseContentDeleted = [
  'course_content_deleted',
  '\\core\\event\\course_content_deleted',
  'コースコンテンツが削除されました',
  'urn:x-moodle-event-action:deleted'
];
const courseDeleted = [
  'course_deleted',
  '\\core\\event\\course_deleted',
  'コースが削除されました',
  'urn:x-moodle-event-action:deleted'
];
const courseModuleCompletionUpdated = [
  'course_module_completion_updated',
  '\\core\\event\\course_module_completion_updated',
  'コースモジュールの完了が更新されました',
  'urn:x-moodle-event-action:updated'
];
const courseSectionUpdated = [
  'course_section_updated',
  '\\core\\event\\course_section_updated',
  'コースのセクションが更新されました',
  'urn:x-moodle-event-action:updated'
];
const emailFailed = [
  'email_failed',
  '\\core\\event\\email_failed',
  'メールが失敗しました',
  'urn:x-moodle-event-action:failed'
];
const enrolInstanceCreated = [
  'enrol_instance_created',
  '\\core\\event\\enrol_instance_created',
  '登録インスタンスが作成されました',
  'urn:x-moodle-event-action:created'
];
const messageSent = [
  'message_sent',
  '\\core\\event\\message_sent',
  'メッセージが送信されました',
  'urn:x-moodle-event-action:sent'
];
const assignFileAssessableUploaded = [
  'assign_file_assessable_uploaded',
  '\\assignsubmission_file\\event\\assessable_uploaded',
  'アセスメント可能なファイルを割り当てる',
  'urn:x-moodle-event-action:uploaded'
];
const assignsubmissionFileSubmissionCreated = [
  'assignsubmission_file_submission_created',
  '\\assignsubmission_file\\event\\submission_created',
  '課題提出ファイル提出が作成されました',
  'urn:x-moodle-event-action:created'
];
const assignsubmissionFileSubmissionUpdated = [
  'assignsubmission_file_submission_updated',
  '\\assignsubmission_file\\event\\submission_updated',
  '課題提出ファイル提出の更新',
  'urn:x-moodle-event-action:updated'
];
const onlinetextAssignAssessableUploaded = [
  'onlinetext_assign_assessable_uploaded',
  '\\assignsubmission_onlinetext\\event\\assessable_uploaded',
  'オンラインテキスト割り当てアセスメント可能アップロードされた',
  'urn:x-moodle-event-action:uploaded'
];
const onlinetextAssignSubmissionCreated = [
  'onlinetext_assign_submission_created',
  '\\assignsubmission_onlinetext\\event\\submission_created',
  'オンラインテキスト割り当ての提出が作成されました',
  'urn:x-moodle-event-action:created'
];
const onlinetextAssignSubmissionUpdated = [
  'onlinetext_assign_submission_updated',
  '\\assignsubmission_onlinetext\\event\\submission_updated',
  'オンラインテキスト割り当ての提出が更新されました',
  'urn:x-moodle-event-action:updated'
];
const courseRestored = [
  'course_restored',
  '\\core\\event\\course_restored',
  'コースが復元されました',
  'urn:x-moodle-event-action:restored'
];
const courseUserReportViewed = [
  'course_user_report_viewed',
  '\\core\\event\\course_user_report_viewed',
  'コースユーザレポートを閲覧しました',
  'urn:x-moodle-event-action:viewed'
];
const groupCreated = [
  'group_created',
  '\\core\\event\\group_created',
  'グループが作成されました',
  'urn:x-moodle-event-action:created'
];
const groupDeleted = [
  'group_deleted',
  '\\core\\event\\group_deleted',
  'グループが削除されました',
  'urn:x-moodle-event-action:deleted'
];
const groupMemberAdded = [
  'group_member_added',
  '\\core\\event\\group_member_added',
  'グループメンバーが追加されました',
  'urn:x-moodle-event-action:added'
];
const messageViewed = [
  'message_viewed',
  '\\core\\event\\message_viewed',
  'メッセージが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const categoryBinItemCreated = [
  'category_bin_item_created',
  '\\tool_recyclebin\\event\\category_bin_item_created',
  'カテゴリビンアイテムが作成されました',
  'urn:x-moodle-event-action:created'
];
const courseCategoryUpdated = [
  'course_category_updated',
  '\\core\\event\\course_category_updated',
  'コースカテゴリが更新されました',
  'urn:x-moodle-event-action:updated'
];
const feedbackCourseModuleViewed = [
  'feedback_course_module_viewed',
  '\\mod_feedback\\event\\course_module_viewed',
  'コースモジュールが閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const pageCourseModuleViewed = [
  'page_course_module_viewed',
  '\\mod_page\\event\\course_module_viewed',
  'コースモジュールが閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const urlCourseModuleViewed = [
  'url_course_module_viewed',
  '\\mod_url\\event\\course_module_viewed',
  'コースモジュールが閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const hsvideoPlaySent = [
  'hsvideo_play_sent',
  '\\mod_hsvideo\\event\\hsvideo_play_sent',
  'ビデオが再生された',
  'urn:x-moodle-event-action:played'
];
const hsvideoProgressEndSent = [
  'hsvideo_progress_end_sent',
  '\\mod_hsvideo\\event\\hsvideo_progress_end_sent',
  '動画の進行終了',
  'urn:x-moodle-event-action:progress_bar_move_ended'
];
const hsvideoProgressStartSent = [
  'hsvideo_progress_start_sent',
  '\\mod_hsvideo\\event\\hsvideo_progress_start_sent',
  'ビデオの進行開始',
  'urn:x-moodle-event-action:progress_bar_move_started'
];
const hsvideoReplaySent = [
  'hsvideo_replay_sent',
  '\\mod_hsvideo\\event\\hsvideo_replay_sent',
  'ビデオが再生されました',
  'urn:x-moodle-event-action:replayed'
];
const hsvideoPauseSent = [
  'hsvideo_pause_sent',
  '\\mod_hsvideo\\event\\hsvideo_pause_sent',
  '動画が一時停止しました',
  'urn:x-moodle-event-action:paused'
];
const hsvideoStopSent = [
  'hsvideo_stop_sent',
  '\\mod_hsvideo\\event\\hsvideo_stop_sent',
  'ビデオストップ',
  'urn:x-moodle-event-action:stopped'
];
const hsvideoView = [
  'hsvideo_view',
  '\\mod_hsvideo\\event\\hsvideo_view',
  'hsvideo関連',
  'urn:x-moodle-event-action:viewed'
];
const batchSetWorkflowStateViewed = [
  'batch_set_workflow_state_viewed',
  '\\mod_assign\\event\\batch_set_workflow_state_viewed',
  'バッチセットのワークフロー状態が表示されました',
  'urn:x-moodle-event-action:viewed'
];
const courseModuleInstanceListViewed = [
  'course_module_instance_list_viewed',
  '\\mod_assign\\event\\course_module_instance_list_viewed',
  'コースモジュールのインスタンスリストが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const feedbackViewed = [
  'feedback_viewed',
  '\\mod_assign\\event\\feedback_viewed',
  'フィードバックが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const assignSubmissionViewed = [
  'assign_submission_viewed',
  '\\mod_assign\\event\\submission_viewed',
  '課題提出が閲覧されました',
  'urn:x-moodle-event-action:viewed'
];
const workflowStateUpdated = [
  'workflow_state_updated',
  '\\mod_assign\\event\\workflow_state_updated',
  'ワークフローの状態が更新されました',
  'urn:x-moodle-event-action:updated'
];
const reportStatsReportViewed = [
  'report_stats_report_viewed',
  '\\report_stats\\event\\report_viewed',
  'レポート統計ユーザーレポートを表示',
  'urn:x-moodle-event-action:viewed'
];
const reportStatsUserReportViewed = [
  'report_stats_user_report_viewed',
  '\\report_stats\\event\\user_report_viewed',
  'ビデオが再生されました',
  'urn:x-moodle-event-action:viewed'
];
const langpackUpdated = [
  'langpack_updated',
  '\\tool_langimport\\event\\langpack_updated',
  '言語パックが更新されました',
  'urn:x-moodle-event-action:updated'
];
const categoryBinItemDeleted = [
  'category_bin_item_deleted',
  '\\tool_recyclebin\\event\\category_bin_item_deleted',
  'カテゴリビン項目が削除されました',
  'urn:x-moodle-event-action:deleted'
];
const courseBinItemCreated = [
  'course_bin_item_created',
  '\\tool_recyclebin\\event\\course_bin_item_created',
  'カテゴリビンアイテムが作成されました',
  'urn:x-moodle-event-action:created'
];
const courseBinItemDeleted = [
  'course_bin_item_deleted',
  '\\tool_recyclebin\\event\\course_bin_item_deleted',
  'コースビン項目が削除されました',
  'urn:x-moodle-event-action:deleted'
];
const browserAgentView = [
  'browser_agent_view',
  '\\core\\event\\browser_agent_view',
  'ブラウザエージェントを表示',
  'urn:x-moodle-event-action:viewed'
];
const courseModuleDeleted = [
  'course_module_deleted',
  '\\core\\event\\course_module_deleted',
  'コースモジュールが削除されました',
  'urn:x-moodle-event-action:deleted'
];
const gradeDeleted = [
  'grade_deleted',
  '\\core\\event\\grade_deleted',
  'グレードが削除されました',
  'urn:x-moodle-event-action:deleted'
];
const responseSubmitted = [
  'response_submitted',
  '\\mod_feedback\\event\\response_submitted',
  '応答が提出',
  'urn:x-moodle-event-action:submitted'
];
const forumUserReportViewed = [
  'forum_user_report_viewed',
  '\\mod_forum\\event\\user_report_viewed',
  'フォーラムユーザーレポートを表示',
  'urn:x-moodle-event-action:viewed'
];
const attemptAbandoned = [
  'attempt_abandoned',
  '\\mod_quiz\\event\\attempt_abandoned',
  '放棄しようとする',
  'urn:x-moodle-event-action:abandoned'
];
const courseModuleListViewed = [
  'course_module_list_viewed',
  '\\mod_forum\\event\\course_module_instance_list_viewed',
  'フォーラムコースのインスタンスリストを表示',
  'urn:x-moodle-event-action:viewed'
];

/**
 * Converts UNIX timestamp to formatted datetime string.
 * @param {number} time - UNIX timestamp
 */
function timechange(time) {
  var d = new Date( time * 1000 );
  var year  = d.getFullYear();
  var m = d.getMonth() + 1;
  var month = ( m < 10 ) ? '0' + m : m ;
  var day  = ( d.getDate() < 10 ) ? '0' + d.getDate() : d.getDate();
  var hour = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
  var min  = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
  var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
  return year + '-' + month + '-' + day +
    'T' + hour + ':' + min + ':' + sec + '+09:00';
}

/**
 * Creates records used to identify processed standard logs in LMS database.
 * @param {Array.<number>} translatedLogIds - translated standard log ids
 * @param {Array.<number>} skippedLogIds - skipped standard log ids
 */
async function createProcessedRecords(translatedLogIds, skippedLogIds) {
    let processed = [];
    translatedLogIds.forEach(id => {
      processed.push({
        id: id,
        status: 0,
        send_date: db.fn('NOW') // eslint-disable-line camelcase
      });
    });
    skippedLogIds.forEach(id => {
      processed.push({
        id: id,
        status: 1,
        send_date: db.fn('NOW') // eslint-disable-line camelcase
      });
    });
    await XAPI_RECORDS_PROCESSED.bulkCreate(processed).catch(err => {
      throw new Error(
        'Failed to create processed records in LMS database' +
        `(${config.db.host}) - ${err}`
      );
    });
}

/**
 * Sends xAPI statements to LRS.
 * @param {xapi: Object} xapis - xAPI statements
 * @param {Object} lrs - LRS
 * @param {string} scope - scope name
 */
function sendStatements(xapis, lrs, scope) {
  logger.info(
    `[SCOPE:${scope}] Sending ${xapis.length} statements ` +
    `to ${config.LRS.url}...`
  );
  lrs.sendStatements(
    xapis,
    function(err, resp, bdy) { // eslint-disable-line no-unused-vars
    if (err) {
      throw new Error(
        `[SCOPE:${scope}] Failed to send statements` +
        `(HTTP status:${resp.statusCode}) - ${err}`
      );
    } else {
      logger.info(`[SCOPE:${scope}] ${xapis.length} statements added.`);
    }
  });
  sleep(3000);
}

/**
 * Route xAPI statements to LRSes.
 * @param {xapi: Object} xapis - xAPI statements
 * @param {number: string} usernames -
 *        usernames in user table(key:user.id, value:user.username)
 * @param {Object} lrs - default LRS client
 * @param {string: Object} scopedLrses -
 *        scoped LRS clients(key:ePPN scope, value:LRS client)
 * @param {boolean} isScoped - if LRSes are scoped
 */
function routeStatements(xapis, usernames, lrs, scopedLrses, isScoped){
  if (!isScoped) {
    sendStatements(xapis, lrs, 'default');
  } else {
    // Determine LRS based on ePPN scope
    let scopedXapis = {};
    let unknownXapis = [];
    xapis.forEach(xapi => {
      const userid = xapi.actor.account.name;
      const username = usernames[userid];
      if (username !== undefined && username.includes('@')) {
        // Get scope from ePPN
        const scope = username.split('@')[1];
        if (scope in scopedLrses){
          // Create array of statements per scope
          if (scope in scopedXapis) {
            scopedXapis[scope].push(xapi);
          } else {
            scopedXapis[scope] = [xapi];
          }
        } else {
          logger.warn(
            `The LRS corresponding the scope, ${scope}, cannot be found ` +
            'in config/app.js, sending the statement to the default LRS.'
          );
          unknownXapis.push(xapi);
        }
      } else {
        logger.warn(
          `The user(id:${userid}, username:${username}) doesn't have ` +
          'an ePPN scope, sending the statement to the default LRS.'
        );
        unknownXapis.push(xapi);
      }
    });

    // Send statements without scope
    if (unknownXapis.length > 0) {
      sendStatements(unknownXapis, lrs, 'default');
    }
    // Send statements to scoped LRSes
    for (let scope in scopedXapis) {
      const lrs = scopedLrses[scope];
      const xapis = scopedXapis[scope];
      sendStatements(xapis, lrs, scope);
    }
  }
}

/**
 * Returns course context.
 * @param {number: string} courseNames -
 *        course names(key:course.id, value:course.fullname)
 * @param {number} courseid - course id
 */
function getCourseContext(courseNames, courseid){
  let grouping = {};
  grouping.objectType = 'Activity';
  grouping.id = `${config.homepage}/course/view.php?id=${courseid}`;
  grouping.definition = {};
  grouping.definition.type = `${config.homepage}/activitytype/course`;
  grouping.definition.name = {};
  grouping.definition.name['en'] = courseNames[courseid];
  grouping.definition.description = {};
  return grouping;
}

/**
 * Translates moodle standard logs into xAPI statements.
 * @param {Array.{Sequelize.Model}} logs - logstore_standard_logs
 * @param {number: string} courseNames -
 *        course names(key:course.id, value:course.fullname)
 */
async function translate(logs, courseNames){ // eslint-disable-line max-statements, max-len
  let xapis = [];
  let translatedLogIds = [];
  let skippedLogIds = [];

  for (const log of logs) {
    let xapi = {};
    xapi.actor = {};
    xapi.verb = {};
    xapi.context = {};
    xapi.object = {};
    xapi.actor.objectType = 'Agent';
    xapi.actor.name = '';
    xapi.actor.account = {};
    xapi.actor.account.name = log.userid;
    xapi.actor.account.homePage = config.homepage;
    xapi.verb.id = '';
    xapi.verb.display = {};
    xapi.verb.display['en'] = log.action;
    xapi.context.contextActivities = {};
    xapi.context.contextActivities.category = [];
    let category = {};
    category.objectType = 'Activity';
    category.id = config.category.id;
    category.definition = {};
    category.definition.type = config.category.definition.type;
    category.definition.name = {};
    category.definition.name['en'] = config.category.definition.name;
    category.definition.description = {};
    category.definition.description['en'] =
      config.category.definition.description;
    xapi.context.contextActivities.category.push(category);
    xapi.context.platform = config.platform;
    xapi.context.language = config.language;
    xapi.object.definition = {};
    xapi.object.definition.name = {};
    if (log.timecreated !== null) {
      xapi.timestamp = {};
      xapi.timestamp = timechange(log.timecreated);
    }
    let isSkipped = false;
    switch (log.eventname) {
      case courseViewed[1]:
        xapi.verb.id = courseViewed[3];
        xapi.object.objectType = 'Activity';
        xapi.object.id =
          xapi.actor.account.homePage +
          '/course/view.php?id=' +
          log.courseid;
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/module';
        xapi.object.definition.name['en'] =
          courseViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseViewed[0];
        break;
      case userLoggedin[1]:
        xapi.verb.id = userLoggedin[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          userLoggedin[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userLoggedin[0];
        break;
      case userLoginFailed[1]:
        xapi.verb.id = userLoginFailed[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          userLoginFailed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userLoginFailed[0];
        break;
      case userPasswordUpdated[1]:
        xapi.verb.id = userPasswordUpdated[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/user/profile.php?id=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          userPasswordUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userPasswordUpdated[0];
        break;
      case userLoggedout[1]:
        xapi.verb.id = userLoggedout[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          userLoggedout[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userLoggedout[0];
        break;
      case userProfileViewed[1]:
        xapi.verb.id = userProfileViewed[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/user/profile.php?id=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          userProfileViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userProfileViewed[0];
        break;
      case quizCourseModuleViewed[1]:
        xapi.verb.id = quizCourseModuleViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/quiz/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          quizCourseModuleViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          quizCourseModuleViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/module';
        break;
      case forumCourseModuleViewed[1]:
        xapi.verb.id = forumCourseModuleViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/forum/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          forumCourseModuleViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          forumCourseModuleViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/module';
        break;
      case bookCourseModuleViewed[1]:
        xapi.verb.id = bookCourseModuleViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/book/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          bookCourseModuleViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          bookCourseModuleViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/module';
        break;
      case resourceCourseModuleViewed[1]:
        xapi.verb.id = resourceCourseModuleViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/resource/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          resourceCourseModuleViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          resourceCourseModuleViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/module';
        break;
      case scormCourseModuleViewed[1]:
        xapi.verb.id = scormCourseModuleViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/scorm/view.php?id='+ log.contextinstanceid;
        xapi.object.definition.name['en'] =
          scormCourseModuleViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          scormCourseModuleViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/module';
        break;
      case workshopCourseModuleViewed[1]:
        xapi.verb.id = workshopCourseModuleViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/workshop/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          workshopCourseModuleViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          workshopCourseModuleViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/module';
        break;
      case attemptViewed[1]:
        xapi.verb.id = attemptViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/quiz/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          attemptViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          attemptViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assessment';
        break;
      case attemptSummaryViewed[1]:
        xapi.verb.id = attemptSummaryViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/quiz/summary.php?attempt=' +
          log.objectid +
          '&cmid' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          attemptSummaryViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          attemptSummaryViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assessment';
        break;
      case attemptPreviewStarted [1]:
        xapi.verb.id = attemptPreviewStarted [3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/quiz/attempt.php?attempt=' +
          log.objectid +
          '&cmid' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          attemptPreviewStarted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          attemptPreviewStarted[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assessment';
        break;
      case attemptReviewed[1]:
        xapi.verb.id = attemptReviewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/quiz/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          attemptReviewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          attemptReviewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assessment';
        break;
      case attemptStarted[1]:
        xapi.verb.id = attemptStarted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/quiz/attempt.php?attempt=' +
          log.objectid +
          '&cmid' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          attemptStarted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          attemptStarted[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assessment';
        break;
      case attemptSubmitted[1]:
        xapi.verb.id = attemptSubmitted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/quiz/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          attemptSubmitted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          attemptSubmitted[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assessment';

        const quizAttempt = await QUIZ_ATTEMPTS.findByPk(
          log.objectid,
          {attributes: ['quiz', 'state', 'timefinish', 'timestart']}
        ).catch(err => {
          logger.warn(`Failed to retrieve quiz_attempt - ${err}`);
        });
        if (quizAttempt === null || quizAttempt === undefined) {
          break;
        }

        const quiz = await QUIZ.findByPk(
          quizAttempt.quiz,
          {attributes: ['id']}
        ).catch(err => {
          logger.warn(`Failed to retrieve quiz - ${err}`);
        });
        if (quiz === null || quiz === undefined) {
          break;
        }

        const gradeItem = await GRADE_ITEMS.findOne({
          where: {itemmodule: 'quiz', iteminstance: quiz.id},
          attributes: ['id', 'gradepass']
        }).catch(err => {
          logger.warn(`Failed to retrieve grade_item - ${err}`);
        });
        if (gradeItem === null || gradeItem === undefined){
          break;
        }

        const attemptGrade = await GRADE_GRADES.findOne({
          where: {itemid: gradeItem.id, userid: log.userid},
          attributes: ['rawgrade', 'rawgrademin', 'rawgrademax']
        }).catch(err => {
          logger.warn(`Failed to retrieve grade_grade - ${err}`);
        });
        if (attemptGrade === null || attemptGrade === undefined){
          break;
        }

        xapi.result = {
          score: {
            raw: parseFloat(attemptGrade.rawgrade),
            min: parseFloat(attemptGrade.rawgrademin),
            max: parseFloat(attemptGrade.rawgrademax)
          },
          success: attemptGrade.rawgrade >= gradeItem.gradepass,
          completion: quizAttempt.state === 'finished'
        };

        const seconds = quizAttempt.timefinish - quizAttempt.timestart;
        if (seconds > 0) {
          xapi.result.duration = `PT${seconds}S`;
        }
        break;
      case quizReportViewed[1]:
        xapi.verb.id = quizReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/quiz/report.php?id=' +
          log.contextinstanceid +
          '&mode=overview';
        xapi.object.definition.name['en'] =
          quizReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          quizReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assessment';
        break;
      case editPageViewed[1]:
        xapi.verb.id = editPageViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/quiz/edit.php?cmid=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          editPageViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          editPageViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assessment';
        break;
      case chapterViewed[1]:
        xapi.verb.id = chapterViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/book/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          chapterViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          chapterViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/book';
        break;
      case chapterPrinted[1]:
        xapi.verb.id = chapterPrinted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/book/tool/print/index.php?id=' +
          log.contextinstanceid +
          '&chapterid=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          chapterPrinted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          chapterPrinted[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/book';
        break;
      case bookPrinted[1]:
        xapi.verb.id = bookPrinted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/book/tool/print/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          bookPrinted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          bookPrinted[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/book';
        break;
      case submissionViewed[1]:
        xapi.verb.id = submissionViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/workshop/submission.php?cmid=' +
          log.contextinstanceid +
          '&id=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          submissionViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          submissionViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/workshop';
        break;
      case submissionCreated[1]:
        xapi.verb.id = submissionCreated[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/workshop/submission.php?cmid=' +
          log.contextinstanceid +
          '&id=&edit=on';
        xapi.object.definition.name['en'] =
          submissionCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          submissionCreated[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/workshop';
        break;
      case submissionUpdated[1]:
        xapi.verb.id = submissionUpdated[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/workshop/submission.php?cmid=' +
          log.contextinstanceid +
          '&id=&edit=on';
        xapi.object.definition.name['en'] =
          submissionUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          submissionUpdated[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/workshop';
        break;
      case phaseSwitched[1]:
        xapi.verb.id = phaseSwitched[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/workshop/switchphase.php?cmid=' +
          log.contextinstanceid +
          '&phase=' +
          log.objectid;;
        xapi.object.definition.name['en'] =
          phaseSwitched[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          phaseSwitched[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/workshop';
        break;
      case workshopAssessableUploaded[1]:
        xapi.verb.id = workshopAssessableUploaded[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/workshop/submission.php?cmid=' +
          log.contextinstanceid +
          '&id=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          workshopAssessableUploaded[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          workshopAssessableUploaded[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/workshop';
        break;
      case submissionAssessed[1]:
        xapi.verb.id = submissionAssessed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/workshop/assessment.php?asid=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          submissionAssessed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          submissionAssessed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/workshop';
        break;
      case subscriptionDeleted[1]:
        xapi.verb.id = subscriptionDeleted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/forum/subscribers.php?id=' +
          log.objectid +
          '&edit=on';
        xapi.object.definition.name['en'] =
          subscriptionDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          subscriptionDeleted[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/forum';
        break;
      case subscriptionCreated[1]:
        xapi.verb.id = subscriptionCreated[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/forum/subscribers.php?id=' +
          log.objectid +
          '&edit=on';
        xapi.object.definition.name['en'] =
          subscriptionCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          subscriptionCreated[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/forum';
        break;
      case forumAssessableUploaded[1]:
        xapi.verb.id = forumAssessableUploaded[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/forum/post.php?forum=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          forumAssessableUploaded[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          forumAssessableUploaded[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/forum';
        break;
      case discussionCreated[1]:
        xapi.verb.id = discussionCreated[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/forum/post.php?forum=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          discussionCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          discussionCreated[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/forum';
        break;
      case discussionSubscriptionCreated[1]:
        xapi.verb.id = discussionSubscriptionCreated[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/forum/post.php?forum=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          discussionSubscriptionCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          discussionSubscriptionCreated[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/forum';
        break;
      case subscribersViewed[1]:
        xapi.verb.id = subscribersViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/forum/subscribers.php?id=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          subscribersViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          subscribersViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/forum';
        break;
      case discussionViewed[1]:
        xapi.verb.id = discussionViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/forum/discuss.php?d=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          discussionViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          discussionViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/forum';
        break;
      case postUpdated[1]:
        xapi.verb.id = postUpdated[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/forum/post.php?edit=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          postUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          postUpdated[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/forum';
        break;
      case postDeleted[1]:
        xapi.verb.id = postDeleted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/forum/post.php?delete=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          postDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          postDeleted[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/forum';
        break;
      case discussionDeleted[1]:
        xapi.verb.id = discussionDeleted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/forum/post.php?delete=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          discussionDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          discussionDeleted[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/forum';
        break;
      case courseSearched[1]:
        xapi.verb.id = courseSearched[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/forum/search.php?id=' +
          log.objectid +
          '&search=ds';
        xapi.object.definition.name['en'] =
          courseSearched[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseSearched[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/forum';
        break;
      case postCreated[1]:
        xapi.verb.id = postCreated[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/forum/post.php?reply=' +
          log.objectid +
          '#mformforum';
        xapi.object.definition.name['en'] =
          postCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          postCreated[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/forum';
        break;
      case discussionSubscriptionDeleted[1]:
        xapi.verb.id = discussionSubscriptionDeleted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/forum/view.php?f=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          discussionSubscriptionDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          discussionSubscriptionDeleted[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/forum';
        break;
      case allSubmissionsDownloaded[1]:
        xapi.verb.id = allSubmissionsDownloaded[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=grading';
        xapi.object.definition.name['en'] =
          allSubmissionsDownloaded[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          allSubmissionsDownloaded[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assign';
        break;
      case assignAssessableSubmitted[1]:
        xapi.verb.id = assignAssessableSubmitted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=editsubmission';
        xapi.object.definition.name['en'] =
          assignAssessableSubmitted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          assignAssessableSubmitted[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assign';
        break;
      case gradingTableViewed[1]:
        xapi.verb.id = gradingTableViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=grading';
        xapi.object.definition.name['en'] =
          gradingTableViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          gradingTableViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assign';
        break;
      case assignSubmissionStatusViewed[1]:
        xapi.verb.id = assignSubmissionStatusViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          assignSubmissionStatusViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          assignSubmissionStatusViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assign';
        break;
      case gradingFormViewed[1]:
        xapi.verb.id = gradingFormViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&rownum=0&action=grader&userid=' +
          log.userid;
        xapi.object.definition.name['en'] =
          gradingFormViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          gradingFormViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assign';
        break;
      case assignSubmissionGraded[1]:
        xapi.verb.id = assignSubmissionGraded[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&rownum=0&action=grader&userid=' +
          log.userid;
        xapi.object.definition.name['en'] =
          assignSubmissionGraded[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          assignSubmissionGraded[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assign';
        break;
      case submissionLocked[1]:
        xapi.verb.id = submissionLocked[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=grading';
        xapi.object.definition.name['en'] =
          submissionLocked[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          submissionLocked[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assign';
        break;
      case extensionGranted[1]:
        xapi.verb.id = extensionGranted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=grading';
        xapi.object.definition.name['en'] =
          extensionGranted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          extensionGranted[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assign';
        break;
      case assignSubmissionFormViewed[1]:
        xapi.verb.id = assignSubmissionFormViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=editsubmission';
        xapi.object.definition.name['en'] =
          assignSubmissionFormViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          assignSubmissionFormViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assign';
        break;
      case userGraded[1]:
        xapi.verb.id = userGraded[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/grade/edit/tree/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          userGraded[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userGraded[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/grade';
        break;
      case commentCreated[1]:
        xapi.verb.id = commentCreated[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          commentCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          commentCreated[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assign';
        break;
      case commentDeleted[1]:
        xapi.verb.id = commentDeleted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          commentDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          commentDeleted[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assign';
        break;
      case graderGradeReportViewed[1]:
        xapi.verb.id = graderGradeReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/grade/report/grader/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          graderGradeReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          graderGradeReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/grade';
        break;
      case historyGradeReportViewed[1]:
        xapi.verb.id = historyGradeReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/grade/report/history/index.php';
        xapi.object.definition.name['en'] =
          historyGradeReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          historyGradeReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/grade';
        break;
      case outcomeGradeReportViewed[1]:
        xapi.verb.id = outcomeGradeReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/grade/report/outcomes/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          outcomeGradeReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          outcomeGradeReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/grade';
        break;
      case overviewGradeReportViewed[1]:
        xapi.verb.id = overviewGradeReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/grade/report/overview/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          overviewGradeReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          overviewGradeReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/grade';
        break;
      case singleviewGradeReportViewed[1]:
        xapi.verb.id = singleviewGradeReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/grade/report/singleview/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          singleviewGradeReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          singleviewGradeReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/grade';
        break;
      case userGradeReportViewed[1]:
        xapi.verb.id = userGradeReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/grade/report/user/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          userGradeReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userGradeReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/grade';
        break;
      case logReportViewed[1]:
        xapi.verb.id = logReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/report/log/index.php?id=0';
        xapi.object.definition.name['en'] =
          logReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          logReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/report';
        break;
      case outlineReportViewed[1]:
        xapi.verb.id = outlineReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/report/outline/user.php?course=' +
          log.courseid +
          '&id=' +
          log.userid +
          '&mode=outline';
        xapi.object.definition.name['en'] =
          outlineReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          outlineReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/report';
        break;
      case logliveReportViewed[1]:
        xapi.verb.id = logliveReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/report/loglive/index.php';
        xapi.object.definition.name['en'] =
          logliveReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          logliveReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/report';
        break;
      case userListViewed[1]:
        xapi.verb.id =  userListViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/user/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          userListViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userListViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/participants';
        break;
      case scormReportViewed[1]:
        xapi.verb.id = scormReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/scorm/report.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          scormReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          scormReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/scorm';
        break;
      case scoLaunched[1]:
        xapi.verb.id = scoLaunched[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/scorm/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          scoLaunched[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          scoLaunched[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/scorm';
        break;
      case scormStatusSubmitted[1]:
        xapi.verb.id = scormStatusSubmitted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/scorm/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          scormStatusSubmitted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          scormStatusSubmitted[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/scorm';
        break;
      case outlineActivityReportViewed[1]:
        xapi.verb.id = outlineActivityReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/report/outline/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          outlineActivityReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          outlineActivityReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/report';
        break;
      case logUserReportViewed[1]:
        xapi.verb.id = logUserReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/report/log/user.php?id=' +
          log.contextinstanceid +
          '&course=' +
          log.courseid;
        xapi.object.definition.name['en'] =
          logUserReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          logUserReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/report';
        break;
      case participationReportViewed[1]:
        xapi.verb.id = participationReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/report/participation/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          participationReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          participationReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/report';
        break;
      case workshopAssessmentEvaluated[1]:
        xapi.verb.id = workshopAssessmentEvaluated[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/workshop/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          workshopAssessmentEvaluated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          workshopAssessmentEvaluated[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/workshop';
        break;
      case workshopAssessmentReevaluated[1]:
        xapi.verb.id = workshopAssessmentReevaluated[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/workshop/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          workshopAssessmentReevaluated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          workshopAssessmentReevaluated[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/workshop';
        break;
      case workshopSubmissionReassessed[1]:
        xapi.verb.id = workshopSubmissionReassessed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/workshop/assessment.php?asid=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          workshopSubmissionReassessed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          workshopSubmissionReassessed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/workshop';
        break;
      case userUpdated[1]:
        xapi.verb.id = userUpdated[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/user/editadvanced.php?id=' +
          log.contextinstanceid +
          '&course=' +
          log.courseid;
        xapi.object.definition.name['en'] =
          userUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userUpdated[0];
        break;
      case userLoggedinas[1]:
        xapi.verb.id = userLoggedinas[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/user/profile.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          userLoggedinas[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userLoggedinas[0];
        break;
      case userEnrolmentUpdated[1]:
        xapi.verb.id = userEnrolmentUpdated[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/user/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          userEnrolmentUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userEnrolmentUpdated[0];
        break;
      case userEnrolmentDeleted[1]:
        xapi.verb.id = userEnrolmentDeleted[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/user/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          userEnrolmentDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userEnrolmentDeleted[0];
        break;
      case userEnrolmentCreated[1]:
        xapi.verb.id = userEnrolmentCreated[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/user/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          userEnrolmentCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userEnrolmentCreated[0];
        break;
      case userDeleted[1]:
        xapi.verb.id = userDeleted[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/admin/user.php';
        xapi.object.definition.name['en'] =
          userDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userDeleted[0];
        break;
      case userCreated[1]:
        xapi.verb.id = userCreated[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/user/editadvanced.php?id=-1';
        xapi.object.definition.name['en'] =
          userCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          userCreated[0];
        break;
      case dashboardViewed[1]:
        xapi.verb.id = dashboardViewed[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          dashboardViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          dashboardViewed[0];
        break;
      case courseUpdated[1]:
        xapi.verb.id = courseUpdated[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/course/edit.php?id=' +
          log.contextinstanceid +
          '&returnto=catmanage';
        xapi.object.definition.name['en'] =
          courseUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseUpdated[0];
        break;
      case courseModuleUpdated[1]:
        xapi.verb.id = courseModuleUpdated[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/course/modedit.php?update=' +
          log.contextinstanceid +
          '&return=0&sr=0';
        xapi.object.definition.name['en'] =
          courseModuleUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseModuleUpdated[0];
        break;
      case courseModuleCreated[1]:
        xapi.verb.id = courseModuleCreated[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/course/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          courseModuleCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseModuleCreated[0];
        break;
      case courseCategoryCreated[1]:
        xapi.verb.id = courseCategoryCreated[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/course/editcategory.php?parent=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          courseCategoryCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseCategoryCreated[0];
        break;
      case cohortUpdated[1]:
        xapi.verb.id = cohortUpdated[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/cohort/index.php?&contextid=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          cohortUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          cohortUpdated[0];
        break;
      case cohortMemberRemoved[1]:
        xapi.verb.id = cohortMemberRemoved[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/cohort/assign.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          cohortMemberRemoved[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          cohortMemberRemoved[0];
        break;
      case cohortMemberAdded[1]:
        xapi.verb.id = cohortMemberAdded[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/cohort/assign.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          cohortMemberAdded[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          cohortMemberAdded[0];
        break;
      case cohortDeleted[1]:
        xapi.verb.id = cohortDeleted[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/cohort/index.php?contextid=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          cohortDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          cohortDeleted[0];
        break;
      case cohortCreated[1]:
        xapi.verb.id = cohortCreated[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/cohort/edit.php?contextid=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          cohortCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          cohortCreated[0];
        break;
      case enrolInstanceDeleted[1]:
        xapi.verb.id = enrolInstanceDeleted[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/course/management.php';
        xapi.object.definition.name['en'] =
          enrolInstanceDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          enrolInstanceDeleted[0];
        break;
      case roleAssigned[1]:
        xapi.verb.id = roleAssigned[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/admin/roles/assign.php?contextid=1';
        xapi.object.definition.name['en'] =
          roleAssigned[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          roleAssigned[0];
        break;
      case roleCapabilitiesUpdated[1]:
        xapi.verb.id = roleCapabilitiesUpdated[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/admin/roles/assign.php?contextid=1';
        xapi.object.definition.name['en'] =
          roleCapabilitiesUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          roleCapabilitiesUpdated[0];
        break;
      case roleUnassigned[1]:
        xapi.verb.id = roleUnassigned[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/admin/roles/assign.php?contextid=1';
        xapi.object.definition.name['en'] =
          roleUnassigned[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          roleUnassigned[0];
        break;
      case toolCapabilityReportViewed[1]:
        xapi.verb.id = toolCapabilityReportViewed[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/admin/tool/capability/index.php';
        xapi.object.definition.name['en'] =
          toolCapabilityReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          toolCapabilityReportViewed[0];
        break;
      case courseContentDeleted[1]:
        xapi.verb.id = courseContentDeleted[3];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/course/delete.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          courseContentDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseContentDeleted[0];
        break;
      case courseDeleted[1]:
        xapi.verb.id = courseDeleted[3];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/cohort/edit.php?contextid=' +
          log.courseid;
        xapi.object.definition.name['en'] =
          courseDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseDeleted[0];
        break;
      case courseModuleCompletionUpdated[1]:
        xapi.verb.id = courseModuleCompletionUpdated[3];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=editsubmission';
        xapi.object.definition.name['en'] =
          courseModuleCompletionUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseModuleCompletionUpdated[0];
        break;
      case courseSectionUpdated[1]:
        xapi.verb.id = courseSectionUpdated[3];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/course/editsection.php?id=' +
          log.objectid +
          '&sr';
        xapi.object.definition.name['en'] =
          courseSectionUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseSectionUpdated[0];
        break;
      case emailFailed[1]:
        xapi.verb.id = emailFailed[3];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=editsubmission';
        xapi.object.definition.name['en'] =
          emailFailed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          emailFailed[0];
        break;
      case enrolInstanceCreated[1]:
        xapi.verb.id = enrolInstanceCreated[3];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/course/edit.php?category=1&returnto=catmanage';
        xapi.object.definition.name['en'] =
          enrolInstanceCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          enrolInstanceCreated[0];
        break;
      case messageSent[1]:
        xapi.verb.id = messageSent[3];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=editsubmission';
        xapi.object.definition.name['en'] =
          messageSent[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          messageSent[0];
        break;
      case calendarEventCreated[1]:
        xapi.verb.id = calendarEventCreated[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          calendarEventCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          calendarEventCreated[0];
        break;
      case calendarEventDeleted[1]:
        xapi.verb.id = calendarEventDeleted[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          calendarEventDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          calendarEventDeleted[0];
        break;
      case calendarEventUpdated[1]:
        xapi.verb.id = calendarEventUpdated[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          calendarEventUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          calendarEventUpdated[0];
        break;
      case assignFileAssessableUploaded[1]:
        xapi.verb.id = assignFileAssessableUploaded[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=editsubmission';
        xapi.object.definition.name['en'] =
          assignFileAssessableUploaded[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          assignFileAssessableUploaded[0];
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/assignsubmission';
        break;
      case assignsubmissionFileSubmissionCreated[1]:
        xapi.verb.id = assignsubmissionFileSubmissionCreated[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=editsubmission';
        xapi.object.definition.name['en'] =
          assignsubmissionFileSubmissionCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          assignsubmissionFileSubmissionCreated[0];
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/assignsubmission';
        break;
      case assignsubmissionFileSubmissionUpdated[1]:
        xapi.verb.id = assignsubmissionFileSubmissionUpdated[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=editsubmission';
        xapi.object.definition.name['en'] =
          assignsubmissionFileSubmissionUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          assignsubmissionFileSubmissionUpdated[0];
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/assignsubmission';
        break;
      case onlinetextAssignAssessableUploaded[1]:
        xapi.verb.id = onlinetextAssignAssessableUploaded[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=editsubmission';
        xapi.object.definition.name['en'] =
          onlinetextAssignAssessableUploaded[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          onlinetextAssignAssessableUploaded[0];
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/assignsubmission';
        break;
      case onlinetextAssignSubmissionCreated[1]:
        xapi.verb.id = onlinetextAssignSubmissionCreated[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=editsubmission';
        xapi.object.definition.name['en'] =
          onlinetextAssignSubmissionCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          onlinetextAssignSubmissionCreated[0];
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/assignsubmission';
        break;
      case onlinetextAssignSubmissionUpdated[1]:
        xapi.verb.id = onlinetextAssignSubmissionUpdated[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/assign/view.php?id=' +
          log.contextinstanceid +
          '&action=editsubmission';
        xapi.object.definition.name['en'] =
          onlinetextAssignSubmissionUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          onlinetextAssignSubmissionUpdated[0];
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/assignsubmission';
        break;
      case courseUserReportViewed[1]:
        xapi.verb.id = courseUserReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/course/user.php?mode=grade&id=' +
          log.contextinstanceid +
          '&user=' +
          log.userid;
        xapi.object.definition.name['en'] =
          courseUserReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseUserReportViewed[0];
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/report';
        break;
      case courseRestored[1]:
        xapi.verb.id = courseRestored[3];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/backup/restorefile.php';
        xapi.object.definition.name['en'] =
          courseRestored[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseRestored[0];
        break;
      case groupCreated[1]:
        xapi.verb.id = groupCreated[3];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/group/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          groupCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          groupCreated[0];
        break;
      case groupDeleted[1]:
        xapi.verb.id = groupDeleted[3];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/group/index.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          groupDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          groupDeleted[0];
        break;
      case groupMemberAdded[1]:
        xapi.verb.id = groupMemberAdded[3];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/group/members.php?group=' +
          log.objectid;
        xapi.object.definition.name['en'] =
          groupMemberAdded[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          groupMemberAdded[0];
        break;
      case messageViewed[1]:
        xapi.verb.id = messageViewed[3];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/message/index.php?user=' +
          log.userid +
          '&id=' +
          log.courseid;
        xapi.object.definition.name['en'] =
          messageViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          messageViewed[0];
        break;
      case categoryBinItemCreated[1]:
        xapi.verb.id = categoryBinItemCreated[3];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/course/management.php';
        xapi.object.definition.name['en'] =
          categoryBinItemCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          categoryBinItemCreated[0];
        break;
      case courseCategoryUpdated[1]:
        xapi.verb.id = courseCategoryUpdated[3];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/course/editcategory.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] =
          courseCategoryUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseCategoryUpdated[0];
        break;
      case feedbackCourseModuleViewed[1]:
        xapi.verb.id = feedbackCourseModuleViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/feedback/view.php?id=' +
           log.contextinstanceid;
        xapi.object.definition.name['en'] =
          feedbackCourseModuleViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          feedbackCourseModuleViewed[0];
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/module';
        break;
      case pageCourseModuleViewed[1]:
        xapi.verb.id = pageCourseModuleViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/page/view.php?id=' +
           log.contextinstanceid;
        xapi.object.definition.name['en'] =
          pageCourseModuleViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          pageCourseModuleViewed[0];
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/module';
        break;
      case urlCourseModuleViewed[1]:
        xapi.verb.id = urlCourseModuleViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/url/view.php?id=' +
           log.contextinstanceid;
        xapi.object.definition.name['en'] =
          urlCourseModuleViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          urlCourseModuleViewed[0];
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/module';
        break;
      case hsvideoPlaySent[1]:
        xapi.verb.id = hsvideoPlaySent[3];
        xapi.object.objectType = 'Activity';
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/hsvideo/view.php?id=' +
           log.courseid;
        xapi.object.definition.type =
           'http://activitystreams/schema/1.0/video';
        xapi.object.definition.name['en'] =
          hsvideoPlaySent[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          hsvideoPlaySent[0];
        break;
      case hsvideoProgressEndSent[1]:
        xapi.verb.id = hsvideoProgressEndSent[3];
        xapi.object.objectType = 'Activity';
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/hsvideo/view.php?id=' +
           log.courseid;
        xapi.object.definition.type =
           'http://activitystreams/schema/1.0/video';
        xapi.object.definition.name['en'] =
          hsvideoProgressEndSent[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          hsvideoProgressEndSent[0];
        break;
      case hsvideoProgressStartSent[1]:
        xapi.verb.id = hsvideoProgressStartSent[3];
        xapi.object.objectType = 'Activity';
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/hsvideo/view.php?id=' +
           log.courseid;
        xapi.object.definition.type =
           'http://activitystreams/schema/1.0/video';
        xapi.object.definition.name['en'] =
          hsvideoProgressStartSent[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          hsvideoProgressStartSent[0];
        break;
      case hsvideoReplaySent[1]:
        xapi.verb.id = hsvideoReplaySent[3];
        xapi.object.objectType = 'Activity';
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/hsvideo/view.php?id=' +
           log.courseid;
        xapi.object.definition.type =
           'http://activitystreams/schema/1.0/video';
        xapi.object.definition.name['en'] =
          hsvideoReplaySent[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          hsvideoReplaySent[0];
        break;
      case hsvideoPauseSent[1]:
        xapi.verb.id = hsvideoPauseSent[3];
        xapi.object.objectType = 'Activity';
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/hsvideo/view.php?id=' +
           log.courseid;
        xapi.object.definition.type =
           'http://activitystreams/schema/1.0/video';
        xapi.object.definition.name['en'] =
          hsvideoPauseSent[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          hsvideoPauseSent[0];
        break;
      case hsvideoStopSent[1]:
        xapi.verb.id = hsvideoStopSent[3];
        xapi.object.objectType = 'Activity';
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/hsvideo/view.php?id=' +
           log.courseid;
        xapi.object.definition.type =
           'http://activitystreams/schema/1.0/video';
        xapi.object.definition.name['en'] =
          hsvideoStopSent[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          hsvideoStopSent[0];
        break;
      case hsvideoView[1]:
        xapi.verb.id = hsvideoView[3];
        xapi.object.objectType = 'Activity';
        xapi.object.id =
           xapi.actor.account.homePage +
          '/mod/hsvideo/view.php?id=' +
           log.courseid;
        xapi.object.definition.type =
           'http://activitystreams/schema/1.0/video';
        xapi.object.definition.name['en'] =
          hsvideoView[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          hsvideoView[0];
        break;
      case batchSetWorkflowStateViewed[1]:
        xapi.verb.id = batchSetWorkflowStateViewed[3];
        xapi.object.objectType = 'Activity';
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/assign';
        xapi.object.definition.name['en'] =
          batchSetWorkflowStateViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          batchSetWorkflowStateViewed[0];
        break;
      case courseModuleInstanceListViewed[1]:
        xapi.verb.id = courseModuleInstanceListViewed[3];
        xapi.object.objectType = 'Activity';
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/assign';
        xapi.object.definition.name['en'] =
          courseModuleInstanceListViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseModuleInstanceListViewed[0];
        break;
      case feedbackViewed[1]:
        xapi.verb.id = feedbackViewed[3];
        xapi.object.objectType = 'Activity';
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/assign';
        xapi.object.definition.name['en'] =
          feedbackViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          feedbackViewed[0];
        break;
      case assignSubmissionViewed[1]:
        xapi.verb.id = assignSubmissionViewed[3];
        xapi.object.objectType = 'Activity';
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/assign';
        xapi.object.definition.name['en'] =
          assignSubmissionViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          assignSubmissionViewed[0];
        break;
      case workflowStateUpdated[1]:
        xapi.verb.id = workflowStateUpdated[3];
        xapi.object.objectType = 'Activity';
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/assign';
        xapi.object.definition.name['en'] =
          workflowStateUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          workflowStateUpdated[0];
        break;
      case reportStatsReportViewed[1]:
        xapi.verb.id = reportStatsReportViewed[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          reportStatsReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          reportStatsReportViewed[0];
        break;
      case reportStatsUserReportViewed[1]:
        xapi.verb.id = reportStatsUserReportViewed[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          reportStatsUserReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          reportStatsUserReportViewed[0];
        break;
      case langpackUpdated[1]:
        xapi.verb.id = langpackUpdated[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          langpackUpdated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          langpackUpdated[0];
        break;
      case categoryBinItemDeleted[1]:
        xapi.verb.id = categoryBinItemDeleted[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          categoryBinItemDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          categoryBinItemDeleted[0];
        break;
      case courseBinItemCreated[1]:
        xapi.verb.id = courseBinItemCreated[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          courseBinItemCreated[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseBinItemCreated[0];
        break;
      case courseBinItemDeleted[1]:
        xapi.verb.id = courseBinItemDeleted[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          courseBinItemDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseBinItemDeleted[0];
        break;
      case browserAgentView[1]:
        xapi.verb.id = browserAgentView[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          browserAgentView[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          browserAgentView[0];
        break;
      case courseModuleDeleted[1]:
        xapi.verb.id = courseModuleDeleted[3];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          courseModuleDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseModuleDeleted[0];
        break;
      case gradeDeleted[1]:
        xapi.verb.id = gradeDeleted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          gradeDeleted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          gradeDeleted[0];
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/grade';
        break;
      case responseSubmitted[1]:
        xapi.verb.id = responseSubmitted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          responseSubmitted[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          responseSubmitted[0];
        xapi.object.definition.type =
           'http://adlnet.gov/expapi/activities/feedback';
        break;
      case forumUserReportViewed[1]:
        xapi.verb.id = forumUserReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          forumUserReportViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          forumUserReportViewed[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/forum';
        break;
      case attemptAbandoned[1]:
        xapi.verb.id = attemptAbandoned[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          attemptAbandoned[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          attemptAbandoned[0];
        xapi.object.definition.type =
          'http://adlnet.gov/expapi/activities/assessment';
        break;
      case courseModuleListViewed[1]:
        xapi.verb.id = courseModuleListViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id = xapi.actor.account.homePage;
        xapi.object.definition.name['en'] =
          courseModuleListViewed[0];
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] =
          courseModuleListViewed[0];
        xapi.object.definition.type =
            'http://adlnet.gov/expapi/activities/forum';
        break;
      default:
        isSkipped = true;
        break;
    }
    if (!isSkipped) {
      xapi.id = uuid.v4();
      xapis.push(xapi);
      translatedLogIds.push(log.id);
      logger.info(
        `Standard log ${log.id} (eventname: ${log.eventname}) translated.`
      );
    } else {
      skippedLogIds.push(log.id);
      logger.info(
        `Standard log ${log.id} (eventname: ${log.eventname}) skipped.`
      );
    }
  }
  return [xapis, translatedLogIds, skippedLogIds];
}

/**
 * Selects limited number of standard logs.
 * @param {number} limit - limit value
 */
async function findLogs(limit){
  // Execute static SQL to join tables without relation
  const sql =
    'SELECT c.* FROM ' + config.db.prefix + 'logstore_standard_log AS c ' +
    'LEFT JOIN xapi_records_processed AS l ON ' +
    'c.id = l.id WHERE l.id IS NULL LIMIT ' + limit;

  return await db.query(
    sql,
    {model: LOGSTORE_STANDARD_LOG, raw: true}
  ).catch(err => {
    throw new Error(`Failed to retrieve logstore_standard_logs - ${err}`);
  });
}

/**
 * Translates moodle standard logs into xAPI statements and send them to LRS.
 * Processes 100 standard logs at each iteration until no more data exists.
 */
module.exports = async function main() { // eslint-disable-line max-statements
  let lrs;
  let scopedLrses = {};
  let isScoped = false;
  if (!('default' in config.LRS.clients) && !('scoped' in config.LRS.clients)) {
    throw new Error('Specify LRS clients in config/app.js');
  }
  if ('default' in config.LRS.clients) {
    const opts = {
      'url':config.LRS.url,
      'auth':{
        'user':config.LRS.clients.default.user,
        'pass':config.LRS.clients.default.pass
      },
    };
    lrs = new adl.XAPIWrapper(opts);
  }
  if ('scoped' in config.LRS.clients) {
    isScoped = true;
    config.LRS.clients.scoped.forEach(client => {
      const opts = {
        'url':config.LRS.url,
        'auth':{
          'user':client.user,
          'pass':client.pass
        },
      };
      scopedLrses[client.scope] = new adl.XAPIWrapper(opts);
    });
  }

  const limit = 100;
  let translatedStmtCount = 0;
  let skippedStmtCount = 0;

  // Retrieve all usernames from user table
  let usernames = [];
  if (isScoped) {
    await USER.findAll({
      attributes: ['id', 'username'],
      raw: true
    }).then(users => {
      users.forEach(user => {
        usernames[user.id] = user.username;
      });
    }).catch(err => {
      throw new Error(`Failed to retrieve users - ${err}`);
    });
  }

  // Retrieve all course names from course table
  let courseNames = [];
  await COURSE.findAll({
    attributes: ['id', 'fullname'],
    raw: true
  }).then(courses => {
    courses.forEach(course => {
      courseNames[course.id] = course.fullname;
    });
  }).catch(err => {
    throw new Error(`Failed to retrieve courses - ${err}`);
  });

  // Iterate logstore_standard_logs to be processed
  while (true){
    let logs = await findLogs(limit);
    if (logs.length === 0) {
      logger.info(
        'Finished translation ' +
        `#Translated:${translatedStmtCount} #Skipped:${skippedStmtCount}`
      );
      return;
    }
    const [xapis, translatedLogIds, skippedLogIds] =
      await translate(logs, courseNames);
    translatedStmtCount += translatedLogIds.length;
    skippedStmtCount += skippedLogIds.length;
    routeStatements(xapis, usernames, lrs, scopedLrses, isScoped);
    await createProcessedRecords(translatedLogIds, skippedLogIds);
  }
};
