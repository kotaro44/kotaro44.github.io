'use strict';

var tetris_board = [];
var animation = false;
var score = 0;
var next = 25;
var speed = 1000;
var intervalId = -1;
var gameover = false;

var figures = [
	[ [ 1 , 1 ],
	  [ 1 , 0 ],
	  [ 1 , 0 ] ],

	[ [ 0 , 1 ],
	  [ 1 , 1 ],
	  [ 1 , 0 ] ],

	[ [ 1 , 1 ],
	  [ 0 , 1 ],
	  [ 0 , 1 ] ],

	[ [ 1 , 0 ],
	  [ 1 , 1 ],
	  [ 0 , 1 ] ],

	[ [ 1 , 1 ],
	  [ 1 , 1 ] ],

	[ [ 1 ], [ 1 ], [ 1 ] , [ 1 ] ],

	[ [ 0 , 1 , 0 ],
	  [ 1 , 1 , 1 ] ]
];

var actual_figure = null;
var actualpos = {
	x: 0,
	y: 0
}

var restart = function(){
	document.getElementById('board').innerHTML = "";
	document.getElementById('gameover').classList.remove('visible');
	tetris_board = [];
	animation = false;
	score = 0;
	next = 25;
	speed = 1000;
	intervalId = -1;
	gameover = false;
	generateBoard();
	init();
}

var getQueryParams = function(qs) {
    qs = qs.split('+').join(' ');
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}


var getRandomFigure = function(){
	var figure = figures[ Math.floor( Math.random()*figures.length ) ].slice();
	var color = Math.ceil( Math.random()*4 );
	for( var i = 0 ; i < figure.length ; i++ ){
		for( var j = 0 ; j < figure[0].length ; j++ ){
			if( figure[i][j] )
				figure[i][j] = color;
		}
	}
	return figure;
};

var generateBoard = function(){
	var w = 10;
	var h = 20;
	var params = getQueryParams(document.location.search);
	if( params.w ){
		if( params.w > 5 && params.w < 100 )
			w = params.w;
	}
	if( params.h ){
		if( params.h > 5 && params.h < 200 )
			h = params.h;
	}


	for( var i = 0 ; i < h ; i++ ){
		var row = [];
		for( var j = 0 ; j < w ; j++ ){
			row.push(0);
		}
		tetris_board.push( row );
	}

	var board = document.getElementById('board');
	var row, cell;
	for( var i = 0 ; i < tetris_board.length ; i++ ){
		row = document.createElement('div');
		row.classList.add('row');
		row.classList.add('row' + i);
		row.setAttribute('id', 'row' + i);
		for( var j = 0 ; j < tetris_board[0].length ; j++ ){
			cell = document.createElement('div');
			cell.classList.add('cell');
			cell.classList.add('cell' + i + '_' + j );
			cell.setAttribute('value', tetris_board[i][j]);
			cell.setAttribute('id', 'cell' + i + '_' + j);
			row.appendChild(cell);
		}
		board.appendChild(row);
	}
};

var renderBoard = function(){
	for( var i = 0 ; i < tetris_board.length ; i++ ){
		for( var j = 0 ; j < tetris_board[0].length ; j++ ){
			document.getElementById('cell' + i + '_' + j)
				.setAttribute('value', tetris_board[i][j]);
		}
	}
	renderTable();
};

var renderTable = function(){
	if( score >= next ){
		next = next + 25;
		clearInterval(intervalId);
		speed = 1000 - (score/25)*50;
		if( speed <= 0 )
			speed = 1;
		intervalId = setInterval( update , speed );
	}
	document.getElementById('score').innerHTML = score;
	document.getElementById('finalscore').innerHTML = score;
	document.getElementById('next').innerHTML = next;
	document.getElementById('level').innerHTML = Math.floor(next/25);
}

var canSetOn = function( figure , x , y ){
	for( var i = 0 ; i < figure.length ; i++ ){
		for( var j = 0 ; j < figure[0].length ; j++ ){
			if( figure[i][j] ){
				if( i+x < 0 || i+x >= tetris_board.length )
					return false;
				if( j+y < 0 || j+y >= tetris_board[0].length )
					return false;
				if( tetris_board[i+x][j+y] )
					return false;
			}
		}
	}
	return true;
};

var rotate = function( figure ){
	var new_figure = [];
	for( var i = 0 ; i < figure[0].length ; i++ ){
		var row = [];
		for( var j = 0 ; j < figure.length ; j++ ){
			row.push(0);
		}
		new_figure.push(row);
	}
	for( var i = 0 ; i < figure.length ; i++ ){
		for( var j = 0 ; j < figure[0].length ; j++ ){
			new_figure[j][i] = figure[ figure.length - i - 1 ][j];
		}
	}

	return new_figure;
}

