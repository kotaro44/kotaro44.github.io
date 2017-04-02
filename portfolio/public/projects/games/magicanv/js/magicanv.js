/*THE STACK VARIABLE FOR SUPPORTING MORE THAN 1 CANVAS IN MOTION*/
_magicanv_stack = {};
_magicanv_stack_ids = [];
_magicanv_i = 0;

/*NEW CANVAS FUNCTIONS*/
CanvasRenderingContext2D.prototype.drawCircle = function( circle ){
	this.beginPath();
	this.arc( circle.x, circle.y, circle.r, 0, 2 * Math.PI, false);
	this.fill();
	this.stroke();
};

CanvasRenderingContext2D.prototype.drawLine = function( p1 , p2 ){
	this.beginPath();
	this.moveTo(p1.x,p1.y);
	this.lineTo(p2.x,p2.y);
	this.stroke();
};

CanvasRenderingContext2D.prototype.drawPolygon = function( polygon ){
	this.beginPath();
	this.moveTo( polygon[0].x,polygon[0].y);

	if( polygon[polygon.length-1].z )
	{
		for( _magicanv_i = 1 ; _magicanv_i < polygon.length - 1 ; _magicanv_i++ )
			this.lineTo(polygon[_magicanv_i].x,polygon[_magicanv_i].y);
		this.closePath();
	}else{
		for( _magicanv_i = 1 ; _magicanv_i < polygon.length ; _magicanv_i++ )
			this.lineTo(polygon[_magicanv_i].x,polygon[_magicanv_i].y);
	}
	
	this.fill();
	this.stroke();
};

/*NEW MATH FUNCTIONS*/
Math.distance = function( p1 , p2 ){
	return Math.sqrt( Math.pow( p2.x - p1.x , 2 ) +  Math.pow( p2.y - p1.y , 2 ) ); 
};

Math.angleBetween = function( origin , point ){
	return Math.atan( (point.y - origin.y)/(point.x - origin.x )) + ((point.x<origin.x)?Math.PI:0);
};

Math.aprox = function( val , speed , limit ){
	if( val > limit  )
		return (val-speed<limit)?limit:val-speed;
	return (val+speed>limit)?limit:val+speed;
};

/*FIGURES*/
function magic_object( position , style ){
	this.position = { x: position.x?position.x:0 , y: position.y?position.y:0};
	this._getFill = function(){
		if( this.style.fill[0] == "#" )
			return "rgba(" + parseInt( this.style.fill.substring(1,3) , 16 ) + "," +
				             parseInt( this.style.fill.substring(3,5) , 16 ) + "," +
				             parseInt( this.style.fill.substring(5,7) , 16 ) + "," +
				             this.style.opacity + ")";
		return this.style.fill;
	},
	this._getStroke = function(){
		if( this.style.stroke[0] == "#" )
			return "rgba(" + parseInt( this.style.stroke.substring(1,3) , 16 ) + "," +
				             parseInt( this.style.stroke.substring(3,5) , 16 ) + "," +
				             parseInt( this.style.stroke.substring(5,7) , 16 ) + "," +
				             this.style.opacity + ")";
		return this.style.stroke;
	},
	this.style = {
		fill: style.fill||"#000000",
		stroke: style.stroke||"#000000",
		stroke_width: style.stroke_width||1,
		rotation: (style.rotation!==undefined)?style.rotation:0,
		rotationX: this.position.x + ((style.rotationX!==undefined)?style.rotationX:0),
		rotationY: this.position.y + ((style.rotationY!==undefined)?style.rotationY:0),
		opacity: (style.opacity!==undefined)?style.opacity:1,
		zIndex: style.zIndex?style.zIndex:0,
	};
	this._render = function(){
		//override me please!!
	};
	this._onme = function( point ){
		//override me please!
	};
	this.onmousedown = function( e ){
		//override me please!
	};
	this.onmouseup = function( e ){
		//override me please!
	};
	this.onmousemove = function( e ){
		//override me please!
	};
	this._rotateOnMe = function( point ){
		if( this.style.rotation != 0 )
		{
			var rotationPos = { x: this.style.rotationX , y: this.style.rotationY };
			var dist = Math.distance( point , rotationPos );
			var angle = Math.angleBetween( rotationPos , point); 
			var result = {
				x: rotationPos.x + dist*Math.cos( angle - this.style.rotation ),
				y: rotationPos.y + dist*Math.sin( angle - this.style.rotation )
			};
			return result;
		}else{
			return point;
		}
	};
	this._inTransition = false;
	this.transition = function( props , time , callback ,  _reps ){
		var _self = this;
		if( !_reps && _self._inTransition )
			return false;
		_self._inTransition = true;
		var _keys = Object.keys(props);

		if( !_reps )
			_reps = {
				cont: 0,
				reps: time/16,//?this is supposed to be 16...
				total: 0,
				last: (new Date())
			};


		var _innerKeys = null;
		var _anim_props = null;
		for( var i = 0 ; i < _keys.length ; i++ )
		{
			_innerKeys = Object.keys( props[ _keys[i] ] );
			for( var j = 0 ; j < _innerKeys.length ; j++ )
			{
				_anim_props = props[_keys[i]][_innerKeys[j]];
				if( typeof(_anim_props) != "object" )
				{
					var _val = _anim_props;
					var _inc = Math.abs( _anim_props - _self[_keys[i]][_innerKeys[j]] )/_reps.reps;

					if( typeof _val == "string" )
					{
						_val = parseInt(_val.split(',')[1]);
						_inc = _anim_props.split(',')[0];
						_inc = parseFloat(_inc.replace(/=/,''));
					}

					props[_keys[i]][_innerKeys[j]] = {
						val: _val,
						inc: _inc
					};
				}
				_anim_props = props[_keys[i]][_innerKeys[j]];

				//if( _reps.total >= time )
				//	_self[_keys[i]][_innerKeys[j]] = _anim_props.val;
				//else
					_self[_keys[i]][_innerKeys[j]] = Math.aprox( _self[_keys[i]][_innerKeys[j]] , _anim_props.inc , _anim_props.val );
			}
		}

		if( _reps.total >= time )
		{	
			_self._inTransition = false;
			callback(this);
			return;
		}

		_reps.cont++;
		setTimeout(function(){
			var now = new Date();
			_self.transition(props,time,callback,_reps);
			_reps.total += now - _reps.last;
			_reps.last = new Date();
		},16);

		return true;
	};
};

