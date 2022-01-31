const config = {
  url: 'http://learninglocker',
  limit: 500,
  chunkSize: 100,
  db:{
    // LMS database connection settings
    lms:{
      host:'moodle-docker_db_1',
      port:5432,
      database:'moodle',
      username:'moodleuser',
      password:'m@0dl3ing',
      prefix:'mdl_'
    },
    la:{
      host:'learning_analytics_db',
      port:5432,
      database:'learning_analytics',
      username:'learning_analytics',
      password:'learning_analytics',
    }
  },
  LRS:{
    clients:{
      // LRS client
      'default':{
        user:'031eb8dccd9729d6a8a16d245b4d1dddf1e2ded7',
        pass:'a94fd8e44662fe7cd50cd53812dad84a4a81ab9b'
      },
      /**
       * This 'scoped' setting can be used to send
       * statements to separated LRSes based on ePPN in GakuNin.
       */
      //'scoped':[
      //  {
      //    scope:'foo.co.jp',
      //    user:'dc052567a686bb93a7e2fb9547ed6f6974171e8b',
      //    pass:'b0a3f0e04294c258cb3ce8bdbb55d24c6bad15f8'
      //  },
      //  {
      //    scope:'bar.ac.jp',
      //    user:'74abe7278e28aef9b5548d90700ee423e36c1fbb',
      //    pass:'8a34c7f8433d51ede87f533afe672d6e357c8d37'
      //  }
      //]
    }
  },
  category:{
    id:'http://moodle.org',
    definition:{
      type:'http://id.tincanapi.com/activitytype/source',
      name:'Moodle',
      description:
        'Moodle is a open source learning platform designed to ' +
        'provide educators, administrators and learners with ' +
        'a single robust, secure and integrated system to create ' +
        'personalized learning environments.'
    }
  },
  platform:'Moodle',
  language:'en',
  homepage: 'http://localhost:8000'
};
module.exports = config;
