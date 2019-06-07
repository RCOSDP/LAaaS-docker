const { Pool, Client } = require('pg');
var adl = require('adl-xapiwrapper');
var uuid = require('node-uuid');
var config = require('./xapi_config');
const async = require('async');
const sync = require('sync');
var sleep = require('system-sleep');
var sprintf=require("sprintf-js").sprintf;
var fs = require('fs');

var start_time = timechange_now(new Date().getTime());
var dir = './log';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

var log_filename=dir+"/xapi_statements_generator-"+start_time+".log";
fs.open(log_filename, 'w', function (err, file) {
  if (err) {
    log_msg = "Error Handling Log File: \n"+err+"\n";
    console.log("An error occured check log file");
    sleep(1000);
    process.exit();
  }
});

var log_msg="";
log_msg+="==================================================================================================\n";
log_msg+="                             xAPI statements Generator \n";
log_msg+="==================================================================================================\n";
console.log(log_msg);
execution_log_dump(log_msg);

var opts = {
  "url":config.LRS.url,
  "auth":{
    "user":config.LRS.user,
    "pass":config.LRS.pass
  },
};

const client = new Client({
  user: config.db.username,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port
});

var source_table_name = config.source_table_name;
var date = Date();

log_msg ="Start log migration/conversion of statements for host: " + config.homepage + "\n";
log_msg+="Start Time: "+ start_time +"\n";

//connecting with the database
log_msg="1. Connecting with LMS Moodle database!\n";
log_msg+="Process may take some time.!!!";
console.log(log_msg);
execution_log_dump(log_msg);

client.connect(function(err) {
  if (err) {
    log_msg = "Error connecting with LMS database connection failed: \n"
    log_msg += err + "\n";
    execution_log_dump(log_msg);
    console.log("An error occured check log file");
    sleep(1000);
    process.exit();
  }
});
sleep(1000);