function magic_circle( position , style  ){
	magic_object.call( this ,  position , style );
	this.style.r = style.r?style.r:0;
	this._render = function( ctx ){
		ctx.fillStyle = this._getFill();
		ctx.strokeStyle = this._getStroke();
		ctx.lineWidth = this.style.stroke_width;
		ctx.drawCircle( { x: this.position.x , y: this.position.y , r: this.style.r });
	};
	this._onme = function( point ){
		point = this._rotateOnMe(point);
		return (Math.distance( point , this.position ) <= this.r);
	}
};

function magic_image( imgUrl , position  , style  , setSizeCallback ){
	var _self = this;
	magic_object.call( this ,  position , style );

	if( imgUrl.length ){
		this.img = document.createElement("img");

		this.img.src = imgUrl;

		this.img.onload = function(){
			var _obj = _self;
			var _stl = style;
			_obj.style.width = _stl.width || this.width;
			_obj.style.height = _stl.height || this.height;
			_obj.style.swidth = _stl.swidth || this.width;
			_obj.style.sheight = _stl.sheight || this.height;
			_obj.style.cwidth = _obj.style.width/2;
			_obj.style.cheight = _obj.style.height/2;
			if( setSizeCallback )
				setSizeCallback(_obj);
		};
	}else{
		this.img = imgUrl;
		this.style.width = style.width || this.width;
		this.style.height = style.height || this.height;
		this.style.swidth = style.swidth || this.width;
		this.style.sheight = style.sheight || this.height;
		this.style.cwidth = this.style.width/2;
		this.style.cheight = this.style.height/2;
		if( setSizeCallback )
			setSizeCallback(_self);
	}

	this.style.sx = style.sx || 0;
	this.style.sy = style.sy || 0;
	
	this._render = function( ctx , scale  ){
		ctx.drawImage( 
			this.img , 
			~~( 0.5 + this.style.sx ), 
			~~( 0.5 + this.style.sy ),
			~~( 0.5 + this.style.swidth ), 
			~~( 0.5 + this.style.sheight ), 
			~~( 0.5 + (this.position.x - this.style.cwidth)*scale.w  ), 
			~~( 0.5 + (this.position.y - this.style.cheight)*scale.h ), 
			~~( 0.5 + this.style.width*scale.w ), 
			~~( 0.5 + this.style.height*scale.h )
		);
	};
	this._onme = function( point ){
		point = this._rotateOnMe(point);
		var _x = (this.position.x - this.style.width/2);
		var _y = (this.position.y - this.style.height/2);
		var _x1 = _x + this.style.width;
		var _y1 = _y + this.style.height;
		return point.x >= _x && point.x <= _x1 &&
		       point.y >= _y && point.y <= _y1;
	}
};

