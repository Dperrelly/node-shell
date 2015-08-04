fs = require('fs');

var commands = {
	pwd: function (file){
  	process.stdout.write(process.env.PWD);
  		process.stdout.write('\nprompt > ');
  	},

  	ls: function(file){
  		if(file == "ls") file = ".";
  		console.log(file);
	  	fs.readdir(file, function(err, files) {
		  	if (err) throw err;
		  	files.forEach(function(file) {
		    	process.stdout.write(file.toString() + "\n");
		  	});
	  		process.stdout.write("prompt >");
		});
  	},
  	cat: function(file){
  		var files = file.split(' ');

  		files.forEach(function(file){

	  		fs.readFile(file, function(err, data){
	  			if(err) throw err;
	  			process.stdout.write(data);
	  			//console.log();
	  			process.stdout.write("\nprompt >");

	  		});

  		});
  	},
  	head: function(file){
  		var files = file.split(' ');

  		fs.readFile(files[0], function(err, data){
	  		if(err) throw err;
	  		data = data.toString();

	  		var topfive = data.match(/^((.*\n){0,4}(.*))\n?/)[1];
	  		process.stdout.write(topfive);
	  			//console.log();
	  		process.stdout.write("\nprompt >");

	  	});



  	},
  	tail: function(file){
		var files = file.split(' ');

  		fs.readFile(files[0], function(err, data){
	  		if(err) throw err;
	  		data = data.toString();

	  		var topfive = data.match(/((.*\n){0,4}(.*))$/)[1];
	  		process.stdout.write(topfive);
	  		process.stdout.write("\nprompt >");

	  	});



  	},
  	sort: function(file){
		
		var files = file.split(' ');

  		fs.readFile(files[0], function(err, data){
	  		if(err) throw err;
	  		data = data.toString().split('\n');

	  		//console.dir(data);

	  		process.stdout.write(data.sort().join('\n'));
	  		
	  		process.stdout.write("\nprompt >");

	  	});

  	}
};

module.exports.input = commands;