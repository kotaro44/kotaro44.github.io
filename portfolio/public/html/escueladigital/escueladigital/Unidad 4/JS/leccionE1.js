//Estados probablemente esto servira para todas las lecciones
var	ESTADO_1 = 3,
		ESTADO_2 = 4,
		ESTADO_3 = 5;

//OBJETOS DIBUJABLES
var cuerpo = new Drawable(getImg("IMG/cuerpo1.png"),450,350);
	
var mundo = [cuerpo];

var consola_pos = [[560,420],[660,420],[560,520],[660,520],[560,620],[660,620]],Estilo = 0,
	num1D=0,num1U=0,num2D=0,num2U = 0,ESTADO_RESP = 0,pos4 = [0,1,3,5,4],pos6 = [1,2,3,5,4],
	problemas7 = [ "Pablo ten\xEDa 25 mables, hoy compr\xF3 24 m\xE1s. \xBFCu\xE1ntos mables tiene ahora Pablo?",
	               "En un jard\xEDn hay 44 rosas rojas y 33 rosas amarillas. \xBFCu\xE1ntas rosas hay en total?"],
	respuestas7 = [2,5,2,4,9,4,4,4,3,3,7,7];
    

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = EJERCICIOS_2;
	UNIDAD_ACTUAL = UNIDAD_4;
}

function CalcNums()
{
	var limit = Math.floor(((Math.random())*7))+1;
	num2U=Math.floor(Math.random()*(limit)+1);
	num1U=Math.floor(Math.random()*(9-limit)+1);
	num2D=Math.floor(Math.random()*(limit)+1);
	num1D=Math.floor(Math.random()*(9-limit)+1);
	if( ESTADO_ACTUAL == ESTADO_2 )
		Estilo = Math.floor( Math.random()*2 ) + 1;
	else
		Estilo = Math.floor( Math.random()*3 );
}

function UPDATE()
{        
	
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) (1/6) Haga las siguientes Sumas.";
				cuerpo.Visible = true;
				ESTADO_RESP = 0;
				CalcNums();
            break;
                
        case ESTADO_CALIFICANDO:
				CALIFICANDO_ANIM();
			break;
     }
}

