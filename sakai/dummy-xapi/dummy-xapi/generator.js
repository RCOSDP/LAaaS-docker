'use strict';
const axios = require('axios');
const axiosRetry = require('axios-retry');
const dummyjson = require('dummy-json');
const fs = require('fs');
const http = require('http');
const log4js = require('log4js');
const logger = log4js.getLogger();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const helpers = require('./helpers');
const partials = require('./partials');

log4js.configure('config/log4js.json');
if (process.env.XAPI_GEN_LOG_LEVEL !== undefined) {
  logger.level = process.env.XAPI_GEN_LOG_LEVEL;
}

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
 * @param {Object} url - LRS url
 * @param {Object} auth - LRS username and password
 */
async function sendStatements(statements, url, auth) {
  return axios({
    'method': 'POST',
    'url': url + 'statements',
    'auth': auth,
    'headers': {
      'Content-Type': 'application/json',
      'X-Experience-API-Version': '1.0.1'
    },
    'data': JSON.stringify(statements)
  });
}

/**
 * Returns random number.
 */
function randomIndex(length) {
  return Math.floor(Math.random() * (length));
}

/**
 * Returns random instructor account.
 */
function randomInstructorAccountName() {
  return `instructor-${randomIndex(10)}`
}

/**
 * Returns random student account.
 */
function randomStudentAccountName() {
  return `student-${randomIndex(10)}`
}

/**
 * Returns random grade for Assignment.
 */
function randomGrade() {
  const grades = [
    'Ungraded',
    'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E', 'F',
    'Pass', 'Fail',
    'Checked'
  ]
  return grades[randomIndex(grades.length)]
}

// Load statement templates
const templates = fs.readdirSync('templates/statements')
  .map(file => {
    return path.join('templates/statements', file);
  });

// Constant values
const siteId = uuidv4();
const homePage = 'http://localhost:8888';

/**
 * Generates dummy xAPI statements.
 * @param {Number} chunkSize - number of statements
 */
function gen_dummy_statements(chunkSize){
  let xapis = [];
  for (let i = 0; i < chunkSize; i++) {
    const template = fs.readFileSync(templates[randomIndex(templates.length)], { encoding: 'utf8' });
    const result = dummyjson.parse(template, {
      helpers: helpers,
      mockdata: {
        homePage: homePage,
        siteId: siteId,
        account: {
          instructor: randomInstructorAccountName(),
          student: randomStudentAccountName()
        },
        asn: {
          grade: randomGrade()
        }
      },
      partials: partials
    });
    xapis.push(JSON.parse(result));
  }
  return xapis;
}

/**
 * Sends dummy xAPI statements to LRS.
 */
module.exports = async function main() {
  const url = process.env.LRS_URL;
  const auth = {
    'username': process.env.LRS_USERNAME,
    'password': process.env.LRS_PASSWORD
  };
  let statementNum = +process.env.STATEMENT_NUM || 100;
  const maxChunkSize = 100;
  while (statementNum > 0) {
    let chunkSize = maxChunkSize;
    if (statementNum < maxChunkSize) {
      chunkSize = statementNum;
    }
    statementNum -= chunkSize;
    const statements = gen_dummy_statements(chunkSize);
    await sendStatements(statements, url, auth).then(() => {
      logger.info(`${statements.length} statements added.`);
    }).catch(error => {
      let message = `Failed to send statements`;
      if (error.response) {
        message += `(HTTP status:${error.response.status})`;
      }
      message += ` - ${error.message}`;
      logger.error(message);
    });
  }
};
