const dummyjson = require('dummy-json');
const helpers = {
  timestamp(options) {
    return dummyjson.helpers.date(
      process.env.TIMESTAMP_MIN,
      process.env.TIMESTAMP_MAX,
      'YYYY-MM-DDTHH:mm:ss+00:00',
      options
    );
  }
};
module.exports = helpers;
