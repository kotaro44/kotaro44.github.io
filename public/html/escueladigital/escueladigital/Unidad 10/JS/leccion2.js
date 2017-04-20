var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2;
		
var imagenes = [ getImg("IMG/img1.png"), getImg("IMG/img2.png"), getImg("IMG/img3.png"), getImg("IMG/img4.png") ],
      pos1 = [ [312,415] , [442,330] , [760,340] , [790,545] , [450,600], [850,330] , [792,610] , [410,620] , [320,485] , [400,380] ],
	  resp1 =["arista","superficie","vertice","superficie","vertice","arista","superficie","vertice","arista","vertice"],
	  pos2 = [ [640,350] , [730,470] , [670,580], [530,360] , [460,485] , [455,595] ],
	  resp2 =["8","12","6","8","12","6"];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_2;
	UNIDAD_ACTUAL = UNIDAD_10;

}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) (1/2) Escriba en el espacio en blanco el nombre del elemento del sólido.";
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
				if( ESTADO_RESP >= 10 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2)  (1/2) Escriba en cada casilla el n\xFAmero que corresponde.";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (ESTADO_RESP<5?1:2) + "/2) Escriba en el espacio en blanco el nombre del elemento del sólido.";
				}
            break;
		case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 6 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2)  (" + (ESTADO_RESP<3?1:2) + "/2) Escriba en cada casilla el n\xFAmero que corresponde.";
				}
            break;
		
		
    }
}


function DRAW(context)
{
	DRAW_INSTRUCTION();
	context.font = Math.floor(30*percentage_scale) + "pt CHALK";
	
	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 )
	{
			context.drawImage( imagenes[ (ESTADO_RESP<5?0:1)  ] , 300*percentage_scale , 300*percentage_scale  , 
						imagenes[ (ESTADO_RESP<5?0:1) ].width*percentage_scale , imagenes[ (ESTADO_RESP<5?0:1) ].height*percentage_scale  );
						
		
			for( i = ESTADO_RESP<5?0:5 ; i <  ESTADO_RESP ; i++ )
				context.fillText( resp1[i] , pos1[i][0]*percentage_scale , pos1[i][1]*percentage_scale );

						
			CONSOLA_X = pos1[ESTADO_RESP][0];
			CONSOLA_Y = pos1[ESTADO_RESP][1];
			CONSOLA_SIZE = 30;
			DRAW_CONSOLA();

	}
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{
			context.drawImage( imagenes[ (ESTADO_RESP<3?2:3)  ] , 300*percentage_scale , 300*percentage_scale  , 
						imagenes[ (ESTADO_RESP<3?0:1) ].width*percentage_scale , imagenes[ (ESTADO_RESP<3?0:1) ].height*percentage_scale  );
						
		
			for( i = ESTADO_RESP<3?0:3 ; i <  ESTADO_RESP ; i++ )
				context.fillText( resp2[i] , pos2[i][0]*percentage_scale , pos2[i][1]*percentage_scale );

						
			CONSOLA_X = pos2[ESTADO_RESP][0];
			CONSOLA_Y = pos2[ESTADO_RESP][1];
			CONSOLA_SIZE = 30;
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
			
			if( ESTADO_ACTUAL == ESTADO_1 )
			{
				CORRECTO = ( CONSOLA == resp1[ESTADO_RESP] );
			}
			else
			{
				CORRECTO = ( CONSOLA == resp2[ESTADO_RESP] );
			}
			
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	
}
