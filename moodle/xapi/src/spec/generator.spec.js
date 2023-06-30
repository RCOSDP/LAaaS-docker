/* eslint max-len: 0, max-statements: 0 */
const config = require('../config/app');
const rewire = require('rewire');
const userAttrs = {
  2: {
    hash: 'g323jbfsakj35hjkegjfdsnklkjehrjthekthsk95c3ac5ceeacd69595c861c27',
    scope: 'default'
  }
};
const courseNames = {
  3: 'course_name'
};

describe('Test generator', () => {
  describe('translate', () => {
    process.env.XAPI_GEN_LOG_LEVEL = 'off';

    describe('course_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\course_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/module');
          expect(object.definition.name.en).toBe('course_viewed');
          expect(object.definition.description.en).toBe('course_viewed');
          done();
        });
      });
    });
    describe('user_loggedin', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\user_loggedin',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:loggedin');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('user_loggedin');
          expect(object.definition.description.en).toBe('user_loggedin');
          done();
        });
      });
    });
    describe('user_loggedout', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\user_loggedout',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:loggedout');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('user_loggedout');
          expect(object.definition.description.en).toBe('user_loggedout');
          done();
        });
      });
    });
    describe('user_login_failed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\user_login_failed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:failed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('user_login_failed');
          expect(object.definition.description.en).toBe('user_login_failed');
          done();
        });
      });
    });
    describe('user_password_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\user_password_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/user/profile.php?id=${log.objectid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('user_password_updated');
          expect(object.definition.description.en).toBe('user_password_updated');
          done();
        });
      });
    });
    describe('quiz_course_module_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_quiz\\event\\course_module_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/quiz/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/module');
          expect(object.definition.name.en).toBe('quiz_course_module_viewed');
          expect(object.definition.description.en).toBe('quiz_course_module_viewed');
          done();
        });
      });
    });
    describe('forum_course_module_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\course_module_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/forum/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/module');
          expect(object.definition.name.en).toBe('forum_course_module_viewed');
          expect(object.definition.description.en).toBe('forum_course_module_viewed');
          done();
        });
      });
    });
    describe('book_course_module_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_book\\event\\course_module_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/book/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/module');
          expect(object.definition.name.en).toBe('book_course_module_viewed');
          expect(object.definition.description.en).toBe('book_course_module_viewed');
          done();
        });
      });
    });
    describe('resource_course_module_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_resource\\event\\course_module_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/resource/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/module');
          expect(object.definition.name.en).toBe('resource_course_module_viewed');
          expect(object.definition.description.en).toBe('resource_course_module_viewed');
          done();
        });
      });
    });
    describe('scorm_course_module_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        server.__set__('findScormBy', function() {
          return {
            name: 'scormname',
            course: 3,
          }
        });
        const log = {
          id: 1,
          eventname: '\\mod_scorm\\event\\course_module_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/scorm/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://id.tincanapi.com/activitytype/legacy-learning-standard');
          expect(object.definition.name.en).toBe('scormname');
          expect(object.definition.description.en).toBe('scormname');
          done();
        });
      });
    });
    describe('workshop_course_module_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_workshop\\event\\course_module_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/workshop/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/module');
          expect(object.definition.name.en).toBe('workshop_course_module_viewed');
          expect(object.definition.description.en).toBe('workshop_course_module_viewed');
          done();
        });
      });
    });
    describe('attempt_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_quiz\\event\\attempt_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/quiz/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assessment');
          expect(object.definition.name.en).toBe('attempt_viewed');
          expect(object.definition.description.en).toBe('attempt_viewed');
          done();
        });
      });
    });
    describe('attempt_summary_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_quiz\\event\\attempt_summary_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/quiz/summary.php?attempt=${log.objectid}&cmid${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assessment');
          expect(object.definition.name.en).toBe('attempt_summary_viewed');
          expect(object.definition.description.en).toBe('attempt_summary_viewed');
          done();
        });
      });
    });
    describe('attempt_reviewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_quiz\\event\\attempt_reviewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:reviewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/quiz/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assessment');
          expect(object.definition.name.en).toBe('attempt_reviewed');
          expect(object.definition.description.en).toBe('attempt_reviewed');
          done();
        });
      });
    });
    describe('attempt_started', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_quiz\\event\\attempt_started',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:started');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/quiz/attempt.php?attempt=${log.objectid}&cmid${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assessment');
          expect(object.definition.name.en).toBe('attempt_started');
          expect(object.definition.description.en).toBe('attempt_started');
          done();
        });
      });
    });
    describe('attempt_submitted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const timefinish = 1573188271;
        const timestart = 1535691025;
        server.__set__('findQuizAttemptBy', function() {
          return {
            quiz: 1,
            state: 'finished',
            timefinish: timefinish,
            timestart: timestart,
          }
        });
        server.__set__('findQuizBy', function() {
          return {
            id: 1,
            name: 'quizname'
          }
        });
        server.__set__('findGradeItemBy', function() {
          return {
            id: 1,
            gradepass: 80.00000,
          }
        });
        server.__set__('findGradeGradeBy', function() {
          return {
            rawgrade: 79.00000,
            rawgrademin: 0.00000,
            rawgrademax: 85.00000,
          }
        });
        const log = {
          id: 1,
          eventname: '\\mod_quiz\\event\\attempt_submitted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:submitted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/quiz/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assessment');
          expect(object.definition.name.en).toBe('quizname');
          expect(object.definition.description.en).toBe('quizname');

          // Result
          const result = xapi.result;
          expect(result.score.raw).toBe(79);
          expect(result.score.min).toBe(0);
          expect(result.score.max).toBe(85);
          expect(result.success).toBe(false);
          expect(result.completion).toBe(true);
          expect(result.duration).toBe(`PT${timefinish - timestart}S`);
          done();
        });
      });
    });
    describe('attempt_preview_started', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_quiz\\event\\attempt_preview_started',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:started');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/quiz/attempt.php?attempt=${log.objectid}&cmid${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assessment');
          expect(object.definition.name.en).toBe('attempt_preview_started');
          expect(object.definition.description.en).toBe('attempt_preview_started');
          done();
        });
      });
    });
    describe('edit_page_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_quiz\\event\\edit_page_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/quiz/edit.php?cmid=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assessment');
          expect(object.definition.name.en).toBe('edit_page_viewed');
          expect(object.definition.description.en).toBe('edit_page_viewed');
          done();
        });
      });
    });
    describe('quiz_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_quiz\\event\\report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/quiz/report.php?id=${log.contextinstanceid}&mode=overview`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assessment');
          expect(object.definition.name.en).toBe('quiz_report_viewed');
          expect(object.definition.description.en).toBe('quiz_report_viewed');
          done();
        });
      });
    });
    describe('user_profile_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\user_profile_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/user/profile.php?id=${log.objectid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('user_profile_viewed');
          expect(object.definition.description.en).toBe('user_profile_viewed');
          done();
        });
      });
    });
    describe('chapter_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_book\\event\\chapter_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/book/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/book');
          expect(object.definition.name.en).toBe('chapter_viewed');
          expect(object.definition.description.en).toBe('chapter_viewed');
          done();
        });
      });
    });
    describe('chapter_printed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\booktool_print\\event\\chapter_printed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:printed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/book/tool/print/index.php?id=${log.contextinstanceid}&chapterid=${log.objectid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/book');
          expect(object.definition.name.en).toBe('chapter_printed');
          expect(object.definition.description.en).toBe('chapter_printed');
          done();
        });
      });
    });
    describe('book_printed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\booktool_print\\event\\book_printed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:printed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/book/tool/print/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/book');
          expect(object.definition.name.en).toBe('book_printed');
          expect(object.definition.description.en).toBe('book_printed');
          done();
        });
      });
    });
    describe('submission_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_workshop\\event\\submission_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/workshop/submission.php?cmid=${log.contextinstanceid}&id=${log.objectid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/workshop');
          expect(object.definition.name.en).toBe('submission_viewed');
          expect(object.definition.description.en).toBe('submission_viewed');
          done();
        });
      });
    });
    describe('submission_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_workshop\\event\\submission_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/workshop/submission.php?cmid=${log.contextinstanceid}&id=&edit=on`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/workshop');
          expect(object.definition.name.en).toBe('submission_created');
          expect(object.definition.description.en).toBe('submission_created');
          done();
        });
      });
    });
    describe('submission_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_workshop\\event\\submission_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/workshop/submission.php?cmid=${log.contextinstanceid}&id=&edit=on`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/workshop');
          expect(object.definition.name.en).toBe('submission_updated');
          expect(object.definition.description.en).toBe('submission_updated');
          done();
        });
      });
    });
    describe('phase_switched', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_workshop\\event\\phase_switched',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:switched');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/workshop/switchphase.php?cmid=${log.contextinstanceid}&phase=${log.objectid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/workshop');
          expect(object.definition.name.en).toBe('phase_switched');
          expect(object.definition.description.en).toBe('phase_switched');
          done();
        });
      });
    });
    describe('workshop_assessable_uploaded', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_workshop\\event\\assessable_uploaded',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:uploaded');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/workshop/submission.php?cmid=${log.contextinstanceid}&id=${log.objectid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/workshop');
          expect(object.definition.name.en).toBe('workshop_assessable_uploaded');
          expect(object.definition.description.en).toBe('workshop_assessable_uploaded');
          done();
        });
      });
    });
    describe('submission_assessed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_workshop\\event\\submission_assessed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:assessed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/workshop/assessment.php?asid=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/workshop');
          expect(object.definition.name.en).toBe('submission_assessed');
          expect(object.definition.description.en).toBe('submission_assessed');
          done();
        });
      });
    });
    describe('subscription_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\subscription_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/forum/subscribers.php?id=${log.objectid}&edit=on`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('subscription_deleted');
          expect(object.definition.description.en).toBe('subscription_deleted');
          done();
        });
      });
    });
    describe('subscription_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\subscription_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/forum/subscribers.php?id=${log.objectid}&edit=on`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('subscription_created');
          expect(object.definition.description.en).toBe('subscription_created');
          done();
        });
      });
    });
    describe('forum_assessable_uploaded', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\assessable_uploaded',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:uploaded');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/forum/post.php?forum=${log.objectid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('forum_assessable_uploaded');
          expect(object.definition.description.en).toBe('forum_assessable_uploaded');
          done();
        });
      });
    });
    describe('discussion_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\discussion_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/forum/post.php?forum=${log.objectid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('discussion_created');
          expect(object.definition.description.en).toBe('discussion_created');
          done();
        });
      });
    });
    describe('discussion_subscription_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\discussion_subscription_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/forum/post.php?forum=${log.objectid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('discussion_subscription_created');
          expect(object.definition.description.en).toBe('discussion_subscription_created');
          done();
        });
      });
    });
    describe('subscribers_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\subscribers_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/forum/subscribers.php?id=${log.objectid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('subscribers_viewed');
          expect(object.definition.description.en).toBe('subscribers_viewed');
          done();
        });
      });
    });
    describe('discussion_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\discussion_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/forum/discuss.php?d=${log.objectid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('discussion_viewed');
          expect(object.definition.description.en).toBe('discussion_viewed');
          done();
        });
      });
    });
    describe('post_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\post_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/forum/post.php?edit=${log.objectid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('post_updated');
          expect(object.definition.description.en).toBe('post_updated');
          done();
        });
      });
    });
    describe('post_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\post_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/forum/post.php?delete=${log.objectid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('post_deleted');
          expect(object.definition.description.en).toBe('post_deleted');
          done();
        });
      });
    });
    describe('discussion_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\discussion_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/forum/post.php?delete=${log.objectid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('discussion_deleted');
          expect(object.definition.description.en).toBe('discussion_deleted');
          done();
        });
      });
    });
    describe('course_searched', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\course_searched',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:searched');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/forum/search.php?id=${log.objectid}&search=ds`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('course_searched');
          expect(object.definition.description.en).toBe('course_searched');
          done();
        });
      });
    });
    describe('post_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\post_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/forum/post.php?reply=${log.objectid}#mformforum`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('post_created');
          expect(object.definition.description.en).toBe('post_created');
          done();
        });
      });
    });
    describe('discussion_subscription_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\discussion_subscription_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/forum/view.php?f=${log.objectid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('discussion_subscription_deleted');
          expect(object.definition.description.en).toBe('discussion_subscription_deleted');
          done();
        });
      });
    });
    describe('all_submissions_downloaded', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_assign\\event\\all_submissions_downloaded',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:downloaded');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=grading`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('all_submissions_downloaded');
          expect(object.definition.description.en).toBe('all_submissions_downloaded');
          done();
        });
      });
    });
    describe('assign_assessable_submitted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_assign\\event\\assessable_submitted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:submitted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=editsubmission`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('assign_assessable_submitted');
          expect(object.definition.description.en).toBe('assign_assessable_submitted');
          done();
        });
      });
    });
    describe('grading_table_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_assign\\event\\grading_table_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=grading`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('grading_table_viewed');
          expect(object.definition.description.en).toBe('grading_table_viewed');
          done();
        });
      });
    });
    describe('assign_submission_status_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_assign\\event\\submission_status_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('assign_submission_status_viewed');
          expect(object.definition.description.en).toBe('assign_submission_status_viewed');
          done();
        });
      });
    });
    describe('grading_form_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_assign\\event\\grading_form_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&rownum=0&action=grader&userid=${log.userid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('grading_form_viewed');
          expect(object.definition.description.en).toBe('grading_form_viewed');
          done();
        });
      });
    });
    describe('assign_submission_graded', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_assign\\event\\submission_graded',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:graded');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&rownum=0&action=grader&userid=${log.userid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('assign_submission_graded');
          expect(object.definition.description.en).toBe('assign_submission_graded');
          done();
        });
      });
    });
    describe('submission_locked', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_assign\\event\\submission_locked',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:locked');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=grading`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('submission_locked');
          expect(object.definition.description.en).toBe('submission_locked');
          done();
        });
      });
    });
    describe('extension_granted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_assign\\event\\extension_granted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:granted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=grading`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('extension_granted');
          expect(object.definition.description.en).toBe('extension_granted');
          done();
        });
      });
    });
    describe('assign_submission_form_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_assign\\event\\submission_form_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=editsubmission`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('assign_submission_form_viewed');
          expect(object.definition.description.en).toBe('assign_submission_form_viewed');
          done();
        });
      });
    });
    describe('user_graded', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        server.__set__('findGradeGradeBy', function() {
          return {
            rawgrade: 79.00000,
            rawgrademin: 0.00000,
            rawgrademax: 85.00000,
          }
        });
        server.__set__('findGradeItemBy', function() {
          return {
            id: 1,
            gradepass: 80.00000,
            itemname: 'itemname'
          }
        });
        const log = {
          id: 1,
          eventname: '\\core\\event\\user_graded',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:graded');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/grade/edit/tree/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/grade');
          expect(object.definition.name.en).toBe('itemname');
          expect(object.definition.description.en).toBe('itemname');

          // Result
          const result = xapi.result;
          expect(result.score.raw).toBe(79);
          expect(result.score.min).toBe(0);
          expect(result.score.max).toBe(85);
          expect(result.success).toBe(false);
          done();
        });
      });
    });
    describe('comment_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\assignsubmission_comments\\event\\comment_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('comment_created');
          expect(object.definition.description.en).toBe('comment_created');
          done();
        });
      });
    });
    describe('comment_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\assignsubmission_comments\\event\\comment_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('comment_deleted');
          expect(object.definition.description.en).toBe('comment_deleted');
          done();
        });
      });
    });
    describe('grader_grade_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\gradereport_grader\\event\\grade_report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/grade/report/grader/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/grade');
          expect(object.definition.name.en).toBe('grader_grade_report_viewed');
          expect(object.definition.description.en).toBe('grader_grade_report_viewed');
          done();
        });
      });
    });
    describe('history_grade_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\gradereport_history\\event\\grade_report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/grade/report/history/index.php`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/grade');
          expect(object.definition.name.en).toBe('history_grade_report_viewed');
          expect(object.definition.description.en).toBe('history_grade_report_viewed');
          done();
        });
      });
    });
    describe('outcome_grade_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\gradereport_outcomes\\event\\grade_report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/grade/report/outcomes/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/grade');
          expect(object.definition.name.en).toBe('outcome_grade_report_viewed');
          expect(object.definition.description.en).toBe('outcome_grade_report_viewed');
          done();
        });
      });
    });
    describe('overview_grade_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\gradereport_overview\\event\\grade_report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/grade/report/overview/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/grade');
          expect(object.definition.name.en).toBe('overview_grade_report_viewed');
          expect(object.definition.description.en).toBe('overview_grade_report_viewed');
          done();
        });
      });
    });
    describe('singleview_grade_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\gradereport_singleview\\event\\grade_report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/grade/report/singleview/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/grade');
          expect(object.definition.name.en).toBe('singleview_grade_report_viewed');
          expect(object.definition.description.en).toBe('singleview_grade_report_viewed');
          done();
        });
      });
    });
    describe('user_grade_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\gradereport_user\\event\\grade_report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/grade/report/user/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/grade');
          expect(object.definition.name.en).toBe('user_grade_report_viewed');
          expect(object.definition.description.en).toBe('user_grade_report_viewed');
          done();
        });
      });
    });
    describe('log_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\report_log\\event\\report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/report/log/index.php?id=0`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/report');
          expect(object.definition.name.en).toBe('log_report_viewed');
          expect(object.definition.description.en).toBe('log_report_viewed');
          done();
        });
      });
    });
    describe('outline_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\report_outline\\event\\report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/report/outline/user.php?course=${log.courseid}&id=${log.userid}&mode=outline`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/report');
          expect(object.definition.name.en).toBe('outline_report_viewed');
          expect(object.definition.description.en).toBe('outline_report_viewed');
          done();
        });
      });
    });
    describe('loglive_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\report_loglive\\event\\report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/report/loglive/index.php`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/report');
          expect(object.definition.name.en).toBe('loglive_report_viewed');
          expect(object.definition.description.en).toBe('loglive_report_viewed');
          done();
        });
      });
    });
    describe('user_list_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\user_list_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/user/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/participants');
          expect(object.definition.name.en).toBe('user_list_viewed');
          expect(object.definition.description.en).toBe('user_list_viewed');
          done();
        });
      });
    });
    describe('scorm_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        server.__set__('findScormBy', function() {
          return {
            name: 'scormname',
            course: 3,
          }
        });
        const log = {
          id: 1,
          eventname: '\\mod_scorm\\event\\report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5,
          other: 'a:2:{s:7:"scormid";s:2:"31";s:4:"mode";s:5:"basic";}'
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/scorm/report.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://id.tincanapi.com/activitytype/legacy-learning-standard');
          expect(object.definition.name.en).toBe('scormname');
          expect(object.definition.description.en).toBe('scormname');
          done();
        });
      });
    });
    describe('sco_launched', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        server.__set__('findScormScoBy', function() {
          return {
            launch: 'launch',
            title: 'title',
          }
        });
        const log = {
          id: 1,
          eventname: '\\mod_scorm\\event\\sco_launched',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5,
          other: 'a:2:{s:10:"instanceid";s:2:"17";s:13:"loadedcontent";s:71:"https://example.com/pluginfile.php/3878/mod_scorm/content/14/2_1_1.html";}'
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:launched');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe('https://example.com/pluginfile.php/3878/mod_scorm/content/14/2_1_1.html');
          expect(object.definition.type).toBe('http://id.tincanapi.com/activitytype/legacy-learning-standard');
          expect(object.definition.name.en).toBe('launch');
          expect(object.definition.description.en).toBe('title');
          done();
        });
      });
    });
    describe('scorm_status_submitted with cmivalue failed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        server.__set__('findScormBy', function() {
          return {
            name: 'scormname',
            course: 3,
          }
        });
        const log = {
          id: 1,
          eventname: '\\mod_scorm\\event\\status_submitted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5,
          other: 'a:3:{s:9:"attemptid";i:2;s:10:"cmielement";s:22:"cmi.core.lesson_status";s:8:"cmivalue";s:6:"failed";}'
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('failed');
          expect(verb.id).toBe('urn:x-moodle-event-action:failed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/scorm/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://id.tincanapi.com/activitytype/legacy-learning-standard');
          expect(object.definition.name.en).toBe('scormname');
          expect(object.definition.description.en).toBe('scormname');
          done();
        });
      });
    });
    describe('scorm_status_submitted with cmivalue passed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        server.__set__('findScormBy', function() {
          return {
            name: 'scormname',
            course: 3,
          }
        });
        const log = {
          id: 1,
          eventname: '\\mod_scorm\\event\\status_submitted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5,
          other: 'a:3:{s:9:"attemptid";i:2;s:10:"cmielement";s:22:"cmi.core.lesson_status";s:8:"cmivalue";s:6:"passed";}'
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('passed');
          expect(verb.id).toBe('urn:x-moodle-event-action:passed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/scorm/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://id.tincanapi.com/activitytype/legacy-learning-standard');
          expect(object.definition.name.en).toBe('scormname');
          expect(object.definition.description.en).toBe('scormname');
          done();
        });
      });
    });
    describe('scorm_status_submitted with cmivalue completed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        server.__set__('findScormBy', function() {
          return {
            name: 'scormname',
            course: 3,
          }
        });
        const log = {
          id: 1,
          eventname: '\\mod_scorm\\event\\status_submitted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5,
          other: 'a:3:{s:9:"attemptid";i:4;s:10:"cmielement";s:22:"cmi.core.lesson_status";s:8:"cmivalue";s:9:"completed";}'
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('completed');
          expect(verb.id).toBe('urn:x-moodle-event-action:completed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/scorm/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://id.tincanapi.com/activitytype/legacy-learning-standard');
          expect(object.definition.name.en).toBe('scormname');
          expect(object.definition.description.en).toBe('scormname');
          done();
        });
      });
    });
    describe('scorm_scoreraw_submitted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        server.__set__('findScormBy', function() {
          return {
            name: 'scormname',
            course: 3,
          }
        });
        const log = {
          id: 1,
          eventname: '\\mod_scorm\\event\\scoreraw_submitted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5,
          other: 'a:3:{s:9:"attemptid";i:1;s:10:"cmielement";s:18:"cmi.core.score.raw";s:8:"cmivalue";s:3:"100";}'
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:submitted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/scorm/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://id.tincanapi.com/activitytype/legacy-learning-standard');
          expect(object.definition.name.en).toBe('scormname');
          expect(object.definition.description.en).toBe('scormname');

          // Result
          const result = xapi.result;
          expect(result.score.raw).toBe(100);
          done();
        });
      });
    });
    describe('outline_activity_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\report_outline\\event\\activity_report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/report/outline/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/report');
          expect(object.definition.name.en).toBe('outline_activity_report_viewed');
          expect(object.definition.description.en).toBe('outline_activity_report_viewed');
          done();
        });
      });
    });
    describe('log_user_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\report_log\\event\\user_report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/report/log/user.php?id=${log.contextinstanceid}&course=${log.courseid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/report');
          expect(object.definition.name.en).toBe('log_user_report_viewed');
          expect(object.definition.description.en).toBe('log_user_report_viewed');
          done();
        });
      });
    });
    describe('participation_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\report_participation\\event\\report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/report/participation/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/report');
          expect(object.definition.name.en).toBe('participation_report_viewed');
          expect(object.definition.description.en).toBe('participation_report_viewed');
          done();
        });
      });
    });
    describe('workshop_assessment_evaluated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_workshop\\event\\assessment_evaluated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:evaluated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/workshop/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/workshop');
          expect(object.definition.name.en).toBe('workshop_assessment_evaluated');
          expect(object.definition.description.en).toBe('workshop_assessment_evaluated');
          done();
        });
      });
    });
    describe('workshop_assessment_reevaluated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_workshop\\event\\assessment_reevaluated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:reevaluated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/workshop/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/workshop');
          expect(object.definition.name.en).toBe('workshop_assessment_reevaluated');
          expect(object.definition.description.en).toBe('workshop_assessment_reevaluated');
          done();
        });
      });
    });
    describe('workshop_submission_reassessed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_workshop\\event\\submission_reassessed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:reassessed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/workshop/assessment.php?asid=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/workshop');
          expect(object.definition.name.en).toBe('workshop_submission_reassessed');
          expect(object.definition.description.en).toBe('workshop_submission_reassessed');
          done();
        });
      });
    });
    describe('user_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\user_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/user/editadvanced.php?id=${log.contextinstanceid}&course=${log.courseid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('user_updated');
          expect(object.definition.description.en).toBe('user_updated');
          done();
        });
      });
    });
    describe('user_loggedinas', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\user_loggedinas',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:loggedinas');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/user/profile.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('user_loggedinas');
          expect(object.definition.description.en).toBe('user_loggedinas');
          done();
        });
      });
    });
    describe('user_enrolment_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\user_enrolment_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/user/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('user_enrolment_updated');
          expect(object.definition.description.en).toBe('user_enrolment_updated');
          done();
        });
      });
    });
    describe('user_enrolment_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\user_enrolment_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/user/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('user_enrolment_deleted');
          expect(object.definition.description.en).toBe('user_enrolment_deleted');
          done();
        });
      });
    });
    describe('user_enrolment_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\user_enrolment_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/user/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('user_enrolment_created');
          expect(object.definition.description.en).toBe('user_enrolment_created');
          done();
        });
      });
    });
    describe('user_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\user_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/admin/user.php`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('user_deleted');
          expect(object.definition.description.en).toBe('user_deleted');
          done();
        });
      });
    });
    describe('user_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\user_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/user/editadvanced.php?id=-1`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('user_created');
          expect(object.definition.description.en).toBe('user_created');
          done();
        });
      });
    });
    describe('dashboard_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\dashboard_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('dashboard_viewed');
          expect(object.definition.description.en).toBe('dashboard_viewed');
          done();
        });
      });
    });
    describe('course_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\course_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/course/edit.php?id=${log.contextinstanceid}&returnto=catmanage`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('course_updated');
          expect(object.definition.description.en).toBe('course_updated');
          done();
        });
      });
    });
    describe('course_module_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\course_module_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/course/modedit.php?update=${log.contextinstanceid}&return=0&sr=0`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('course_module_updated');
          expect(object.definition.description.en).toBe('course_module_updated');
          done();
        });
      });
    });
    describe('course_module_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\course_module_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('course_module_created');
          expect(object.definition.description.en).toBe('course_module_created');
          done();
        });
      });
    });
    describe('course_category_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\course_category_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/course/editcategory.php?parent=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('course_category_created');
          expect(object.definition.description.en).toBe('course_category_created');
          done();
        });
      });
    });
    describe('cohort_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\cohort_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/cohort/index.php?&contextid=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('cohort_updated');
          expect(object.definition.description.en).toBe('cohort_updated');
          done();
        });
      });
    });
    describe('cohort_member_removed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\cohort_member_removed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:removed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/cohort/assign.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('cohort_member_removed');
          expect(object.definition.description.en).toBe('cohort_member_removed');
          done();
        });
      });
    });
    describe('cohort_member_added', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\cohort_member_added',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:added');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/cohort/assign.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('cohort_member_added');
          expect(object.definition.description.en).toBe('cohort_member_added');
          done();
        });
      });
    });
    describe('cohort_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\cohort_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/cohort/index.php?contextid=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('cohort_deleted');
          expect(object.definition.description.en).toBe('cohort_deleted');
          done();
        });
      });
    });
    describe('cohort_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\cohort_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/cohort/edit.php?contextid=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('cohort_created');
          expect(object.definition.description.en).toBe('cohort_created');
          done();
        });
      });
    });
    describe('calendar_event_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\calendar_event_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('calendar_event_created');
          expect(object.definition.description.en).toBe('calendar_event_created');
          done();
        });
      });
    });
    describe('calendar_event_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\calendar_event_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('calendar_event_deleted');
          expect(object.definition.description.en).toBe('calendar_event_deleted');
          done();
        });
      });
    });
    describe('calendar_event_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\calendar_event_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('calendar_event_updated');
          expect(object.definition.description.en).toBe('calendar_event_updated');
          done();
        });
      });
    });
    describe('enrol_instance_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\enrol_instance_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/course/management.php`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('enrol_instance_deleted');
          expect(object.definition.description.en).toBe('enrol_instance_deleted');
          done();
        });
      });
    });
    describe('role_assigned', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\role_assigned',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:assigned');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/admin/roles/assign.php?contextid=1`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('role_assigned');
          expect(object.definition.description.en).toBe('role_assigned');
          done();
        });
      });
    });
    describe('role_capabilities_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\role_capabilities_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/admin/roles/assign.php?contextid=1`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('role_capabilities_updated');
          expect(object.definition.description.en).toBe('role_capabilities_updated');
          done();
        });
      });
    });
    describe('role_unassigned', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\role_unassigned',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:unassigned');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/admin/roles/assign.php?contextid=1`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('role_unassigned');
          expect(object.definition.description.en).toBe('role_unassigned');
          done();
        });
      });
    });
    describe('tool_capability_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\tool_capability\\event\\report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/admin/tool/capability/index.php`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('tool_capability_report_viewed');
          expect(object.definition.description.en).toBe('tool_capability_report_viewed');
          done();
        });
      });
    });
    describe('course_content_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\course_content_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/course/delete.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('course_content_deleted');
          expect(object.definition.description.en).toBe('course_content_deleted');
          done();
        });
      });
    });
    describe('course_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\course_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/cohort/edit.php?contextid=${log.courseid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('course_deleted');
          expect(object.definition.description.en).toBe('course_deleted');
          done();
        });
      });
    });
    describe('course_module_completion_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\course_module_completion_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=editsubmission`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('course_module_completion_updated');
          expect(object.definition.description.en).toBe('course_module_completion_updated');
          done();
        });
      });
    });
    describe('course_section_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\course_section_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/course/editsection.php?id=${log.objectid}&sr`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('course_section_updated');
          expect(object.definition.description.en).toBe('course_section_updated');
          done();
        });
      });
    });
    describe('email_failed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\email_failed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:failed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=editsubmission`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('email_failed');
          expect(object.definition.description.en).toBe('email_failed');
          done();
        });
      });
    });
    describe('enrol_instance_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\enrol_instance_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.groupin).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/course/edit.php?category=1&returnto=catmanage`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('enrol_instance_created');
          expect(object.definition.description.en).toBe('enrol_instance_created');
          done();
        });
      });
    });
    describe('message_sent', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\message_sent',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:sent');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=editsubmission`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('message_sent');
          expect(object.definition.description.en).toBe('message_sent');
          done();
        });
      });
    });
    describe('assign_file_assessable_uploaded', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\assignsubmission_file\\event\\assessable_uploaded',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:uploaded');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=editsubmission`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assignsubmission');
          expect(object.definition.name.en).toBe('assign_file_assessable_uploaded');
          expect(object.definition.description.en).toBe('assign_file_assessable_uploaded');
          done();
        });
      });
    });
    describe('assignsubmission_file_submission_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\assignsubmission_file\\event\\submission_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=editsubmission`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assignsubmission');
          expect(object.definition.name.en).toBe('assignsubmission_file_submission_created');
          expect(object.definition.description.en).toBe('assignsubmission_file_submission_created');
          done();
        });
      });
    });
    describe('assignsubmission_file_submission_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\assignsubmission_file\\event\\submission_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=editsubmission`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assignsubmission');
          expect(object.definition.name.en).toBe('assignsubmission_file_submission_updated');
          expect(object.definition.description.en).toBe('assignsubmission_file_submission_updated');
          done();
        });
      });
    });
    describe('onlinetext_assign_assessable_uploaded', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\assignsubmission_onlinetext\\event\\assessable_uploaded',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:uploaded');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=editsubmission`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assignsubmission');
          expect(object.definition.name.en).toBe('onlinetext_assign_assessable_uploaded');
          expect(object.definition.description.en).toBe('onlinetext_assign_assessable_uploaded');
          done();
        });
      });
    });
    describe('onlinetext_assign_submission_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\assignsubmission_onlinetext\\event\\submission_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=editsubmission`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assignsubmission');
          expect(object.definition.name.en).toBe('onlinetext_assign_submission_created');
          expect(object.definition.description.en).toBe('onlinetext_assign_submission_created');
          done();
        });
      });
    });
    describe('onlinetext_assign_submission_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\assignsubmission_onlinetext\\event\\submission_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/assign/view.php?id=${log.contextinstanceid}&action=editsubmission`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assignsubmission');
          expect(object.definition.name.en).toBe('onlinetext_assign_submission_updated');
          expect(object.definition.description.en).toBe('onlinetext_assign_submission_updated');
          done();
        });
      });
    });
    describe('course_restored', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\course_restored',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:restored');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/backup/restorefile.php`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('course_restored');
          expect(object.definition.description.en).toBe('course_restored');
          done();
        });
      });
    });
    describe('course_user_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\course_user_report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/course/user.php?mode=grade&id=${log.contextinstanceid}&user=${log.userid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/report');
          expect(object.definition.name.en).toBe('course_user_report_viewed');
          expect(object.definition.description.en).toBe('course_user_report_viewed');
          done();
        });
      });
    });
    describe('group_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\group_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/group/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('group_created');
          expect(object.definition.description.en).toBe('group_created');
          done();
        });
      });
    });
    describe('group_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\group_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/group/index.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('group_deleted');
          expect(object.definition.description.en).toBe('group_deleted');
          done();
        });
      });
    });
    describe('group_member_added', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\group_member_added',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:added');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/group/members.php?group=${log.objectid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('group_member_added');
          expect(object.definition.description.en).toBe('group_member_added');
          done();
        });
      });
    });
    describe('message_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\message_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/message/index.php?user=${log.userid}&id=${log.courseid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('message_viewed');
          expect(object.definition.description.en).toBe('message_viewed');
          done();
        });
      });
    });
    describe('category_bin_item_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\tool_recyclebin\\event\\category_bin_item_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/course/management.php`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('category_bin_item_created');
          expect(object.definition.description.en).toBe('category_bin_item_created');
          done();
        });
      });
    });
    describe('course_category_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\course_category_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/course/editcategory.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('course_category_updated');
          expect(object.definition.description.en).toBe('course_category_updated');
          done();
        });
      });
    });
    describe('feedback_course_module_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_feedback\\event\\course_module_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/feedback/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/module');
          expect(object.definition.name.en).toBe('feedback_course_module_viewed');
          expect(object.definition.description.en).toBe('feedback_course_module_viewed');
          done();
        });
      });
    });
    describe('page_course_module_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_page\\event\\course_module_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/page/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/module');
          expect(object.definition.name.en).toBe('page_course_module_viewed');
          expect(object.definition.description.en).toBe('page_course_module_viewed');
          done();
        });
      });
    });
    describe('url_course_module_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_url\\event\\course_module_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/url/view.php?id=${log.contextinstanceid}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/module');
          expect(object.definition.name.en).toBe('url_course_module_viewed');
          expect(object.definition.description.en).toBe('url_course_module_viewed');
          done();
        });
      });
    });
    describe('hsvideo_play_sent', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_hsvideo\\event\\hsvideo_play_sent',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:played');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/hsvideo/view.php?id=${log.courseid}`);
          expect(object.definition.type).toBe('http://activitystreams/schema/1.0/video');
          expect(object.definition.name.en).toBe('hsvideo_play_sent');
          expect(object.definition.description.en).toBe('hsvideo_play_sent');
          done();
        });
      });
    });
    describe('hsvideo_progress_end_sent', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_hsvideo\\event\\hsvideo_progress_end_sent',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:progress_bar_move_ended');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/hsvideo/view.php?id=${log.courseid}`);
          expect(object.definition.type).toBe('http://activitystreams/schema/1.0/video');
          expect(object.definition.name.en).toBe('hsvideo_progress_end_sent');
          expect(object.definition.description.en).toBe('hsvideo_progress_end_sent');
          done();
        });
      });
    });
    describe('hsvideo_progress_start_sent', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_hsvideo\\event\\hsvideo_progress_start_sent',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:progress_bar_move_started');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/hsvideo/view.php?id=${log.courseid}`);
          expect(object.definition.type).toBe('http://activitystreams/schema/1.0/video');
          expect(object.definition.name.en).toBe('hsvideo_progress_start_sent');
          expect(object.definition.description.en).toBe('hsvideo_progress_start_sent');
          done();
        });
      });
    });
    describe('hsvideo_replay_sent', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_hsvideo\\event\\hsvideo_replay_sent',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:replayed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/hsvideo/view.php?id=${log.courseid}`);
          expect(object.definition.type).toBe('http://activitystreams/schema/1.0/video');
          expect(object.definition.name.en).toBe('hsvideo_replay_sent');
          expect(object.definition.description.en).toBe('hsvideo_replay_sent');
          done();
        });
      });
    });
    describe('hsvideo_pause_sent', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_hsvideo\\event\\hsvideo_pause_sent',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:paused');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/hsvideo/view.php?id=${log.courseid}`);
          expect(object.definition.type).toBe('http://activitystreams/schema/1.0/video');
          expect(object.definition.name.en).toBe('hsvideo_pause_sent');
          expect(object.definition.description.en).toBe('hsvideo_pause_sent');
          done();
        });
      });
    });
    describe('hsvideo_stop_sent', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_hsvideo\\event\\hsvideo_stop_sent',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:stopped');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/hsvideo/view.php?id=${log.courseid}`);
          expect(object.definition.type).toBe('http://activitystreams/schema/1.0/video');
          expect(object.definition.name.en).toBe('hsvideo_stop_sent');
          expect(object.definition.description.en).toBe('hsvideo_stop_sent');
          done();
        });
      });
    });
    describe('hsvideo_view', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_hsvideo\\event\\hsvideo_view',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe(`${xapi.actor.account.homePage}/mod/hsvideo/view.php?id=${log.courseid}`);
          expect(object.definition.type).toBe('http://activitystreams/schema/1.0/video');
          expect(object.definition.name.en).toBe('hsvideo_view');
          expect(object.definition.description.en).toBe('hsvideo_view');
          done();
        });
      });
    });
    describe('batch_set_workflow_state_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_assign\\event\\batch_set_workflow_state_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('batch_set_workflow_state_viewed');
          expect(object.definition.description.en).toBe('batch_set_workflow_state_viewed');
          done();
        });
      });
    });
    describe('course_module_instance_list_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_assign\\event\\course_module_instance_list_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('course_module_instance_list_viewed');
          expect(object.definition.description.en).toBe('course_module_instance_list_viewed');
          done();
        });
      });
    });
    describe('feedback_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_assign\\event\\feedback_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('feedback_viewed');
          expect(object.definition.description.en).toBe('feedback_viewed');
          done();
        });
      });
    });
    describe('assign_submission_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_assign\\event\\submission_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('assign_submission_viewed');
          expect(object.definition.description.en).toBe('assign_submission_viewed');
          done();
        });
      });
    });
    describe('workflow_state_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_assign\\event\\workflow_state_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assign');
          expect(object.definition.name.en).toBe('workflow_state_updated');
          expect(object.definition.description.en).toBe('workflow_state_updated');
          done();
        });
      });
    });
    describe('report_stats_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\report_stats\\event\\report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('report_stats_report_viewed');
          expect(object.definition.description.en).toBe('report_stats_report_viewed');
          done();
        });
      });
    });
    describe('report_stats_user_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\report_stats\\event\\user_report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('report_stats_user_report_viewed');
          expect(object.definition.description.en).toBe('report_stats_user_report_viewed');
          done();
        });
      });
    });
    describe('langpack_updated', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\tool_langimport\\event\\langpack_updated',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:updated');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('langpack_updated');
          expect(object.definition.description.en).toBe('langpack_updated');
          done();
        });
      });
    });
    describe('category_bin_item_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\tool_recyclebin\\event\\category_bin_item_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('category_bin_item_deleted');
          expect(object.definition.description.en).toBe('category_bin_item_deleted');
          done();
        });
      });
    });
    describe('course_bin_item_created', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\tool_recyclebin\\event\\course_bin_item_created',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:created');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('course_bin_item_created');
          expect(object.definition.description.en).toBe('course_bin_item_created');
          done();
        });
      });
    });
    describe('course_bin_item_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\tool_recyclebin\\event\\course_bin_item_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('course_bin_item_deleted');
          expect(object.definition.description.en).toBe('course_bin_item_deleted');
          done();
        });
      });
    });
    describe('browser_agent_view', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\browser_agent_view',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('browser_agent_view');
          expect(object.definition.description.en).toBe('browser_agent_view');
          done();
        });
      });
    });
    describe('course_module_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\course_module_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          expect(context.contextActivities.grouping).toBeUndefined();

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBeUndefined();
          expect(object.definition.name.en).toBe('course_module_deleted');
          expect(object.definition.description.en).toBe('course_module_deleted');
          done();
        });
      });
    });
    describe('grade_deleted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\core\\event\\grade_deleted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:deleted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/grade');
          expect(object.definition.name.en).toBe('grade_deleted');
          expect(object.definition.description.en).toBe('grade_deleted');
          done();
        });
      });
    });
    describe('response_submitted', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_feedback\\event\\response_submitted',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:submitted');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/feedback');
          expect(object.definition.name.en).toBe('response_submitted');
          expect(object.definition.description.en).toBe('response_submitted');
          done();
        });
      });
    });
    describe('forum_user_report_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\user_report_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('forum_user_report_viewed');
          expect(object.definition.description.en).toBe('forum_user_report_viewed');
          done();
        });
      });
    });
    describe('attempt_abandoned', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_quiz\\event\\attempt_abandoned',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:abandoned');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/assessment');
          expect(object.definition.name.en).toBe('attempt_abandoned');
          expect(object.definition.description.en).toBe('attempt_abandoned');
          done();
        });
      });
    });
    describe('course_module_list_viewed', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: '\\mod_forum\\event\\course_module_instance_list_viewed',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=${log.courseid}`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('action');
          expect(verb.id).toBe('urn:x-moodle-event-action:viewed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe(`${xapi.actor.account.homePage}`);
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/forum');
          expect(object.definition.name.en).toBe('course_module_list_viewed');
          expect(object.definition.description.en).toBe('course_module_list_viewed');
          done();
        });
      });
    });
    describe('unknown event log', () => {
      it('skips translation', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateStandardLogs');
        server.__set__('createProcessedRecords', () => {});
        const log = {
          id: 1,
          eventname: 'unknown',
          userid: 2,
          action: 'action',
          courseid: 3,
          objectid: 4,
          timecreated: 1188244893,
          contextinstanceid: 5
        };
        translate([log], userAttrs, courseNames).then((xapis) => {
          expect(xapis.length).toBe(0);
          done();
        });
      });
    });
    describe('scorm_scoes_track cmi.core.total_time', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translateScoTracks');
        server.__set__('findScormBy', function() {
          return {
            name: 'scormname',
            course: 3,
          }
        });
        server.__set__('findScormScoBy', function() {
          return {
            launch: 'launch',
            title: 'title',
          }
        });
        server.__set__('findLatestLogBy', function() {
          return {
            id: 1,
            other: 'a:2:{s:10:"instanceid";s:2:"17";s:13:"loadedcontent";s:71:"https://example.com/pluginfile.php/3878/mod_scorm/content/14/2_1_1.html";}',
          }
        });
        const track = {
          id: 1,
          userid: 2,
          scormid: 3,
          scoid: 4,
          element: 'cmi.core.total_time',
          value: '05:10:33.03',
          timemodified: 1188244893,
        };
        translate([track], userAttrs, courseNames).then((xapis) => {
          expect(xapis.default).toBeDefined();
          expect(xapis.default.length).toBe(1);
          expect(xapis.default[0].objectid).toBe(1);
          const xapi = xapis.default[0].statement;
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2007-08-28T05:01:33+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe(userAttrs[2].hash);
          expect(actor.account.name).toBe(2);
          expect(actor.account.homePage).toBe(config.homepage);

          // Context
          const context = xapi.context;
          const category = context.contextActivities.category[0];
          expect(category.objectType).toBe('Activity');
          expect(category.id).toBe(config.category.id);
          expect(category.definition.type).toBe(config.category.definition.type);
          expect(category.definition.name.en).toBe(config.category.definition.name);
          expect(category.definition.description.en).toBe(config.category.definition.description);

          const grouping = context.contextActivities.grouping[0];
          expect(grouping.objectType).toBe('Activity');
          expect(grouping.id).toBe(`${xapi.actor.account.homePage}/course/view.php?id=3`);
          expect(grouping.definition.type).toBe(`${xapi.actor.account.homePage}/activitytype/course`);
          expect(grouping.definition.name.en).toBe('course_name');

          expect(context.platform).toBe(config.platform);
          expect(context.language).toBe(config.language);

          // Verb
          const verb = xapi.verb;
          expect(verb.display.en).toBe('attended');
          expect(verb.id).toBe('urn:x-moodle-event-action:attended');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBeUndefined();
          expect(object.id).toBe('https://example.com/pluginfile.php/3878/mod_scorm/content/14/2_1_1.html');
          expect(object.definition.type).toBe('http://id.tincanapi.com/activitytype/legacy-learning-standard');
          expect(object.definition.name.en).toBe('launch');
          expect(object.definition.description.en).toBe('title');

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT18633.03S');
          done();
        });
      });
    });
  });
});
