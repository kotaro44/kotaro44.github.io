var fs = require('fs')
	path = require('path');

var mkdirParent = function(dirPath, mode, callback) {
	//Call the standard fs.mkdir
	fs.mkdir(dirPath, mode, function(error) {
		//When it fail in this way, do the custom steps
		if (error && (error.code == "ENOENT" || error.errno === 34) ) {
			//Create all the parents recursively
			mkdirParent(path.dirname(dirPath), mode, function(){
				//And then the directory
				mkdirParent(dirPath, mode, callback);
			});
		} else{
			callback && callback(error);
		}
	});
};


module.exports = {
	mkdir: mkdirParent
};