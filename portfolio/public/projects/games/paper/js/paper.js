paper = {
	background: null,
	state: -1,// -1: loading
			 // 0: Menu
	         // 1: Animation
	         // 2: InGame
	         // 3: Pause
	imageDB: {
		level1: 'levels/levelx.png',
		level2: 'levels/levelx.png',
		racoon: 'sprites/racoon.png',
		badie: 'sprites/bad.png',
	},

	racoon: null,
	badies: [],
	badieCount: 0,
	badiesLimit: 3,
	gravity: 10,
	levelNumber: 2,
	levelActual: null,
	
};

getNewBadie = function( paper_game ){
	var badie = new magic_image(paper_game.imageDB.badie,{
		x: 170, 
		y: 271
	},{
		sx: 0,
		sy: 0,
		swidth: 60,
		sheight: 60,
		height: 60,
		width: 60,
		zIndex: 1
	});

	paper_game.badies.push(badie);

	badie.frame = 0;
	badie.frameRate = 2;
	badie.frameTime = 0;
	badie.index = paper_game.badieCount++;

	badie.update = function(){
		if( ++this.frameTime >= this.frameRate ){
			this.frameTime = 0;

			if( ++this.frame >= 42 )
				this.frame = 42;
		}
	};

	return badie;
};

update = function( m , c ){
	var paper_game = paper;

	if(paper_game.state == 1){
		switch(c.active){
			case 0: //keyboard
				paper_game.racoon.running = 0;
				paper_game.racoon.moveX = 0;
				if( c.keyboard[37] ){
					paper_game.racoon.direction = 0;
					paper_game.racoon.running = 1;
					paper_game.racoon.moveX = -paper_game.racoon.speed;
				}
				if( c.keyboard[39] ){
					paper_game.racoon.direction = 1;
					paper_game.racoon.running = 1;
					paper_game.racoon.moveX = paper_game.racoon.speed;
				}

				if( c.keyboard[90] || c.keyboard[90]){
					paper_game.racoon.attack = 1;
				}else{
					paper_game.racoon.attack = 0;
				}


				if( c.keyboard[38]  ){
					if( !paper_game.racoon.jump && !paper_game.racoon.blockJump && paper_game.racoon.jumps ){
						paper_game.racoon.jumps--;
						paper_game.racoon.jump = paper_game.racoon.jumpForce;
						paper_game.racoon.blockJump = 1;
					}
				}else{
					paper_game.racoon.blockJump = 0;
				}
				break;
			case 1: //mouse
					c.mouse.x;
					c.mouse.y;

				break;
			case 2: //Xbox 360 gamepad
					paper_game.racoon.running = 0;
					paper_game.racoon.moveX = 0;
					
					if( c.gamepad.axes[0] < 0.5 && c.gamepad.axes[0] < 0 ){
						paper_game.racoon.direction = 0;
						paper_game.racoon.running = 1;
						paper_game.racoon.moveX = paper_game.racoon.speed*(c.gamepad.axes[0]*2 + 1);
					}

					if( c.gamepad.axes[0] > 0.5 && c.gamepad.axes[0] > 0 ){
						paper_game.racoon.direction = 1;
						paper_game.racoon.running = 1;
						paper_game.racoon.moveX = paper_game.racoon.speed*(c.gamepad.axes[0]*2 - 1);
					}

					if( c.gamepad.buttons[2].pressed ){
						paper_game.racoon.attack = 1;
					}else{
						paper_game.racoon.attack = 0;
					}

					if( c.gamepad.buttons[0].pressed ){
						if( !paper_game.racoon.jump && !paper_game.racoon.blockJump && paper_game.racoon.jumps ){
							paper_game.racoon.jumps--;
							paper_game.racoon.jump = paper_game.racoon.jumpForce;
							paper_game.racoon.blockJump = 1;
						}
					}else{
						paper_game.racoon.blockJump = 0;
					}
			
				break;
			case 3: //Touch
					c.screen.touches[0].x;
				break;

		}


		//update racoon
		if( paper_game.racoon.jump <= 0 )
			paper_game.racoon.jump = 0;
		else
			paper_game.racoon.jump -= paper_game.racoon.jumpLoose;

		if( paper_game.racoon.position.y > paper_game.racoon.floor )
			paper_game.racoon.position.y = paper_game.racoon.floor;


		paper_game.racoon.tmp = paper_game.racoon.position.y - paper_game.racoon.jump + paper_game.gravity;

		paper_game.racoon.terrain = paper_game.levelActual.is(
			paper_game.racoon.position.x+paper_game.level.style.sx, 
			paper_game.racoon.tmp + paper_game.racoon.feet +paper_game.level.style.sy);

		//if touches the Lava
		if( paper_game.racoon.terrain == 1 ){
			paper_game.level.style.sx = 0;
			paper_game.racoon.position.x = 170;
			paper_game.racoon.position.y = 871;
			paper_game.racoon.jump = 0;
			paper_game.racoon.jumps = 2;
		}else{

			//bottom verification
			if( paper_game.racoon.terrain != 5 && paper_game.racoon.terrain != 3 )
				paper_game.racoon.position.y = paper_game.racoon.tmp;
			else{
				paper_game.racoon.jump = 0;
				paper_game.racoon.jumps = 2;
				while( paper_game.racoon.terrain == 5 || paper_game.racoon.terrain == 3 ){
					paper_game.racoon.terrain = paper_game.levelActual.is(
						paper_game.racoon.position.x+paper_game.level.style.sx, 
						--paper_game.racoon.tmp + paper_game.racoon.feet +paper_game.level.style.sy);
				}
				do{
					paper_game.racoon.terrain = paper_game.levelActual.is(
						paper_game.racoon.position.x+paper_game.level.style.sx, 
						++paper_game.racoon.tmp + paper_game.racoon.feet  +paper_game.level.style.sy);
				}while( paper_game.racoon.terrain != 5 && paper_game.racoon.terrain != 3 );
				paper_game.racoon.position.y = --paper_game.racoon.tmp;
			}


			//move camera BOTTOM
			if( paper_game.level.style.sy < 1080 ){
				if( paper_game.racoon.position.y > paper_game.racoon.marginBottom ){
					paper_game.racoon.position.y = paper_game.racoon.marginBottom;
					paper_game.level.style.sy -= paper_game.racoon.marginBottom - paper_game.racoon.tmp;
				}
			}

			//side verification
			if( paper_game.racoon.moveX ){
				paper_game.racoon.tmp = paper_game.racoon.position.x + Math.round(paper_game.racoon.moveX);

				if( paper_game.racoon.moveX > 0 ){
					paper_game.racoon.terrain = paper_game.levelActual.is(
						paper_game.racoon.tmp + paper_game.level.style.sx + paper_game.racoon.side, 
						paper_game.racoon.position.y +paper_game.level.style.sy);

					if( paper_game.racoon.terrain != 3 ){
						paper_game.racoon.position.x = paper_game.racoon.tmp;
					}else{
						while( paper_game.racoon.terrain == 3 ){
							paper_game.racoon.terrain = paper_game.levelActual.is(
								--paper_game.racoon.tmp + paper_game.level.style.sx + paper_game.racoon.side, 
								paper_game.racoon.position.y +paper_game.level.style.sy );
						}
						do{
							paper_game.racoon.terrain = paper_game.levelActual.is(
									++paper_game.racoon.tmp + paper_game.level.style.sx + paper_game.racoon.side, 
									paper_game.racoon.position.y +paper_game.level.style.sy);
					    }while( paper_game.racoon.terrain != 3 );
						paper_game.racoon.position.x = --paper_game.racoon.tmp;

					}

					//move camera LEFT
					if( paper_game.racoon.position.x > paper_game.racoon.marginRight ){
						if( paper_game.level.style.sx < 9600 ){
							paper_game.racoon.position.x = paper_game.racoon.marginRight;
							paper_game.level.style.sx -= paper_game.racoon.marginRight - paper_game.racoon.tmp;
						}else{
							paper_game.level.style.sx = 9600;
						}
					}
				}else{
					paper_game.racoon.terrain = paper_game.levelActual.is(
						paper_game.racoon.tmp + paper_game.level.style.sx - paper_game.racoon.side, 
						paper_game.racoon.position.y +paper_game.level.style.sy);

					if( paper_game.racoon.terrain != 3 ){
						paper_game.racoon.position.x = paper_game.racoon.tmp;
					}else{
						while( paper_game.racoon.terrain == 3 ){
							paper_game.racoon.terrain = paper_game.levelActual.is(
								++paper_game.racoon.tmp + paper_game.level.style.sx - paper_game.racoon.side, 
								paper_game.racoon.position.y +paper_game.level.style.sy);
						}
						do{
							paper_game.racoon.terrain = paper_game.levelActual.is(
									--paper_game.racoon.tmp + paper_game.level.style.sx - paper_game.racoon.side, 
									paper_game.racoon.position.y +paper_game.level.style.sy);
					    }while( paper_game.racoon.terrain != 3 );
						paper_game.racoon.position.x = ++paper_game.racoon.tmp;

					}
 
					//move camera RIGHT
					if( paper_game.racoon.position.x < paper_game.racoon.marginLeft ){
						if( paper_game.level.style.sx + (paper_game.racoon.tmp - paper_game.racoon.marginLeft ) > 0 ){
							paper_game.racoon.position.x = paper_game.racoon.marginLeft;
							paper_game.level.style.sx +=  paper_game.racoon.tmp - paper_game.racoon.marginLeft;
						}else{
							paper_game.level.style.sx = 0;
						}
					}
				}	
			}

			//top verifaction
			paper_game.racoon.tmp = paper_game.racoon.position.y;
			paper_game.racoon.terrain = paper.levelDB[paper_game.levelNumber].is(
				paper_game.racoon.position.x+paper_game.level.style.sx, 
				paper_game.racoon.tmp - paper_game.racoon.feet +paper_game.level.style.sy);

			if( paper_game.racoon.terrain != 3 ){

			}else{
				paper_game.racoon.jump = 0;
				while( paper_game.racoon.terrain == 3 ){
					paper_game.racoon.terrain = paper_game.levelActual.is(
						paper_game.racoon.position.x+paper_game.level.style.sx, 
						++paper_game.racoon.tmp - paper_game.racoon.feet +paper_game.level.style.sy);
				}
				do{
					paper_game.racoon.terrain = paper_game.levelActual.is(
						paper_game.racoon.position.x+paper_game.level.style.sx, 
						--paper_game.racoon.tmp - paper_game.racoon.feet  +paper_game.level.style.sy);
				}while( paper_game.racoon.terrain != 3 );
				paper_game.racoon.position.y = paper_game.racoon.tmp+1;
			}

			//move camera TOP
			if( paper_game.level.style.sy > 0 ){
				if( paper_game.racoon.position.y < paper_game.racoon.marginTop ){
					paper_game.racoon.position.y = paper_game.racoon.marginTop;
					paper_game.level.style.sy +=  paper_game.racoon.tmp - paper_game.racoon.marginTop;
				}
			}
		}
	
		//anim
		paper_game.racoon.frameRate = 10;
		if( paper_game.racoon.direction ){
			paper_game.racoon.style.sy = paper_game.racoon.style.height;
			if( paper_game.racoon.running ){
				paper_game.racoon.frameRate = 3;
				paper_game.racoon.style.sy = paper_game.racoon.style.height*2;
			}

		}else{
			paper_game.racoon.style.sy = 0;
			if( paper_game.racoon.running ){
				paper_game.racoon.frameRate = 3;
				paper_game.racoon.style.sy = paper_game.racoon.style.height*3;
			}
		}

		if( paper_game.racoon.attack ){
			paper_game.racoon.style.sy += 4*paper_game.racoon.style.height;
			paper_game.racoon.frameRate = 3;
		}

		paper_game.racoon.frameTime++;
		if( paper_game.racoon.frameTime >= paper_game.racoon.frameRate ){
			paper_game.racoon.frameTime = 0;

			if( paper_game.racoon.running ){
				paper_game.racoon.frameX += Math.abs(paper_game.racoon.moveX)/paper_game.racoon.speed;
			}else{
				paper_game.racoon.frame++;
			}
		}

		if( paper_game.racoon.running ){
			if( paper_game.racoon.frameX >= 10 )
				paper_game.racoon.frameX = 0;
			paper_game.racoon.frame = Math.round(paper_game.racoon.frameX);
		}else{
			if( paper_game.racoon.frame >= 6 )
				paper_game.racoon.frame = 0;
		}

		paper_game.racoon.style.sx = paper_game.racoon.frame*paper_game.racoon.style.height;

		for( var i = 0 ; i < paper_game.badies.length ; i++ ){
			paper_game.badies[i].update();
			paper_game.badies[i].style.sx = paper_game.badies[i].style.width*paper_game.badies[i].frame;
		}

		//update Badies
		if( paper_game.badies.length < paper_game.badiesLimit ){
			var badie = getNewBadie( paper_game );
			m.addElement('b' + badie.index , badie );
		}

		
	}
};

