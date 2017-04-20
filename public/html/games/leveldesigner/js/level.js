level = {
	size: {
		width: 1920,
		height: 1080
	},

	grid: {
		width: 20,
		height: 20,
		positioning: true,
		show: true
	},

	inputs: {
		width: null,
		height: null,
		gridX: null,
		gridY: null,
		positioning: null,
		show: null,
		compressRate: null
	},

	actions: {
		preview: null,
		export: null,
		import: null,
		exportImg: null,
		matrix: null
	},

	tools: null,
	canvas: null,
	gridCanvas: null,
	vRulerCanvas: null,
	hRulerCanvas: null,

	colors: {
		0: "#FF0000",
		1: "#00FF00",
		2: "#0000FF",
		3: "#FFFF00",
		4: "#00FFFF",
		5: "#FF00FF",
		6: "#FFCC00",
		7: "#A62CA2",
		8: "#F7BAD1",
		'255,0,0': 0,
		'0,255,0': 1,
		'0,0,255': 2,
		'255,255,0': 3,
		'0,255,255': 4,
		'255,0,255': 5,
		'255,204,0': 6,
		'166,44,162': 7,
		'247,186,209': 8,
		'0,0,0': '-'
	},

	compress: function( object ){
		var parseType = function( type ){
			if( type == '-' )
				return 0;
			return parseInt(type)+1;
		}

		for( var i = 0 ; i < object.m.length ; i++ ){
			var column = object.m[i];
			var newColumn = [];
			for( var j = 0 ; j < column.length ; j+=object.c ){
				var piece = column.substr(j,object.c);
				var piece_result = [];
				var actual = piece[0];
				for( var k = 0 ; k < piece.length ; k++ ){
					if( actual != piece[k] ){
						piece_result.push(k);
						piece_result.push(parseType(actual));
						actual = piece[k];
					}
				}
				if( !piece_result.length ){
					piece_result = parseType(piece[0]);
				}else{
					piece_result.push(k);
					piece_result.push(parseType(actual));
					actual = piece[k];
				}
				newColumn.push(piece_result);
			}
			object.m[i] = newColumn;
		}
		return object;
	},

	getType: function( data ){
		return this.colors[ data[0] + ',' + data[1] + ',' + data[2] ] || '?';
	},

	getCanvas: function( noBackground ){
		var elements = $('#canvas .elements');
		var canvas = document.createElement('canvas');
		canvas.width = elements.width();
		canvas.height = elements.height();

		var json = this.getJSONforSave();
		var ctx = canvas.getContext('2d');
		if( !noBackground ){
			ctx.beginPath();
		    ctx.rect(0, 0, canvas.width, canvas.height);
		    ctx.fillStyle = "white";
		    ctx.fill();
		}
		for( var i = 0 ; i < json.r.length ; i++ ){
			ctx.beginPath();
		    ctx.rect(json.r[i][0], json.r[i][1], json.r[i][2], json.r[i][3]);
		    ctx.fillStyle = this.colors[json.r[i][4]];
		    ctx.fill();
		}

		return canvas;
	},

	getJSONforSave: function(){
		var result = {
			w: this.size.width,
			h: this.size.height,
			r: []
		};

		$('.rectangle').each(function(i,e){
			e = $(e);
			var p = e.position();
			result.r.push([p.left,p.top,e.width(),e.height(),parseInt(e.attr('type'))]);
		})

		return result;
	},

	readJOSN: function( json ){
		json = JSON.parse(json);
		this.canvas.elementsWrapper.html("");
		this.inputs.width.val(json.w);
		this.inputs.width.keyup();
		this.inputs.height.val(json.h);
		this.inputs.height.keyup();
		for( var i = 0 ; i < json.r.length ; i++ )
			this.readObject(json.r[i]);
	},

	copyObject: function(){
		var _self = this;
		$('.rectangle').not('.ui-resizable-disabled').each(function(i,e){
			e = $(e);
			var p = e.position();
			_self.readObject([p.left,p.top,e.width(),e.height(),parseInt(e.attr('type'))]);
		})
	},

	_i: function(d,c){var a=this.m[d][Math.floor(c/this.c)];if(a.length){for(var e=c%this.c,b=0;b<a.length;b+=2)if(e<=a[b])return a[b+1];return-1}return a},
	_p: function( json , type ){

	}
}

