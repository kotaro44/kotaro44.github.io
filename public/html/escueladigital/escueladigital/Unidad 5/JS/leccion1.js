//Estados probablemente esto servira para todas las lecciones
var	ESTADO_1 = 0,
		ESTADO_2 = 1,
		ESTADO_3 = 2;
		
//OBJETOS DIBUJABLES
var mundo = [];
    
//VARIABLES
var  ESTADO_RESP =  0,
    restas = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    consola_pos = [[320,200],[320,350],[320,500],[320,650],
	               [720,200],[720,350],[720,500],[720,650],
				   [1120,200],[1120,350],[1120,500],[1120,650]];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = LECCION_1;
	UNIDAD_ACTUAL = UNIDAD_5;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1)  Haga las siguientes restas.";
				ESTADO_RESP = 0;
				for( i = 0 ; i < restas.length ; i++ )
				{
					restas[i][0] = Math.floor(Math.random()*5+1)*10+30;
					do{
					restas[i][1] = Math.floor(Math.random()*8+1)*10;
					}while(restas[i][1]>restas[i][0]);
				}
            break;
                
        case ESTADO_CALIFICANDO:
				CALIFICANDO_ANIM();
			break;
     }
}

function ESTADOS_ANTERIORES()
{
    switch(ESTADO_ANTERIOR)
    {
        case ESTADO_1:
				ESTADO_RESP++;
				if( ESTADO_RESP < 12 )
					ESTADO_ACTUAL = ESTADO_1;
				else
				{
					INSTRUCCION = "2)  Haga las siguientes restas.";
					ESTADO_ACTUAL = ESTADO_2;
					ESTADO_RESP = 0;
					for( i = 0 ; i < restas.length ; i++ )
					{
						restas[i][1] = Math.floor(Math.random()*8+1);
						restas[i][0] = Math.floor(Math.random()*8+1)*10 + restas[i][1];
					}
				}
            break;
		case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP < 12 )
					ESTADO_ACTUAL = ESTADO_2;
				else
				{
					INSTRUCCION = "3)  Haga las siguientes restas.";
					ESTADO_ACTUAL = ESTADO_3;
					ESTADO_RESP = 0;
					for( i = 0 ; i < restas.length ; i++ )
					{
						restas[i][1] = Math.floor(Math.random()*8+1)*10;
						restas[i][0] = restas[i][1] + Math.floor(Math.random()*8+1);
					}
				}
            break;
		case ESTADO_3:
				ESTADO_RESP++;
				if( ESTADO_RESP < 12 )
					ESTADO_ACTUAL = ESTADO_3;
				else
				{
					FIN_LECCION();
				}
            break;
    }
}




function DRAW(context)
{
	INSTRUCCION_COLOR = "#000000";
	DRAW_INSTRUCTION();

	context.font = Math.floor(30*(percentage_scale+percentage_scale)/2) + "pt CHALK";
	var cont = 0;
	for( i = 0 ; i < 3; i++ )
		for( j = 0 ; j < 4; j++ )
			context.fillText(restas[cont][0] + " - " + restas[cont++][1] + " = ",(150 + i*400)*percentage_scale,(200 + j*150)*percentage_scale);
	for( i = 0 ; i < ESTADO_RESP; i++ )
			context.fillText((restas[i][0] - restas[i][1])+"",(consola_pos[i][0])*percentage_scale,(consola_pos[i][1])*percentage_scale);
	CONSOLA_COLOR = "#000000";
	CONSOLA_SIZE = 30;
	CONSOLA_X = consola_pos[ESTADO_RESP][0];
	CONSOLA_Y = consola_pos[ESTADO_RESP][1];
	DRAW_CONSOLA();

		
}

function MOUSE(X,Y)
{

}

function INPUT(KEYCODE)
{
	if( true )
	{
		if( CONSOLA_KEYDOWN(KEYCODE) )
		{
			if( parseInt(CONSOLA) == (restas[ESTADO_RESP][0] - restas[ESTADO_RESP][1]) )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	}
}
