/*NodeJS requirements*/
	var fs = require('fs');
	var parse = require('csv-parse');
	var csv = require('fast-csv');
	var async = require('async');
	var colors = require('colors');

var fileName = "";
var inputFile = "";
var tree = null;
var transaction_count = 1;
var timer = {//Time Measure
	last: 0,
	count: 0,
	getTime: function( format ){
		var ms = (new Date()).getTime() - this.last;
		switch(format){
			case 's':
				return ms/1000;
			case 'm':
				return (ms/1000)/60;
			case 'h':
				return ((ms/1000)/60)/60;
			case 'd':
				return (((ms/1000)/60)/60)/24;
			case 'f':
				var result = ms%1000;
				if( ms > 1000 ){
					result = Math.floor( this.getTime('s') )%60 + 's ' + result;
					if( ms > 1000*60 ){
						result = Math.floor( this.getTime('m') )%60 + 'm ' + result;
						if( ms > 1000*60*60 ){
							result = Math.floor( this.getTime('h') )%24 + 'h ' + result;
							if( ms > 100*60*60*24)
								result = Math.floor( this.getTime('d') ) + 'd ' + result;
						}
					}
				}
				return result+'ms';
		}
		return ms;
	},
	start: function(){
		this.count = 1;
		this.last = (new Date()).getTime();
	},
	lap: function(){
		var result = this.getTime('f');
		this.start();
		return result;
	}
};

//Process Console Parameters
process.argv.forEach(function (val, index, array) {
	switch(index){
		case 2:
				fileName = val;
			break;
		case 3:
				inputFile = val;
			break;
	}
});

console.log(' --- Rule Generation & Confidence --- '.green);

var confidenceLine = function( line , index , is_last ){
	var match;
	for (var i = 0; i < tree.fullRules.length ; i++) {
		match = true;
		for( var j = 0 ; j < tree.fullRules[i].when.length ; j++ ){
			if( line.indexOf( tree.fullRules[i].when[j] ) == -1 )
				match = false;
		}

		if( match ){
			tree.fullRules[i].total++;
			if( line.indexOf( tree.fullRules[i].then ) != -1 )
				tree.fullRules[i].confidence++;
		}
	}
	processProgress(index,'blue');
};

var processProgress = function( index , color  ){
	var s = timer.getTime('s');
	if( s > timer.count ){
		timer.count = s + 1;
		if( index )
			if( transaction_count == 1)
				console.log('read '.grey + (index+'')[color] + ' records...'.grey);
			else
				console.log( ((100*(index/transaction_count)).toFixed(2) + '%')[color] );
		else {
			console.log( 'Read file in: '.grey + (timer.getTime('f')).green );
		}
	}
};

var generateRules = function( line , index , is_last ){
	for (var i = 0; i < line.length ; i++) {
		//Get list and support count of each element
		if( itemList[ line[i] ] ){
			itemList[ line[i] ].count++;
		}else{
			itemList[ line[i] ] = { 
				key: line[i],
				pointers: [],
				count: 1
			};
		}
	}
	processProgress(index,'blue');
};

/*Read & Save File Functions*/
var READFILE = function( processline , finish , otherFile ){
	console.log('Reading File: '.grey + (otherFile || fileName).yellow );
	/*****Reading Method 2 (Stream File) ****/
	/**/var stream = fs.createReadStream(otherFile || fileName);
	var _t = 0;
	var csvStream = csv()
	    .on("data", function(data){
			processline(data,_t++, false );
	    })
	    .on("end", function(){
	    	transaction_count = _t;
	        finish();
	    });
	 
	stream.pipe(csvStream);/**/
};

var SAVEFILE = function( prefix , content , callback , otherformat ){
	var newFileName = fileName.split(/\./)[0] + '-' + prefix + '.' + (otherformat||'csv');
	fs.writeFile(newFileName, content , function(err) {
		if(err) {
			return console.log((err+'').red);
		}
		console.log('Saved in: '.grey + newFileName.yellow);
		if( callback )
			callback( newFileName );
	});
	return newFileName;
};

console.log("Reading file: " + inputFile );

timer.start();
/********** (0) Calculate support count **************/
tree = JSON.parse(fs.readFileSync(inputFile));

//prepare the rules ass JSON'S
tree.fullRules = [];

var rules = tree.rules.filter(function( a ){
	return a.length > 2;
});

 
for( var i = 0 ; i < rules.length ; i++ ){
	var support = rules[i].pop();
	for( var j = 0 ; j < rules[i].length ; j++ ){
		tree.fullRules.push({
			support: support,
			then: rules[i][j],
			when: rules[i].filter(function(a){
			   return a != rules[i][j]
			}),
			confidence: 0,
			confidencePer: 0,
			total: 0
		});
	}
}

console.log('Generated rules in: '.grey + timer.lap().green );
READFILE(confidenceLine, function(){
	console.log('Confidence calculated in: '.grey + timer.lap().green );
	for( var i = 0 ; i < tree.fullRules.length ; i++ )
		tree.fullRules[i].confidencePer = (100*(tree.fullRules[i].confidence/tree.fullRules[i].total)).toFixed(2);

	result = JSON.stringify( tree );
	SAVEFILE('rules'+ tree.minSupportPer+'%', result , function( fileName ){
		console.log('Saved Rules&Tree File in: '.grey + timer.lap().green );
		console.log('--- Done! ---'.green);
	},'json');
});