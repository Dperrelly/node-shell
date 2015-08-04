commands = require('./commands.js');

//fs = require('fs');
//4
//5
process.stdout.write('prompt > ');
var done = function(output){
	process.stdout.write(output + '\n\nprompt > ');
	if(commandList.length > 0) commands.input[commandList.shift()](output, null, done);
};

var commandList = [];
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
  data = data.toString().trim(); 

  commandList = data.split(' | ');
  commandList.shift();

  var cmd = data.split(' ')[0];// remove the newline
  
  var file = data.slice(data.indexOf(' ') + 1);
  
  if(cmd === 'date') process.stdout.write(Date());
  commands.input[cmd](null, file, done);

});