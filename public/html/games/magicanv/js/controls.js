_self = null;
con = null;

controls = {
  mouse: { // Active = 1
    x: 0,
    y: 0, 
    click: {
      left: false,
      right: false
    }
  },

  screen: {
    touchLimit: 2,
    touches: [
      {
        x: 0,
        y: 0,
        alive: 0
      },
      {
        x: 0,
        y: 0,
        alive: 0
      }
    ]
  },

  keyboard: {}, // Active = 0

  gamepad: null, // Active = 2

  active: 0,

  getMouseEventPosition: function(e , position ){
    var m = _magicanv;
    var c = m.canvas.getBoundingClientRect();
    if( e.clientX != undefined )
    {
      position.x = e.clientX;
      position.y = e.clientY;
      position.x -= c.left;
      position.y -= c.top;
      position.x = position.x/m.scale.w;
      position.y = position.y/m.scale.h;
    }else{
      for( var i = 0 ; i < e.touches.length ; i++ ){
        position.touches[i].x = (e.touches[i].clientX-c.left)/m.scale.w;
        position.touches[i].y = (e.touches[i].clientY-c.top)/m.scale.h;
        position.touches[i].alive = 1;
      }
    }
    return position;
  }
};


/*MOUSE*/
window.onmousedown = function(e){
  var c = controls;
  c.active = 1;

  if( e.button == 0 )
    c.mouse.click.left = true;

  if( e.button == 2 )
    c.mouse.click.right = true;

  e.preventDefault();
  e.stopPropagation();
}

window.onmousemove = function(e){
  var c = controls;
  c.active = 1;

  c.getMouseEventPosition(e,c.mouse);

  e.preventDefault();
  e.stopPropagation();
}

window.onmouseup = function(e){
  var c = controls;
  c.active = 1;

  if( e.button == 0 )
    c.mouse.click.left = false;

  if( e.button == 2 )
    c.mouse.click.right = false;

  e.preventDefault();
  e.stopPropagation();
}

/*TOUCH SCREEN*/
window.ontouchmove = function(e){
  var c = controls;
  c.active = 3;

  c.getMouseEventPosition(e,c.screen);
  e.preventDefault();
  e.stopPropagation();
}

window.ontouchstart = function(e){
  var c = controls;
  c.active = 3;

  c.getMouseEventPosition(e,c.screen);
  e.preventDefault();
  e.stopPropagation();
}

window.ontouchend = function(e){
  var c = controls;

  c.screen.touches[e.changedTouches[0].identifier].alive = 0;
  c.screen.touches[e.changedTouches[0].identifier].x = 0;
  c.screen.touches[e.changedTouches[0].identifier].y = 0;
}


/*KEYBOARD*/
window.onkeydown = function(e){
  var c = controls;
  c.active = 0;
  c.keyboard[e.keyCode] = true;
}

window.onkeyup = function(e){
  var c = controls;
  c.active = 0;

  c.keyboard[e.keyCode] = false;
}


/*GAMEPAD*/
function checkGamepad(){
  var c = controls;
  var gamepads = navigator.getGamepads ? navigator.getGamepads() :
   (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
   for( var i = 0 ; i < 4 ; i++ ){
    if( gamepads[i] ) {
      c.gamepad = gamepads[i];

      for( var i = 0 ; i < c.gamepad.buttons.length ; i++ )
        if( c.gamepad.buttons[i].pressed )
          c.active = 2;

      i = 4;
    }
  }
}

window.addEventListener("gamepadconnected", function(){

});

window.addEventListener("gamepaddisconnected", function(){
  
});

/*Disable Right click*/
window.addEventListener('contextmenu', function(e){
  e.preventDefault();
});