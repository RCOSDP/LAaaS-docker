const config = {
  LRS:{
    url:'http://172.18.0.7:8081/data/xAPI/',
    clients:{
      // LRS client
      'default':{
        user:'0350fbc365598526d4742a2bc360fccd51ba5d36',
        pass:'e64f0773d48019603ed4ccc454c070aa76626eeb'
      }
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
  homepage: 'http://localhost:8000',
  pathToCSVFile: './videojs.csv'
};
module.exports = config;
