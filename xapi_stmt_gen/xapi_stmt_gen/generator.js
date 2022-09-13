'use strict';
const axios = require('axios');
const axiosRetry = require('axios-retry');
const config = require('./config/app');
const crypto = require('crypto');
const laDB = require('./la-db-config');
const lmsDB = require('./lms-db-config');
const http = require('http');
const log4js = require('log4js');
const logger = log4js.getLogger();
const phpUnserialize = require('phpunserialize');
const Sequelize = require('sequelize');
const uuid = require('node-uuid');

const COURSE = lmsDB.import('./models/mdl_course');
const GRADE_ITEMS = lmsDB.import('./models/mdl_grade_items');
const GRADE_GRADES = lmsDB.import('./models/mdl_grade_grades');
const LOGSTORE_STANDARD_LOG = lmsDB.import('./models/mdl_logstore_standard_log');
const QUIZ = lmsDB.import('./models/mdl_quiz');
const QUIZ_ATTEMPTS = lmsDB.import('./models/mdl_quiz_attempts');
const SCORM = lmsDB.import('./models/mdl_scorm');
const SCORM_SCOES = lmsDB.import('./models/mdl_scorm_scoes');
const SCORM_SCOES_TRACK = lmsDB.import('./models/mdl_scorm_scoes_track');
const USER = lmsDB.import('./models/mdl_user');

const EPPN = laDB.import('./models/eppn');
const XAPI_RECORDS_PROCESSED = laDB.import('./models/xapi_records_processed');

const Op = Sequelize.Op;

const STATUS = {
  SUCCEEDED: 0,
  SKIPPED: 1,
  FAILED: 2,
};

axiosRetry(
  axios,
  {
    retries: 20,
    retryCondition: e => {
      const condition = axiosRetry.isNetworkOrIdempotentRequestError(e);
      if (condition) {
        logger.warn(`Failed to send statements, retrying.. (code:${e.code} id:${JSON.parse(e.config.data)[0].id})`);
      }
      return condition;
    },
    retryDelay: axiosRetry.exponentialDelay
  }
);

log4js.configure('config/log4js.json');
if (process.env.XAPI_GEN_LOG_LEVEL !== undefined) {
  logger.level = process.env.XAPI_GEN_LOG_LEVEL;
}

logger.info('Starting xAPI statement generator.');

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
  '', // Set quiz name
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
  '', // Set SCORM name
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
const scormCourseModuleViewed = [
  '', // Set SCORM name
  '\\mod_scorm\\event\\course_module_viewed',
  'コースモジュールが閲覧されました。',
  'urn:x-moodle-event-action:viewed'
];
const scormReportViewed = [
  '', // Set SCORM name
  '\\mod_scorm\\event\\report_viewed',
  'SCORMレポートが表示されました',
  'urn:x-moodle-event-action:viewed'
];
const scoLaunched = [
  '', // Set SCORM name
  '\\mod_scorm\\event\\sco_launched',
  'SCOを起動しました',
  'urn:x-moodle-event-action:launched'
];
const scormStatusSubmitted = [
  '', // Set SCORM name
  '\\mod_scorm\\event\\status_submitted',
  'SCORMのステータスが送信されました',
  '' // Set depending on cmivalue in other
];
const scormScorerawSubmitted = [
  '', // Set SCORM name
  '\\mod_scorm\\event\\scoreraw_submitted',
  'SCORMのスコアが送信されました',
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
 * Creates records used to identify processed logs in LMS database.
 * @param {string} objecttable - processed table name
 * @param {Array.<number>} objectids - object ids
 * @param {number} status - 0: SUCCEEDED, 1: SKIPPED, 2: FAILED
 */
async function createProcessedRecords(objecttable, objectids, status) {
    let processed = [];
    objectids.forEach(id => {
      processed.push({
        objecttable: objecttable,
        objectid: id,
        status: status,
        send_date: lmsDB.fn('NOW') // eslint-disable-line camelcase
      });
    });
    return XAPI_RECORDS_PROCESSED.bulkCreate(
      processed
    ).catch(err => {
      process.exitCode = 1;
      throw new Error(
        'Failed to create processed records in LMS database' +
        `(status:${status}, objectids:${objectids}, host:${config.db.lms.host}) - ${err}`
      );
    });
}

axios.defaults.timeout = 0;
axios.defaults.httpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 30,
  maxTotalSockets: 30,
  maxFreeSockets: 30,
  timeout: 0
});

