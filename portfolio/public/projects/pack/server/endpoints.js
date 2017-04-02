/* *********************** DEFAULT ENDPOINTS **************************** */
/*
  -------------------------------- create ---------------------------------
    *Inserts a new Registry to the model

    POST: <http://server/>/:MODEL           DATA: {
                                              <object to insert>
                                            }

  -------------------------------- index ----------------------------------
    *List all the Registries in the Model

    GET: <http://server/>/:MODEL

    POST: <http://server/>/:MODEL/find      DATA: {
                                              <filter object>  
                                            }

  --------------------------------- show ----------------------------------
    *get registry by ID

    GET: <http://server/>/:MODEL/:id

  -------------------------------- update ---------------------------------

    POST: <http://server/>/:MODEL/:id       DATA: {
                                              <updated object>
                                            }

  -------------------------------- destroy --------------------------------

    DELETE: <http://server/>/:MODEL/:id   

*/

var fs = require('fs'),
    mkdirParent = require('./util/mkdir-parent'),
    models = require('./models')
    exec = require('child_process').exec;

var prepareFilePath = function( path , callback ){
	fs.stat( path , function(err, stats){
		if( err ){
			if( err.code == "ENOENT"){
				mkdirParent.mkdir( path , null , function( err ){
					callback();
				});
			}else{
				//respond( {"Error": "Error reading " + path , err: err } );
			}
		} else {
			if( stats.isDirectory() ){
				callback();
			} else {
				mkdirParent.mkdir( path , null , function(){
					callback();
				});
			}
		}
	});
};

module.exports = {
    init: function(models){
      var endpoints = {
      	highlight: ['index','create','show','update','destroy'],
        articles: ['index', 'create', 'show', 'destroy', 'update'],

        install: function(data, respond, send2log){
          data = JSON.stringify(data.body);
          fs.writeFile('./gen/highlight.json', data, function(err, something){
            if (err) {
              respond.send({success: false});
            }else{
              exec('grunt i18n', function(error, stdout, stderr){
                  respond.send({ success: true, gruntData: {err: error, stdout: stdout, stderr: stderr} });
              });
            }
          });
        },

      	exportHighlight: function( data , respond , send2log ){
          data = data.body;
      		if(!data.name || data.name == ""){
      			respond.send( {"Error": "incomplete Data"} );
      			return;
      		}

          var highlights = models.highlight;

          //delete
          highlights.remove({
            name: data.name
          },function(){
            var languages = Object.keys( data.i18n );

            var savei18n = function( callback ){
              if( languages.length ){
                var lang = languages.pop();
                var path = "./gen/i18n/" + lang + '/';
                var url = path + data.name + '.i18n';
                var content = Object.keys(data.i18n[lang]).map(function(key){
                  return key + '=' + data.i18n[lang][key]
                }).join('\n');

                var writefile = function(){
                  fs.writeFile( url , content , function(err) {
                      if(err) {
                        respond.send( {"Error": "Error Saving " + lang + " file...", url: url , err: err } );
                          return;
                      }
                    savei18n( callback );
                  });
                };

                prepareFilePath( path , function(){
                  writefile();
                });
              }else{
                callback();
              }
            };

            savei18n(function(){
              data.background = JSON.stringify(data.background);
              data.i18n = JSON.stringify(data.i18n);

              highlights.create(data, function(err, created){
                if(err){
                  respond.send( {"Error": "Error Saving highlight ", err: err } );
                }else{
                  respond.send({"message": "saved corectly", highlight: created});
                }
              });

            });
          });
      	},

        content: function(request, response){
          var resp = {
            highlights: [],
            installed: []
          };
          models.highlight.find(function(err, hs){
            if(!err){
              for (var i = 0; i < hs.length; i++) {
                hs[i] = hs[i].toObject();
                if (hs[i].background) {
                  hs[i].background = JSON.parse(hs[i].background);
                }
                if (hs[i].i18n) {
                  hs[i].i18n = JSON.parse(hs[i].i18n);
                }
              }
              resp.highlights = hs;
            }
            fs.readFile('./gen/highlight.json', function(err, data){
              if (!err) {
                var jsonData = JSON.parse(data);
                if (jsonData && jsonData.highlights) {
                  resp.installed = resp.highlights.filter(function(val){
                    return jsonData.highlights.indexOf(val.name) >= 0;
                  });
                }
              }
              response.send(resp);
            });
          });
        },

        "i18n/:lang/:file": function(req, res){
          fs.readFile('./server/i18n/' + req.params.lang + '/app.i18n', 'utf8', function(err, file){
            if(err){
              console.log( ('I18n File '+req.params.file+' not found for lang: '+req.params.lang).red, err);
              res.status(err.status).end();
            }else{
              var json = {};
              file.split(/\n/).filter(function(row){
                row = row.trim();
                return row[0] != '#' && row.match(/\=/);
              }).map(function(row){
                return row.split(/\=/);
              }).map(function(pair){
                json[ pair[0] ] = pair[1].replace(/(\r\n|\r|\n)/g, '');
              });
              fs.readFile('./gen/highlight.json', function(err, data){
                if (!err) {
                  var jsonData = JSON.parse(data);
                  if (jsonData && jsonData.highlights) {
                    models.highlight.find({'name': { '$in': jsonData.highlights}}, function(err, installed){
                      if(err){
                        console.log('Unable to load installed highlights i18n!');
                        res.send(json);
                      }else{
                        var contentNames = [];
                        installed.forEach(function(val){
                          var installJSON;
                          if (val.i18n)
                            installJSON = JSON.parse(val.i18n)[req.params.lang];
                          Object.keys(installJSON).forEach(function(pair){
                            json[ pair ] = installJSON[pair];
                          });

                          if(val.contentName)
                            contentNames.push(val.contentName);
                        });
                        models.articles.find({/*Getting all contents for now...*/}, function(err, contents){
                          if(err){
                            res.send(json);
                          }else{
                            contents.forEach(function(label){
                              if (label.i18n) {
                                var contentJSON = JSON.parse(label.i18n)[req.params.lang];
                                Object.keys(contentJSON).forEach(function(val){
                                  json[ val ] = contentJSON[val];
                                });
                              }
                            });
                            res.send(json);
                          }
                        });
                      }
                    });
                  }
                }else{
                  if( err.code == 'ENOENT' ){
                    res.send(json);
                  }else{
                    res.status(err.status);
                    res.send({});
                  }
                }
              });
            }
          });
        }
      //Endpoint Object End
    };
    return endpoints;
  }
};