function ESTADOS_ANTERIORES()
{
	ESTADO_RESP++;
    switch(ESTADO_ANTERIOR)
    {
        case ESTADO_1:
				if( ESTADO_RESP >= 12 )
				{
					ESTADO_ACTUAL = ESTADO_2;
					ESTADO_RESP = 0;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/2)+1) + "/6) Cambie el problema a la forma vertical y resuelvalo.";
					CalcNums();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (Math.floor(ESTADO_RESP/2)+1) + "/6) Haga las siguientes Sumas.";
					if( ESTADO_RESP%2 == 0 )
						CalcNums();
				}
            break;
		case ESTADO_2:
				if( ESTADO_RESP >= 30 )
				{
					ESTADO_ACTUAL = ESTADO_3;        
					INSTRUCCION = "3) (1/2) Resuelva los siguientes problemas desarrollando el C\xE1lculo: " + problemas7[0];
					ESTADO_RESP = 0;
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/5)+1) + "/6) Cambie el problema a la forma vertical y resuelvalo.";
					if( ESTADO_RESP%5 == 0 )
						CalcNums();
					
				}
			break;
		case ESTADO_3:
				if( ESTADO_RESP >= 12 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
					if( ESTADO_RESP%6 == 0 )
						INSTRUCCION = "3) (" + (Math.floor(ESTADO_RESP/6)+1)  + 
							"/2) Resuelva los siguientes problemas desarrollando el C\xE1lculo: " + problemas7[Math.floor(ESTADO_RESP/6)];
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
		for( i = 0 ; i < ESTADO_RESP%6 ; i++ )
			context.fillText( respuestas7[Math.floor(ESTADO_RESP/6)*6 + i] ,consola_pos[i==4?5:i==5?4:i][0]*percentage_scale,
														consola_pos[i==4?5:i==5?4:i][1]*percentage_scale);
		CONSOLA_X = consola_pos[ESTADO_RESP%6==4?5:ESTADO_RESP%6==5?4:ESTADO_RESP%6][0];
		CONSOLA_Y = consola_pos[ESTADO_RESP%6==4?5:ESTADO_RESP%6==5?4:ESTADO_RESP%6][1];
	}
	
	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1  )
	{
		if( Estilo != 1 )
			context.fillText(num1D,(consola_pos[0][0])*percentage_scale,(consola_pos[0][1])*percentage_scale);
		context.fillText(num1U,(consola_pos[1][0])*percentage_scale,(consola_pos[1][1])*percentage_scale);
		if( Estilo != 2 )
			context.fillText(num2D,(consola_pos[2][0])*percentage_scale,(consola_pos[2][1])*percentage_scale);
		context.fillText(num2U,(consola_pos[3][0])*percentage_scale,(consola_pos[3][1])*percentage_scale);
		
		if( ESTADO_RESP%2 == 0 )
		{
			CONSOLA_X = consola_pos[5][0];
			CONSOLA_Y = consola_pos[5][1];
		}
		else
		{
			context.fillText(num2U+num1U,(consola_pos[5][0])*percentage_scale,(consola_pos[5][1])*percentage_scale);
			CONSOLA_X = consola_pos[4][0];
			CONSOLA_Y = consola_pos[4][1];
		}
	}
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2  )
	{

			context.fillText( (Estilo==1?(num1D*10 + num1U):num1U) + " + " + 
							  (Estilo==1?num2U:(num2D*10 + num2U)) ,400*percentage_scale,260*percentage_scale);	
							  
			if( Estilo==1 )
			{
				if( ESTADO_RESP%5 > 0 ) context.fillText(num1D,consola_pos[0][0]*percentage_scale,consola_pos[0][1]*percentage_scale);
				if( ESTADO_RESP%5 > 1 ) context.fillText(num1U,consola_pos[1][0]*percentage_scale,consola_pos[1][1]*percentage_scale);
			}
			else
			{
				if( ESTADO_RESP%5 > 0 ) context.fillText(num1U,consola_pos[1][0]*percentage_scale,consola_pos[1][1]*percentage_scale);
				if( ESTADO_RESP%5 > 1 ) context.fillText(num2D,consola_pos[2][0]*percentage_scale,consola_pos[2][1]*percentage_scale);
			}
			if( ESTADO_RESP%5 > 2 ) context.fillText(num2U,consola_pos[3][0]*percentage_scale,consola_pos[3][1]*percentage_scale);
			if( ESTADO_RESP%5 > 3 ) context.fillText((num1U+num2U),consola_pos[5][0]*percentage_scale,consola_pos[5][1]*percentage_scale);

			CONSOLA_X = consola_pos[   (Estilo==1)?pos4[ESTADO_RESP%5]:pos6[ESTADO_RESP%5]    ][0];
			CONSOLA_Y = consola_pos[   (Estilo==1)?pos4[ESTADO_RESP%5]:pos6[ESTADO_RESP%5]    ][1];
		
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
			case ESTADO_1:
					CORRECTO = (parseInt(CONSOLA) == (ESTADO_RESP%2==0?(num1U+num2U):( Estilo==0?(num1D+num2D):Estilo==1?num2D:num1D )));
				break;
			case ESTADO_2:
					if( Estilo == 1 )
					{
						switch(ESTADO_RESP%5){
						case 0: CORRECTO = parseInt(CONSOLA) == num1D; break;
						case 1: CORRECTO = parseInt(CONSOLA) == num1U; break;
						case 2: CORRECTO = parseInt(CONSOLA) == num2U; break;
						case 3: CORRECTO = parseInt(CONSOLA) == num1U+num2U; break;
						case 4: CORRECTO = parseInt(CONSOLA) == num1D; break;}
					}
					if( Estilo == 2 )
					{
						switch(ESTADO_RESP%5){
						case 0: CORRECTO = parseInt(CONSOLA) == num1U; break;
						case 1: CORRECTO = parseInt(CONSOLA) == num2D; break;
						case 2: CORRECTO = parseInt(CONSOLA) == num2U; break;
						case 3: CORRECTO = parseInt(CONSOLA) == num1U+num2U; break;
						case 4: CORRECTO = parseInt(CONSOLA) == num2D; break;}
					}
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