/**
 * Sends xAPI statements to LRS.
 * @param {Object} statements - xAPI statements
 * @param {Object} lrs - LRS client
 */
async function sendStatements(statements, lrs) {
  return axios({
    'method': 'POST',
    'url': `${config.url}:8081/data/xAPI/statements`,
    'auth': lrs.auth,
    'headers': {
      'Content-Type': 'application/json',
      'X-Experience-API-Version': '1.0.1'
    },
    'data': JSON.stringify(statements)
  });
}

let LRS_CLIENTS;

/**
 * Returns LRS clients.
 */
async function getLRSClients() {
  if (!(config.LRS.client.key && config.LRS.client.secret)) {
    process.exitCode = 1;
    throw new Error('Specify LRS client in config/app.js');
  }
  const clientResponse = await axios.get(`${config.url}:3000/api/v2/client`, {
    'auth': {
      'username':config.LRS.client.key,
      'password':config.LRS.client.secret
    }
  }).catch(err => {
    process.exitCode = 1;
    throw new Error(`Failed to get LRS clients - ${err}`);
  });
  const lrsResponse = await axios.get(`${config.url}:3000/api/v2/lrs`, {
    'auth': {
      'username':config.LRS.client.key,
      'password':config.LRS.client.secret
    }
  }).catch(err => {
    process.exitCode = 1;
    throw new Error(`Failed to get LRSes - ${err}`);
  });
  let clients = {}
  lrsResponse.data.forEach((lrs) => {
    const client = clientResponse.data.find(c => c.lrs_id === lrs._id)
    const key = client.api.basic_key
    const secret = client.api.basic_secret
    const scope = (key === config.LRS.client.key && secret === config.LRS.client.secret) ? 'default' : lrs.title
    clients[scope] = {
      'auth': {
        'username': key,
        'password': secret
      }
    };
  });
  return clients;
}

/**
 * Route xAPI statements to LRSes.
 * @param {string} objecttable - processed table name
 * @param {xapi: Object} xapis - xAPI statements
 */
async function routeStatements(objecttable, xapis){
  let promises = [];
  for (const scope in xapis) {
    const objectids = xapis[scope].map((value, index, array) => {
      return value.objectid;
    });
    const statements = xapis[scope].map((value, index, array) => {
      return value.statement;
    });
    const lrs = LRS_CLIENTS[scope];
    const seq = objectids[0];
    logger.info(
      `[SEQ:${seq}][SCOPE:${scope}] Sending ${statements.length} statements...`
    );
    const promise = sendStatements(statements, lrs).then(() => {
      logger.info(`[SEQ:${seq}][SCOPE:${scope}] ${statements.length} statements added.`);
      return createProcessedRecords(objecttable, objectids, STATUS.SUCCEEDED);
    }).catch(error => {
      let message = `[SEQ:${seq}][SCOPE:${scope}] Failed to send statements`;
      if (error.response) {
        message += `(HTTP status:${error.response.status})`;
      }
      message += ` - ${error.message}`;
      logger.error(message);
      return createProcessedRecords(objecttable, objectids, STATUS.FAILED);
    });
    promises.push(promise);
  }
  return Promise.all(promises);
}

/**
 * Returns ePPN scope.
 * @param {string} username - username
 */
function getScopeFromEppn(username) {
  if (username && username.includes('@')) {
    // Get scope from ePPN
    return username.split('@')[1];
  }
  return null;
}

/**
 * Determines LRS based on user attributes.
 * @param {number: Object} userAttrs -
 *        user attributes(key:user.id, value:username, hash, and scope)
 * @param {number} userid - user id
 */