// defining xAPI variables
var course_viewed = [
  "course_viewed",
  "\\core\\event\\course_viewed",
  "コースが閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var user_loggedin = [
  "user_loggedin",
  "\\core\\event\\user_loggedin",
  "ユーザがログインしました。",
  "urn:x-moodle-event-action:loggedin"
]
var user_loggedout = [
  "user_loggedout",
  "\\core\\event\\user_loggedout",
  "ユーザがログアウトしました。",
  "urn:x-moodle-event-action:loggedout"
]
var user_login_failed = [
  "user_login_failed",
  "\\core\\event\\user_login_failed",
  "ユーザがログインに失敗しました。",
  "urn:x-moodle-event-action:failed"
]
var user_password_updated = [
  "user_password_updated",
  "\\core\\event\\user_password_updated",
  "ユーザパスワードが更新されました。",
  "urn:x-moodle-event-action:updated"
]
var quiz_course_module_viewed = [
  "quiz_course_module_viewed",
  "\\mod_quiz\\event\\course_module_viewed",
  "コースモジュールが閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var forum_course_module_viewed = [
  "forum_course_module_viewed",
  "\\mod_forum\\event\\course_module_viewed",
  "コースモジュールが閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var book_course_module_viewed = [
  "book_course_module_viewed",
  "\\mod_book\\event\\course_module_viewed",
  "コースモジュールが閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var resource_course_module_viewed = [
  "resource_course_module_viewed",
  "\\mod_resource\\event\\course_module_viewed",
  "コースモジュールが閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var scorm_course_module_viewed = [
  "scorm_course_module_viewed",
  "\\mod_scorm\\event\\course_module_viewed",
  "コースモジュールが閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var workshop_course_module_viewed = [
  "workshop_course_module_viewed",
  "\\mod_workshop\\event\\course_module_viewed",
  "コースモジュールが閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var attempt_viewed = [
  "attempt_viewed",
  "\\mod_quiz\\event\\attempt_viewed",
  "小テスト受験が閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var attempt_summary_viewed = [
  "attempt_summary_viewed",
  "\\mod_quiz\\event\\attempt_summary_viewed",
  "小テスト受験が閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var attempt_reviewed = [
  "attempt_reviewed",
  "\\mod_quiz\\event\\attempt_reviewed",
  "小テスト受験が閲覧されました。",
  "urn:x-moodle-event-action:reviewed"
]
var attempt_started = [
  "attempt_started",
  "\\mod_quiz\\event\\attempt_started",
  "小テスト受験が閲覧されました。",
  "urn:x-moodle-event-action:started"
]
var attempt_submitted = [
  "attempt_submitted",
  "\\mod_quiz\\event\\attempt_submitted",
  "小テスト受験が送信されました。",
  "urn:x-moodle-event-action:submitted"
]
var attempt_preview_started = [
  "attempt_preview_started",
  "\\mod_quiz\\event\\attempt_preview_started",
  "小テスト受験プレビューが開始しました。",
  "urn:x-moodle-event-action:started"
]
var edit_page_viewed = [
  "edit_page_viewed",
  "\\mod_quiz\\event\\edit_page_viewed",
  "小テスト編集ページが閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var quiz_report_viewed = [
  "quiz_report_viewed",
  "\\mod_quiz\\event\\report_viewed",
  "小テストレポートが閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var user_profile_viewed = [
  "user_profile_viewed",
  "\\core\\event\\user_profile_viewed",
  "ユーザープロフィールが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var chapter_viewed = [
  "chapter_viewed",
  "\\mod_book\\event\\chapter_viewed",
  "章が閲覧されました",
  "urn:x-moodle-event-action:viewed"
]
var chapter_printed = [
  "chapter_printed",
  "\\booktool_print\\event\\chapter_printed",
  "この章は印刷されています",
  "urn:x-moodle-event-action:printed"
]
var book_printed = [
  "book_printed",
  "\\booktool_print\\event\\book_printed",
  "この本は印刷されています",
  "urn:x-moodle-event-action:printed"
]
var submission_viewed = [
  "submission_viewed",
  "\\mod_workshop\\event\\submission_viewed",
  "ワークショップの提出を見た",
  "urn:x-moodle-event-action:viewed"
]
var submission_created = [
  "submission_created",
  "\\mod_workshop\\event\\submission_created",
  "ワークショップの提出が作成されました",
  "urn:x-moodle-event-action:created"
]
var submission_updated = [
  "submission_updated",
  "\\mod_workshop\\event\\submission_updated",
  "ワークショップの提出が更新されました",
  "urn:x-moodle-event-action:updated"
]
var phase_switched = [
  "phase_switched",
  "\\mod_workshop\\event\\phase_switched",
  "ワークショップ段階が切り替えられました",
  "urn:x-moodle-event-action:switched"
]
var workshop_assessable_uploaded = [
  "workshop_assessable_uploaded",
  "\\mod_workshop\\event\\assessable_uploaded",
  "ワークショップアセスメントがアップロードされました",
  "urn:x-moodle-event-action:uploaded"
]
var submission_assessed = [
  "submission_assessed",
  "\\mod_workshop\\event\\submission_assessed",
  "ワークショップの提出が評価されました",
  "urn:x-moodle-event-action:assessed"
]
var subscription_deleted = [
  "subscription_deleted",
  "\\mod_forum\\event\\subscription_deleted",
  "フォーラム登録が削除されました",
  "urn:x-moodle-event-action:deleted"
]
var subscription_created = [
  "subscription_created",
  "\\mod_forum\\event\\subscription_created",
  "フォーラムサブスクリプションが作成されました",
  "urn:x-moodle-event-action:created"
]
var forum_assessable_uploaded= [
  "forum_assessable_uploaded",
  "\\mod_forum\\event\\assessable_uploaded",
  "フォーラム評価ツールがアップロードされました",
  "urn:x-moodle-event-action:uploaded"
]
var discussion_created= [
  "discussion_created",
  "\\mod_forum\\event\\discussion_created",
  "フォーラムディスカッションが作成されました",
  "urn:x-moodle-event-action:created"
]
var discussion_subscription_created = [
  "discussion_subscription_created",
  "\\mod_forum\\event\\discussion_subscription_created",
  "フォーラムディスカッションサブスクリプションを作成しました",
  "urn:x-moodle-event-action:created"
]
var subscribers_viewed = [
  "subscribers_viewed",
  "\\mod_forum\\event\\subscribers_viewed",
  "フォーラムの購読者が閲覧されました",
  "urn:x-moodle-event-action:viewed"
]
var discussion_viewed = [
  "discussion_viewed",
  "\\mod_forum\\event\\discussion_viewed",
  "フォーラムディスカッションが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var post_updated = [
  "post_updated",
  "\\mod_forum\\event\\post_updated",
  "フォーラム投稿が更新されました",
  "urn:x-moodle-event-action:updated"
]
var post_deleted = [
  "post_deleted",
  "\\mod_forum\\event\\post_deleted",
  "フォーラム投稿が削除されました",
  "urn:x-moodle-event-action:deleted"
]
var discussion_deleted = [
  "discussion_deleted",
  "\\mod_forum\\event\\discussion_deleted",
  "フォーラムディスカッションが削除されました",
  "urn:x-moodle-event-action:deleted"
]
var course_searched = [
  "course_searched",
  "\\mod_forum\\event\\course_searched",
  "コースフォーラムが検索されました",
  "urn:x-moodle-event-action:searched"
]
var post_created = [
  "post_created",
  "\\mod_forum\\event\\post_created",
  "フォーラム投稿が作成されました",
  "urn:x-moodle-event-action:created"
]
var discussion_subscription_deleted = [
  "discussion_subscription_deleted",
  "\\mod_forum\\event\\discussion_subscription_deleted",
  "ディスカッションサブスクリプションが削除",
  "urn:x-moodle-event-action:deleted"
]
var all_submissions_downloaded = [
  "all_submissions_downloaded",
  "\\mod_assign\\event\\all_submissions_downloaded",
  "すべての課題提出がダウンロードされる",
  "urn:x-moodle-event-action:downloaded"
]
var assign_assessable_submitted = [
  "assign_assessable_submitted",
  "\\mod_assign\\event\\assessable_submitted",
  "割り当て査定が提出されました",
  "urn:x-moodle-event-action:submitted"
]
var grading_table_viewed = [
  "grading_table_viewed",
  "\\mod_assign\\event\\grading_table_viewed",
  "グレーディングテーブルを閲覧しました",
  "urn:x-moodle-event-action:viewed"
]
var assign_submission_status_viewed = [
  "assign_submission_status_viewed",
  "\\mod_assign\\event\\submission_status_viewed",
  "課題提出が閲覧されました",
  "urn:x-moodle-event-action:viewed"
]
var grading_form_viewed = [
  "grading_form_viewed",
  "\\mod_assign\\event\\grading_form_viewed",
  "グレーディングフォームが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var assign_submission_graded = [
  "assign_submission_graded",
  "\\mod_assign\\event\\submission_graded",
  "課題提出が採点された",
  "urn:x-moodle-event-action:graded"
]
var submission_locked = [
  "submission_locked",
  "\\mod_assign\\event\\submission_locked",
  "割り当ての提出がロックされています",
  "urn:x-moodle-event-action:locked"
]
var extension_granted = [
  "extension_granted",
  "\\mod_assign\\event\\extension_granted",
  "割り当て提出拡張が許可されました",
  "urn:x-moodle-event-action:granted"
]
var assign_submission_form_viewed = [
  "assign_submission_form_viewed",
  "\\mod_assign\\event\\submission_form_viewed",
  "課題提出フォームが閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var user_graded = [
  "user_graded",
  "\\core\\event\\user_graded",
  "ユーザーは段階的に評価されています",
  "urn:x-moodle-event-action:graded"
]
var comment_created = [
  "comment_created",
  "\\assignsubmission_comments\\event\\comment_created",
  "割り当て送信コミットが作成されました",
  "urn:x-moodle-event-action:created"
]
var comment_deleted = [
  "comment_deleted",
  "\\assignsubmission_comments\\event\\comment_deleted",
  "割り当て送信コミットが削除されました",
  "urn:x-moodle-event-action:deleted"
]
var grader_grade_report_viewed = [
  "grader_grade_report_viewed",
  "\\gradereport_grader\\event\\grade_report_viewed",
  "グレード・グレード・レポートを閲覧しました",
  "urn:x-moodle-event-action:viewed"
]
var history_grade_report_viewed = [
  "history_grade_report_viewed",
  "\\gradereport_history\\event\\grade_report_viewed",
  "履歴書の報告が閲覧されました",
  "urn:x-moodle-event-action:viewed"
]
var outcome_grade_report_viewed = [
  "outcome_grade_report_viewed",
  "\\gradereport_outcomes\\event\\grade_report_viewed",
  "結果成績レポートが閲覧されました",
  "urn:x-moodle-event-action:viewed"
]
var overview_grade_report_viewed = [
  "overview_grade_report_viewed",
  "\\gradereport_overview\\event\\grade_report_viewed",
  "全体的な成績報告書が閲覧されました",
  "urn:x-moodle-event-action:viewed"
]
var singleview_grade_report_viewed = [
  "singleview_grade_report_viewed",
  "\\gradereport_singleview\\event\\grade_report_viewed",
  "1つのビューの等級レポートが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var user_grade_report_viewed = [
  "user_grade_report_viewed",
  "\\gradereport_user\\event\\grade_report_viewed",
  "ユーザーグレードのレポートが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var log_report_viewed = [
  "log_report_viewed",
  "\\report_log\\event\\report_viewed",
  "ログレポートが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var outline_report_viewed = [
  "outline_report_viewed",
  "\\report_outline\\event\\report_viewed",
  "概要レポートが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var loglive_report_viewed = [
  "loglive_report_viewed",
  "\\report_loglive\\event\\report_viewed",
  "ログレポートが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var user_list_viewed = [
  "user_list_viewed",
  "\\core\\event\\user_list_viewed",
  "ユーザーリストが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var scorm_report_viewed = [
  "scorm_report_viewed",
  "\\mod_scorm\\event\\report_viewed",
  "scormレポートが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var sco_launched = [
  "sco_launched",
  "\\mod_scorm\\event\\sco_launched",
  "嵐が始まった",
  "urn:x-moodle-event-action:launched"
]
var scorm_status_submitted = [
  "scorm_status_submitted",
  "\\mod_scorm\\event\\status_submitted",
  "scormのステータスが送信されました",
  "urn:x-moodle-event-action:submitted"
]
var outline_activity_report_viewed = [
  "outline_activity_report_viewed",
  "\\report_outline\\event\\activity_report_viewed",
  "アウトラインアクティビティレポートが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var log_user_report_viewed = [
  "log_user_report_viewed",
  "\\report_log\\event\\user_report_viewed",
  "ログユーザーレポートが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var participation_report_viewed = [
  "participation_report_viewed",
  "\\report_participation\\event\\report_viewed",
  "参加報告を閲覧しました",
  "urn:x-moodle-event-action:viewed"
]
var workshop_assessment_evaluated = [
  "workshop_assessment_evaluated",
  "\\mod_workshop\\event\\assessment_evaluated",
  "ワークショップアセスメントが評価されました",
  "urn:x-moodle-event-action:evaluated"
]
var workshop_assessment_reevaluated = [
  "workshop_assessment_reevaluated",
  "\\mod_workshop\\event\\assessment_reevaluated",
  "ワークショップ査定可能性が再評価された",
  "urn:x-moodle-event-action:reevaluated"
]
var workshop_submission_reassessed = [
  "workshop_submission_reassessed",
  "\\mod_workshop\\event\\submission_reassessed",
  "ワークショップの提出が再評価された",
  "urn:x-moodle-event-action:reassessed"
]
var user_updated = [
  "user_updated",
  "\\core\\event\\user_updated",
  "ユーザーが更新されました",
  "urn:x-moodle-event-action:updated"
]
var user_loggedinas = [
  "user_loggedinas",
  "\\core\\event\\user_loggedinas",
  "ユーザープロフィールが表示されました",
  "urn:x-moodle-event-action:loggedinas"
]
var user_enrolment_updated = [
  "user_enrolment_updated",
  "\\core\\event\\user_enrolment_updated",
  "ユーザー登録が更新されました",
  "urn:x-moodle-event-action:updated"
]
var user_enrolment_deleted = [
  "user_enrolment_deleted",
  "\\core\\event\\user_enrolment_deleted",
  "ユーザー登録が削除されました",
  "urn:x-moodle-event-action:deleted"
]
var user_enrolment_created = [
  "user_enrolment_created",
  "\\core\\event\\user_enrolment_created",
  "ユーザー登録が作成されました",
  "urn:x-moodle-event-action:created"
]
var user_deleted = [
  "user_deleted",
  "\\core\\event\\user_deleted",
  "ユーザーが削除されました",
  "urn:x-moodle-event-action:deleted"
]
var user_created = [
  "user_created",
  "\\core\\event\\user_created",
  "ユーザーが作成されました",
  "urn:x-moodle-event-action:created"
]
var dashboard_viewed = [
  "dashboard_viewed",
  "\\core\\event\\dashboard_viewed",
  "ダッシュボードが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var course_updated = [
  "course_updated",
  "\\core\\event\\course_updated",
  "コースが更新されました",
  "urn:x-moodle-event-action:updated"
]
var course_module_updated = [
  "course_module_updated",
  "\\core\\event\\course_module_updated",
  "コースモジュールが更新されました",
  "urn:x-moodle-event-action:updated"
]
var course_module_created = [
  "course_module_created",
  "\\core\\event\\course_module_created",
  "コースモジュールが作成されました",
  "urn:x-moodle-event-action:created"
]

