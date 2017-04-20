//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2,
		ESTADO_3 = 3,
		ESTADO_4 = 4,
		ESTADO_5 = 5;
        
		
//OBJETOS DIBUJABLES
var cuerpo = new Drawable(getImg("IMG/cuerpo1.png"),450,350),
    p0 = getImg("IMG/p0.png"),p1 = getImg("IMG/p1.png");
	
var mundo = [cuerpo];
    

var consola_pos = [[560,420],[660,420],[560,520],[660,520],[660,620],[560,320],[560,620]],
	num1D=0,num1U=0,num2D=0,num2U = 0,ESTADO_RESP = 0,pos4=[0,1,3,4,5,6];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = LECCION_3;
	UNIDAD_ACTUAL = UNIDAD_4;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) (1/10) Haga las siguientes Sumas.";
				cuerpo.Visible = true;
				CalcNums();
            break;
                
        case ESTADO_CALIFICANDO:
				CALIFICANDO_ANIM();
			break;
     }
}

function CalcNums()
{
	var limit = Math.floor(((Math.random())*7))+1;
	num2D=Math.floor(Math.random()*(limit)+1);
	num1D=Math.floor(Math.random()*(8-limit)+1);
	num2U=Math.floor(Math.random()*5+5);
	num1U=Math.floor(Math.random()*5+5);
}

function ESTADOS_ANTERIORES()
{
	ESTADO_RESP = ESTADO_RESP + 1;
    switch(ESTADO_ANTERIOR)
    {
        case ESTADO_1:
                if( ESTADO_RESP >= 30 )
				{
					ESTADO_ACTUAL = ESTADO_2;
					ESTADO_RESP = 0;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/7)+1) + "/8) Cambie el problema a la forma vertical y resuelvalo.";
					CalcNums();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (Math.floor(ESTADO_RESP/3)+1) + "/10) Haga las siguientes Sumas.";
					if( ESTADO_RESP%3 == 0 )
						CalcNums();
				}
            break;
		case ESTADO_2:
                if( ESTADO_RESP >= 56 )
				{
					ESTADO_ACTUAL = ESTADO_3;
					ESTADO_RESP = 0;
					INSTRUCCION = "3) (" + (Math.floor(ESTADO_RESP/3)+1) + "/8) Haga las siguientes Sumas.";
					CalcNums();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/7)+1) + "/8) Cambie el problema a la forma vertical y resuelvalo.";
					if( ESTADO_RESP%7 == 0 )
						CalcNums();
				}
            break;
		case ESTADO_3:
                if( ESTADO_RESP >= 24 )
				{
					ESTADO_ACTUAL = ESTADO_4;
					ESTADO_RESP = 0;
					INSTRUCCION = "4) (" + (Math.floor(ESTADO_RESP/6)+1) + "/8) Cambie el problema a la forma vertical y resuelvalo.";
					CalcNums();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) (" + (Math.floor(ESTADO_RESP/3)+1) + "/8) Haga las siguientes Sumas.";
					if( ESTADO_RESP%3 == 0 )
						CalcNums();
				}
            break;
		case ESTADO_4:
                if( ESTADO_RESP >= 48 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_4;
					INSTRUCCION = "4) (" + (Math.floor(ESTADO_RESP/6)+1) + "/8) Cambie el problema a la forma vertical y resuelvalo.";
					if( ESTADO_RESP%6 == 0 )
						CalcNums();
				}
            break;
    }
}


