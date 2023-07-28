const fs = require('fs');
const partials = {
  student: fs.readFileSync(
    'templates/common/actor.student.hbs',
    {
      encoding: 'utf8'
    }
  ),
  instructor: fs.readFileSync(
    'templates/common/actor.instructor.hbs',
    {
      encoding: 'utf8'
    }
  ),
  context: fs.readFileSync(
    'templates/common/context.hbs',
    {
      encoding: 'utf8'
    }
  )
};
module.exports = partials;