var course_category_created = [
  "course_category_created",
  "\\core\\event\\course_category_created",
  "コースカテゴリが作成されました",
  "urn:x-moodle-event-action:created"
]
var cohort_updated = [
  "cohort_updated",
  "\\core\\event\\cohort_updated",
  "コホートが更新されました",
  "urn:x-moodle-event-action:updated"
]
var cohort_member_removed = [
  "cohort_member_removed",
  "\\core\\event\\cohort_member_removed",
  "コホート会員が削除されました",
  "urn:x-moodle-event-action:removed"
]
var cohort_member_added = [
  "cohort_member_added",
  "\\core\\event\\cohort_member_added",
  "コホート会員が追加されました",
  "urn:x-moodle-event-action:added"
]
var cohort_deleted = [
  "cohort_deleted",
  "\\core\\event\\cohort_deleted",
  "コホートが削除されました",
  "urn:x-moodle-event-action:deleted"
]
var cohort_created = [
  "cohort_created",
  "\\core\\event\\cohort_created",
  "コホートが作成されました",
  "urn:x-moodle-event-action:created"
]
var calendar_event_created = [
  "calendar_event_created",
  "\\core\\event\\calendar_event_created",
  "カレンダーイベントが作成されました",
  "urn:x-moodle-event-action:created"
]
var calendar_event_deleted = [
  "calendar_event_deleted",
  "\\core\\event\\calendar_event_deleted",
  "カレンダーイベントが削除されました",
  "urn:x-moodle-event-action:deleted"
]
var calendar_event_updated = [
  "calendar_event_updated",
  "\\core\\event\\calendar_event_updated",
  "カレンダーイベントが更新されました",
  "urn:x-moodle-event-action:updated"
]
var enrol_instance_deleted = [
  "enrol_instance_deleted",
  "\\core\\event\\enrol_instance_deleted",
  "登録インスタンスが削除されました",
  "urn:x-moodle-event-action:deleted"
]
var role_assigned = [
  "role_assigned",
  "\\core\\event\\role_assigned",
  "ロールが割り当てられている",
  "urn:x-moodle-event-action:assigned"
]
var role_capabilities_updated = [
  "role_capabilities_updated",
  "\\core\\event\\role_capabilities_updated",
  "ロール機能が更新されました",
  "urn:x-moodle-event-action:updated"
]
var role_unassigned = [
  "role_unassigned",
  "\\core\\event\\role_unassigned",
  "役割が割り当てられていません",
  "urn:x-moodle-event-action:unassigned"
]
var tool_capability_report_viewed = [
  "tool_capability_report_viewed",
  "\\tool_capability\\event\\report_viewed",
  "ツール機能レポートが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var course_content_deleted = [
  "course_content_deleted",
  "\\core\\event\\course_content_deleted",
  "コースコンテンツが削除されました",
  "urn:x-moodle-event-action:deleted"
]
var course_deleted = [
  "course_deleted",
  "\\core\\event\\course_deleted",
  "コースが削除されました",
  "urn:x-moodle-event-action:deleted"
]
var course_module_completion_updated = [
  "course_module_completion_updated",
  "\\core\\event\\course_module_completion_updated",
  "コースモジュールの完了が更新されました",
  "urn:x-moodle-event-action:updated"
]
var course_section_updated = [
  "course_section_updated",
  "\\core\\event\\course_section_updated",
  "コースのセクションが更新されました",
  "urn:x-moodle-event-action:updated"
]
var email_failed = [
  "email_failed",
  "\\core\\event\\email_failed",
  "メールが失敗しました",
  "urn:x-moodle-event-action:failed"
]
var enrol_instance_created = [
  "enrol_instance_created",
  "\\core\\event\\enrol_instance_created",
  "登録インスタンスが作成されました",
  "urn:x-moodle-event-action:created"
]
var message_sent = [
  "message_sent",
  "\\core\\event\\message_sent",
  "メッセージが送信されました",
  "urn:x-moodle-event-action:sent"
]
var assign_file_assessable_uploaded = [
  "assign_file_assessable_uploaded",
  "\\assignsubmission_file\\event\\assessable_uploaded",
  "アセスメント可能なファイルを割り当てる",
  "urn:x-moodle-event-action:uploaded"
]
var assignsubmission_file_submission_created = [
  "assignsubmission_file_submission_created",
  "\\assignsubmission_file\\event\\submission_created",
  "課題提出ファイル提出が作成されました",
  "urn:x-moodle-event-action:created"
]
var assignsubmission_file_submission_updated = [
  "assignsubmission_file_submission_updated",
  "\\assignsubmission_file\\event\\submission_updated",
  "課題提出ファイル提出の更新",
  "urn:x-moodle-event-action:updated"
]
var onlinetext_assign_assessable_uploaded = [
  "onlinetext_assign_assessable_uploaded",
  "\\assignsubmission_onlinetext\\event\\assessable_uploaded",
  "オンラインテキスト割り当てアセスメント可能アップロードされた",
  "urn:x-moodle-event-action:uploaded"
]
var onlinetext_assign_submission_created = [
  "onlinetext_assign_submission_created",
  "\\assignsubmission_onlinetext\\event\\submission_created",
  "オンラインテキスト割り当ての提出が作成されました",
  "urn:x-moodle-event-action:created"
]
var onlinetext_assign_submission_updated = [
  "onlinetext_assign_submission_updated",
  "\\assignsubmission_onlinetext\\event\\submission_updated",
  "オンラインテキスト割り当ての提出が更新されました",
  "urn:x-moodle-event-action:updated"
]
var course_restored = [
  "course_restored",
  "\\core\\event\\course_restored",
  "コースが復元されました",
  "urn:x-moodle-event-action:restored"
]
var course_user_report_viewed = [
  "course_user_report_viewed",
  "\\core\\event\\course_user_report_viewed",
  "コースユーザレポートを閲覧しました",
  "urn:x-moodle-event-action:viewed"
]
var group_created = [
  "group_created",
  "\\core\\event\\group_created",
  "グループが作成されました",
  "urn:x-moodle-event-action:created"
]
var group_deleted = [
  "group_deleted",
  "\\core\\event\\group_deleted",
  "グループが削除されました",
  "urn:x-moodle-event-action:deleted"
]
var group_member_added = [
  "group_member_added",
  "\\core\\event\\group_member_added",
  "グループメンバーが追加されました",
  "urn:x-moodle-event-action:added"
]
var message_viewed = [
  "message_viewed",
  "\\core\\event\\message_viewed",
  "メッセージが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var category_bin_item_created = [
  "category_bin_item_created",
  "\\tool_recyclebin\\event\\category_bin_item_created",
  "カテゴリビンアイテムが作成されました",
  "urn:x-moodle-event-action:created"
]

var course_category_updated = [
  "course_category_updated",
  "\\core\\event\\course_category_updated",
  "コースカテゴリが更新されました",
  "urn:x-moodle-event-action:updated"
]
var feedback_course_module_viewed = [
  "feedback_course_module_viewed",
  "\\mod_feedback\\event\\course_module_viewed",
  "コースモジュールが閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var page_course_module_viewed = [
  "page_course_module_viewed",
  "\\mod_page\\event\\course_module_viewed",
  "コースモジュールが閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var url_course_module_viewed = [
  "url_course_module_viewed",
  "\\mod_url\\event\\course_module_viewed",
  "コースモジュールが閲覧されました。",
  "urn:x-moodle-event-action:viewed"
]
var hsvideo_play_sent = [
  "hsvideo_play_sent",
  "\\mod_hsvideo\\event\\hsvideo_play_sent",
  "ビデオが再生された",
  "urn:x-moodle-event-action:played"
]
var hsvideo_progress_end_sent = [
  "hsvideo_progress_end_sent",
  "\\mod_hsvideo\\event\\hsvideo_progress_end_sent",
  "動画の進行終了",
  "urn:x-moodle-event-action:progress_bar_move_ended"
]
var hsvideo_progress_start_sent = [
  "hsvideo_progress_start_sent",
  "\\mod_hsvideo\\event\\hsvideo_progress_start_sent",
  "ビデオの進行開始",
  "urn:x-moodle-event-action:progress_bar_move_started"
]
var hsvideo_replay_sent = [
  "hsvideo_replay_sent",
  "\\mod_hsvideo\\event\\hsvideo_replay_sent",
  "ビデオが再生されました",
  "urn:x-moodle-event-action:replayed"
]
var hsvideo_pause_sent = [
  "hsvideo_pause_sent",
  "\\mod_hsvideo\\event\\hsvideo_pause_sent",
  "動画が一時停止しました",
  "urn:x-moodle-event-action:paused"
]
var hsvideo_stop_sent = [
  "hsvideo_stop_sent",
  "\\mod_hsvideo\\event\\hsvideo_stop_sent",
  "ビデオストップ",
  "urn:x-moodle-event-action:stopped"
]
var hsvideo_view = [
  "hsvideo_view",
  "\\mod_hsvideo\\event\\hsvideo_view",
  "hsvideo関連",
  "urn:x-moodle-event-action:viewed"
]
var batch_set_workflow_state_viewed = [
  "batch_set_workflow_state_viewed",
  "\\mod_assign\\event\\batch_set_workflow_state_viewed",
  "バッチセットのワークフロー状態が表示されました",
  "urn:x-moodle-event-action:viewed"
]