function renderCanvas(){
	var l = level;
	//hRuler
	var ctx = l.hRulerCanvas[0].getContext('2d');
	ctx.clearRect(0,0,l.size.width,30);
	ctx.beginPath();
	ctx.strokeColor = "black";
	for( var i = 0 ; i < l.size.width ; i+=10 ){
		ctx.moveTo( i , (i%100?20:10) );
		ctx.lineTo( i , 30 );
	}
	ctx.stroke();
	for( var i = 0 ; i < l.size.width ; i+=100 ){
		ctx.fillText( i , 5 + i , 15);
	}

	ctx = l.vRulerCanvas[0].getContext('2d');
	ctx.clearRect(0,0,30,l.size.height);
	ctx.beginPath();
	ctx.strokeColor = "black";
	for( var j = 0 ; j < l.size.height ; j+=10 ){
		ctx.moveTo( (j%100?20:10) , j );
		ctx.lineTo( 30 , j );
	}
	ctx.stroke();
	for( var j = 0 ; j < l.size.height ; j+=100 ){
		ctx.fillText( j , 2 , 15 + j);
	}

	ctx = l.gridCanvas[0].getContext('2d');
	ctx.clearRect(0,0,l.size.width,l.size.height);

	if( l.grid.show ){
		ctx.beginPath();
		ctx.strokeStyle = "#EEEEEE";
		ctx.strokeSize = 0.2;

		for( var i = 0 ; i < l.size.width ; i += l.grid.width )
		{
			ctx.moveTo(i,0);
			ctx.lineTo(i,l.size.height);
		}
		for( var j = 0 ; j < l.size.height ; j += l.grid.height )
		{
			ctx.moveTo(0,j);
			ctx.lineTo(l.size.width,j);
		}
		ctx.stroke();

	}
}