function getLRSScope(userAttrs, userid) {
  let scope = 'default';
  if (config.LRS.ePPNScoped) {
    scope = userid in userAttrs ? userAttrs[userid].scope : null;
    if (!scope) {
      logger.trace(
        `The user(id:${userid}) doesn't have ` +
        'an ePPN scope, sending the statement to the default LRS.'
      );
      scope = 'default';
    } else if (!LRS_CLIENTS[scope]) {
      logger.trace(
        `LRS for ${scope} not found, ` +
        'sending the statement to the default LRS.'
      );
      scope = 'default';
    }
  }
  return scope;
}

/**
 * Returns actor.
 * @param {number} userid - user id
 * @param {string} username - username
 */
function getActor(userid, username) {
  return {
    objectType: 'Agent',
    name: username,
    account: {
      name: userid,
      homePage: config.homepage
    }
  };
}

/**
 * Returns context.
 */
function getContext() {
  return {
    platform: config.platform,
    language: config.language,
    contextActivities: {
      category: [
        {
          objectType: 'Activity',
          id: config.category.id,
          definition: {
            type: config.category.definition.type,
            name: {
              en: config.category.definition.name,
            },
            description: {
              en: config.category.definition.description,
            }
          }
        },
      ]
    }
  };
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
 * @param {number: Object} userAttrs -
 *        user attributes(key:user.id, value:username, hash, and scope)
 * @param {number: string} courseNames -
 *        course names(key:course.id, value:course.fullname)
 */
async function translateStandardLogs(logs, userAttrs, courseNames){ // eslint-disable-line max-statements, max-len
  let xapis = [];
  let skippedLogIds = [];

  for (const log of logs) {
    const username = log.userid in userAttrs ? userAttrs[log.userid].hash : '';
    let xapi = {
      id: uuid.v4(),
      actor: getActor(log.userid, username),
      verb: {
        id: '',
        display: {
          en: log.action,
        }
      },
      object: {
        definition: {
          name: {
          }
        }
      },
      context: getContext(),
      timestamp: timechange(log.timecreated)
    };
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
      case attemptSubmitted[1]: {
        const quizAttempt = await findQuizAttemptBy(log.objectid);
        const quiz = quizAttempt ? await findQuizBy(quizAttempt.quiz) : null;
        const gradeItem = quiz ? await findGradeItemBy({itemmodule: 'quiz', iteminstance: quiz.id}) : null;
        const attemptGrade = gradeItem ? await findGradeGradeBy({itemid: gradeItem.id, userid: log.userid}) : null;
        const quizname = quiz ? quiz.name : '';
        xapi.verb.id = attemptSubmitted[3];
        xapi.object = {
          id: `${xapi.actor.account.homePage}/mod/quiz/view.php?id=${log.contextinstanceid}`,
          definition: {
            type: 'http://adlnet.gov/expapi/activities/assessment',
            name: {
              en: quizname
            },
            description: {
              en: quizname
            }
          }
        };
        if (quizAttempt) {
          xapi.result = {
            completion: quizAttempt.state === 'finished'
          };
          const seconds = quizAttempt.timefinish - quizAttempt.timestart;
          if (seconds > 0) {
            xapi.result.duration = `PT${seconds}S`;
          }
          if (attemptGrade) {
            xapi.result.score = {
              min: parseFloat(attemptGrade.rawgrademin),
              max: parseFloat(attemptGrade.rawgrademax)
            };
            // grade_grades.rawgrade is nullable
            if (attemptGrade.rawgrade) {
              xapi.result.score.raw = parseFloat(attemptGrade.rawgrade);
              if (gradeItem) {
                xapi.result.success = attemptGrade.rawgrade >= gradeItem.gradepass;
              }
            }
          }
        }
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        break;
      }
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
      case userGraded[1]: {
        const grade = await findGradeGradeBy({id: log.objectid});
        const gradeItem = grade ? await findGradeItemBy({id: grade.itemid}) : null;
        // grade_items.itemname is nullable
        const itemname = gradeItem ? (gradeItem.itemname ? gradeItem.itemname : '') : '';
        xapi.verb.id = userGraded[3];
        xapi.object = {
          id: `${xapi.actor.account.homePage}/grade/edit/tree/index.php?id=${log.contextinstanceid}`,
          definition: {
            type: 'http://adlnet.gov/expapi/activities/grade',
            name: {
              en: itemname
            },
            description: {
              en: itemname
            }
          }
        };
        if (grade) {
          xapi.result = {
            score: {
              min: parseFloat(grade.rawgrademin),
              max: parseFloat(grade.rawgrademax)
            }
          };
          // grade_grades.rawgrade is nullable
          if (grade.rawgrade) {
            xapi.result.score.raw = parseFloat(grade.rawgrade);
            if (gradeItem) {
              xapi.result.success = grade.rawgrade >= gradeItem.gradepass;
            }
          }
        }
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        break;
      }
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
      case scormCourseModuleViewed[1]: {
        const scorm = await findScormBy(log.objectid);
        const scormname = scorm ? scorm.name : 'SCORM';
        xapi.verb.id = scormCourseModuleViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/scorm/view.php?id='+ log.contextinstanceid;
        xapi.object.definition.name['en'] = scormname;
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] = scormname;
        xapi.object.definition.type =
          'http://id.tincanapi.com/activitytype/legacy-learning-standard';
        break;
      }
      case scormReportViewed[1]:
        const other = phpUnserialize(log.other);
        const scormid = other['scormid'];
        const scorm = await findScormBy(scormid);
        const scormname = scorm ? scorm.name : 'SCORM';
        xapi.verb.id = scormReportViewed[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/scorm/report.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] = scormname;
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] = scormname;
        xapi.object.definition.type =
          'http://id.tincanapi.com/activitytype/legacy-learning-standard';
        break;
      case scoLaunched[1]: {
        const sco = await findScormScoBy(log.objectid);
        const launch = sco ? sco.launch : 'SCO';
        const title = sco ? sco.title : 'SCO';
        xapi.verb.id = scoLaunched[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        const other = phpUnserialize(log.other);
        const loadedcontent = other['loadedcontent'];
        xapi.object.id = loadedcontent;
        xapi.object.definition.name['en'] = launch;
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] = title;
        xapi.object.definition.type =
          'http://id.tincanapi.com/activitytype/legacy-learning-standard';
        break;
      }
      case scormStatusSubmitted[1]: {
        const scorm = await findScormBy(log.objectid);
        const scormname = scorm ? scorm.name : 'SCORM';
        const other = phpUnserialize(log.other);
        const scormstatus = other['cmivalue'];
        switch (scormstatus) {
          case 'failed':
          case 'passed':
          case 'completed':
            break;
          default:
            process.exitCode = 1;
            throw new Error(`Invalid status ${scormstatus} detected.`);
        }
        xapi.verb.id = `urn:x-moodle-event-action:${scormstatus}`;
        xapi.verb.display['en'] = scormstatus;
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/scorm/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] = scormname;
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] = scormname;
        xapi.object.definition.type =
          'http://id.tincanapi.com/activitytype/legacy-learning-standard';
        break;
      }
      case scormScorerawSubmitted[1]: {
        const scorm = await findScormBy(log.objectid);
        const scormname = scorm ? scorm.name : 'SCORM';
        xapi.verb.id = scormScorerawSubmitted[3];
        xapi.context.contextActivities.grouping =
          [getCourseContext(courseNames, log.courseid)];
        xapi.object.id =
          xapi.actor.account.homePage +
          '/mod/scorm/view.php?id=' +
          log.contextinstanceid;
        xapi.object.definition.name['en'] = scormname;
        xapi.object.definition.description = {};
        xapi.object.definition.description['en'] = scormname;
        xapi.object.definition.type =
          'http://id.tincanapi.com/activitytype/legacy-learning-standard';

        const other = phpUnserialize(log.other);
        const rawscore = other['cmivalue'];
        xapi.result = {
          score: {
            raw: parseFloat(rawscore),
          }
        };
        break;
      }
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
        skippedLogIds.push(log.id);
        logger.trace(
          `Standard log ${log.id} (eventname: ${log.eventname}) skipped.`
        );
        continue;
    }

    const scope = getLRSScope(userAttrs, log.userid);
    if (!(scope in xapis)) {
      xapis[scope] = [];
    }
    xapis[scope].push({
      objectid: log.id,
      statement: xapi
    });
    logger.trace(
      `Standard log ${log.id} (eventname: ${log.eventname}) translated.`
    );
  }
  for (const scope in xapis) {
    logger.trace(`[SCOPE:${scope}] ${xapis[scope].length} logs translated.`);
  }
  await createProcessedRecords('logstore_standard_log', skippedLogIds, STATUS.SKIPPED);
  return xapis;
}

