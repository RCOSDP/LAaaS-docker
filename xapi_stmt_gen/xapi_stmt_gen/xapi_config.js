var config = {
  db:{
    host:"moodle-docker_db_1",
    port:5432,
    database:"moodle",
    username:"moodleuser",
    password:"m@0dl3ing"
  },
  LRS:{
    url:"http://localhost/data/xAPI/",
    user:"f5772fe64665f82af6d63e42dcfd329374f567bd",
    pass:"1bdfb1bcdf8122c0a6fef68282aef4b47faa3e45" 
  },
  category:{
    id:"http://moodle.org",
    definition:{
		type:"http://id.tincanapi.com/activitytype/source",
		name:"Moodle",
		description:"Moodle is a open source learning platform designed to provide educators, administrators and learners with a single robust, secure and integrated system to create personalized learning environments."		
	}
  },
  "platform":"Moodle",
  "language":"en",
  "source_table_name":"mdl_logstore_standard_log",
  "hostname": "localhost",
  "homepage" : "http://localhost:8000"
}
module.exports = config;
