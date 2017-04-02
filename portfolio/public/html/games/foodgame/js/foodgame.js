world = {
	cursorSpeed: 37,
	gamepadX: 1160,
	gamepadY: 740,
	gun: {
		limit: 2,
		bullets: [],
		speed: 25,
	},
	living: {
		limit: 5,
		enemies: [],
		speed: 1,
		birthRate: 20,
		birthCount: 20,
		life: 5
	},
	bulletLimit: 10,
	target: null,
	button: null,
	touchAction: 0,
	background: null
};

function checkBullet(w, m , c ){
	for( var i = 0; i < w.gun.limit ; i++ ){
		if( !w.gun.bullets[i] ){
			w.gun.bullets[i] = new magic_image('sprites/ball.png',{ 
				x: m.size.cw, 
				y: m.size.h
			} , {
				sx: 0,
				sy: 0,
				swidth: 100,
				sheight: 100,
				width: 30,
				height: 30,
			});	

			w.gun.bullets[i].dir = {
				x: w.target.position.x - w.gun.bullets[i].position.x,
				y: w.target.position.y - w.gun.bullets[i].position.y,
			}

			var mod = Math.sqrt(Math.pow(w.gun.bullets[i].dir.x,2) +  
				Math.pow(w.gun.bullets[i].dir.y,2));
			w.gun.bullets[i].dir.x = w.gun.bullets[i].dir.x/mod;
			w.gun.bullets[i].dir.y = w.gun.bullets[i].dir.y/mod;

			m.addElement('b'+i,w.gun.bullets[i]);
			i = w.gun.limit;
		}
	}
}