/**
 * Translates scorm_scoes_tracks into xAPI statements.
 * @param {Array.{Sequelize.Model}} tracks - scorm_scoes_track objects
 * @param {number: Object} userAttrs -
 *        user attributes(key:user.id, value:username, hash, and scope)
 * @param {number: string} courseNames -
 *        course names(key:course.id, value:course.fullname)
 */
async function translateScoTracks(tracks, userAttrs, courseNames){ // eslint-disable-line max-statements, max-len
  let xapis = [];
  let skippedLogIds = [];

  for (const track of tracks) {
    const username = track.userid in userAttrs ? userAttrs[track.userid].hash : '';
    let xapi = {
      id: uuid.v4(),
      actor: getActor(track.userid, username),
      context: getContext(),
      timestamp: timechange(track.timemodified)
    };
    switch (track.element) {
      case 'cmi.core.total_time':
        const scorm = await findScormBy(track.scormid);
        // Get SCO URL from sco_launched log
        const log = await findLatestLogBy(scoLaunched[1], track.scoid);
        const other = phpUnserialize(log.other);
        const loadedcontent = other['loadedcontent'];
        const sco = await findScormScoBy(track.scoid);
        xapi.verb = {
          id: 'urn:x-moodle-event-action:attended',
          display: {
            en: 'attended'
          }
        };
        xapi.object = {
          id: loadedcontent,
          definition: {
            type: 'http://id.tincanapi.com/activitytype/legacy-learning-standard',
            name: {
              en: sco ? sco.launch : 'SCO'
            },
            description: {
              en: sco ? sco.title : 'SCO'
            }
          }
        };
        var time = track.value.split(':');
        var seconds = (+time[0]) * 60 * 60 + (+time[1]) * 60 + (+time[2]);
        xapi.result = {
          duration: `PT${seconds}S`
        };
        if (scorm) {
          xapi.context.contextActivities.grouping =
            [getCourseContext(courseNames, scorm.course)];
        }
        break;
      default:
        skippedLogIds.push(track.id);
        logger.trace(
          `SCORM SCO track ${track.id} (element: ${track.element}) skipped.`
        );
        continue;
    }
    const scope = getLRSScope(userAttrs, track.userid);
    if (!(scope in xapis)) {
      xapis[scope] = [];
    }
    xapis[scope].push({
      objectid: track.id,
      statement: xapi
    });
    logger.trace(
      `SCORM SCO track ${track.id} (element: ${track.element}) translated.`
    );
  }
  for (const scope in xapis) {
    logger.trace(`[SCOPE:${scope}] ${xapis[scope].length} logs translated.`);
  }
  await createProcessedRecords('scorm_scoes_track', skippedLogIds, STATUS.SKIPPED);
  return xapis;
}

