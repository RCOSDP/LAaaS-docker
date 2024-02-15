'use strict';
const adl = require('adl-xapiwrapper');
const config = require('./config/app');
const csv = require('csvtojson');
const log4js = require('log4js');
const logger = log4js.getLogger();
const sleep = require('system-sleep');
const uuid = require('node-uuid');

log4js.configure('config/log4js.json');
if (process.env.XAPI_GEN_LOG_LEVEL !== undefined) {
  logger.level = process.env.XAPI_GEN_LOG_LEVEL;
}

logger.info('Start xAPI statement generator.');

const verbIdPrefix = process.env.VERB_ID_PREFIX || 'urn:x-lms-event-action';

// Define videojs events
const events = {
  'firstplay': {
    'verb.id': `${verbIdPrefix}:launched`,
    'verb.display.ja': '再生(初回のみ)しました。',
  },
  'play': {
    'verb.id': `${verbIdPrefix}:played`,
    'verb.display.ja': '再生しました。',
  },
  'pause': {
    'verb.id': `${verbIdPrefix}:paused`,
    'verb.display.ja': '一時停止しました。',
  },
  'seeked': {
    'verb.id': `${verbIdPrefix}:skipped`,
    'verb.display.ja': 'スライダー操作しました。',
  },
  'ratechange': {
    'verb.id': `${verbIdPrefix}:switched`,
    'verb.display.ja': '速度変調しました。',
  },
  'ended': {
    'verb.id': `${verbIdPrefix}:completed`,
    'verb.display.ja': '動画を最後まで再生しました。',
  },
  'trackchange': {
    'verb.id': `${verbIdPrefix}:switched`,
    'verb.display.ja': '字幕セレクターを切り替えました。',
  },
  'forward': {
    'verb.id': `${verbIdPrefix}:pressed`,
    'verb.display.ja': '早送りボタンをクリックしました。',
  },
  'back': {
    'verb.id': `${verbIdPrefix}:pressed`,
    'verb.display.ja': '巻き戻しボタンをクリックしました。',
  },
  'beforeunload-ended': {
    'verb.id': `${verbIdPrefix}:exited`,
    'verb.display.ja': 'ビデオ再生ページを終了しました。',
  },
  'pagehide-ended': {
    'verb.id': `${verbIdPrefix}:exited`,
    'verb.display.ja': 'ビデオ再生ページを終了しました。',
  },
  'unload-ended': {
    'verb.id': `${verbIdPrefix}:exited`,
    'verb.display.ja': 'ビデオ再生ページを終了しました。',
  },
  'hidden-ended': {
    'verb.id': `${verbIdPrefix}:exited`,
    'verb.display.ja': 'ビデオ再生ページを終了しました。',
  },
  'force-ended': {
    'verb.id': `${verbIdPrefix}:exited`,
    'verb.display.ja': 'ビデオ再生ページを終了しました。',
  },
  'current-time': {
    'verb.id': `${verbIdPrefix}:progressed`,
    'verb.display.ja': 'ビデオの再生位置を記録しました。',
  },
  'changepage': {
    'verb.id': `${verbIdPrefix}:switched`,
    'verb.display.ja': 'マイクロコンテンツを切り替えました。',
  }
};

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
      let msg = `[SCOPE:${scope}] Failed to send statements`;
      if (resp !== undefined) {
        msg += `(HTTP status:${resp.statusCode})`;
      }
      msg += ` - ${err}`;
      throw new Error(msg);
    } else {
      logger.info(`[SCOPE:${scope}] ${xapis.length} statements added.`);
    }
  });
  sleep(3000);
}

/**
 * Translates videojs logs into xAPI statements.
 * @param {Array.Object} logs - videojs logs
 */
async function translate(logs){ // eslint-disable-line max-statements, max-len
  let xapis = [];
  let translatedLogIds = [];
  let skippedLogIds = [];

  for (const log of logs) {
    if (log.eventname in events) {
      let xapi = {
        id: uuid.v4(),
        actor: {
          objectType: 'Agent',
          name: '',
          account: {
            name: log.userid,
            homePage: config.homepage
          }
        },
        verb: {
          id: events[log.eventname]['verb.id'],
          display: {
            en: log.eventname,
            ja: events[log.eventname]['verb.display.ja']
          }
        },
        object: {
          objectType: 'Activity',
          id: log.referrer,
          definition: {
            type: 'http://adlnet.gov/expapi/activities/media',
            name: {
              en: log.file
            },
            description: {
              en: log.file
            }
          }
        },
        context: {
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
        },
        result: {
          duration: `PT${log.current}S`
        },
        timestamp: log.timestamp
      };
      if (log.nonce !== '-') {
        xapi.object.definition['moreInfo'] = `${config.homepage}/mod/lti`;
      }
      xapis.push(xapi);
      translatedLogIds.push(log.id);
      logger.info(
        `${log.eventname} log translated.`
      );
    } else {
      skippedLogIds.push(log.id);
      logger.info(
        `${log.eventname} log skipped.`
      );
    }
  }
  return [xapis, translatedLogIds, skippedLogIds];
}

/**
 * Translates videojs logs into xAPI statements and send them to LRS.
 * Processes 100 logs at each iteration until no more data exists.
 */
module.exports = async function main() { // eslint-disable-line max-statements
  let lrs;
  if (!('default' in config.LRS.clients)) {
    throw new Error('Specify LRS client in config/app.js');
  }
  const opts = {
    'url':config.LRS.url,
    'auth':{
      'user':config.LRS.clients.default.user,
      'pass':config.LRS.clients.default.pass
    },
  };
  lrs = new adl.XAPIWrapper(opts);

  const limit = 100;
  let translatedStmtCount = 0;
  let skippedStmtCount = 0;

  // Iterate videojs logs to be processed
  const jsonObj = await csv().fromFile(config.pathToCSVFile);
  for (var i = 0, l = jsonObj.length; i < l; i += limit) {
    let logs = jsonObj.slice(i, i + limit);
    const [xapis, translatedLogIds, skippedLogIds] =
      await translate(logs);
    translatedStmtCount += translatedLogIds.length;
    skippedStmtCount += skippedLogIds.length;
    sendStatements(xapis, lrs, 'default');
  }
  logger.info(
    'Finished translation ' +
    `#Translated:${translatedStmtCount} #Skipped:${skippedStmtCount}`
  );
};
