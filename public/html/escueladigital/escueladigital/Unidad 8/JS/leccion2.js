var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2;
		
var cuadro = getImg("IMG/cuadro.png"),
	  cuadro1 = getImg("IMG/cuadro1.png");
		
var pos1 = [ [540,300],[680,300],
	                 [580,400],[710,400],
					 [540,500],[680,500],
					 [470,600],[620,600]],
      resp1 = ["3","58","38","57","28","26","7","43"],
	  pos2  = [ [540,300],[680,300],
	                 [580,400],[710,400],
					 [540,500],[680,500],
					 [470,600],[620,600]],
      resp2 = ["2","42","15","27","14","86","6","18"];;

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = LECCION_2;
	UNIDAD_ACTUAL = UNIDAD_8;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) Haga las siguientes sumas.";
				ESTADO_RESP = 0;
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
				if( ESTADO_RESP >= 8 )
				{
					ESTADO_ACTUAL = ESTADO_2;        
					INSTRUCCION = "2) Haga las siguientes restas.";
					ESTADO_RESP = 0;
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
				}
            break;
		case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 8 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
				}
            break;
    }
}


function DRAW(context)
{
	INSTRUCCION_COLOR = "#000000";
	DRAW_INSTRUCTION();
	
	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 )
	{
		context.font = Math.floor(25*percentage_scale) + "pt CHALK";
		context.fillText( "1) 1m 43cm + 2m 15cm =              m              cm", 180*percentage_scale, 300*percentage_scale);
		context.fillText( "2) 13m 27cm + 25m 30cm =              m              cm", 180*percentage_scale, 400*percentage_scale);
		context.fillText( "3) 26m 7cm + 2m 19cm =              m              cm", 180*percentage_scale, 500*percentage_scale);
		context.fillText( "4) 7m 9cm + 34cm =              m              cm", 180*percentage_scale, 600*percentage_scale);
	
		for( i = 0 ; i < pos1.length ; i++ )
		{
			if( i < ESTADO_RESP )
				context.fillText( resp1[i] , pos1[i][0]*percentage_scale,
									   pos1[i][1]*percentage_scale);
				
			context.drawImage( i==ESTADO_RESP?cuadro1:cuadro, 
					( pos1[i][0] - 15)*percentage_scale,( pos1[i][1] - 44)*percentage_scale,                
							cuadro.width*percentage_scale,  cuadro.height*percentage_scale);   
		}
		
									   
		CONSOLA_X = pos1[  ESTADO_RESP ][0];
		CONSOLA_Y = pos1[  ESTADO_RESP ][1];
		CONSOLA_SIZE = 30;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();		
	}
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{
		context.font = Math.floor(25*percentage_scale) + "pt CHALK";
		context.fillText( "1) 4m 65cm - 2m 23cm =              m              cm", 180*percentage_scale, 300*percentage_scale);
		context.fillText( "2) 28m 67cm - 13m 40cm =              m              cm", 180*percentage_scale, 400*percentage_scale);
		context.fillText( "3) 19m 92cm - 5m 6cm =              m              cm", 180*percentage_scale, 500*percentage_scale);
		context.fillText( "4) 6m 47cm - 29cm =              m              cm", 180*percentage_scale, 600*percentage_scale);
	
		for( i = 0 ; i < pos1.length ; i++ )
		{
			if( i < ESTADO_RESP )
				context.fillText( resp2[i] , pos2[i][0]*percentage_scale,
									   pos2[i][1]*percentage_scale);
				
			context.drawImage( i==ESTADO_RESP?cuadro1:cuadro, 
					( pos2[i][0] - 15)*percentage_scale,( pos2[i][1] - 44)*percentage_scale,                
							cuadro.width*percentage_scale,  cuadro.height*percentage_scale);   
		}
		
									   
		CONSOLA_X = pos1[  ESTADO_RESP ][0];
		CONSOLA_Y = pos1[  ESTADO_RESP ][1];
		CONSOLA_SIZE = 30;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();		
	}
	
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
						CORRECTO = (CONSOLA == resp1[ESTADO_RESP]);
					break;	
				case ESTADO_2:
						CORRECTO = (CONSOLA == resp2[ESTADO_RESP]);
					break;
			}
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	
}