/**
 * Selects limited number of standard logs.
 * @param {number} limit - limit value
 * @param {Array.<string>} originNotIn - origins to be excluded
 */
async function findLogs(limit, originNotIn = []){
  const lastLogProcessed = await XAPI_RECORDS_PROCESSED.findOne({
    where: {objecttable: 'logstore_standard_log'},
    attributes: ['objectid'],
    order: [['objectid', 'DESC']],
    limit: 1, // findOne does not add LIMIT 1
    raw: true,
  }).catch(err => {
    process.exitCode = 1;
    throw new Error(`Failed to retrieve xapi_records_processed - ${err}`);
  });
  return LOGSTORE_STANDARD_LOG.findAll({
    where: {
      id: {
        [Op.gt]: lastLogProcessed ? lastLogProcessed.objectid : -1
      },
      origin: {
        [Op.notIn]: originNotIn
      }
    },
    order: [['id', 'ASC']],
    limit: limit,
    raw: true,
  }).catch(err => {
    process.exitCode = 1;
    throw new Error(`Failed to retrieve logstore_standard_logs - ${err}`);
  });
}

/**
 * Finds log by eventname and objectid.
 * @param {string} eventname - event name
 * @param {number} objectid - object id
 */
async function findLatestLogBy(eventname, objectid){
  return LOGSTORE_STANDARD_LOG.findOne({
    where: {eventname: eventname, objectid: objectid},
    attributes: ['id', 'other'],
    order: [['timecreated', 'DESC']]
  }).catch(err => {
    logger.warn(`Failed to retrieve logstore_standard_log - ${err}`);
  });
}

