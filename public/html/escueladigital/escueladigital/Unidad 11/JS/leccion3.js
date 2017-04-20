var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
        ESTADO_2 = 2;
		
var cuadro = getImg("IMG/cuadrodin.png"), numeros = [ [0,0,0,0] , [0,0,0,0] ],
      pos = [ [450,510] , [570,510] , [700,510] , [820,510] ];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = LECCION_3;
	UNIDAD_ACTUAL = UNIDAD_11;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
				ESTADO_RESP = 0;
                INSTRUCCION = "1) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Encuentre el resultado.";
				
				for( j = 0 ; j < numeros[0].length ; j++ )
				{		
					numeros[0][j] = Math.floor( Math.random()*5 )+1;
					numeros[1][j] = Math.floor( Math.random()*5 )+1;
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
				if( ESTADO_RESP >= 16 )
				{
					ESTADO_ACTUAL = ESTADO_2;        
					ESTADO_RESP = 0;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Encuentre el resultado.";
					
					for( j = 0 ; j < numeros[0].length ; j++ )
					{		
						numeros[0][j] = Math.floor( Math.random()*5 )+1;
						numeros[1][j] = Math.floor( Math.random()*3 )+1 + numeros[0][j] ;
					}
				}
				else
				{
				
					if( ESTADO_RESP%4 == 0 )
					{
							for( j = 0 ; j < numeros[0].length ; j++ )
							{		
								numeros[0][j] = Math.floor( Math.random()*5 )+1;
								numeros[1][j] = Math.floor( Math.random()*5 )+1;
							}
					}
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Encuentre el resultado.";
				}
            break;
			
		case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 16 )
				{
					FIN_LECCION();
				}
				else
				{
				
					if( ESTADO_RESP%4 == 0 )
					{
							for( j = 0 ; j < numeros[0].length ; j++ )
							{		
								numeros[0][j] = Math.floor( Math.random()*5 )+1;
								numeros[1][j] = Math.floor( Math.random()*3 )+1 + numeros[0][j] ;
							}
					}
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Encuentre el resultado.";
				}
            break;
		
    }
}


function DRAW(context)
{
	INSTRUCCION_COLOR = "#000000";
	DRAW_INSTRUCTION();
	context.font = Math.floor(30*percentage_scale) + "pt CHALK";
	
	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 ||
        ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2	)
	{
			context.drawImage( cuadro , 400*percentage_scale , 200*percentage_scale  , 
						 cuadro.width*percentage_scale , cuadro.height*percentage_scale  );
						
		for( i = 0 ; i < numeros.length ; i++ )
			for( j = 0 ; j < numeros[0].length ; j++ )
			{		
				context.fillText( numeros[i][j] , ( pos[j][0]  )*percentage_scale  , ( pos[0][1]   -  (i+1)*60)*percentage_scale ); 
			}

		for( i = 0; i < ESTADO_RESP%4; i++ )
			context.fillText(  (ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1)?(numeros[0][i]+numeros[1][i]):(numeros[1][i]-numeros[0][i])  ,
				( pos[i][0]  )*percentage_scale  , ( pos[i][1] )*percentage_scale ); 
			
		context.fillText( (ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1)?"+":"-", ( pos[0][0] - 100 )*percentage_scale  , ( pos[0][1] )*percentage_scale ); 
		
			CONSOLA_X = pos[ESTADO_RESP%4][0];
			CONSOLA_Y = pos[ESTADO_RESP%4][1];
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
			if( ESTADO_ACTUAL == ESTADO_1 )
				CORRECTO = ( parseInt( CONSOLA ) == (numeros[0][ESTADO_RESP%4]+numeros[1][ESTADO_RESP%4]));
			else
				CORRECTO = ( parseInt( CONSOLA ) == numeros[1][ESTADO_RESP%4]-(numeros[0][ESTADO_RESP%4]));
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	
}