var setFigure = function( figure , x , y ){
	if( canSetOn( figure , x , y ) ){
		for( var i = 0 ; i < figure.length ; i++ ){
			for( var j = 0 ; j < figure[0].length ; j++ ){
				if( figure[i][j] ){
					tetris_board[i+x][j+y] = figure[i][j];
				}
			}
		}
		return true;
	}else{
		for( var i = 0 ; i < figure.length ; i++ ){
			for( var j = 0 ; j < figure[0].length ; j++ ){
				if( figure[i][j] ){
					if( i+x < 0 || i+x >= tetris_board.length || j+y < 0 || j+y >= tetris_board[0].length ){

					}else{
						tetris_board[i+x][j+y] = figure[i][j]*100;
					}
				}
			}
		}
		return false;
	}
};

var removeFigure = function( figure , x , y ){
	for( var i = 0 ; i < figure.length ; i++ ){
		for( var j = 0 ; j < figure[0].length ; j++ ){
			if( figure[i][j] ){
				tetris_board[i+x][j+y] = 0;
			}
		}
	}
};

var move = function( side ){
	if( !actual_figure )
		return false;

	var x = actualpos.x;
	var y = actualpos.y;
	removeFigure( actual_figure , actualpos.x , actualpos.y );

	switch(side){
		case 0://left
				y--;
			break;
		case 2://right
				y++;
			break;
		case 3://down
				x++;
			break;
		case 1://top - rotate
				var new_figure = rotate( actual_figure );
				if( canSetOn( new_figure , x , y ) ){
					actual_figure = new_figure;
					setFigure( actual_figure , x , y );
					actualpos.x = x;
					actualpos.y = y;
					return true;
				}else{
					setFigure( actual_figure , actualpos.x , actualpos.y );
					return false;
				}
				
	}

	if( canSetOn( actual_figure , x , y ) ){
		setFigure( actual_figure , x , y );
		actualpos.x = x;
		actualpos.y = y;
		return true;
	}else{
		setFigure( actual_figure , actualpos.x , actualpos.y );
		return false;
	}
}

var setNewFigure = function(){
	actual_figure = getRandomFigure();
	actualpos.x = 0;
	actualpos.y = Math.floor(tetris_board[0].length/2);
	if( setFigure(actual_figure , actualpos.x , actualpos.y) ){
		renderBoard();
	}else{
		gameover = true;
		document.getElementById('gameover').classList.add('visible');
		clearInterval(intervalId);
		intervalId = -1;
		renderBoard();
	}
}

var update = function(){
	if( animation || gameover )
		return;

	renderTable();
	

	if( !actual_figure ){
		setNewFigure();
	}else{
		if( move(3) ){

		}else{
			score += 1;
			for( var i = 0 ; i < actual_figure.length ; i++ ){
				for( var j = 0 ; j < actual_figure[0].length ; j++ ){
					if( actual_figure[i][j] )
						tetris_board[i+actualpos.x][j+actualpos.y] = -1*tetris_board[i+actualpos.x][j+actualpos.y];
				}
			}
			actual_figure = null;
			checkLine();
		}
		renderBoard();
	}
}

var init = function(){
	window.onkeydown = function(event){
		if( animation || gameover)
			return 0;

		switch(event.keyCode){
			case 37://left
			case 65:
					move(0);
				break;
			case 38://top
			case 87:
					move(1);
				break;
			case 39://right
			case 68:
					move(2);
				break;
			case 40://down
			case 83:
					move(3);
				break;
		}

		renderBoard();
	};

	intervalId = setInterval( update , speed );
}

var removeLines = function(){
	var line = -1;
	for( var i = tetris_board.length-1 ; i >= 0 ; i-- ){
		if( tetris_board[i][0] == 10 ){
			line = i;
			i = -1;
		}
	}

	if( line >= 0 ){
		for( var i = line ; i > 0 ; i-- ){
			tetris_board[i] = tetris_board[i-1];
		}
		var row = [];
		for( var i = 0 ; i < tetris_board[0].length ; i++ ){
			row.push(0);
		}
		tetris_board[0] = row;
	}
}

var checkLine = function(){
	var lines = [];

	for( var i = 0 ; i < tetris_board.length ; i++ ){
		var line = true;
		for( var j = 0 ; j < tetris_board[0].length ; j++ ){
			if( !tetris_board[i][j] )
				line = false;
		}
		if( line )
			lines.push(i);
	}
	
	if( lines.length ){
		animation = true;

		for( var i = 0 ; i < lines.length ; i++ ){
			for( var j = 0 ; j < tetris_board[0].length ; j++ ){
				tetris_board[ lines[i] ][j] = 10;
			}
		}

		score += 10*lines.length;
		renderTable();
		setTimeout(function(){
			for( var i = 0 ; i < lines.length ; i++ )
				removeLines();
			renderBoard();
			animation = false;
		},1000)
	}
}

window.onload = function(){
	generateBoard();
	init();
};