function magic_polygon( position , points , style  ){
	magic_object.call( this ,  position , style  );
	this.points = points?points:[{x: 0 , y: 0}];
	this._render = function( ctx , wtf ){
		ctx.fillStyle = this._getColor();
		ctx.strokeStyle = this.style.stroke;
		ctx.lineWidth = this.style.stroke_width;
		var points = [];
		for( var i = 0 ; i < this.points.length ; i++ )
			points.push({
				x: this.position.x + this.points[i].x,
				y: this.position.y + this.points[i].y,
				z: this.points[i].z
			});
		ctx.drawPolygon( points );
	};
	this._onme = function( point ){
		point = this._rotateOnMe(point);
		var points = [];
		for( var i = 0 ; i < this.points.length ; i++ )
			points.push({
				x: this.position.x + this.points[i].x,
				y: this.position.y + this.points[i].y
			});
		return isInside( points,point);
	}
};

function magic_rect( position , size , style  ){
	magic_object.call( this ,  position , style  );
	this.size = { width: position.width?position.width:100 , height: position.height?position.height:100};
	this._render = function( ctx ){
		ctx.fillStyle = this._getColor();
		ctx.strokeStyle = this.style.stroke;
		ctx.lineWidth = this.style.stroke_width;
		ctx.beginPath();
		ctx.rect( this.position.x - this.size.width/2 , this.position.y - this.size.width/2, this.size.width , this.size.height );
		ctx.fill();
		ctx.stroke();
	};
	this._onme = function( point ){
		point = this._rotateOnMe(point);
		var _x = (this.position.y - this.size.width/2);
		var _y = (this.position.y - this.size.width/2);
		var _x1 = _x + this.size.width;
		var _y1 = _y + this.size.height;
		return point.x >= _x && point.x <= _x1 &&
		       point.y >= _y && point.y <= _y1;
	}
};


window.onresize =  function(){
	var t = _magicanv, w = window;
	t._resizeCount++;

	t.scale.w = w.innerWidth/t.size.w;
	t.scale.h = w.innerHeight/t.size.h;
	if( t.scale.h < t.scale.w ){
		t.canvas.height = w.innerHeight;
		t.canvas.width = w.innerHeight*t._aspectRatio.h;
	}else{
		t.canvas.height = w.innerWidth*t._aspectRatio.w;
		t.canvas.width = w.innerWidth;
	}
	t.preCanvas.width = t.canvas.width;
	t.preCanvas.height = t.canvas.height;
	t.scale.w = t.canvas.width/t.size.w;
	t.scale.h = t.canvas.height/t.size.h;

	setTimeout(function(){
		t._resizeCount--;
	},10);
};

function magicanvInterval(){
	var t = _magicanv;
	t._actual = (new Date()).getTime();
	t._mili += t._actual - t._old;
	t._fc++;

	if( t._mili >= 1000 ){
		t._fps = t._fc;
		t._fc = t._mili =  0;
	}

	if( !t._resizeCount ){
		_framespsec.innerHTML = t._fps + 'fps <br />';

		//UPDATE
		t._uTime = window.performance.now();
		t.updateCallback( _magicanv , controls , _framespsec );
		t._uTime = window.performance.now() - t._uTime;
		_framespsec.innerHTML += '<br />U: ' + t._uTime.toFixed(4) + 'μs' + '<br />';

		//PRE RENDER
		t._uTime = window.performance.now();
		t._render();
		t._uTime = window.performance.now() - t._uTime;
		_framespsec.innerHTML += '<br />pR: ' + t._uTime.toFixed(4) + 'μs' + '<br />';


		//RENDER
		t._uTime = window.performance.now();
		
		t.context.clearRect(0,0,t.canvas.width,t.canvas.height);
		t.context.drawImage(t.preCanvas, 0, 0);

		t._uTime = window.performance.now() - t._uTime;
		_framespsec.innerHTML += '<br />R: ' + t._uTime.toFixed(4) + 'μs' + '<br />';

		checkGamepad();
	}
	requestAnimationFrame(magicanvInterval);
	t._old = t._actual;
};

