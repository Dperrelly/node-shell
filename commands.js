fs = require('fs');
request = require('request');


var commands = {
	pwd: function (file, done){
  	done(process.env.PWD);
  	},

  	ls: function(file, done){
  		if(file == "ls") file = ".";
	  	fs.readdir(file, function(err, files) {
		  	if (err) throw err;
		  	var output = "";
		  	files.forEach(function(file) {
		    	output += file.toString() + "\n";
		  	});
		  	done(output.slice(0,-1));
		});
  	},
  	cat: function(file, done){
  		var files = file.split(' ');
		 

		var output = "";

  		files.forEach(function(file){

	  		output += (fs.readFileSync(file, 'utf8') + '\n\n');
	  		

  		});
  		done(output.slice(0,-1));

  	},
  	head: function(stdin, file, done){
  		console.log('HEAD');

  		if(stdin){
			
			var topfive = stdin.match(/^((.*\n){0,4}(.*))\n?/)[1];
	  		done(topfive);

  		}else{

  		var files = file.split(' ');

  		fs.readFile(files[0], function(err, data){
	  		if(err) throw err;
	  		data = data.toString();

	  		var topfive = data.match(/^((.*\n){0,4}(.*))\n?/)[1];
	  		done(topfive);
	  	});

  		}

  	},
  	tail: function(stdin, file, done){
  		console.log('TAIL');
  		if(stdin){
			
			var bottomfive = stdin.match(/((.*\n){0,4}(.*))$/)[1];
		  	done(bottomfive);

  		}else{

			var files = file.split(' ');

	  		fs.readFile(files[0], function(err, data){
		  		if(err) throw err;
		  		data = data.toString();

		  		var bottomfive = data.match(/((.*\n){0,4}(.*))$/)[1];
		  		done(bottomfive);

		  	});

  		}


  	},
  	sort: function(file, done){
		
		var files = file.split(' ');

  		fs.readFile(files[0], function(err, data){
	  		if(err) throw err;
	  		data = data.toString().split('\n');

	  		done(data.sort().join('\n'));

	  	});

  	},

  	uniq: function(file, done){

		var files = file.split(' ');

  		fs.readFile(files[0], function(err, data){
	  		if(err) throw err;
	  		data = data.toString().split('\n');


	  		var result = [];
	  		for(var i = 1; i < data.length; i++){
	  			if(data[i] !== data[i-1]) result.push(data[i]);

	  		}

	  		done(result.join('\n'));

	  	});  	
  	},

  	curl: function(file, done){
  		var files = file.split(' ');

  		request(files[0], function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		done(body); // Show the HTML for the Google homepage.
  		}
});

  	}
};

module.exports.input = commands;