function DRAW(context)
{
	context.font = Math.floor(50*(percentage_scale+percentage_scale)/2) + "pt CHALK";
	INSTRUCCION_COLOR = "#000000";
	DRAW_INSTRUCTION();
	
	var n1 = num1D*10+num1U, 
	      n2 = ((ESTADO_ACTUAL==ESTADO_3||ESTADO_ANTERIOR==ESTADO_3||
		             ESTADO_ACTUAL==ESTADO_4||ESTADO_ANTERIOR==ESTADO_4)?num2U:(num2D*10+num2U));
		for( i = 0; i <  n1+n2; i++ )
			context.drawImage( i<n1?p0:p1 , (900 + 30*(i%10) )*percentage_scale , 
			      (200 + 30*(Math.floor(i/10)) )*percentage_scale , p0.width*percentage_scale , p0.height*percentage_scale );
				  
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{
		context.fillText( (num1D*10 + num1U) + " + " + (num2D*10+num2U) ,400*percentage_scale,260*percentage_scale);
		
		if( ESTADO_RESP%7 >= 1 ) context.fillText(num1D,(consola_pos[0][0])*percentage_scale,(consola_pos[0][1])*percentage_scale);
		if( ESTADO_RESP%7 >= 2 ) context.fillText(num1U,(consola_pos[1][0])*percentage_scale,(consola_pos[1][1])*percentage_scale);
		if( ESTADO_RESP%7 >= 3 ) context.fillText(num2D,(consola_pos[2][0])*percentage_scale,(consola_pos[2][1])*percentage_scale);
		if( ESTADO_RESP%7 >= 4 ) context.fillText(num2U,(consola_pos[3][0])*percentage_scale,(consola_pos[3][1])*percentage_scale);
		if( ESTADO_RESP%7 >= 5 ) context.fillText((num2U+num1U-10),(consola_pos[4][0])*percentage_scale,(consola_pos[4][1])*percentage_scale);
		if( ESTADO_RESP%7 >= 6 ) context.fillText(1,(consola_pos[5][0])*percentage_scale,(consola_pos[5][1])*percentage_scale);
		
		CONSOLA_X = consola_pos[ESTADO_RESP%7][0];
		CONSOLA_Y = consola_pos[ESTADO_RESP%7][1];
	}
	
	if( ESTADO_ACTUAL == ESTADO_4 || ESTADO_ANTERIOR == ESTADO_4 )
	{
		context.fillText( (num1D*10 + num1U) + " + " + (num2U) ,400*percentage_scale,260*percentage_scale);
		
		if( ESTADO_RESP%6 >= 1 ) context.fillText(num1D,(consola_pos[0][0])*percentage_scale,(consola_pos[0][1])*percentage_scale);
		if( ESTADO_RESP%6 >= 2 ) context.fillText(num1U,(consola_pos[1][0])*percentage_scale,(consola_pos[1][1])*percentage_scale);
		//if( ESTADO_RESP%7 >= 3 ) context.fillText(num2D,(consola_pos[2][0])*percentage_scale,(consola_pos[2][1])*percentage_scale);
		if( ESTADO_RESP%6 >= 3 ) context.fillText(num2U,(consola_pos[3][0])*percentage_scale,(consola_pos[3][1])*percentage_scale);
		if( ESTADO_RESP%6 >= 4 ) context.fillText((num2U+num1U-10),(consola_pos[4][0])*percentage_scale,(consola_pos[4][1])*percentage_scale);
		if( ESTADO_RESP%6 >= 5 ) context.fillText(1,(consola_pos[5][0])*percentage_scale,(consola_pos[5][1])*percentage_scale);
		
		CONSOLA_X = consola_pos[pos4[ESTADO_RESP%6]][0];
		CONSOLA_Y = consola_pos[pos4[ESTADO_RESP%6]][1];
	}
	
	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 ||
	    ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 )
	{
		context.fillText(num1D,(consola_pos[0][0])*percentage_scale,(consola_pos[0][1])*percentage_scale);
		context.fillText(num1U,(consola_pos[1][0])*percentage_scale,(consola_pos[1][1])*percentage_scale);
		if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 )
			context.fillText(num2D,(consola_pos[2][0])*percentage_scale,(consola_pos[2][1])*percentage_scale);
		context.fillText(num2U,(consola_pos[3][0])*percentage_scale,(consola_pos[3][1])*percentage_scale);
		
		CONSOLA_X = consola_pos[4 + ESTADO_RESP%3][0];
		CONSOLA_Y = consola_pos[4 + ESTADO_RESP%3][1];
		
		if( ESTADO_RESP%3 >= 1 )
			context.fillText((num2U+num1U-10),(consola_pos[4][0])*percentage_scale,(consola_pos[4][1])*percentage_scale);
		if( ESTADO_RESP%3 >= 2 )
			context.fillText(1,(consola_pos[5][0])*percentage_scale,(consola_pos[5][1])*percentage_scale);
	}
	
	CONSOLA_COLOR = "#000000";
	CONSOLA_SIZE = 50;
	DRAW_CONSOLA();
}

function MOUSE(X,Y)
{

}

function INPUT(KEYCODE)
{
	if( CONSOLA_KEYDOWN(KEYCODE) )
	{
		switch(ESTADO_ACTUAL)
		{
			case ESTADO_3:
					if( ESTADO_RESP%3 == 0 ) CORRECTO = (parseInt(CONSOLA)== num1U+num2U-10);
					if( ESTADO_RESP%3 == 1 ) CORRECTO = (parseInt(CONSOLA)== 1);
					if( ESTADO_RESP%3 == 2 ) CORRECTO = (parseInt(CONSOLA)== num1D+1);
				break;
			case ESTADO_1:
					if( ESTADO_RESP%3 == 0 ) CORRECTO = (parseInt(CONSOLA)== num1U+num2U-10);
					if( ESTADO_RESP%3 == 1 ) CORRECTO = (parseInt(CONSOLA)== 1);
					if( ESTADO_RESP%3 == 2 ) CORRECTO = (parseInt(CONSOLA)== num1D+num2D+1);
				break;
			case ESTADO_2:
					if( ESTADO_RESP%7 == 0 ) CORRECTO = (parseInt(CONSOLA)== num1D );
					if( ESTADO_RESP%7 == 1 ) CORRECTO = (parseInt(CONSOLA)== num1U );
					if( ESTADO_RESP%7 == 2 ) CORRECTO = (parseInt(CONSOLA)== num2D );
					if( ESTADO_RESP%7 == 3 ) CORRECTO = (parseInt(CONSOLA)== num2U );
					if( ESTADO_RESP%7 == 4 ) CORRECTO = (parseInt(CONSOLA)== num2U+num1U-10 );
					if( ESTADO_RESP%7 == 5 ) CORRECTO = (parseInt(CONSOLA)== 1 );
					if( ESTADO_RESP%7 == 6 ) CORRECTO = (parseInt(CONSOLA)== num2D+num1D+1 );
				break;
			case ESTADO_4:
					if( ESTADO_RESP%6 == 0 ) CORRECTO = (parseInt(CONSOLA)== num1D );
					if( ESTADO_RESP%6 == 1 ) CORRECTO = (parseInt(CONSOLA)== num1U );
					if( ESTADO_RESP%6 == 2 ) CORRECTO = (parseInt(CONSOLA)== num2U );
					if( ESTADO_RESP%6 == 3 ) CORRECTO = (parseInt(CONSOLA)== num2U+num1U-10  );
					if( ESTADO_RESP%6 == 4 ) CORRECTO = (parseInt(CONSOLA)== 1 );
					if( ESTADO_RESP%6 == 5 ) CORRECTO = (parseInt(CONSOLA)== num1D+1 );
				break;
		}
		if( CORRECTO )
			EJER_CORRECTO_CONSOLA(1);
		else
			EJER_INCORRECTO_CONSOLA(-1);
	}
	
}