/**
 * Finds quiz attempt by id.
 * @param {number} id - quiz attempt id
 */
async function findQuizAttemptBy(id) {
  return QUIZ_ATTEMPTS.findByPk(
    id,
    {attributes: ['quiz', 'state', 'timefinish', 'timestart']}
  ).catch(err => {
    logger.warn(`Failed to retrieve quiz_attempt - ${err}`);
  });
}

/**
 * Finds quiz by id.
 * @param {number} id - quiz id
 */
async function findQuizBy(id) {
  return QUIZ.findByPk(
    id,
    {attributes: ['id', 'name']}
  ).catch(err => {
    logger.warn(`Failed to retrieve quiz - ${err}`);
  });
}

/**
 * Filters grade item with given where clause.
 * @param {string: string} where - where clause
 */
async function findGradeItemBy(where) {
  return GRADE_ITEMS.findOne({
    where: where,
    attributes: ['id', 'itemname', 'gradepass']
  }).catch(err => {
    logger.warn(`Failed to retrieve grade_item - ${err}`);
  });
}

/**
 * Filters grade with given where clause.
 * @param {string: string} where - where clause
 */
async function findGradeGradeBy(where) {
  return GRADE_GRADES.findOne({
    where: where,
    attributes: ['itemid', 'rawgrade', 'rawgrademin', 'rawgrademax']
  }).catch(err => {
    logger.warn(`Failed to retrieve grade_grade - ${err}`);
  });
}

/**
 * Finds SCORM by id.
 * @param {number} id - scorm id
 */
async function findScormBy(id){
  return SCORM.findByPk(
    id, {attributes: ['name', 'course']}
  ).catch(err => {
    logger.warn(`Failed to retrieve scorm - ${err}`);
  });
}

/**
 * Finds SCORM SCO by id.
 * @param {number} id - sco id
 */
async function findScormScoBy(id){
  return SCORM_SCOES.findByPk(
    id, {attributes: ['launch', 'title']}
  ).catch(err => {
    logger.warn(`Failed to retrieve scorm_scoes - ${err}`);
  });
}

/**
 * Selects limited number of SCO tracks.
 * @param {number} limit - limit value
 */
async function findScormScoesTracks(limit){
  const lastLogProcessed = await XAPI_RECORDS_PROCESSED.findOne({
    where: {objecttable: 'scorm_scoes_track'},
    attributes: ['objectid'],
    order: [['objectid', 'DESC']],
    limit: 1, // findOne does not add LIMIT 1
    raw: true,
  }).catch(err => {
    process.exitCode = 1;
    throw new Error(`Failed to retrieve xapi_records_processed - ${err}`);
  });
  return SCORM_SCOES_TRACK.findAll({
    where: {
      id: {
        [Op.gt]: lastLogProcessed ? lastLogProcessed.objectid : -1
      }
    },
    order: [['id', 'ASC']],
    limit: limit,
    raw: true
  }).catch(err => {
    process.exitCode = 1;
    throw new Error(`Failed to retrieve scorm_scoes_track - ${err}`);
  });
}