window.onload = function(){	
	var l = level;
	l.inputs.width = $('#width');
	l.inputs.height = $('#height');
	l.actions.preview = $('#preview');
	l.actions.export = $('#export');
	l.actions.import = $('#import');
	l.actions.exportImg = $('#exportImg');
	l.actions.matrix = $('#matrix');
	l.gridCanvas = $('#gridCanvas');
	l.inputs.positioning = $('#positioning');
	l.inputs.show = $('#show');
	l.inputs.gridX = $('#gridX');
	l.inputs.gridY = $('#gridY');
	l.inputs.compressRate = $('#compress');
	l.vRulerCanvas = $('#vRulerCanvas');
	l.hRulerCanvas = $('#hRulerCanvas');
	l.canvas = $('#canvas');
	l.tools = $('.tool');

	l.canvas.elementsWrapper = l.canvas.find('.elements');

	l.inputs.width.bind('keyup',function(e){
		var l = level;
		var w = parseInt( l.inputs.width.val() );

		if( w > 1 ){
			l.inputs.width.removeClass('error');
			l.size.width = w;
			l.canvas.css({
				width: l.size.width + 'px'
			});
			l.hRulerCanvas.attr({
				width: l.size.width
			});
			l.gridCanvas.attr({
				width: l.size.width
			});
			renderCanvas();
		}else{
			l.inputs.width.addClass('error');
		}
	});

	l.inputs.height.bind('keyup',function(e){
		var l = level;
		var h = parseInt( l.inputs.height.val() );

		if( h > 1){
			l.inputs.height.removeClass('error');
			l.size.height = h;
			l.canvas.css({
				height: l.size.height + 'px'
			})
			l.vRulerCanvas.attr({
				height: l.size.height 
			});
			l.gridCanvas.attr({
				height: l.size.height 
			});
			renderCanvas();
		}else{
			l.inputs.height.addClass('error');
		}
	});

	l.inputs.gridX.bind('keyup',function(e){
		var l = level;
		var gx = parseInt( l.inputs.gridX.val() );

		if( gx > 1 ){
			l.grid.width = gx;
			renderCanvas();
			l.inputs.gridX.removeClass('error');
		}else{
			l.inputs.gridX.addClass('error');
		}
	});

	l.inputs.gridY.bind('keyup',function(e){
		var l = level;
		var gy = parseInt( l.inputs.gridY.val() );

		if( gy > 1 ){
			l.grid.height = gy;
			renderCanvas();
			l.inputs.gridY.removeClass('error');
		}else{
			l.inputs.gridY.addClass('error');
		}
	});

	l.inputs.show.bind('change',function(){
		l.grid.show = l.inputs.show.attr('checked');
		renderCanvas();
	});

	l.inputs.positioning.bind('change',function(){
		l.grid.positioning = l.inputs.positioning.attr('checked');
		renderCanvas();
	});

	l.tools.draggable({
		revert: true,
		helper: function(e){
			var clone = $('<div>').addClass('clone-wrapper').append($(e.currentTarget).clone());
			$('body').append(clone);
			return clone;
		}
	});

	l.canvas.droppable({
		accept: '.tool',
		drop: function(e,ui){
			l.addObject(e,ui);
		},
		activeClass: 'canvas-active',
		hoverClass: 'canvas-hover'
	});

	l.actions.preview.click(function(){
		$('body').addClass('preview');
		var canvas = l.getCanvas();

	  	$('.black-screen').remove();
	    var img = $('<div>').addClass('preview').css({
	    	'background-image': 'url(' + canvas.toDataURL("image/jpeg") + ')',
	    });
	    var blackScreen = $('<div>').addClass('black-screen');
	    var xButton = $('<div>').addClass('xButton').html('X');
	    blackScreen.append( img );
	    blackScreen.append( xButton );
	    xButton.click(function(){
	    	$('.black-screen').remove();
	    	$('body').removeClass('preview');
	    })
	    $('body').append( blackScreen );  
	});

	l.actions.export.click(function(){
		var l = level;
		var textToWrite = JSON.stringify(l.getJSONforSave());
		var textFileAsBlob = new Blob([textToWrite], {type:''});
		var fileNameToSaveAs = 'world.kwl';

		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download File";
		if (window.webkitURL != null)
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
		downloadLink.click();
	});

	l.actions.import.click(function(){
		$('#filename').click();
	});

	l.actions.matrix.click(function(){
		var blackScreen = $('<div>').addClass('black-screen');
	    $('body').append( blackScreen );  
		setTimeout(function(){
			var l = level;
			/*var canvas = l.getCanvas(true);
			var ctx = canvas.getContext('2d');
			var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
			var offset = 0;
		
			var recur = function( i , canvas , imgData , matrix , l , offset , cb ){
				if( i < canvas.width ){
					matrix[i] = "";
					for( var j = 0 ; j < canvas.height ; j++ ){
						offset = (canvas.width*j + i)*4;
						matrix[i] += l.colors[ imgData[offset] + ',' + imgData[offset+1] + ',' + imgData[offset+2] ];

					}
					blackScreen.html( ((100*(i/canvas.width)).toFixed(2)  + '%'));
					setTimeout(function(){
						recur(++i, canvas , imgData , matrix , l , offset , cb);	
					})
				}else{
					cb(matrix);
				}
			};


			recur( 0 , canvas , imgData , [] , l , 0 , function(matrix){
				var l = level;
				var result = l.getJSONforSave();
				result.c = parseInt(l.inputs.compressRate.val());
				result.m = matrix;
				l.compress(result);
				result.i = l._i;
				_X = result;

				var textToWrite = JSON.stringify(result);
				var textFileAsBlob = new Blob([textToWrite], {type:''});
				var fileNameToSaveAs = 'world.kma';

				var downloadLink = document.createElement("a");
				downloadLink.download = fileNameToSaveAs;
				downloadLink.innerHTML = "Download File";
				downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
				downloadLink.click();

				blackScreen.remove();
			})*/

			var result = l.getJSONforSave();
			result.m = [];
			//clear the picture
			for( var i = 0 ; i < l.size.width ; i++ ){
				result.m[i] = '';
				for( var j = 0 ; j < l.size.height ; j++ ){
					 result.m[i] += '-';
				}	
			}

			//draw the rectangles
			for( var r = 0 ; r < result.r.length ; r++ ){
				for( var i = result.r[r][0] ; i < (result.r[r][2]+result.r[r][0]) ; i++  ){
					if( i < l.size.width ){
						for( var j = result.r[r][1] ; j < (result.r[r][3]+result.r[r][1]) ; j++  ){
							if( j < l.size.height ){
								result.m[i] = result.m[i].replaceAt( j , result.r[r][4]+'' );
							}
						}
					}
				}
			}

			result.c = parseInt(l.inputs.compressRate.val());
			l.compress(result);

			var textToWrite = JSON.stringify(result);
			var textFileAsBlob = new Blob([textToWrite], {type:''});
			var fileNameToSaveAs = 'world.kma';

			var downloadLink = document.createElement("a");
			downloadLink.download = fileNameToSaveAs;
			downloadLink.innerHTML = "Download File";
			downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
			downloadLink.click();

			blackScreen.remove();

			
		},0);
	});

	l.actions.exportImg.click(function(){
		var canvas = l.getCanvas(true);
		window.open(canvas.toDataURL("image/png"));
	})

	$('#filename').on('change click', function(){
		var file = $('#filename').val();
		if( file ){
			var fileToLoad = document.getElementById("filename").files[0];

			var fileReader = new FileReader();
			fileReader.onload = function(fileLoadedEvent) 
			{
				var textFromFileLoaded = fileLoadedEvent.target.result;
				l.readJOSN( textFromFileLoaded );
			};
			fileReader.readAsText(fileToLoad, "UTF-8");
		}
    });


	renderCanvas();
}