update = function( m , c ){
	var w = world;


	if( w.background.action )
	{
		w.background.style.swidth++;
		w.background.style.sheight++;
		if( w.background.style.sheight > w.background.style.height/2 )
			w.background.action = 0;
	}else{
		w.background.style.swidth--;
		w.background.style.sheight--;
		if( w.background.style.sheight < 100 )
			w.background.action = 1;
	}


	w.button.position.y = m.size.h + 70;
	switch(c.active){
		case 0: //keyboard
				if( c.keyboard[37] )
					w.target.position.x -= w.cursorSpeed;
				if( c.keyboard[38] )
					w.target.position.y -= w.cursorSpeed;
				if( c.keyboard[39] )
					w.target.position.x += w.cursorSpeed;
				if( c.keyboard[40] )
					w.target.position.y += w.cursorSpeed;


				if( c.keyboard[32] )
					checkBullet( w,  m , c  );
					

			break;
		case 1: //mouse
				w.target.position.x = c.mouse.x;
				w.target.position.y = c.mouse.y;

				if( c.mouse.click.left )
					checkBullet( w,  m , c  );

			break;
		case 2: //Xbox 360 gamepad
				w.target.position.x = m.size.cw;
				w.target.position.y = m.size.ch;

				w.target.position.x += c.gamepad.axes[2]*w.gamepadX;
				w.target.position.y += c.gamepad.axes[3]*w.gamepadY*-1;

				w.target.position.x += c.gamepad.axes[0]*w.gamepadX;
				w.target.position.y += c.gamepad.axes[1]*w.gamepadY;

				if( c.gamepad.buttons[0].pressed )
					checkBullet( w,  m , c  );

			break;
		case 3: //Touch
				w.button.position.y = m.size.h - 70;

				if( c.screen.touches[0].alive ){
					if( w.touchAction == 0 ){
						if( Math.distance( c.screen.touches[0] , w.button.position ) <= 500 ){
							w.touchAction = 2;
						}else{
							w.touchAction = 1;
						}
					}				
				}else{
					w.touchAction = 0;
				}

				if( w.touchAction == 2 ){
					checkBullet( w,  m , c  );
				} else if( w.touchAction == 1 ){
					w.target.position.x = c.screen.touches[0].x;
					w.target.position.y = c.screen.touches[0].y;
				}

				if( c.screen.touches[1].alive ){
					if( w.touchAction == 2 ){
						w.target.position.x = c.screen.touches[1].x;
						w.target.position.y = c.screen.touches[1].y;
					}

					if( w.touchAction == 1 ){
						checkBullet( w,  m , c  );
					}
				}

			break;

	}

	if( w.target.position.x < 0 )
		w.target.position.x = 0;
	if( w.target.position.y < 0 )
		w.target.position.y = 0;
	if( w.target.position.x > m.size.w )
		w.target.position.x = m.size.w ;
	if( w.target.position.y > m.size.h )
		w.target.position.y = m.size.h ;

	//update bullets
	for( var i = 0 ; i < w.gun.limit; i++ ){
		if( w.gun.bullets[i] ){
			w.gun.bullets[i].position.x += w.gun.bullets[i].dir.x*w.gun.speed;
			w.gun.bullets[i].position.y += w.gun.bullets[i].dir.y*w.gun.speed;

			if( w.gun.bullets[i].position.x < 0 ){
				m.removeElement('b'+i);
				w.gun.bullets[i] = null;
			} else {

				if( w.gun.bullets[i].position.y < 0 ){
					m.removeElement('b'+i);
					w.gun.bullets[i] = null;
				} else {
					if( w.gun.bullets[i].position.x > m.size.w ){
						m.removeElement('b'+i);
						w.gun.bullets[i] = null;
					} else {
						if( w.gun.bullets[i].position.y > m.size.h ){
							m.removeElement('b'+i);
							w.gun.bullets[i] = null;
						}
					}
				}
			}
		}
	}

	w.living.birthCount--;
	if( w.living.birthCount <= 0 ){

		w.living.birthCount = w.living.birthRate;

		for( var i = 0 ; i < w.living.limit; i++ ){
			if( !w.living.enemies[i] ){

				w.living.enemies[i] = new magic_image('sprites/bad.png',{ 
					x: Math.random()*m.size.w, 
					y: 50
				} , {
					sx: 0,
					sy: 0,
					swidth: 100,
					sheight: 100,
					width: 100,
					height: 100,
					zIndex: 1
				});	

				w.living.enemies[i].life = w.living.life;

				m.addElement('e'+i,w.living.enemies[i]);

				i = w.living.limit;
			}
		}

	}

	for( var i = 0 ; i < w.living.limit; i++ ){
		if( w.living.enemies[i] ){

			w.living.enemies[i].position.y += w.living.speed;
			if( w.living.enemies[i].life <= 2 )
				w.living.enemies[i].position.y += w.living.speed;
			if( w.living.enemies[i].life == 1 )
				w.living.enemies[i].position.y += w.living.speed;

			if( w.living.enemies[i].position.y >= m.size.h )
			{
				w.living.enemies[i] = null;	
				m.removeElement('e'+i);
			}
		}
	}

	for( var i = 0 ; i < w.gun.limit ; i++ ){
		if( w.gun.bullets[i] ){
			for( var j = 0 ; j < w.living.limit ; j++ ){
				if( w.living.enemies[j] ){
					if( Math.distance( w.gun.bullets[i].position , w.living.enemies[j].position ) < 50 ){
						
						if( w.living.enemies[j].life <= 0 ){
							m.removeElement('e'+j);
							w.living.enemies[j] = null;	
						}else{
							w.living.enemies[j].style.sx += w.living.enemies[j].style.width;
							w.living.enemies[j].life--;
						}

						m.removeElement('b'+i);
						w.gun.bullets[i] = null;
						j = w.living.limit;
					}
				}
			}
		}
	}
};

main = function( m , c ){
	var w = world;

	//This is a Target
	w.target = new magic_image('sprites/target.png',{ 
		x: m.size.cw, 
		y: m.size.ch
	} , {
		sx: 0,
		sy: 0,
		swidth: 150,
		sheight: 150,
		width: 150,
		height: 150,
		zIndex: 2
	});

	m.addElement('target',w.target);

	//This is a Button
	w.button = new magic_image('sprites/button.png',{ 
		x: 70, 
		y: m.size.h + 70
	} , {
		sx: 0,
		sy: 0,
		swidth: 97,
		sheight: 70,
		width: 100,
		height: 70,
		zIndex: 3
	});

	m.addElement('button',w.button);

	//This is the background
	w.background = new magic_image('sprites/back.jpg',{
		x: m.size.cw,
		y: m.size.ch
	},{
		sx: 0,
		sy: 0,
		swidth: 1600,
		sheight: 900,
		height: 1080,
		width: 1920,
		zIndex: -1
	});

	m.addElement('back',w.background);
};