const waitForInterval = () => {
  const time = +process.env.INTERVAL || 5000
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
  });
};

/**
 * Translates moodle logs into xAPI statements and send them to LRS.
 * Processes logs until no more data exists.
 */
module.exports = async function main() { // eslint-disable-line max-statements
  LRS_CLIENTS = await getLRSClients();

  // Retrieve all users
  const users = await USER.findAll({
    attributes: ['id', 'auth', 'username', 'alternatename'],
    raw: true
  }).catch(err => {
    process.exitCode = 1;
    throw new Error(`Failed to retrieve users - ${err}`);
  });

  // Retrieve all eppns
  const eppns = await EPPN.findAll({
    attributes: ['username', 'hash', 'scope'],
    raw: true
  }).catch(err => {
    process.exitCode = 1;
    throw new Error(`Failed to retrieve ePPN - ${err}`);
  });

  let userAttrs = [];
  let newEppns = [];
  for (const user of users) {
    // Use alternatename as username
    // if authenticated using GakuNinLMS's LTI plugin
    const username = (
      (user.auth === 'lti' && config.LRS.ePPNScoped)
      ? user.alternatename
      : user.username
    );
    const eppn = eppns.find((eppn) => {
      if (eppn['username'] === username) {
        return eppn;
      }
    });
    if (eppn) {
      userAttrs[user.id] = eppn;
    } else {
      const hash = username ? crypto.createHash('sha256').update(username).digest('hex') : '';
      const scope = getScopeFromEppn(username);
      userAttrs[user.id] = {
        username: username, // may not be ePPN format
        hash: hash,
        scope: scope, // nullable
        acl: scope ? scope.replace(/[.-]/g, '_') : null // used for RLS
      };
      if (scope) {
        newEppns.push(userAttrs[user.id]);
      }
    }
  }
  if (newEppns.length > 0) {
    await EPPN.bulkCreate(newEppns).catch(err => {
      process.exitCode = 1;
      throw new Error(
        `Failed to create ePPN(${config.db.la.host}) - ${err}`
      );
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
    process.exitCode = 1;
    throw new Error(`Failed to retrieve courses - ${err}`);
  });

  await XAPI_RECORDS_PROCESSED.sync();

  // Iterate logstore_standard_logs to be processed
  const limit = 'limit' in config ? config.limit : 500;
  const chunkSize = 'chunkSize' in config ? config.chunkSize : 100;
  const originNotIn = config.filter.logstoreStandardLog.origin.exclude;
  while (true){
    let logs = await findLogs(limit, originNotIn);
    if (logs.length === 0) {
      logger.info(
        'Finished logstore_standard_logs translation.'
      );
      break;
    }
    let promises = [];
    let chunk = logs.splice(0, chunkSize);
    while (chunk.length > 0) {
      const promise = translateStandardLogs(
        chunk, userAttrs, courseNames
      ).then((xapis) => {
        return routeStatements('logstore_standard_log', xapis);
      });
      promises.push(promise);
      chunk = logs.splice(0, chunkSize);
    }
    await Promise.all(promises);
    await waitForInterval();
  }

  // Iterate scorm_scoes_track to be processed
  while (true){
    let logs = await findScormScoesTracks(limit);
    if (logs.length === 0) {
      logger.info(
        'Finished scorm_scoes_track translation.'
      );
      break;
    }
    let promises = [];
    let chunk = logs.splice(0, chunkSize);
    while (chunk.length > 0) {
      const promise = translateScoTracks(
        chunk, userAttrs, courseNames
      ).then((xapis) => {
        return routeStatements('scorm_scoes_track', xapis);
      });
      promises.push(promise);
      chunk = logs.splice(0, chunkSize);
    }
    await Promise.all(promises);
    await waitForInterval();
  }
};
