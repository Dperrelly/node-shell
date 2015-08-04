commands = require('./commands.js');

//fs = require('fs');
//4
//5
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
  data = data.toString().trim(); 
  var cmd = data.split(' ')[0];// remove the newline
  
  var file = data.slice(data.indexOf(' ') + 1);
  
  if(cmd === 'date') process.stdout.write(Date());
  commands.input[cmd](file);

});