/*Magic CANV Functions*/
magiccanv = function(){
	if( !update )
	{
		console.error('There is not an "update" Function')
		return;
	}
	if( !main )
	{
		console.error('There is not an "main" Function')
		return;
	}
	//creating the HTML
	var _wrapper = document.createElement('div'),
	    _canvas = document.createElement('canvas');

    _framespsec = document.createElement('div');
    _console = document.createElement('div');

	_wrapper.className = 'canvas-wrapper';
	_canvas.setAttribute('id','canvas')
	_console.className = 'console';
	_console.setAttribute('id','console');
	_framespsec.className = 'framespsec';
	_framespsec.setAttribute('id','framespsec');

	_wrapper.appendChild(_canvas);
	_wrapper.appendChild(_console);
	_wrapper.appendChild(_framespsec);

	document.getElementsByTagName('body')[0].appendChild(_wrapper);

	//creating the Object
	_magicanv = {
		fps: 60,
		_elapsedTime: 0,
		_old: (new Date()).getTime(),
		_actual: 0,
		_mili: 0,
		_fc: 0,
		_fps: 0,
		_aspectRatio: {h:1.7777,w:0.5625},//1080p Aspect Ratio
		_resizeCount: 0,
		canvas: _canvas,
		context: _canvas.getContext("2d"),
		preCanvas: null,
		world: [],
		world_ids: [],
		images: [],
		_minzIndex: 0,
		_maxzIndex: 0,
		size: {
			w: 1920,
			h: 1080,
			cw: 960,
			ch: 540
		},
		scale: {
			w: 0,
			h: 0
		},
		mouse: {
			x: 0,
			y: 0,
			pressed: false
		},
		updateCallback: update,
		loadImages: function( imageCallback , imageArray , imageResult ){
			var _keys = Object.keys(imageArray);
			if( !imageResult )
				imageResult = {};

			if( _keys.length ){
				if( imageArray[_keys[0]].length ){
					imageResult[_keys[0]] = document.createElement("img");
					imageResult[_keys[0]].onload = function(){
						delete imageArray[_keys[0]];
						_magicanv.loadImages( imageCallback , imageArray , imageResult );
					};
					imageResult[_keys[0]].src = imageArray[_keys[0]];
				}else{
					imageResult[_keys[0]] = _magicanv.loadImages( function(){
						delete imageArray[_keys[0]];
						_magicanv.loadImages( imageCallback , imageArray , imageResult );
					},imageArray[_keys[0]])
				}
			}else{
				imageCallback();
			}

			return imageResult;
		},
		addElement: function( id , element ){
			if( element.style.zIndex > this._maxzIndex )
				this._maxzIndex = element.style.zIndex;
			if( element.style.zIndex < this._minzIndex )
				this._minzIndex = element.style.zIndex;

			this.world_ids.push( id );
			this.world[id] = element;
		},
		removeElement: function( id ){
			this.world_ids.splice( this.world_ids.indexOf(id),1 );
		},
		_objTmp: null,
		_i: 0,
		_l: 0,
		_render: function(){
			this.preContext.clearRect(0,0,this.canvas.width,this.canvas.height);
			this._objTmp = null;
			for( this._l = this._minzIndex ; this._l <= this._maxzIndex ; this._l++ ){
				for( this._i = 0 ; this._i < this.world_ids.length ; this._i++ ){
					this._robj = this.world[ this.world_ids[this._i] ];
					if( this._robj.style.zIndex == this._l )
					{
						/*if( this._robj.style.rotation )
						{
							this.preContext.save();
							this.preContext.translate(this._robj.style.rotationX,this._robj.style.rotationY);
							this.preContext.rotate(this._robj.style.rotation);
							this.preContext.translate(-this._robj.style.rotationX,-this._robj.style.rotationY);
							this._robj._render(this.preContext);
							this.preContext.restore();
						}else*/
							this._robj._render(this.preContext,this.scale);
					}
				}
			}
		}
	}

	requestAnimationFrame(magicanvInterval);//,Math.floor(1000/_magicanv.fps));

	_magicanv.preCanvas = document.createElement('canvas');
	_magicanv.preCanvas.width = _magicanv.canvas.width;
	_magicanv.preCanvas.height = _magicanv.canvas.height;
	_magicanv.preContext = _magicanv.preCanvas.getContext('2d');

	main( _magicanv , controls );
	window.onresize();

	if( document.body.requestFullscreen )
    	document.body.requestFullscreen();

	return _magicanv;
};

window.onload = function(){
  magiccanv();
}
