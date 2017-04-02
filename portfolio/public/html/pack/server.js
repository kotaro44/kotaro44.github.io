/*****************************************************************************************
*	server.js: is the script responsable for setting up the server for the application.
*
*     -USAGE-
*
*      $ node server.js
*          -It will start the server with default values
*              *port: 80
*              *public folder: /public
*              *index.html: ./index.html
*
*      $ node server.js -port <port_number>
*			-It will start the server with the <port_number> passed as parameter,
*            if there is no other parameter specified, it will use the default folder and files.
*           Example: $ node server.js -port 8080
*
*      $ node server.js -min     !important: requires grunt to generate these files
*          -It will start the server with the minified files
*              *public folder: /public-min
*              *index.html: ./index.min.html
*
*      $ node server.js -debug   !important: requires grunt to generate these files
*          -It will start the server with the debug files
*              *public folder: /public-debug
*              *index.html: ./index.debug.html
*
******************************************************************************************/


/*********** DEFAULT ENDPOINTS *********************************
*       NAME            TYPE
*   /                   GET
*	/uploadImage        POST
*   /content            GET
/***************************************************************/

var express = require('express'),
    app = express(),
    colors = require('colors'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    multer  = require('multer'),
    dbservice = require('./server/dbservice'),
    mkdirParent = require('./server/util/mkdir-parent'),
    compress = require('compression'),
    port = 80,
    homepage = './index.html',
    publicFolder = '/public',
    imgUploadsFolder = './gen/uploads/',
    i18nFolder = './server/i18n/',
    pidFile = './_pid',
    background = false,
    done = false;
console.log('\n----------------------------------Server.js-------------------------------------\n'.green);

app.use(compress()); 

/*Process all arguments*/
process.argv.forEach(function (val, index, array) {
	switch( val ){
		case '-min':
				console.log('--Started as Min Mode--'.yellow);
				homepage = './index.min.html';
				publicFolder = '/public-min';
			break;
		case '-debug':
				console.log('--Started as Debug Mode--'.yellow);
				homepage = './index.debug.html';
				publicFolder = '/public-debug';
			break;
		case '-port':
				if( !array[index+1] )
					console.log(('No port setted, default is ' + port).red )
				else
					port = parseInt( array[index+1] );
			break;
		case '-forever':
				console.log('<server will run on the background>'.yellow);
				background = true;
			break;
	}
});

var prepareImageUploadService = function(){
	//check if the gen/uploads folder exists if not create it
	fs.stat( imgUploadsFolder , function(err, stats){
		if( err ){
			if( err.code == "ENOENT"){
				mkdirParent.mkdir( imgUploadsFolder );
			}else{
				console.log(('There was an error trying to read ' + imgUploadsFolder + ' stats').red);
			}
		} else if( !stats.isDirectory() ){
			mkdirParent.mkdir( imgUploadsFolder );
		}
	});

	//configure multer
	app.use(multer({ dest: imgUploadsFolder,
		rename: function (fieldname, filename) {
			return filename+Date.now();
		},
		onFileUploadStart: function (file) {
			console.log('uploading file: ' + file.fieldname + '...' );
		},
		onFileUploadComplete: function (file) {
			console.log(file.fieldname + ' uploaded to  ' + file.path)
			done =  '/uploads/' + file.name;
		}
	}));

	app.post('/uploadImage',function(req,res){
		if(done){
	    	res.send( done );
	    	done = false;
	  	}
	});

	app.get('/uploads/:image', function(req, res){
		var options = { root: __dirname	};
		res.sendFile(imgUploadsFolder + req.params.image , options , function(err){
			if(err){
				console.log('Image not found: '.red, err);
				res.status(err.status).end();
			}
		});
	});
};

var defaultRequest = function(req, res){
	console.time('New Index Request Fullfilled In'.cyan);
	console.log('Request from ' +  req.ip );
	var options = { root: __dirname	};
	res.sendFile(homepage, options, function(err){
		if(err){
			console.log('Error Sending Index: '.red, err);
			res.status(err.status).end();
		}
		console.timeEnd('New Index Request Fullfilled In'.cyan)
	});
};

var startServer = function(){
	app.use(express.static(__dirname+publicFolder));

	prepareImageUploadService();
	app.use(bodyParser.json());
	app.get('/', defaultRequest );
	app.listen(port);

	console.log(('Index Folder setted as: ' + __dirname + publicFolder ).cyan);
	console.log(('Index File setted as: ' + homepage).cyan);
	console.log(('App Listening in port: ' + port).green);

	dbservice.init(app , function(){
		app.use(function(req, res) {
		    res.redirect('/#/notfound');
		});
		console.log('waiting for connections...');
	});
};

startServer();