level.readObject = function( props ){
	var l = this;
	var newRect = $('<div>').addClass('rectangle').attr('type',props[4]);
	this.canvas.elementsWrapper.append(newRect);

	newRect.css({
		width: props[2] +'px',
		height: props[3]+'px'
	})

	newRect.draggable({
		containment: '#canvas',
		drag: function(e,ui){
			var level = l;
			if( l.grid.positioning ){
				ui.position.left = Math.round( ui.position.left/level.grid.width )*level.grid.width;
				ui.position.top = Math.round( ui.position.top/level.grid.height )*level.grid.height;
				ui.helper.css({
					'left': ui.position.left+'px',
					'top': ui.position.top+'px'
				});
			}
		}
	});

	newRect.mousedown(function(e) {
	    switch (e.which) {
	        case 1:
	        		if( !$('body').hasClass('ctrl-pressed') )
	        			$('.rectangle').resizable( "option", "disabled", true );
	        		newRect.resizable( "option", "disabled", false );
	            break;
	        case 2:
	            break;
	        case 3:
	        		//$(this).remove();
	            break;
	    }
	    e.stopPropagation();
	    e.preventDefault();
	});

	newRect.resizable({
		containment: '#canvas',
		handles: "n, e, s, w, ne, se, sw, nw",
		resize: function(e,ui){
			var level = l;
			if( l.grid.positioning ){
				ui.size.width = Math.round( ui.size.width/level.grid.width )*level.grid.width;
				ui.size.height = Math.round( ui.size.height/level.grid.height )*level.grid.height;
				ui.position.left = Math.round( ui.position.left/level.grid.width )*level.grid.width;
				ui.position.top = Math.round( ui.position.top/level.grid.height )*level.grid.height;
				ui.element.css({
					'width': ui.size.width+'px',
					'height': ui.size.height+'px',
					'left': ui.position.left+'px',
					'top': ui.position.top+'px'
				});
			}
		}
	}).resizable( "option", "disabled", true );

	newRect.bind('dblclick',function(){
		var $this = $(this);
		$this.attr('type',(parseInt($this.attr('type'))+1)%9)
	});

	if( this.grid.positioning ){
		var w = newRect.width();
		var h = newRect.height();
		w = Math.round( w/this.grid.width )*this.grid.width;
		h = Math.round( h/this.grid.height )*this.grid.height;
		props[0] = Math.round( props[0]/this.grid.width )*this.grid.width;
		props[1] = Math.round( props[1]/this.grid.height )*this.grid.height;
		newRect.css({
			'width': w+'px',
			'height': h+'px'
		});
	}

	newRect.css({
		'left': props[0]+'px',
		'top': props[1]+'px'
	});
};

level.addObject = function(e,ui){
	var l = this;

	var _clientRect = l.canvas[0].getBoundingClientRect();
	var props = [];
	props[0] = e.clientX - _clientRect.left;
	props[1] = e.clientY - _clientRect.top;
	props[2] = l.grid.height*2;
	props[3] = l.grid.height*2;
	props[4] = 0;

	l.readObject(props);	
};

window.onkeydown = function(e){
	var l = level;
	var rects = $('.rectangle').not('.ui-resizable-disabled');
	var moveX = 0;
	var moveY = 0;
	switch(e.keyCode){
		case 37:
				moveX = -l.grid.width;
			break;
		case 38:
				moveY = -l.grid.height;
			break;
		case 39:
				moveX = l.grid.width;
			break;
		case 40:
				moveY = l.grid.height;
			break;
		case 17:
				$('body').addClass('ctrl-pressed');
			break;
		case 46:
				rects.remove();
			break;
		case 68:
			if( e.ctrlKey){
				l.copyObject();
				e.preventDefault();
			}
			break;
	};


	rects.each(function(i,e){
		var _self = $(e);
		var pos = _self.position();
		var l = level;
		pos.left += moveX;
		pos.top += moveY;

		pos.left = Math.round( pos.left/l.grid.width )*l.grid.width;
		pos.top = Math.round( pos.top/l.grid.height )*l.grid.height;

		_self.css({
			left: pos.left + 'px',
			top: pos.top + 'px'
		})
	})

	if( moveY || moveX ){
		e.stopPropagation()
		e.preventDefault();
	}
};

window.onkeyup = function(e){
	if( e.keyCode == 17 )
		$('body').removeClass('ctrl-pressed');
};


String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

console.log('This program was deveolopped by Carlos A. Sánchez in the Skies!');
console.log('In a plane going to Santiago de Chile....');