main = function( m , c ){
	var paper_game = paper;

	Object.keys(paper_game.levelDB).map(function(key){
		paper_game.levelDB[key].is = function(d,c){
			var a=this.m[d][Math.floor(c/this.c)];if(a.length){for(var e=c%this.c,b=0;b<a.length;b+=2)if(e<=a[b])return a[b+1];return-1}return a
		},
		paper_game.levelDB[key].get = function(type,x,y){
			for( var i = 0 ; i < this.r.length ; i++ ){
				if( this.r[i][4] == type ){
					return this.r[i];
				}
			}
		}
	});

	paper_game.imageDB = m.loadImages(function(){
		var paper_game = paper;
		var canvas = m;

		//raccon
		paper_game.racoon = new magic_image(paper_game.imageDB.racoon,{
			x: 170, 
			y: 871
		},{
			sx: 0,
			sy: 0,
			swidth: 60,
			sheight: 60,
			height: 60,
			width: 60,
			zIndex: 1
		});

		canvas.addElement('racoon',paper_game.racoon);

		paper_game.racoon.direction = 1;
		paper_game.racoon.running = 0;
		
		paper_game.racoon.frameRate = 10;
		paper_game.racoon.frameTime = 0;
		paper_game.racoon.frame = 0;
		paper_game.racoon.speed = 7;
		paper_game.racoon.jump = 0;
		paper_game.racoon.blockJump = 0;
		paper_game.racoon.jumps = 2;
		paper_game.racoon.marginLeft = 450;
		paper_game.racoon.marginTop = 250;
		paper_game.racoon.moveX = 0;
		paper_game.racoon.frameX = 0;
		paper_game.racoon.attack = 0;
		paper_game.racoon.jumpLoose = 2;
		paper_game.racoon.jumpForce = 40;
		paper_game.racoon.feet = Math.floor(paper_game.racoon.style.height/2)-1;
		paper_game.racoon.side = Math.floor(paper_game.racoon.style.width/2)-1;
		paper_game.racoon.marginRight = canvas.size.w - paper_game.racoon.marginLeft;
		paper_game.racoon.marginBottom = canvas.size.h - paper_game.racoon.marginTop;
		paper_game.racoon.floor = canvas.size.h - paper_game.racoon.style.height/2;

		paper_game.levelActual = paper_game.levelDB[paper_game.levelNumber];

		//level
		paper_game.level = new magic_image(paper_game.imageDB.level2,{
			x: canvas.size.cw,
			y: canvas.size.ch
		},{
			sx: 0,
			sy: 1080,
			swidth: 1920,
			sheight: 1080,
			height: 1080,
			width: 1920,
			zIndex: 0
		});

		canvas.addElement('level',paper_game.level);

		paper_game.state = 1;
	},paper_game.imageDB);
};

