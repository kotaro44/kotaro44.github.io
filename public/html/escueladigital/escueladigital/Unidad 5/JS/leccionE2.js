//Estados probablemente esto servira para todas las lecciones
var	ESTADO_1 = 1,
		ESTADO_2 = 2,
		ESTADO_3 = 3;
		
//OBJETOS DIBUJABLES
var cuerpo = new Drawable(getImg( "IMG/cuerpo.png"),450,350),
	tacha = getImg("IMG/tacha.png");
	
var mundo = [cuerpo];
    
	
var consola_pos = [[560,420],[660,420],[560,520],[660,520], [560,320],[660,320] , [660,620] ,[560,620]],
	num1D=0,num1U=0,num2D=0,num2U = 0,ESTADO_RESP = 0,
	problemas7 = [ "El pap\xE1 de Juan ten\xEDa 64 vacas y vendi\xF3 35 vacas. \xBFCu\xE1ntas vacas le quedaron?",
	               "Rosita tiene 34 libros y su hermano 19 libros. \xBFCu\xE1ntos libros m\xE1s tiene Rosita que su hermano?",
				   "En el jard\xEDn hay 70 flores rojas y blancas, 36 son rojas. \xBFCu\xE1ntas flores blancas hay en el jard\xEDn?"],
	respuestas7 = [6,4,3,5,5,14,9,2, 3,4,1,9,2,14,5,1, 7,0,3,6,6,10,4,3];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = EJERCICIOS_2;
	UNIDAD_ACTUAL = UNIDAD_5;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) (1/10) Haga las siguientes restas.";
				cuerpo.Visible = true;
				ESTADO_RESP = 0;
				CalcNums();
            break;
                
        case ESTADO_CALIFICANDO:
				CALIFICANDO_ANIM();
			break;
     }
}

function CalcNums()
{
		num1D = Math.floor( Math.random()*4 ) + 5;
		num1U = Math.floor( Math.random()*4 );
		num2U = Math.floor( Math.random()*4 ) + 5;
		num2D = (Math.floor( Math.random()*100 )<50)? 0 : Math.floor( Math.random()*4 );
}

function ESTADOS_ANTERIORES()
{
	ESTADO_RESP = ESTADO_RESP + 1;
    switch(ESTADO_ANTERIOR)
    {
        case ESTADO_1:
				if( ESTADO_RESP >= 40 )
				{
					ESTADO_ACTUAL = ESTADO_2;
					CalcNums();
					ESTADO_RESP=0;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/8)+1) + "/5) Cambie el problema a la forma vertical y resuelvalo.";
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (Math.floor(ESTADO_RESP/4)+1) + "/10) Haga las siguientes restas.";
					if( ESTADO_RESP%4 == 0 )
						CalcNums();
				}
            break;
		case ESTADO_2:
				if( ESTADO_RESP >= 40 )
				{
					ESTADO_ACTUAL = ESTADO_3;
					ESTADO_RESP=0;
					INSTRUCCION = "3) (" + (Math.floor(ESTADO_RESP/8)+1)  + 
							"/3) Resuelva los siguientes problemas desarrollando el C\xE1lculo: " + problemas7[Math.floor(ESTADO_RESP/6)];
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/8)+1) + "/5) Cambie el problema a la forma vertical y resuelvalo.";
					if( ESTADO_RESP%8 == 0 )
						CalcNums();
				}
            break;
		case ESTADO_3:
				if( ESTADO_RESP >= 24 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
					if( ESTADO_RESP%8 == 0 )
						INSTRUCCION = "3) (" + (Math.floor(ESTADO_RESP/6)+1)  + 
							"/3) Resuelva los siguientes problemas desarrollando el C\xE1lculo: " + problemas7[Math.floor(ESTADO_RESP/6)];
				}
			break;
    }
}


