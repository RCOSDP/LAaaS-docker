/* eslint max-len: 0, max-statements: 0 */
const config = require('../config/app');
const rewire = require('rewire');

describe('Test generator', () => {
  describe('translate', () => {
    process.env.XAPI_GEN_LOG_LEVEL = 'off';

    describe('firstplay', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'firstplay',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '60f7bd9853ae464a797d8c9bdaec9f83'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('firstplay');
          expect(verb.display.ja).toBe('再生(初回のみ)しました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:launched');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBe(`${config.homepage}/mod/lti`);

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('play', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'play',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('play');
          expect(verb.display.ja).toBe('再生しました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:played');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('pause', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'pause',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('pause');
          expect(verb.display.ja).toBe('一時停止しました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:paused');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('seeked', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'seeked',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('seeked');
          expect(verb.display.ja).toBe('スライダー操作しました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:skipped');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('ratechange', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'ratechange',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('ratechange');
          expect(verb.display.ja).toBe('速度変調しました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:switched');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('ended', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'ended',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('ended');
          expect(verb.display.ja).toBe('動画を最後まで再生しました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:completed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('trackchange', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'trackchange',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('trackchange');
          expect(verb.display.ja).toBe('字幕セレクターを切り替えました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:switched');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('forward', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'forward',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('forward');
          expect(verb.display.ja).toBe('早送りボタンをクリックしました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:pressed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('back', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'back',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('back');
          expect(verb.display.ja).toBe('巻き戻しボタンをクリックしました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:pressed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('beforeunload-ended', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'beforeunload-ended',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('beforeunload-ended');
          expect(verb.display.ja).toBe('ビデオ再生ページを終了しました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:exited');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('pagehide-ended', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'pagehide-ended',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('pagehide-ended');
          expect(verb.display.ja).toBe('ビデオ再生ページを終了しました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:exited');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('unload-ended', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'unload-ended',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('unload-ended');
          expect(verb.display.ja).toBe('ビデオ再生ページを終了しました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:exited');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('hidden-ended', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'hidden-ended',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('hidden-ended');
          expect(verb.display.ja).toBe('ビデオ再生ページを終了しました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:exited');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('force-ended', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'force-ended',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('force-ended');
          expect(verb.display.ja).toBe('ビデオ再生ページを終了しました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:exited');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('current-time', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'current-time',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('current-time');
          expect(verb.display.ja).toBe('ビデオの再生位置を記録しました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:progressed');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('changepage', () => {
      it('returns xapi statement', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'changepage',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(1);
          expect(translatedLogIds.length).toBe(1);
          expect(translatedLogIds).toContain(1);
          expect(skippedLogIds.length).toBe(0);

          const xapi = xapis[0];
          expect(xapi.id).toBeDefined();

          // Timestamp
          expect(xapi.timestamp).toBe('2020-06-26T22:40:24+09:00');

          // Actor
          const actor = xapi.actor;
          expect(actor.objectType).toBe('Agent');
          expect(actor.name).toBe('');
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
          expect(verb.display.en).toBe('changepage');
          expect(verb.display.ja).toBe('マイクロコンテンツを切り替えました。');
          expect(verb.id).toBe('urn:x-moodle-event-action:switched');

          // Object
          const object = xapi.object;
          expect(object.objectType).toBe('Activity');
          expect(object.id).toBe('https://example.com');
          expect(object.definition.type).toBe('http://adlnet.gov/expapi/activities/media');
          expect(object.definition.name.en).toBe('example.mp4');
          expect(object.definition.description.en).toBe('example.mp4');
          expect(object.definition.moreInfo).toBeUndefined();

          // Result
          const result = xapi.result;
          expect(result.duration).toBe('PT609.521622S');
          done();
        });
      });
    });
    describe('unknown event log', () => {
      it('skips translation', (done) => {
        const server = rewire('../generator');
        const translate = server.__get__('translate');
        const log = {
          id: 1,
          eventname: 'unknown',
          userid: 2,
          referrer: 'https://example.com',
          file: 'example.mp4',
          current: 609.521622,
          timestamp: '2020-06-26T22:40:24+09:00',
          nonce: '-'
        };
        translate([log]).then(([xapis, translatedLogIds, skippedLogIds]) => {
          expect(xapis.length).toBe(0);
          expect(translatedLogIds.length).toBe(0);
          expect(skippedLogIds.length).toBe(1);
          expect(skippedLogIds).toContain(1);
          done();
        });
      });
    });
  });
});
