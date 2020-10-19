const config = {
  db:{
    host:'moodle-docker_db_1',
    port:5432,
    database:'moodle',
    username:'moodleuser',
    password:'m@0dl3ing',
    prefix:'mdl_'
  },
  LRS:{
    url:'http://172.18.0.6:8081/data/xAPI/',
    clients:{
      // LRS client
      'default':{
        user:'c08425cf11e029dfa39fd0a4b82b5a7fc11c946c',
        pass:'9740982b01ca69caf61e218a261c56d94e6eddba'
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
