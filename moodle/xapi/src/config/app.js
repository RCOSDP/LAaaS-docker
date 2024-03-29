const config = {
  url: 'http://learninglocker',
  limit: 500,
  chunkSize: 100,
  filter: {
    logstoreStandardLog: {
      origin: {
        // Specify origins(e.g. 'cli') to be excluded
        exclude: []
      }
    }
  },
  db: {
    // LMS database connection settings
    lms: {
      host: 'moodle-db',
      port: 5432,
      database: 'moodle',
      username: 'moodle',
      password: 'm@0dl3ing',
      prefix: 'mdl_'
    },
    la: {
      host: 'learning-analytics-db',
      port: 5432,
      database: 'learning_analytics',
      username: 'learning_analytics',
      password: 'learning_analytics',
    }
  },
  LRS: {
    // LRS client with 'Overall Scopes: API All' checked
    client: {
      key: '',
      secret: ''
    },
    // Store statements in each LRS with title matching actor's ePPN scope
    ePPNScoped: false,
  },
  category: {
    id: 'http://moodle.org',
    definition: {
      type: 'http://id.tincanapi.com/activitytype/source',
      name: 'Moodle',
      description: ''
    }
  },
  platform: 'Moodle',
  language: 'en',
  homepage: 'http://localhost:8000'
};
module.exports = config;
