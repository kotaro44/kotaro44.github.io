/*NodeJS requirements*/
	var fs = require('fs');
	var parse = require('csv-parse');
	var csv = require('fast-csv');
	var async = require('async');
	var colors = require('colors');

var FPTree = {};//The entire FP-Tree
var minSupport = 0;
var transaction_count = 1;

var orderedTransactions = [];

var fileName = "";
var dontSort = false;
var itemList = {};//All elements an their support counts and pointers (main table)
var items = [];//Ordered list of all elements by support
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
				minSupport = parseFloat( val.replace(/\%/g,'') )/100;
			break;
		default: 
				switch(val){
					case '-sort':
							dontSort = true;
						break;
				}
			break;
	}
});

console.log(' --- Fp Growth Tree --- '.green);
console.log('min support: '.grey + (100*minSupport+'%').yellow )

/*Utilities*/
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

var arrayToCSV = function( array ){
	return JSON.stringify(array).replace(/(\[\[)|(\]\])|\"/g,'').replace(/\]\,\[/g,'\n');
};

/*Specific Functions for the Algorithm*/
var supportCountLine = function( line , index , is_last ){
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
	};

	processProgress(index,'cyan');
};

var orderLine = function( line , index , is_last  ){
	orderedTransactions.push( line.sort(function( a , b ){
		return items.indexOf( a ) - items.indexOf( b );
	}));
	processProgress(index,'magenta');
}

var fpLine = function( line , index , is_last ){
	var current = FPTree;
	for (var i = 0; i < line.length ; i++) {
		//generate a new FP-Tree Node
		if( !current[line[i]] ){
			current[line[i]] = { 
				__count__: 0 , 
				__key__: line[i],
				__parent__: current //JSON Cycling 
			};
			itemList[ line[i] ].pointers.push( current[line[i]] );
		}

		current[line[i]].__count__++;
		current = current[line[i]];
	};

	processProgress(index,'green');
};

var _getAssociationRulesRecur = function( element , comb , minSupport , elements , itemList ){
	var count = 0;
	var pointers = itemList[element].pointers;


	var s = timer.getTime('s');
	if( s > timer.count ){
		timer.count = s + 5;
		console.log('\nTesting if: '.white + ('{'+comb+'}').cyan + ' -> '.white + ('{'+element+'}').green );
	}

	for( var i = 0 ;  i < pointers.length ; i++ ){
		var copyComb = JSON.parse( JSON.stringify( comb ) );

		for( var j = 0 ; j < copyComb.length ; j++ ){
			var test = pointers[i].__parent__;
			while( test ){
				if( test.__key__ == copyComb[j] )
					copyComb[j] = null;
				test = test.__parent__;
			}
		}

		if( !copyComb.filter(function(a){return a}).length  )
			count += pointers[i].__count__;
	}

	var start = (comb.length?elements.indexOf( comb[comb.length-1] ):0) + 1;
	if( count >= minSupport ){
		var rules = [ [ element ].concat( comb ).reverse() ];
		for( var i = start; i < elements.length ; i++ ){
			var copyComb = JSON.parse( JSON.stringify( comb ) );
			copyComb.push( elements[i] );
			var r = _getAssociationRulesRecur( element , copyComb , minSupport , elements , itemList);
			copyComb.pop();
			rules = rules.concat( r );
		}
		return rules;
	}
	return [];
};

var getAssociationRules = function( minSupport ){
	var result = {
		rules: []
	};
	var itemsReversed = items.reverse();
	for( var i = 0 ; i < itemsReversed.length ; i++ )
		result.rules = result.rules.concat( _getAssociationRulesRecur( itemsReversed[i] , [] , minSupport , itemsReversed , itemList ) );

	return result;
};

var getCleanTree = function( tree ){
	var result = {
		name: 'root',
		count: 0,
		children: []
	};
	var keys = Object.keys( tree );
	for( var i = 0 ; i < keys.length ; i++ ){
		if( keys[i] != '__parent__' ){
			if( typeof tree[keys[i]] == 'object' ){
				result.children.push( getCleanTree( tree[keys[i]] ) );
			}else{
				if( keys[i] == '__count__' )
					result.count = tree[keys[i]];
				if( keys[i] == '__key__' )
					result.name = tree[keys[i]];
			}
		}
	}
	return result;
};

/*Read & Save File Functions*/
var READFILE = function( processline , finish , otherFile ){
	console.log('Reading File: '.grey + (otherFile || fileName).yellow );

	/*****Reading Method 1 (Load file) ****/
	/*var parser = parse({delimiter: ','}, function (err, data) {
		var _t = 0;
		transaction_count = data.length;
		async.eachSeries(data, function (line, callback) {
			var is_last = (_t+1) == data.length;
			processline(line,_t, is_last );
			_t++;
			callback();
			if( is_last )
				finish();
		});
	});
	var reader = fs.createReadStream( otherFile || fileName);
	reader.pipe(parser);*/

	/*****Reading Method 2 (Stream File) ****/
	/**/var stream = fs.createReadStream(otherFile || fileName);
	var _t = 0;
	var csvStream = csv()
	    .on("data", function(data){
			processline(data,_t++, false );
	    })
	    .on("end", function(){
	    	transaction_count = _t;
	    	if( minSupport < 1 ){
		    	minSupport = minSupport*transaction_count;
		    }
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


/**********FP-Growth Entire Algorithm****************/
/********** (1) Generate Support Count **************/
	timer.start();//start timer
	//Get Support Count of All Elements
	READFILE( supportCountLine , function(){
		//Get Support Count Order
		items = Object.keys( itemList ).map(function(key){
			return itemList[key];
		}).sort(function(a,b){
			return b.count - a.count;
		}).map(function(a){
			return a.key
		}); 
		console.log('Support count calculated in: '.grey + timer.lap().green );
/********** (2) Order Transactions **************/
		//Generate Ordered Transactions
		READFILE( orderLine , function(){
			console.log('Sorted Transactions Generated in: '.grey + timer.lap().green );
			var result = arrayToCSV( orderedTransactions );
			SAVEFILE('sort', result , function( fileName ){
				console.log('Saved Transactions in: '.grey + timer.lap().green );
/********** (3) Generate FP-Tree **************/
				//Generate FP-Tree
				READFILE(fpLine, function(){
					console.log('FP-Tree Generated in: '.grey + timer.lap().green );
/********** (4) Get Association Rules **************/
					//get association rules
					console.log( minSupport , '???');
					var associationRules = getAssociationRules( minSupport ).rules;
					var result = arrayToCSV( associationRules );
					console.log('Association Rules Generated in: '.grey + timer.lap().green );
/********** (5) Save Output file **************/
					//prepare output file
					SAVEFILE('output', result , function( fileName ){
						console.log('Saved Association Rules in: '.grey + timer.lap().green );
/********** (6) Save FP-tree file **************/
						var cleanTree = getCleanTree( FPTree );
						cleanTree.rules = associationRules;
						cleanTree.minSupport = ((minSupport/transaction_count)*100).toFixed(2);
						result = JSON.stringify( cleanTree );
						SAVEFILE('tree', result , function( fileName ){
							console.log('Saved Tree File in: '.grey + timer.lap().green );
							console.log('--- Done! ---'.green);
						},'json');
					});
				},fileName);
			});
		});
	});
/********END**********/