/*THE STACK VARIABLE FOR SUPPORTING MORE THAN 1 CANVAS IN MOTION*/
_magiccav_stack = {};
_magiccav_stack_ids = [];

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
		for( var i = 1 ; i < polygon.length - 1 ; i++ )
			this.lineTo(polygon[i].x,polygon[i].y);
		this.closePath();
	}else{
		for( var i = 1 ; i < polygon.length ; i++ )
			this.lineTo(polygon[i].x,polygon[i].y);
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
	{
		if( val - speed < limit )
			return limit;
		else
			return val - speed;
	}else{
		if( val + speed > limit )
			return limit;
		else
			return val + speed;
	}
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
		rotationX: this.position.x,
		rotationY: this.position.y,
		opacity: (style.opacity!==undefined)?style.opacity:1
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
			callback();
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

/*Magic CANV Functions*/
magiccanv = function( id , update ){
	var _canvas = document.getElementById(id);
	_canvas.onmousedown = function( e ){
		var magiccanv = _magiccav_stack[this.id];
		var position = magiccanv._getEventPosition(e);
		for( var i = 0 ; i < magiccanv.world_ids.length ; i++  )
			if( magiccanv.world[magiccanv.world_ids[i]]._onme(position) )
				magiccanv.world[magiccanv.world_ids[i]].onmousedown(e);
	};
	_canvas.onmouseup = function( e ){
		var magiccanv = _magiccav_stack[this.id];
		var position = magiccanv._getEventPosition(e);
		for( var i = 0 ; i < magiccanv.world_ids.length ; i++  )
			if( magiccanv.world[magiccanv.world_ids[i]]._onme(position) )
				magiccanv.world[magiccanv.world_ids[i]].onmouseup(e);
	};
	_canvas.onmousemove = function( e ){
		var magiccanv = _magiccav_stack[this.id];
		var position = magiccanv._getEventPosition(e);
		for( var i = 0 ; i < magiccanv.world_ids.length ; i++  )
			if( magiccanv.world[magiccanv.world_ids[i]]._onme(position) )
				magiccanv.world[magiccanv.world_ids[i]].onmousemove(e);
	};
	_new_magiccanv = {
		canvas: _canvas,
		context: _canvas.getContext("2d"),
		world: [],
		world_ids: [],
		addElement: function( id , element ){
			this.world_ids.push(id);
			this.world[id] = element;
		},
		removeElement: function( id ){
			this.world_ids.splice(this.world_ids.indexOf(id), 1);
		},
		_render: function(){
			var obj = null;
			for( var i = 0 ; i < this.world_ids.length ; i++ )
			{
				obj = this.world[this.world_ids[i]];
				if( obj.style.rotation != 0 )
				{
					this.context.save();
					this.context.translate(obj.style.rotationX,obj.style.rotationY);
					this.context.rotate(obj.style.rotation);
					this.context.translate(-obj.style.rotationX,-obj.style.rotationY);
					obj._render(this.context);
					this.context.restore();
				}else{
					obj._render(this.context);

				}
			}
		},
		_getEventPosition: function(e){
			var position = { x : 0, y : 0 };
			if( e.clientX )
			{
				position.x = e.clientX;
				position.y = e.clientY;
			}else{
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				position.x = touch.pageX;
				position.y = touch.pageY;
			}

			var clientRect = this.canvas.getBoundingClientRect();
			position.x -= clientRect.left;
			position.y -= clientRect.top;
			return position;
		}
	};
	_new_magiccanv.updateCallback = update;

	_magiccav_stack[id] = _new_magiccanv;
	_magiccav_stack_ids.push(id);

	return _new_magiccanv;
};

setInterval(function(){
	_magiccav_stack_ids.map(function(id,i){

		if( _magiccav_stack[id].updateCallback )
			 _magiccav_stack[id].updateCallback();
		
		_magiccav_stack[id].context.clearRect(0,0,_magiccav_stack[id].canvas.width,_magiccav_stack[id].canvas.height);
		_magiccav_stack[id]._render();
	});
},16);