var course_module_instance_list_viewed = [
  "course_module_instance_list_viewed",
  "\\mod_assign\\event\\course_module_instance_list_viewed",
  "コースモジュールのインスタンスリストが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var feedback_viewed = [
  "feedback_viewed",
  "\\mod_assign\\event\\feedback_viewed",
  "フィードバックが表示されました",
  "urn:x-moodle-event-action:viewed"
]
var assign_submission_viewed = [
  "assign_submission_viewed",
  "\\mod_assign\\event\\submission_viewed",
  "課題提出が閲覧されました",
  "urn:x-moodle-event-action:viewed"
]
var workflow_state_updated = [
  "workflow_state_updated",
  "\\mod_assign\\event\\workflow_state_updated",
  "ワークフローの状態が更新されました",
  "urn:x-moodle-event-action:updated"
]
var report_stats_report_viewed = [
  "report_stats_report_viewed",
  "\\report_stats\\event\\report_viewed",
  "レポート統計ユーザーレポートを表示",
  "urn:x-moodle-event-action:viewed"
]
var report_stats_user_report_viewed = [
  "report_stats_user_report_viewed",
  "\\report_stats\\event\\user_report_viewed",
  "ビデオが再生されました",
  "urn:x-moodle-event-action:viewed"
]
var langpack_updated = [
  "langpack_updated",
  "\\tool_langimport\\event\\langpack_updated",
  "言語パックが更新されました",
  "urn:x-moodle-event-action:updated"
]
var category_bin_item_deleted = [
  "category_bin_item_deleted",
  "\\tool_recyclebin\\event\\category_bin_item_deleted",
  "カテゴリビン項目が削除されました",
  "urn:x-moodle-event-action:deleted"
]
var course_bin_item_created = [
  "course_bin_item_created",
  "\\tool_recyclebin\\event\\course_bin_item_created",
  "カテゴリビンアイテムが作成されました",
  "urn:x-moodle-event-action:created"
]
var course_bin_item_deleted = [
  "course_bin_item_deleted",
  "\\tool_recyclebin\\event\\course_bin_item_deleted",
  "コースビン項目が削除されました",
  "urn:x-moodle-event-action:deleted"
]
var browser_agent_view = [
  "browser_agent_view",
  "\\core\\event\\browser_agent_view",
  "ブラウザエージェントを表示",
  "urn:x-moodle-event-action:viewed"
]
var course_module_deleted = [
  "course_module_deleted",
  "\\core\\event\\course_module_deleted",
  "コースモジュールが削除されました",
  "urn:x-moodle-event-action:deleted"
]
var grade_deleted = [
  "grade_deleted",
  "\\core\\event\\grade_deleted",
  "グレードが削除されました",
  "urn:x-moodle-event-action:deleted"
]
var response_submitted = [
  "response_submitted",
  "\\mod_feedback\\event\\response_submitted",
  "応答が提出",
  "urn:x-moodle-event-action:submitted"
]
var forum_user_report_viewed = [
  "forum_user_report_viewed",
  "\\mod_forum\\event\\user_report_viewed",
  "フォーラムユーザーレポートを表示",
  "urn:x-moodle-event-action:viewed"
]
var attempt_abandoned = [
  "attempt_abandoned",
  "\\mod_quiz\\event\\attempt_abandoned",
  "放棄しようとする",
  "urn:x-moodle-event-action:abandoned"
]
var course_module_list_viewed = [
  "course_module_list_viewed",
  "\\mod_forum\\event\\course_module_instance_list_viewed",
  "フォーラムコースのインスタンスリストを表示",
  "urn:x-moodle-event-action:viewed"
]
var unknown = [
  "unknown",
  "unknown",
  "不明なステートメントです",
  "unknown"
]


var course_name_array = new Array();
// Fetch list of courses present in the database
client.query("select id, fullname from mdl_course", function (err, res){
  async.each(res.rows, function(ci, callback){
    course_name_array[ci.id] = ci.fullname;
  });
});

var read_log = 100;
var success_count = 0;
var loop_counter = 0;
var skip_count = 0;
var loop_count = 1;

