var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
        ESTADO_2 = 2,
		ESTADO_3 = 3,
		ESTADO_4 = 4,
		ESTADO_5 = 5,
		ESTADO_6 = 6,
		ESTADO_7 = 7;
		
var tabla = getImg("IMG/ninios.png") ,
	  pos = [ [480,340] , [480,400] , [480,460]  , [480,520]  , [480,580] ],
	  resp = ["4","3","4","6","2"];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_1;
	UNIDAD_ACTUAL = UNIDAD_13;
	
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;    
				ESTADO_RESP = 0;				
                INSTRUCCION = "1) (" + (ESTADO_RESP+1) + "/5) Exprese el resultado en la tabla.";
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
				if( ESTADO_RESP >= 5 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) \xBFA cu\xE1ntas personas les gusta m\xE1s el banano?";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (ESTADO_RESP+1) + "/5) Exprese el resultado en la tabla.";
				}
            break;
		case ESTADO_2:
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) \xBFA cu\xE1ntas personas les gusta m\xE1s la sand\xEDa?";
			break;
		case ESTADO_3:
					ESTADO_ACTUAL = ESTADO_4;
					INSTRUCCION = "4) \xBFQu\xE9 les gusta m\xE1s la pi\xF1a o la naranja?";
			break;
		case ESTADO_4:
					ESTADO_ACTUAL = ESTADO_5;
					INSTRUCCION = "5) \xBFCu\xE1l es la la fruta que les gusta m\xE1s a los compa\xF1eros y compa\xF1eras?";
			break;
		case ESTADO_5:
					ESTADO_ACTUAL = ESTADO_6;
					INSTRUCCION = "6) \xBFCu\xE1l es la la fruta que menos les gusta a los compa\xF1eros y compa\xF1eras?";
			break;
		case ESTADO_6:
					ESTADO_ACTUAL = ESTADO_7;
					INSTRUCCION = "7) \xBFCu\xE1ntas personas hay en total en la secci\xF3n?";
			break;
	    case ESTADO_7:
					FIN_LECCION();
			break;
		
    }
}


function DRAW(context)
{
	INSTRUCCION_COLOR = "#000000";
	DRAW_INSTRUCTION();
	context.font = Math.floor(30*percentage_scale) + "pt CHALK";
	
	context.drawImage( tabla , 350*percentage_scale , 200*percentage_scale  , 
						tabla.width*percentage_scale , tabla.height*percentage_scale  );
		
	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 )
	{					
		for( i = 0 ; i < ESTADO_RESP ; i++ )
			context.fillText( resp[i] , pos[i][0]*percentage_scale , pos[i][1]*percentage_scale  );
						
		CONSOLA_X = pos[ESTADO_RESP][0];
		CONSOLA_Y = pos[ESTADO_RESP][1];
		CONSOLA_SIZE = 30;
		DRAW_CONSOLA();
	}
	else
	{
		for( i = 0 ; i < resp.length ; i++ )
			context.fillText( resp[i] , pos[i][0]*percentage_scale , pos[i][1]*percentage_scale  );
		CONSOLA_X = 200;
		CONSOLA_Y = 660;
		CONSOLA_SIZE = 50;
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
			switch( ESTADO_ACTUAL )
			{
				case ESTADO_1:
						CORRECTO = (CONSOLA == resp[ESTADO_RESP]);
					break;
				case ESTADO_2:
						CORRECTO = (CONSOLA == "4");
					break;
				case ESTADO_3:
						CORRECTO = (CONSOLA == "2");
					break;
				case ESTADO_4:
				case ESTADO_5:
						CORRECTO = (CONSOLA == "naranja");
					break;
				case ESTADO_6:
						CORRECTO = (CONSOLA == "sandia");
					break;
				case ESTADO_7:
						CORRECTO = (CONSOLA == "19");
					break;
			}
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	
}
