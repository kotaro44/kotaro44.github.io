var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2,
		ESTADO_3 = 3,
		ESTADO_4 = 4,
		ESTADO_5 = 5,
		ESTADO_6 = 6,
	    ESTADO_7 = 7,
		ESTADO_8 = 8;
		
var multis = [ [0,0,0] , [0,0,0] , [0,0,0] , 
                      [0,0,0] , [0,0,0] , [0,0,0] , 
					  [0,0,0] , [0,0,0] , [0,0,0] ],
      pos1 = [  [350,250] , [350,400] , [350,550] ,
                      [650,250] , [650,400] , [650,550] , 
					  [950,250] , [950,400] , [950,550]  ],
	  pos2 = [ [500,500] , [500,600] ],
	  pro2 = ["Cada llavero tiene 2 llaves. Si hay 6 llaveros, \xBFCu\xE1ntas llaves hay en total?",
	                "Cada ni\xF1o tiene 2 confites. Si hay 8 ni\xF1os, \xBFCu\xE1ntos confites hay en total?",
					"Hay 2 paletas en cada caja. Mar\xEDa compr\xF3 1 caja. \xBFCu\xE1ntos pasteles tiene Mar\xEDa?"],
	  pro4 = ["En cada bolsa hay 5 naranjas y hay 6 bolsas. \xBFCu\xE1ntas naranjas hay por todo?",
	                "Hay 9 maestros. Cada maestro tiene 5 cuadernos. \xBFCu\xE1ntos cuadernos hay por todo?",
					"Hay 6 flores con 5 p\xE9talos. \xBFCu\xE1ntos p\xE9talos tiene Mar\xEDa?"],
	  pro6 = ["Hay 3 galletas en cada bolsa. Si hay 5 bolsas. \xBFCu\xE1ntas galletas hay por todo?",
	                "Hay 7 bancas. En cada banca hay 3 ni\xF1os. \xBFCu\xE1ntos ni\xF1os hay en total?",
					"Cada ni\xF1o tiene 3 centavos. si hay 2 ni\xF1os. \xBFCu\xE1ntos centavos tienen por todo?"],
	  pro8 = ["Hay 2 gatos. Cada gato tiene 4 patas. \xBFCu\xE1ntas patas hay en total?",
	                "En cada caja hay 4 camisetas. Si hay 5 cajas, \xBFCu\xE1ntas camisetas hay por todo?",
					"Compro 8 borradores que valen 4 lempiras cada uno. \xBFCu\xE1ntos lempiras cuestan en total?"],
	  resp2 = ["2x6","12","2x8","16","2x1","2"],
	  resp4 = ["5x6","30","5x9","45","5x6","30"],
	  resp6 = ["3x5","15","3x7","21","3x2","6"],
	  resp8 = ["4x2","8","4x5","20","4x8","32"];
	  
function MismoProducto( producto1 , producto2 )
{
	return ( producto1 == producto2 || (producto1.charAt(0) == producto2.charAt(2) && producto1.charAt(2) == producto2.charAt(0)) ) && 
	          producto1.length == producto2.length;
}

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_2;
	UNIDAD_ACTUAL = UNIDAD_7;
	
	for( i = 0 ; i < multis.length ; i++ )
	{
		multis[i][0] = 2;
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
					INSTRUCCION = "2) (1/3) Resuelva el  siguientes problema: " + pro2[0];
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
					INSTRUCCION = "4) (1/3) Resuelva el  siguientes problema: " + pro4[0];
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
				}
            break;
		case ESTADO_5:
				if( ESTADO_RESP >= 9 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_6;
					INSTRUCCION = "6) (1/3) Resuelva el  siguientes problema: " + pro6[0];
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_5;
				}
            break;
		case ESTADO_7:
				if( ESTADO_RESP >= 9 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_8;
					INSTRUCCION = "8) (1/3) Resuelva el  siguientes problema: " + pro8[0];
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_7;
				}
            break;
			
		case ESTADO_2:
				if( ESTADO_RESP >= 6 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) Resuelva los siguientes ejercicios. ";
					for( i = 0 ; i < multis.length ; i++ )
					{
						multis[i][0] = 5;
						multis[i][1] = Math.floor( Math.random()*8 ) + 1;
						multis[i][2] = multis[i][0]*multis[i][1];
					}
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + Math.floor( ESTADO_RESP/2 + 1) + "/3) Resuelva el  siguientes problema: " + pro2[ Math.floor( ESTADO_RESP/2 ) ];
				}
            break;
		
		case ESTADO_4:
				if( ESTADO_RESP >= 6 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_5;
					INSTRUCCION = "5) Resuelva los siguientes ejercicios. ";
					for( i = 0 ; i < multis.length ; i++ )
					{
						multis[i][0] = 3;
						multis[i][1] = Math.floor( Math.random()*8 ) + 1;
						multis[i][2] = multis[i][0]*multis[i][1];
					}
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_4;
					INSTRUCCION = "4) (" + Math.floor( ESTADO_RESP/2 + 1) + "/3) Resuelva el  siguientes problema: " + pro4[ Math.floor( ESTADO_RESP/2 ) ];
				}
            break;
		case ESTADO_6:
				if( ESTADO_RESP >= 6 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_7;
					INSTRUCCION = "7) Resuelva los siguientes ejercicios. ";
					for( i = 0 ; i < multis.length ; i++ )
					{
						multis[i][0] = 4;
						multis[i][1] = Math.floor( Math.random()*8 ) + 1;
						multis[i][2] = multis[i][0]*multis[i][1];
					}
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_6;
					INSTRUCCION = "6) (" + Math.floor( ESTADO_RESP/2 + 1) + "/3) Resuelva el  siguientes problema: " + pro6[ Math.floor( ESTADO_RESP/2 ) ];
				}
            break;
		case ESTADO_8:
				if( ESTADO_RESP >= 6 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_8;
					INSTRUCCION = "8) (" + Math.floor( ESTADO_RESP/2 + 1) + "/3) Resuelva el  siguientes problema: " + pro8[ Math.floor( ESTADO_RESP/2 ) ];
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
	     ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 ||
		 ESTADO_ACTUAL == ESTADO_5 || ESTADO_ANTERIOR == ESTADO_5 ||
		 ESTADO_ACTUAL == ESTADO_7 || ESTADO_ANTERIOR == ESTADO_7)
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
	     ESTADO_ACTUAL == ESTADO_4 || ESTADO_ANTERIOR == ESTADO_4 ||
	     ESTADO_ACTUAL == ESTADO_6 || ESTADO_ANTERIOR == ESTADO_6 ||
		 ESTADO_ACTUAL == ESTADO_8 || ESTADO_ANTERIOR == ESTADO_8)
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
				case ESTADO_5:
				case ESTADO_7:
						CORRECTO = CONSOLA == multis[ESTADO_RESP][2];
					break;	
				case ESTADO_2:
						CORRECTO = MismoProducto( CONSOLA , resp2[ESTADO_RESP] );
					break;	
				case ESTADO_4:
						CORRECTO = MismoProducto( CONSOLA , resp4[ESTADO_RESP] );
					break;	
				case ESTADO_6:
						CORRECTO = MismoProducto( CONSOLA , resp6[ESTADO_RESP] );
					break;	
				case ESTADO_8:
						CORRECTO = MismoProducto( CONSOLA , resp8[ESTADO_RESP] );
					break;	
			}
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
}