function record_process(next) {
  var sql = "SELECT count(c.id) FROM " + source_table_name + "  as c left join xapi_records_processed as l on c.id = l.id where l.id is null";
  var query = client.query(sql, function(error, result) {
    record_count = result.rows[0].count;
    if(record_count < read_log) {
      read_log = record_count;
    } else {
      loop_count = Math.ceil(record_count/read_log);
    }
    next("nothing", "success", result.rows[0].count);
  });
}
record_process(function(err, res,record_count) {
  var total_log_count = read_log * loop_count;
  log_msg = "------------------------Configuration Details-----------------------\n";
  log_msg += "   a. read_log:"   + read_log +"\n";
  log_msg += "   b. loop_count:" + loop_count+"\n";
  log_msg += "   c. Total_log:"  + (read_log * loop_count)+"\n";
  log_msg += "--------------------------------------------------------------------\n\n";
  log_msg += "2. Generating statements for the Moodle database"+"\n";
  execution_log_dump(log_msg);
  console.log(log_msg);

  async.timesSeries(loop_count, function(num, callback){
    var part_success_count = 0;
    var part_skip_count = 0;
    log_msg="Partition Iteration: "+(num+1)+"\n";
    log_msg+="Partition Start Time: "+ timechange_now(new Date().getTime())+"\n";
    execution_log_dump(log_msg);
    console.log(log_msg);

    //generating statements from the logstore table of Moodle database
    client.query("SELECT c.* FROM "+source_table_name+"  as c left join xapi_records_processed as l on c.id = l.id where l.id is null  limit "+read_log, function(err, res) {
      var xapis=[];
      async.each(res.rows, function(i, callback){
        var xapi = {};
        xapi.actor = {};
        xapi.verb = {};
        xapi.context = {};
        xapi.object = {};
        xapi.actor.objectType = "Agent";
        xapi.actor.name = "";
        xapi.actor.account = {};
        xapi.actor.account.name = i.userid;
        xapi.actor.account.homePage = config.homepage;
        xapi.verb.id="";
        xapi.verb.display = {};
        xapi.verb.display['en'] = i.action;
        xapi.context.contextActivities = {};
        xapi.context.contextActivities.category = [];
        var category={};
        category.objectType ="Activity";
        category.id =  config.category.id;
        category.definition = {};
        category.definition.type = config.category.definition.type;
        category.definition.name = {};
        category.definition.name['en'] = config.category.definition.name;
        category.definition.description = {};
        category.definition.description['en'] = config.category.definition.description;
        xapi.context.contextActivities.category.push(category);
        xapi.context.platform= config.platform;
        xapi.context.language= config.language;
        xapi.object.definition = {};
        xapi.object.definition.name = {};
        if (i.timecreated !== null) {
          xapi.timestamp = {};
          xapi.timestamp = timechange(i.timecreated);
        }
        var status =0;
        console.log("eventname:" + i.eventname);
        switch (i.eventname) {
          case course_viewed[1]:
            xapi.verb.id = course_viewed[3];
            xapi.object.objectType = "Activity";
            xapi.object.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            xapi.object.definition.type="";
            xapi.object.definition.type = 'http://adlnet.gov/expapi/activities/module';
            xapi.object.definition.name['en'] = "course_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_viewed";
            break;
          case user_loggedin[1]:
            xapi.verb.id = user_loggedin[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "user_loggedin";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_loggedin";
            break;
          case user_login_failed[1]:
            xapi.verb.id = user_login_failed[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "user_login_failed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_login_failed";
            break;
          case user_password_updated[1]:
            xapi.verb.id = user_password_updated[3];
            xapi.object.id = xapi.actor.account.homePage+'/user/profile.php?id='+ i.objectid;
            xapi.object.definition.name['en'] = "user_password_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_password_updated";
            break;
          case user_loggedout[1]:
            xapi.verb.id = user_loggedout[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "user_loggedout";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_loggedout";
            break;
          case user_profile_viewed[1]:
            xapi.verb.id = user_profile_viewed[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/user/profile.php?id='+ i.objectid;
            xapi.object.definition.name['en'] = "user_profile_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_profile_viewed";
            break;
          case quiz_course_module_viewed[1]:
            xapi.verb.id = quiz_course_module_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/quiz/view.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "quiz_course_module_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="quiz_course_module_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/module";
            break;
          case forum_course_module_viewed[1]:
            xapi.verb.id = forum_course_module_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/forum/view.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "forum_course_module_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="forum_course_module_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/module";
            break;
          case book_course_module_viewed[1]:
            xapi.verb.id = book_course_module_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/book/view.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "book_course_module_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="book_course_module_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/module";
            break;
          case resource_course_module_viewed[1]:
            xapi.verb.id = resource_course_module_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/resource/view.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "resource_course_module_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="resource_course_module_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/module";
            break;
          case scorm_course_module_viewed[1]:
            xapi.verb.id = scorm_course_module_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/scorm/view.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "scorm_course_module_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="scorm_course_module_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/module";
            break;
          case workshop_course_module_viewed[1]:
            xapi.verb.id = workshop_course_module_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/workshop/view.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "workshop_course_module_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="workshop_course_module_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/module";
            break;
          case attempt_viewed[1]:
            xapi.verb.id = attempt_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/quiz/view.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "attempt_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="attempt_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assessment";
            break;
          case attempt_summary_viewed[1]:
            xapi.verb.id = attempt_summary_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/quiz/summary.php?attempt='+ i.objectid+'&cmid'+i.contextinstanceid;
            xapi.object.definition.name['en'] = "attempt_summary_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="attempt_summary_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assessment";
            break;
          case attempt_preview_started [1]:
            xapi.verb.id = attempt_preview_started [3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/quiz/attempt.php?attempt='+ i.objectid+'&cmid'+i.contextinstanceid;
            xapi.object.definition.name['en'] = "attempt_preview_started";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="attempt_preview_started";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assessment";
            break;
          case attempt_reviewed[1]:
            xapi.verb.id = attempt_reviewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/quiz/view.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "attempt_reviewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="attempt_reviewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assessment";
            break;
          case attempt_started[1]:
            xapi.verb.id = attempt_started[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/quiz/attempt.php?attempt='+ i.objectid+'&cmid'+i.contextinstanceid;
            xapi.object.definition.name['en'] = "attempt_started";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="attempt_started";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assessment";
            break;
          case attempt_submitted[1]:
            xapi.verb.id = attempt_submitted[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/quiz/view.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "attempt_submitted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="attempt_submitted";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assessment";
            break;
          case quiz_report_viewed[1]:
            xapi.verb.id = quiz_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/quiz/report.php?id='+ i.contextinstanceid+'&mode=overview';
            xapi.object.definition.name['en'] = "quiz_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="quiz_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assessment";
            break;
          case edit_page_viewed[1]:
            xapi.verb.id = edit_page_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/quiz/edit.php?cmid='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "edit_page_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="edit_page_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assessment";
            break;
          case chapter_viewed[1]:
            xapi.verb.id = chapter_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/book/view.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "chapter_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="chapter_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/book";
            break;
          case chapter_printed[1]:
            xapi.verb.id = chapter_printed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/book/tool/print/index.php?id='+ i.contextinstanceid+'&chapterid='+i.objectid;
            xapi.object.definition.name['en'] = "chapter_printed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="chapter_printed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/book";
            break;
          case book_printed[1]:
            xapi.verb.id = book_printed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/book/tool/print/index.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "book_printed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="book_printed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/book";
            break;
          case submission_viewed[1]:
            xapi.verb.id = submission_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/workshop/submission.php?cmid='+ i.contextinstanceid+'&id='+i.objectid;
            xapi.object.definition.name['en'] = "submission_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="submission_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/workshop";
            break;
          case submission_created[1]:
            client.query("select * from mdl_workshop_submissions where mdl_workshop_submissions.id = "+i.objectid,function (err, res){
              cal_timestamp = timechange(res.rows[0].timecreated);
              console.log(res.rows[0].timecreated);
              xapi.timestamp={};
              xapi.timestamp=cal_timestamp;
            });
            sleep(1000);
            xapi.verb.id = submission_created[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/workshop/submission.php?cmid='+ i.contextinstanceid+'&id=&edit=on';
            xapi.object.definition.name['en'] = "submission_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="submission_created";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/workshop";
            break;
          case submission_updated[1]:
            xapi.verb.id = submission_updated[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/workshop/submission.php?cmid='+ i.contextinstanceid+'&id=&edit=on';
            xapi.object.definition.name['en'] = "submission_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="submission_updated";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/workshop";
            break;
          case phase_switched[1]:
            xapi.verb.id = phase_switched[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/workshop/switchphase.php?cmid='+ i.contextinstanceid+'&phase='+i.objectid;;
            xapi.object.definition.name['en'] = "phase_switched";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="phase_switched";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/workshop";
            break;
          case workshop_assessable_uploaded[1]:
            xapi.verb.id = workshop_assessable_uploaded[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/workshop/submission.php?cmid='+ i.contextinstanceid+'&id='+i.objectid;
            xapi.object.definition.name['en'] = "workshop_assessable_uploaded";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="workshop_assessable_uploaded";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/workshop";
            break;
          case submission_assessed[1]:
            client.query("select * from mdl_workshop_assessments where mdl_workshop_assessments.id ="+i.objectid,function (err, res){
              cal_timestamp = timechange(res.rows[0].timecreated);
              console.log(res.rows[0].timecreated);
              xapi.timestamp={};
              xapi.timestamp=cal_timestamp;
            });
            sleep(1000);
            xapi.verb.id = submission_assessed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/workshop/assessment.php?asid='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "submission_assessed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="submission_assessed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/workshop";
            break;
          case subscription_deleted[1]:
            xapi.verb.id = subscription_deleted[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/forum/subscribers.php?id='+i.objectid+'&edit=on';
            xapi.object.definition.name['en'] = "subscription_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="subscription_deleted";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
            break;
          case subscription_created[1]:
            xapi.verb.id = subscription_created[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/forum/subscribers.php?id='+i.objectid+'&edit=on';
            xapi.object.definition.name['en'] = "subscription_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="subscription_created";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
            break;
          case forum_assessable_uploaded[1]:
            xapi.verb.id = forum_assessable_uploaded[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/forum/post.php?forum='+i.objectid;
            xapi.object.definition.name['en'] = "forum_assessable_uploaded";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="forum_assessable_uploaded";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
            break;
          case discussion_created[1]:
            xapi.verb.id = discussion_created[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/forum/post.php?forum='+i.objectid;
            xapi.object.definition.name['en'] = "discussion_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="discussion_created";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
            break;
          case  discussion_subscription_created[1]:
            xapi.verb.id = discussion_subscription_created[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/forum/post.php?forum='+i.objectid;
            xapi.object.definition.name['en'] = "discussion_subscription_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="discussion_subscription_created";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
            break;
          case subscribers_viewed[1]:
            xapi.verb.id = subscribers_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/forum/subscribers.php?id='+i.objectid;
            xapi.object.definition.name['en'] = "subscribers_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="subscribers_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
            break;
          case discussion_viewed[1]:
            xapi.verb.id = discussion_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/forum/discuss.php?d='+i.objectid;
            xapi.object.definition.name['en'] = "discussion_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="discussion_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
            break;
          case post_updated[1]:
            xapi.verb.id = post_updated[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/forum/post.php?edit='+i.objectid;
            xapi.object.definition.name['en'] = "post_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="post_updated";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
            break;
          case post_deleted[1]:
            xapi.verb.id = post_deleted[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/forum/post.php?delete='+i.objectid;
            xapi.object.definition.name['en'] = "post_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="post_deleted";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
            break;
          case discussion_deleted[1]:
            xapi.verb.id = discussion_deleted[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id =  ''+xapi.actor.account.homePage+'/mod/forum/post.php?delete='+i.objectid;
            xapi.object.definition.name['en'] = "discussion_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="discussion_deleted";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
            break;
          case course_searched[1]:
            xapi.verb.id = course_searched[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/forum/search.php?id='+i.objectid+'&search=ds';
            xapi.object.definition.name['en'] = "course_searched";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_searched";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
            break;
          case post_created[1]:
            xapi.verb.id = post_created[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/forum/post.php?reply='+i.objectid+'#mformforum';
            xapi.object.definition.name['en'] = "post_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="post_created";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
            break;
          case discussion_subscription_deleted[1]:
            xapi.verb.id = discussion_subscription_deleted[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/forum/view.php?f='+i.objectid;
            xapi.object.definition.name['en'] = "discussion_subscription_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="discussion_subscription_deleted";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
            break;
          case all_submissions_downloaded[1]:
            xapi.verb.id = all_submissions_downloaded[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=grading';
            xapi.object.definition.name['en'] = "all_submissions_downloaded";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="all_submissions_downloaded";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assign";
            break;
          case assign_assessable_submitted[1]:
            client.query("select * from mdl_assign_submission where mdl_assign_submission.id ="+i.objectid,function (err, res){
              cal_timestamp = timechange(res.rows[0].timecreated);
              console.log(cal_timestamp);
              xapi.timestamp={};
              xapi.timestamp=cal_timestamp;
            });
            sleep(1000);
            xapi.verb.id = assign_assessable_submitted[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=editsubmission';
            xapi.object.definition.name['en'] = "assign_assessable_submitted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="assign_assessable_submitted";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assign";
            break;
          case grading_table_viewed[1]:
            xapi.verb.id = grading_table_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=grading';
            xapi.object.definition.name['en'] = "grading_table_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="grading_table_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assign";
            break;
          case assign_submission_status_viewed[1]:
            xapi.verb.id = assign_submission_status_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "assign_submission_status_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="assign_submission_status_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assign";
            break;
          case grading_form_viewed[1]:
            xapi.verb.id = grading_form_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&rownum=0&action=grader&userid='+i.userid;
            xapi.object.definition.name['en'] = "grading_form_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="grading_form_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assign";
            break;
          case assign_submission_graded[1]:
            client.query("select * from mdl_assign_grades  where mdl_assign_grades.id="+i.objectid,function (err, res){
              cal_timestamp = timechange(res.rows[0].timecreated);
              console.log(res.rows[0].timecreated);
              xapi.timestamp={};
              xapi.timestamp=cal_timestamp;
            });
            sleep(1000);
            xapi.verb.id = assign_submission_graded[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&rownum=0&action=grader&userid='+i.userid;
            xapi.object.definition.name['en'] = "assign_submission_graded";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="assign_submission_graded";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assign";
            break;
          case submission_locked[1]:
            xapi.verb.id = submission_locked[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=grading';
            xapi.object.definition.name['en'] = "submission_locked";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="submission_locked";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assign";
            break;
          case extension_granted[1]:
            xapi.verb.id = extension_granted[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=grading';
            xapi.object.definition.name['en'] = "extension_granted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="extension_granted";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assign";
            break;
          case assign_submission_form_viewed[1]:
            xapi.verb.id = assign_submission_form_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=editsubmission';
            xapi.object.definition.name['en'] = "assign_submission_form_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="assign_submission_form_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assign";
            break;
          case user_graded[1]:
            xapi.verb.id = user_graded[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/grade/edit/tree/index.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "user_graded";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_graded";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/grade";
            break;
          case comment_created[1]:
            xapi.verb.id = comment_created[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "comment_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="comment_created";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assign";
            break;
          case comment_deleted[1]:
            xapi.verb.id = comment_deleted[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "comment_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="comment_deleted";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assign";
            break;
          case grader_grade_report_viewed[1]:
            xapi.verb.id = grader_grade_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/grade/report/grader/index.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "grader_grade_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="grader_grade_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/grade";
            break;
          case history_grade_report_viewed[1]:
            xapi.verb.id = history_grade_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/grade/report/history/index.php';
            xapi.object.definition.name['en'] = "history_grade_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="history_grade_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/grade";
            break;
          case outcome_grade_report_viewed[1]:
            xapi.verb.id = outcome_grade_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/grade/report/outcomes/index.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "outcome_grade_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="outcome_grade_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/grade";
            break;
          case overview_grade_report_viewed[1]:
            xapi.verb.id = overview_grade_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/grade/report/overview/index.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "overview_grade_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="overview_grade_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/grade";
            break;
          case singleview_grade_report_viewed[1]:
            xapi.verb.id = singleview_grade_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/grade/report/singleview/index.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "singleview_grade_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="singleview_grade_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/grade";
            break;
          case user_grade_report_viewed[1]:
            xapi.verb.id = user_grade_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/grade/report/user/index.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "user_grade_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_grade_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/grade";
            break;
          case log_report_viewed[1]:
            xapi.verb.id = log_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/report/log/index.php?id=0';
            xapi.object.definition.name['en'] = "log_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="log_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/report";
            break;
          case outline_report_viewed[1]:
            xapi.verb.id = outline_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/report/outline/user.php?course='+i.courseid+'&id='+i.userid+'&mode=outline';
            xapi.object.definition.name['en'] = "outline_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="outline_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/report";
            break;
          case loglive_report_viewed[1]:
            xapi.verb.id = loglive_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/report/loglive/index.php';
            xapi.object.definition.name['en'] = "loglive_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="loglive_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/report";
            break;
          case user_list_viewed[1]:
            xapi.verb.id =  user_list_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/user/index.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "user_list_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_list_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/participants";
            break;
          case scorm_report_viewed[1]:
            xapi.verb.id = scorm_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/scorm/report.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "scorm_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="scorm_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/scorm";
            break
          case sco_launched[1]:
            xapi.verb.id = sco_launched[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/scorm/view.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "sco_launched";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="sco_launched";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/scorm";
            break;
          case scorm_status_submitted[1]:
            xapi.verb.id = scorm_status_submitted[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/scorm/view.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "scorm_status_submitted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="scorm_status_submitted";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/scorm";
            break;
          case outline_activity_report_viewed[1]:
            xapi.verb.id = outline_activity_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/report/outline/index.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "outline_activity_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="outline_activity_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/report";
            break;
          case log_user_report_viewed[1]:
            xapi.verb.id = log_user_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/report/log/user.php?id='+i.contextinstanceid+'&course='+i.courseid;
            xapi.object.definition.name['en'] = "log_user_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="log_user_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/report";
            break;
          case participation_report_viewed[1]:
            xapi.verb.id = participation_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/report/participation/index.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "participation_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="participation_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/report";
            break;
          case workshop_assessment_evaluated[1]:
            xapi.verb.id = workshop_assessment_evaluated[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/workshop/view.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "workshop_assessment_evaluated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="workshop_assessment_evaluated";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/workshop";
            break;
          case workshop_assessment_reevaluated[1]:
            xapi.verb.id = workshop_assessment_reevaluated[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/workshop/view.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "workshop_assessment_reevaluated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="workshop_assessment_reevaluated";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/workshop";
            break;
          case workshop_submission_reassessed[1]:
            xapi.verb.id = workshop_submission_reassessed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/workshop/assessment.php?asid='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "workshop_submission_reassessed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="workshop_submission_reassessed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/workshop";
            break;
          case user_updated[1]:
            xapi.verb.id = user_updated[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/user/editadvanced.php?id='+ i.contextinstanceid+'&course='+i.courseid;
            xapi.object.definition.name['en'] = "user_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_updated";
            break;
          case user_loggedinas[1]:
            xapi.verb.id = user_loggedinas[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/user/profile.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "user_loggedinas";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_loggedinas";
            break;
          case user_enrolment_updated[1]:
            xapi.verb.id = user_enrolment_updated[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/user/index.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "user_enrolment_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_enrolment_updated";
            break;
          case user_enrolment_deleted[1]:
            xapi.verb.id = user_enrolment_deleted[3]
            xapi.object.id = ''+xapi.actor.account.homePage+'/user/index.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "user_enrolment_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_enrolment_deleted";
            break;
          case user_enrolment_created[1]:
            xapi.verb.id = user_enrolment_created[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/user/index.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "user_enrolment_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_enrolment_created";
            break;
          case user_deleted[1]:
            xapi.verb.id = user_deleted[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/admin/user.php';
            xapi.object.definition.name['en'] = "user_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_deleted";
            break;
          case user_created[1]:
            xapi.verb.id = user_created[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/user/editadvanced.php?id=-1';
            xapi.object.definition.name['en'] = "user_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="user_created";
            break;
          case dashboard_viewed[1]:
            xapi.verb.id = dashboard_viewed[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "dashboard_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="dashboard_viewed";
            break;
          case course_updated[1]:
            xapi.verb.id = course_updated[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/course/edit.php?id='+i.contextinstanceid+'&returnto=catmanage';
            xapi.object.definition.name['en'] = "course_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_updated";
            break;
          case course_module_updated[1]:
            xapi.verb.id = course_module_updated[3];
            xapi.object.id =  ''+xapi.actor.account.homePage+'/course/modedit.php?update='+i.contextinstanceid+'&return=0&sr=0';
            xapi.object.definition.name['en'] = "course_module_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_module_updated";
            break;
          case course_module_created[1]:
            xapi.verb.id = course_module_created[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "course_module_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_module_created";
            break;

          case course_category_created[1]:
            xapi.verb.id = course_category_created[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/course/editcategory.php?parent='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "course_category_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_category_created";
            break;
          case cohort_updated[1]:
            xapi.verb.id = cohort_updated[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/cohort/index.php?&contextid='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "cohort_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="cohort_updated";
            break;
          case cohort_member_removed[1]:
            xapi.verb.id = cohort_member_removed[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/cohort/assign.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "cohort_member_removed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="cohort_member_removed";
            break;
          case cohort_member_added[1]:
            xapi.verb.id = cohort_member_added[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/cohort/assign.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "cohort_member_added";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="cohort_member_added";
            break;
          case cohort_deleted[1]:
            xapi.verb.id = cohort_deleted[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/cohort/index.php?contextid='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "cohort_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="cohort_deleted";
            break;
          case cohort_created[1]:
            xapi.verb.id = cohort_created[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/cohort/edit.php?contextid='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "cohort_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="cohort_created";
            break;
          case enrol_instance_deleted[1]:
            xapi.verb.id = enrol_instance_deleted[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/course/management.php';
            xapi.object.definition.name['en'] = "enrol_instance_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="enrol_instance_deleted";
            break;
          case role_assigned[1]:
            xapi.verb.id = role_assigned[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/admin/roles/assign.php?contextid=1';
            xapi.object.definition.name['en'] = "role_assigned";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="role_assigned";
            break;
          case role_capabilities_updated[1]:
            xapi.verb.id = role_capabilities_updated[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/admin/roles/assign.php?contextid=1';
            xapi.object.definition.name['en'] = "role_capabilities_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="role_capabilities_updated";
            break;
          case role_unassigned[1]:
            xapi.verb.id = role_unassigned[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/admin/roles/assign.php?contextid=1';
            xapi.object.definition.name['en'] = "role_unassigned";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="role_unassigned";
            break;
          case tool_capability_report_viewed[1]:
            xapi.verb.id = tool_capability_report_viewed[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/admin/tool/capability/index.php';
            xapi.object.definition.name['en'] = "tool_capability_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="tool_capability_report_viewed";
            break;
          case course_content_deleted[1]:
            xapi.verb.id = course_content_deleted[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/course/delete.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "course_content_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_content_deleted";
            break;
          case course_deleted[1]:
            xapi.verb.id = course_deleted[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/cohort/edit.php?contextid='+i.courseid;
            xapi.object.definition.name['en'] = "course_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_deleted";
            break;
          case course_module_completion_updated[1]:
            xapi.verb.id = course_module_completion_updated[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=editsubmission';
            xapi.object.definition.name['en'] = "course_module_completion_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_module_completion_updated";
            break;
          case course_section_updated[1]:
            xapi.verb.id = course_section_updated[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/course/editsection.php?id='+i.objectid+'&sr';
            xapi.object.definition.name['en'] = "course_section_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_section_updated";
            break;
          case email_failed[1]:
            xapi.verb.id = email_failed[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=editsubmission';
            xapi.object.definition.name['en'] = "email_failed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="email_failed";
            break;
          case enrol_instance_created[1]:
            xapi.verb.id = enrol_instance_created[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/course/edit.php?category=1&returnto=catmanage';
            xapi.object.definition.name['en'] = "enrol_instance_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="enrol_instance_created";
            break;
          case message_sent[1]:
            xapi.verb.id = message_sent[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=editsubmission';
            xapi.object.definition.name['en'] = "message_sent";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="message_sent";
            break;
          case calendar_event_created[1]:
            xapi.verb.id = calendar_event_created[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="";
            break;
          case calendar_event_deleted[1]:
            xapi.verb.id = calendar_event_deleted[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "calendar_event_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="calendar_event_deleted";
            break;
          case calendar_event_updated[1]:
            xapi.verb.id = calendar_event_updated[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "calendar_event_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="calendar_event_updated";
            break;
          case assign_file_assessable_uploaded[1]:
            xapi.verb.id = assign_file_assessable_uploaded[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=editsubmission';
            xapi.object.definition.name['en'] = "assign_file_assessable_uploaded";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="assign_file_assessable_uploaded";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assignsubmission";
            break;
          case assignsubmission_file_submission_created[1]:
            xapi.verb.id = assignsubmission_file_submission_created[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=editsubmission';
            xapi.object.definition.name['en'] = "assignsubmission_file_submission_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="assignsubmission_file_submission_created";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assignsubmission";
            break;
          case assignsubmission_file_submission_updated[1]:
            xapi.verb.id = assignsubmission_file_submission_updated[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=editsubmission';
            xapi.object.definition.name['en'] = "assignsubmission_file_submission_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="assignsubmission_file_submission_updated";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assignsubmission";
            break;
          case onlinetext_assign_assessable_uploaded[1]:
            xapi.verb.id = onlinetext_assign_assessable_uploaded[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=editsubmission';
            xapi.object.definition.name['en'] = "onlinetext_assign_assessable_uploaded";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="onlinetext_assign_assessable_uploaded";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assignsubmission";
            break;
          case onlinetext_assign_submission_created[1]:
            xapi.verb.id = onlinetext_assign_submission_created[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=editsubmission';
            xapi.object.definition.name['en'] = "onlinetext_assign_submission_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="onlinetext_assign_submission_created";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assignsubmission";
            break;
          case onlinetext_assign_submission_updated[1]:
            xapi.verb.id = onlinetext_assign_submission_updated[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/assign/view.php?id='+i.contextinstanceid+'&action=editsubmission';
            xapi.object.definition.name['en'] = "onlinetext_assign_submission_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="onlinetext_assign_submission_updated";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assignsubmission";
            break;
          case course_user_report_viewed[1]:
            xapi.verb.id = course_user_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/course/user.php?mode=grade&id='+i.contextinstanceid+'&user='+i.userid;
            xapi.object.definition.name['en'] = "course_user_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_user_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/report";
            break;
          case course_restored[1]:
            xapi.verb.id = course_restored[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/backup/restorefile.php';
            xapi.object.definition.name['en'] = "course_restored";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_restored";
            break;
          case group_created[1]:
            xapi.verb.id = group_created[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/group/index.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "group_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="group_created";
            break;
          case group_deleted[1]:
            xapi.verb.id = group_deleted[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/group/index.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "group_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="group_deleted";
            break;
          case group_member_added[1]:
            xapi.verb.id = group_member_added[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/group/members.php?group='+i.objectid;
            xapi.object.definition.name['en'] = "group_member_added";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="group_member_added";
            break;
          case message_viewed[1]:
            xapi.verb.id = message_viewed[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/message/index.php?user='+i.userid+'&id='+i.courseid;
            xapi.object.definition.name['en'] = "message_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="message_viewed";
            break;
          case category_bin_item_created[1]:
            xapi.verb.id = category_bin_item_created[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/course/management.php';
            xapi.object.definition.name['en'] = "category_bin_item_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="category_bin_item_created";
            break;
          case course_category_updated[1]:
            xapi.verb.id = course_category_updated[3];
            xapi.object.id = ''+xapi.actor.account.homePage+'/course/editcategory.php?id='+i.contextinstanceid;
            xapi.object.definition.name['en'] = "course_category_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_category_updated";
            break;
          case feedback_course_module_viewed[1]:
            xapi.verb.id = feedback_course_module_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/feedback/view.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "feedback_course_module_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="feedback_course_module_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/module";
            break;
          case page_course_module_viewed[1]:
            xapi.verb.id = page_course_module_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/page/view.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "page_course_module_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="page_course_module_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/module";
            break;
          case url_course_module_viewed[1]:
            xapi.verb.id = url_course_module_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/url/view.php?id='+ i.contextinstanceid;
            xapi.object.definition.name['en'] = "";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/module";
            break;
          case hsvideo_play_sent[1]:
            xapi.verb.id = hsvideo_play_sent[3];
            xapi.object.objectType = "Activity";
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/hsvideo/view.php?id='+ i.courseid;
            xapi.object.definition.type="";
            xapi.object.definition.type = 'http://activitystreams/schema/1.0/video';
            xapi.object.definition.name['en'] = "url_course_module_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="url_course_module_viewed";
            break;
          case hsvideo_progress_end_sent[1]:
            xapi.verb.id = hsvideo_progress_end_sent[3];
            xapi.object.objectType = "Activity";
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/hsvideo/view.php?id='+ i.courseid;
            xapi.object.definition.type="";
            xapi.object.definition.type = 'http://activitystreams/schema/1.0/video';
            xapi.object.definition.name['en'] = "hsvideo_progress_end_sent";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="hsvideo_progress_end_sent";
            break;
          case hsvideo_progress_start_sent[1]:
            xapi.verb.id = hsvideo_progress_start_sent[3];
            xapi.object.objectType = "Activity";
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/hsvideo/view.php?id='+ i.courseid;
            xapi.object.definition.type="";
            xapi.object.definition.type = 'http://activitystreams/schema/1.0/video';
            xapi.object.definition.name['en'] = "hsvideo_progress_start_sent";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="hsvideo_progress_start_sent";
            break;
          case hsvideo_replay_sent[1]:
            xapi.verb.id = hsvideo_replay_sent[3];
            xapi.object.objectType = "Activity";
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/hsvideo/view.php?id='+ i.courseid;
            xapi.object.definition.type="";
            xapi.object.definition.type = 'http://activitystreams/schema/1.0/video';
            xapi.object.definition.name['en'] = "hsvideo_replay_sent";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="hsvideo_replay_sent";
            break;
          case hsvideo_pause_sent[1]:
            xapi.verb.id = hsvideo_pause_sent[3];
            xapi.object.objectType = "Activity";
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/hsvideo/view.php?id='+ i.courseid;
            xapi.object.definition.type="";
            xapi.object.definition.type = 'http://activitystreams/schema/1.0/video';
            xapi.object.definition.name['en'] = "hsvideo_pause_sent";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="hsvideo_pause_sent";
            break;
          case hsvideo_stop_sent[1]:
            xapi.verb.id = hsvideo_stop_sent[3];
            xapi.object.objectType = "Activity";
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/hsvideo/view.php?id='+ i.courseid;
            xapi.object.definition.type="";
            xapi.object.definition.type = 'http://activitystreams/schema/1.0/video';
            xapi.object.definition.name['en'] = "hsvideo_stop_sent";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="hsvideo_stop_sent";
            break;
          case hsvideo_view[1]:
            xapi.verb.id = hsvideo_view[3];
            xapi.object.objectType = "Activity";
            xapi.object.id = ''+xapi.actor.account.homePage+'/mod/hsvideo/view.php?id='+ i.courseid;
            xapi.object.definition.type="";
            xapi.object.definition.type = 'http://activitystreams/schema/1.0/video';
            xapi.object.definition.name['en'] = "hsvideo_view";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="hsvideo_view";
            break;
          case batch_set_workflow_state_viewed[1]:
            xapi.verb.id = batch_set_workflow_state_viewed[3];
            xapi.object.objectType = "Activity";
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.type="";
            xapi.object.definition.type = 'http://adlnet.gov/expapi/activities/assign';
            xapi.object.definition.name['en'] = "batch_set_workflow_state_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="batch_set_workflow_state_viewed";
            break;
          case course_module_instance_list_viewed[1]:
            xapi.verb.id = course_module_instance_list_viewed[3];
            xapi.object.objectType = "Activity";
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.type="";
            xapi.object.definition.type = 'http://adlnet.gov/expapi/activities/assign';
            xapi.object.definition.name['en'] = "course_module_instance_list_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_module_instance_list_viewed";
            break;
          case feedback_viewed[1]:
            xapi.verb.id = feedback_viewed[3];
            xapi.object.objectType = "Activity";
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.type="";
            xapi.object.definition.type = 'http://adlnet.gov/expapi/activities/assign';
            xapi.object.definition.name['en'] = "feedback_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="feedback_viewed";
            break;
          case assign_submission_viewed[1]:
            xapi.verb.id = assign_submission_viewed[3];
            xapi.object.objectType = "Activity";
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.type="";
            xapi.object.definition.type = 'http://adlnet.gov/expapi/activities/assign';
            xapi.object.definition.name['en'] = "assign_submission_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="assign_submission_viewed";
            break;
          case workflow_state_updated[1]:
            xapi.verb.id = workflow_state_updated[3];
            xapi.object.objectType = "Activity";
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.type="";
            xapi.object.definition.type = 'http://adlnet.gov/expapi/activities/assign';
            xapi.object.definition.name['en'] = "workflow_state_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="workflow_state_updated";
            break;
          case report_stats_report_viewed[1]:
            xapi.verb.id = report_stats_report_viewed[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "report_stats_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="report_stats_report_viewed";
            break;
          case report_stats_user_report_viewed[1]:
            xapi.verb.id = report_stats_user_report_viewed[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "report_stats_user_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="report_stats_user_report_viewed";
            break;
          case langpack_updated[1]:
            xapi.verb.id = langpack_updated[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "langpack_updated";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="langpack_updated";
            break;
          case category_bin_item_deleted[1]:
            xapi.verb.id = category_bin_item_deleted[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "category_bin_item_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="category_bin_item_deleted";
            break;
          case course_bin_item_created[1]:
            xapi.verb.id = course_bin_item_created[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "course_bin_item_created";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_bin_item_created";
            break;
          case course_bin_item_deleted[1]:
            xapi.verb.id = course_bin_item_deleted[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "course_bin_item_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_bin_item_deleted";
            break;
          case browser_agent_view[1]:
            xapi.verb.id = browser_agent_view[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "browser_agent_view";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="browser_agent_view";
            break;
          case course_module_deleted[1]:
            xapi.verb.id = course_module_deleted[3];
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "course_module_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="course_module_deleted";
            break;
          case grade_deleted[1]:
            xapi.verb.id = grade_deleted[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "grade_deleted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="grade_deleted";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/grade";
            break;
          case response_submitted[1]:
            xapi.verb.id = response_submitted[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "response_submitted";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="response_submitted";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/feedback";
            break;
          case forum_user_report_viewed[1]:
            xapi.verb.id = forum_user_report_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "forum_user_report_viewed";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="forum_user_report_viewed";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
            break;
          case attempt_abandoned[1]:
            xapi.verb.id = attempt_abandoned[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = xapi.actor.account.homePage;
            xapi.object.definition.name['en'] = "attempt_abandoned";
            xapi.object.definition.description = {};
            xapi.object.definition.description['en'] ="attempt_abandoned";
            xapi.object.definition.type = "http://adlnet.gov/expapi/activities/assessment";
            break;
          case course_module_list_viewed[1]:
            xapi.verb.id = course_module_list_viewed[3];
            xapi.context.contextActivities.grouping = [];
            var grouping={};
            grouping.objectType ="Activity";
            grouping.id = ''+xapi.actor.account.homePage+'/course/view.php?id='+ i.courseid;
            grouping.definition = {};
            grouping.definition.type = ''+xapi.actor.account.homePage+'/activitytype/course';
            grouping.definition.name = {};
            grouping.definition.name['en'] = get_course_name(i.courseid) ;
            grouping.definition.description = {};
            xapi.context.contextActivities.grouping.push(grouping);
            xapi.object.id = xapi.actor.account.homePage;
          xapi.object.definition.name['en'] = "course_module_list_viewed";
          xapi.object.definition.description = {};
          xapi.object.definition.description['en'] ="course_module_list_viewed";
          xapi.object.definition.type = "http://adlnet.gov/expapi/activities/forum";
          break;
          default:
          xapi.verb.id = unknown[3];
          xapi.object.id = xapi.actor.account.homePage;;
          xapi.object.definition.name['en'] = "unknown";
          xapi.object.definition.description = {};
          xapi.object.definition.description['en'] ="unknown";
          status = 1;
          break;
        }
        var xApi_id = uuid.v4();
        xapi.id = xApi_id;
        if (status == 0) {
          console.log("*************Successfully converted******************");
          console.log(xapi);
          xapis.push(xapi);
          client.query("insert into xapi_records_processed(id,status,send_date) Values ( $1 , $2 , $3 ) ", [ i.id, status, 'now()'], function (err, rows) {
            success_count++;
            part_success_count++;
          });
        } else {
          log_msg="Statement Skipped in the partial execution having id ", + i.id+ " eventname "+ i.eventname+"\n";
          execution_log_dump(log_msg);
          console.log(log_msg);
          client.query("insert into xapi_records_processed(id,status,send_date) Values ( $1 , $2 , $3 )" , [ i.id , status, 'now()'], function (err, rows)  {
            skip_count++;
            part_skip_count++;
          });
        }
        loop_counter++;
        callback(null, res.rows);
      }, function(err) {
        if(err) throw err;
        var adl = require('adl-xapiwrapper');
        var mylrs = new adl.XAPIWrapper(opts);
        async.waterfall([
          function(callback) {
            mylrs.sendStatements(xapis, function(err, resp, bdy) {
              console.log('sts:' +  resp.statusCode);
              console.log('body:' +  bdy);
              if (err) {
                log_msg = "Error while transmitting xAPI statements: \n"+err+"\n";
                execution_log_dump(log_msg);
                console.log("An error occured check log file");
                sleep(1000);
                process.exit();
              }
              callback(null);
            });
          },
          function(callback) {
          }],
          function(err){
            callback(null);
          }
        );
      });
      execution_log_dump("-------------------------------------------------------------------");
      execution_log_dump(sprintf("Data Transfered [Record : %"+total_log_count.toString().length+"d].......  %4f",loop_counter,(100*(loop_counter)/total_log_count))+"%");
      execution_log_dump("-------------------------------------------------------------------\n");
      sleep(1000);
      callback(null);
    });
  }, function(err){
    if(err) throw err;
    var dt = new Date();
    var stop = dt.getTime() ;
    execution_log_dump(execution_time_message("Excecution Finised"));
    console.log(execution_time_message("Excecution Finised"));
    log_msg="Execution Summary:\n"
    log_msg+="Total Statements skipped: "+skip_count+"\n";
    log_msg+="Total Statements Successully transformed: "+success_count+"\n";
    execution_log_dump(log_msg);
    console.log(log_msg);
    client.end();
  });
});
//Random Functions
function timechange(time){
  var d = new Date( time * 1000 );
  var year  = d.getFullYear();
  var m = d.getMonth() + 1;
  var month = ( m < 10 ) ? '0' + m : m ;
  var day  = ( d.getDate() < 10 ) ? '0' + d.getDate() : d.getDate();
  var hour = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
  var min  = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
  var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
  return year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':' + sec + '+09:00';
}
function timechange_now(time){
  var d = new Date( time );
  var year  = d.getFullYear();
  var m = d.getMonth() + 1;
  var month = ( m < 10 ) ? '0' + m : m ;
  var day  = ( d.getDate() < 10 ) ? '0' + d.getDate() : d.getDate();
  var hour = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
  var min  = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
  var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
  return year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':' + sec + '+09:00';
}
function execution_time_message(msg)
{
  var dt = new Date();
  var tm = dt.getTime() ;
  var log_msg="";
  log_msg+="--------------------------------------------------------------------------------------------------\n";
  log_msg+="\t\t\t\t\t "+msg+"\n";
  log_msg+="--------------------------------------------------------------------------------------------------'\n";
  log_msg+=msg+" for Log migration/conversion of statements for host "+config.homepage+"\n";
  log_msg+='Time: '+timechange_now(tm)+"\n";
  log_msg+="--------------------------------------------------------------------------------------------------\n";
  return log_msg;
}
function execution_log_dump(msg)
{
  fs.appendFile(log_filename, msg +"\n" ,
    function (err) {
      if (err)
      {
        log_msg = "Error handling Log File: \n"+err+"\n";
        execution_log_dump(log_msg);
        console.log("An error occured check log file");
        sleep(1000);
        process.exit();
      }
    });
  return 1;
}
function get_course_name(course_id)
{
  return course_name_array[course_id];
}
