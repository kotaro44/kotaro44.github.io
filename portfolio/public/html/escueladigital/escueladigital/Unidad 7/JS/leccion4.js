var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2,
		ESTADO_3 = 3,
		ESTADO_4 = 4;
		
var multis = [ [0,0,0] , [0,0,0] , [0,0,0] , 
                      [0,0,0] , [0,0,0] , [0,0,0] , 
					  [0,0,0] , [0,0,0] , [0,0,0] ],
      pos1 = [  [350,250] , [350,400] , [350,550] ,
                      [650,250] , [650,400] , [650,550] , 
					  [950,250] , [950,400] , [950,550]  ],
	  pos2 = [ [500,500] , [500,600] ],
	  pro2 = ["En cada bolsa hay una sand\xEDa. Si hay 7 bolsas, \xBFCu\xE1ntas sandias hay en total?",
	                "Hay 8 ni\xF1as y cada ni\xF1a tiene un confite. \xBFCu\xE1ntos confites hay en total?"],
	  pro4 = ["En cada cajita de chicles ya no hay chicles. Si hay 3 cajitas \xBFCu\xE1ntos chicles hay?",
					"Se venden 5 mables en cada blsa. No compr\xE9 bolsas \xBFCu\xE1ntos mables compr\xE9?"],
	  resp2 = ["1x7","7","1x8","8"],
	  resp4 = ["0x3","0","0x5","0"];
	  
function MismoProducto( producto1 , producto2 )
{
	return ( producto1 == producto2 || (producto1.charAt(0) == producto2.charAt(2) && producto1.charAt(2) == producto2.charAt(0)) ) && 
	          producto1.length == producto2.length;
}

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_4;
	UNIDAD_ACTUAL = UNIDAD_7;
	
	for( i = 0 ; i < multis.length ; i++ )
	{
		multis[i][0] = 1;
		multis[i][1] = Math.floor( Math.random()*8 ) + 1;
		multis[i][2] = multis[i][0]*multis[i][1];
	}
	
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) Resuelva los siguientes ejercicios.";
				ESTADO_RESP = 0;
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
				if( ESTADO_RESP >= 9 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (1/2) Resuelva el  siguiente problema: " + pro2[0];
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
				}
            break;
		case ESTADO_3:
				if( ESTADO_RESP >= 9 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_4;
					INSTRUCCION = "4) (1/2) Resuelva el  siguiente problema: " + pro4[0];
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
				}
            break;
		
			
		case ESTADO_2:
				if( ESTADO_RESP >= 4 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) Resuelva los siguientes ejercicios. ";
					for( i = 0 ; i < multis.length ; i++ )
					{
						multis[i][0] = 0;
						multis[i][1] = Math.floor( Math.random()*8 ) + 1;
						multis[i][2] = multis[i][0]*multis[i][1];
					}
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + Math.floor( ESTADO_RESP/2 + 1) + "/2) Resuelva el  siguiente problema: " + pro2[ Math.floor( ESTADO_RESP/2 ) ];
				}
            break;
		
		case ESTADO_4:
				if( ESTADO_RESP >= 4 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_4;
					INSTRUCCION = "4) (" + Math.floor( ESTADO_RESP/2 + 1) + "/2) Resuelva el  siguiente problema: " + pro4[ Math.floor( ESTADO_RESP/2 ) ];
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
	     ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 )
	{
		for( i = 0 ; i < multis.length ; i++ )
		{
			context.fillText( multis[i][0] +  "x" + multis[i][1] + " = " +  (ESTADO_RESP>i?multis[i][2]:"")  , 
			                          (pos1[i][0] -115)*percentage_scale,
									  pos1[i][1]*percentage_scale);
		}
	
		CONSOLA_X = pos1[ESTADO_RESP][0];
		CONSOLA_Y = pos1[ESTADO_RESP][1];
		CONSOLA_SIZE = 30;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();		
	}

	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 ||
	     ESTADO_ACTUAL == ESTADO_4 || ESTADO_ANTERIOR == ESTADO_4 )
	{
		context.fillText( "Problema: " + (ESTADO_RESP%2==1?	
		((ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2)?resp2:
		(ESTADO_ACTUAL == ESTADO_4 || ESTADO_ANTERIOR == ESTADO_4)?resp4:
		(ESTADO_ACTUAL == ESTADO_6 || ESTADO_ANTERIOR == ESTADO_6)?resp6:resp8)[ ESTADO_RESP-1]:""), 
			                          (pos2[0][0] -180)*percentage_scale,
									   pos2[0][1]*percentage_scale);
		context.fillText( "Respuesta: " , 
			                          (pos2[1][0] -180)*percentage_scale,
									   pos2[1][1]*percentage_scale);
									   
		CONSOLA_X = pos2[  ESTADO_RESP%2 ][0];
		CONSOLA_Y = pos2[  ESTADO_RESP%2 ][1];
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
				case ESTADO_3:
						CORRECTO = CONSOLA == multis[ESTADO_RESP][2];
					break;	
				case ESTADO_2:
						CORRECTO = MismoProducto( CONSOLA , resp2[ESTADO_RESP] );
					break;	
				case ESTADO_4:
						CORRECTO = MismoProducto( CONSOLA , resp4[ESTADO_RESP] );
					break;	
			}
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
}
