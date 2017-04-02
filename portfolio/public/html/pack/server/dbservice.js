var colors = require('colors'),
	mongoose = require('mongoose'),
	endpoints = require('./endpoints'),
	models = require('./models');

var settings = {
	username: "system",
	password: "abcd1234",
	server: "104.130.157.111",
	port: 27017,
	database: "agileEverywhere"
};

// Database Connection Uri
var url = "mongodb://" + settings.server + ":" + settings.port + "/" + settings.database;

var parseData = function( data , model ){
	var result = JSON.parse(JSON.stringify( data ));
	for( var i = 0 ; i < result.length ; i++ ){
		Object.keys( model.schema.paths ).map(function( key ){
			if( typeof result[i][key] == 'string' ){
				try{
					result[i][key] = JSON.parse( result[i][key] );
				}catch(err){

				}
			}
		});
	}
	return result;
};

var registerEndpoints = function( app ){

	Object.keys( models ).map(function( model ){
		models[model] = mongoose.model( model , models[model] );
	});

	endpoints = endpoints.init(models);

	var routeFrames = {
		create: function(model){
			app.post('/'+model, function(req, res){
				models[model].create(req.body, function(err, newOne){
					var response = {};
					if(err){
						response.success = false;
						response.errors = err;
						response[model] = {};
					}else{
						response.success = true;
						response[model] = parseData([newOne], models[model])[0];
					}
					res.send(response);
				});
			});
		},
		index: function(model){
			app.get('/'+model, function(req, res){
				var search = {};
				if (req.query.filter)
					search[req.query.filter] = req.query.with;
				models[model].find(search, function(err, list){
					var response = [];
					if(!err){
						response = parseData( list , models[model] );
					}
					res.send(response);
				});
			});
			app.post('/'+model+'/find', function(req, res){
				console.log('Looking with:', req.body);
				models[model].find(req.body,function(err, list){
					var response = [];
					if(!err){
						response = parseData(list , models[model]);
					}
					res.send(response);
				});
			});
		},
		show: function(model){
			app.get('/'+model+'/:id', function(req, res){
				models[model].find({ _id: req.params.id}, function(err, one){
					var response = {};
					if(!err || !one){
						response = one;
					}
					res.send(response);
				});
			});
		},
		update: function(model){
			app.post('/'+model+'/:id', function(req, res){
				models[model].findOneAndUpdate({ _id: req.params.id}, req.body, function(err, one){
					var response = {};
					if(err){
						response.success = false;
					}else{
						response.success = true;
						response[model] = one;
					}
					res.send(response);
				});
			});
		},
		destroy: function(model, req, res){
			app.delete('/'+model+'/:id', function(req, res){
				models[model].remove({ _id: req.params.id }, function(err, one){
					if(err){
						res.send({ sucess: false });
					}else{
						res.send({ success: true });
					}
				});
			});
		}
	};

	Object.keys( endpoints ).forEach(function(endpoint){
		if( typeof endpoints[endpoint] == "object" ){
			for (var i = 0; i < endpoints[endpoint].length; i++) {
				if( models[endpoint] && routeFrames[ endpoints[endpoint][i] ] ){
					routeFrames[ endpoints[endpoint][i] ](endpoint);
				}
			}
		}else if( typeof endpoints[endpoint] == "string" ){
			if( models[endpoint] && routeFrames[ endpoints[endpoint] ] ){
				routeFrames[ endpoints[endpoint] ](endpoint);
			}
		}else if( typeof endpoints[endpoint] == "function" ){
			app.post("/do/"+endpoint, endpoints[endpoint]);
		}
	});

};

module.exports = {
	init: function( app , callback ){
		console.log('connecting to: '.yellow + url)
		mongoose.connect( url ,function(){
			console.log('Connected To Mongo!!!'.green);
			registerEndpoints( app );
			callback();
		});
	}
};