function DRAW(context)
{
	context.font = Math.floor(50*(percentage_scale+percentage_scale)/2) + "pt CHALK";
	INSTRUCCION_COLOR = "#000000";
	DRAW_INSTRUCTION();
	
	if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3  )
	{
		for( i = 0 ; i < ESTADO_RESP%8 ; i++ )
			context.fillText( respuestas7[Math.floor(ESTADO_RESP/8)*8 + i] ,consola_pos[i%8][0]*percentage_scale,
														consola_pos[i%8][1]*percentage_scale);
		
		if( ESTADO_RESP%8 > 4 )
			context.drawImage( tacha ,  (consola_pos[0][0]-15)*percentage_scale,(consola_pos[0][1] -60)*percentage_scale ,
					tacha.width*percentage_scale,tacha.height*percentage_scale);
		if( ESTADO_RESP%8 > 5 )
			context.drawImage( tacha ,  (consola_pos[1][0]-15)*percentage_scale,(consola_pos[1][1] -60)*percentage_scale ,
					tacha.width*percentage_scale,tacha.height*percentage_scale);
														
		CONSOLA_X = consola_pos[ESTADO_RESP%8][0];
		CONSOLA_Y = consola_pos[ESTADO_RESP%8][1];
	}


	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1  )
	{
		context.fillText(num1D,(consola_pos[0][0])*percentage_scale,(consola_pos[0][1])*percentage_scale);
		context.fillText(num1U,(consola_pos[1][0])*percentage_scale,(consola_pos[1][1])*percentage_scale);
		if( num2D != 0 )
			context.fillText(num2D,(consola_pos[2][0])*percentage_scale,(consola_pos[2][1])*percentage_scale);
		context.fillText(num2U,(consola_pos[3][0])*percentage_scale,(consola_pos[3][1])*percentage_scale);
		
		if( ESTADO_RESP%4 > 0 )
		{
			context.fillText((num1D-1),(consola_pos[4][0])*percentage_scale,(consola_pos[4][1])*percentage_scale);
			context.drawImage( tacha ,  (consola_pos[0][0]-15)*percentage_scale,(consola_pos[0][1] -60)*percentage_scale ,
					tacha.width*percentage_scale,tacha.height*percentage_scale);
		}
		
		if( ESTADO_RESP%4 > 1 )
		{
			context.fillText((num1U+10),(consola_pos[5][0])*percentage_scale,(consola_pos[5][1])*percentage_scale);
			context.drawImage( tacha ,  (consola_pos[1][0]-15)*percentage_scale,(consola_pos[1][1] -60)*percentage_scale ,
					tacha.width*percentage_scale,tacha.height*percentage_scale);
		}
		
		if( ESTADO_RESP%4 > 2 )
			context.fillText((num1U+10-num2U),(consola_pos[6][0])*percentage_scale,(consola_pos[6][1])*percentage_scale);
		
		CONSOLA_X = consola_pos[ ESTADO_RESP%4 + 4][0];
		CONSOLA_Y = consola_pos[ ESTADO_RESP%4 + 4][1];
	}
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{
		context.fillText( (num1D*10+num1U) + "-" + (num2D*10+num2U)+ "=" ,(180)*percentage_scale,(300)*percentage_scale);
		
		if( ESTADO_RESP%8 > 0 )
			context.fillText(num1D,(consola_pos[0][0])*percentage_scale,(consola_pos[0][1])*percentage_scale);
		if( ESTADO_RESP%8 > 1 )
			context.fillText(num1U,(consola_pos[1][0])*percentage_scale,(consola_pos[1][1])*percentage_scale);
		if( ESTADO_RESP%8 > 2 && num2D != 0 )
			context.fillText(num2D,(consola_pos[2][0])*percentage_scale,(consola_pos[2][1])*percentage_scale);
		if( ESTADO_RESP%8 > 3 )
			context.fillText(num2U,(consola_pos[3][0])*percentage_scale,(consola_pos[3][1])*percentage_scale);
		if( ESTADO_RESP%8 > 4 )
		{
			context.fillText((num1D-1),(consola_pos[4][0])*percentage_scale,(consola_pos[4][1])*percentage_scale);
			context.drawImage( tacha ,  (consola_pos[0][0]-15)*percentage_scale,(consola_pos[0][1] -60)*percentage_scale ,
					tacha.width*percentage_scale,tacha.height*percentage_scale);
		}
		
		if( ESTADO_RESP%8 > 5 )
		{
			context.fillText((num1U+10),(consola_pos[5][0])*percentage_scale,(consola_pos[5][1])*percentage_scale);
			context.drawImage( tacha ,  (consola_pos[1][0]-15)*percentage_scale,(consola_pos[1][1] -60)*percentage_scale ,
					tacha.width*percentage_scale,tacha.height*percentage_scale);
		}
		if( ESTADO_RESP%8 > 6 )
			context.fillText((num1U+10-num2U),(consola_pos[6][0])*percentage_scale,(consola_pos[6][1])*percentage_scale);	
			
		CONSOLA_X = consola_pos[ ESTADO_RESP%8 ][0];
		CONSOLA_Y = consola_pos[ ESTADO_RESP%8 ][1];
		
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
		CORRECTO = false;
		
		switch(ESTADO_ACTUAL)
		{

			case ESTADO_1:
					CORRECTO = (parseInt(CONSOLA) ==  (ESTADO_RESP%4==0?(num1D-1):
													  (ESTADO_RESP%4==1?(num1U+10):
													  (ESTADO_RESP%4==2?(num1U+10-num2U):
													                    (num1D-num2D-1)))));
				break;
			case ESTADO_2:
					if( ESTADO_RESP%8==2 )
						CORRECTO =  ((num2D==0)?(CONSOLA==""||CONSOLA=="0"):parseInt(CONSOLA)==(num2D));
					else
						CORRECTO =  (parseInt(CONSOLA) == ( (ESTADO_RESP%8==0)? (num1D):
														(ESTADO_RESP%8==1)? (num1U):
														(ESTADO_RESP%8==2)? (num2D):
														(ESTADO_RESP%8==3)? (num2U):
														(ESTADO_RESP%8==4)? (num1D-1):
														(ESTADO_RESP%8==5)? (num1U+10):
														(ESTADO_RESP%8==6)? (num1U+10-num2U):
														                    (num1D-num2D-1) ));
				break;
			case ESTADO_3:
					 CORRECTO = parseInt(CONSOLA) == respuestas7[ESTADO_RESP];
				break;

		}
		if( CORRECTO )
			EJER_CORRECTO_CONSOLA(1);
		else
			EJER_INCORRECTO_CONSOLA(-1);
	}
}
