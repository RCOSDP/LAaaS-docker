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
      host: 'moodle-docker_db_1',
      port: 5432,
      database: 'moodle',
      username: 'moodleuser',
      password: 'm@0dl3ing',
      prefix: 'mdl_'
    },
    la: {
      host: 'learning_analytics_db',
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
      description:
        'Moodle is a open source learning platform designed to ' +
        'provide educators, administrators and learners with ' +
        'a single robust, secure and integrated system to create ' +
        'personalized learning environments.'
    }
  },
  platform: 'Moodle',
  language: 'en',
  homepage: 'http://localhost:8000'
};
module.exports = config;
