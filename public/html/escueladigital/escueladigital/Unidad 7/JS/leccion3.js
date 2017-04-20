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
	  pro2 = ["Hay 3 Cajas. En cada caja hay 6 mangos. \xBFCu\xE1ntos mangos hay en total?",
	                "Los frijoles cuestan 6 lempiras la libra., \xBFCu\xE1ntos lempiras necesitos si compro 7 libras?",
					"En cada bus van 6 personas. \xBFCu\xE1ntas personas van en 8 buses?",
					"Hay 4  escritorios con 6 gavetas cada uno. \xBFCu\xE1ntas gavetas hay  en total?"],
	  pro4 = ["Un borrador cuesta 7 lempiras. \xBFCu\xE1ntos lempiras necesito para comprar 4 borradores?",
	                "Un le\xF1o pesa 7 libras y hay 9 le\xF1os. \xBFCu\xE1ntas libras pesan en total?",
					"Hay 6 ni\xF1os y cada ni\xF1o tiene 7 mables. \xBFCu\xE1ntos mables hay en total?",
					"Hay 8 cajas con 7 latas de jalea cada una. \xBFCu\xE1ntas latas de jalea hay en total?"],
	  pro6 = ["A cada persona se le entrega 8 pulgadas de cinta. \xBFCu\xE1ntas pulgadas de cinta necesita para 5 personas?",
	                "Hay 7 bolsas con 8 galletas cada una. \xBFCu\xE1ntas galletas hay en total?",
					"De un papel se hacen 8 tarjetas para la invitaci\xF3n de cumplea\xF1os. \xBFCu\xE1ntas tarjetas se pueden hacer con 9 papeles?",
					"Se forman grupos con 8 ni\xF1os y ni\xF1as cada uno y quieren formar 6 grupos. \xBFCu\xE1ntos ni\xF1os y ni\xF1as se necesitan?"],
	  pro8 = ["Cada caja pesa 9 libras. si hay 6 cajas \xBFCu\xE1ntas libras pesan en total?",
	                "Leo el libro 9 p\xE1ginas cada d\xEDa. \xBFCu\xE1ntas p\xE1ginasl leo en 4 dias?",
					"Quiero comprar 2 juegos de bol\xEDgrafos que vale 9 lempiras cada juego. \xBFCu\xE1ntos lempiras necesito?",
					"Hay 8 ni\xF1os y ni\xF1as. Si se reparten 9 confites a cada uno. \xBFCu\xE1ntos confites se necesitan por todo?"],
	  resp2 = ["6x3","18","6x7","42","6x8","48","6x4","24"],
	  resp4 = ["7x4","28","7x9","63","7x6","42","7x8","56"],
	  resp6 = ["8x5","40","8x7","56","8x9","72","8x6","48"],
	  resp8 = ["9x6","54","9x4","36","9x2","18","9x8","72"];

function MismoProducto( producto1 , producto2 )
{
	return ( producto1 == producto2 || (producto1.charAt(0) == producto2.charAt(2) && producto1.charAt(2) == producto2.charAt(0)) ) && 
	          producto1.length == producto2.length;
}

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_3;
	UNIDAD_ACTUAL = UNIDAD_7;
	
	for( i = 0 ; i < multis.length ; i++ )
	{
		multis[i][0] = 6;
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
					INSTRUCCION = "2) (1/4) Resuelva el  siguientes problema: " + pro2[0];
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
					INSTRUCCION = "4) (1/4) Resuelva el  siguientes problema: " + pro4[0];
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
					INSTRUCCION = "6) (1/4) Resuelva el  siguientes problema: " + pro6[0];
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
					INSTRUCCION = "8) (1/4) Resuelva el  siguientes problema: " + pro8[0];
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_7;
				}
            break;
			
		case ESTADO_2:
				if( ESTADO_RESP >= 8 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) Resuelva los siguientes ejercicios. ";
					for( i = 0 ; i < multis.length ; i++ )
					{
						multis[i][0] = 7;
						multis[i][1] = Math.floor( Math.random()*8 ) + 1;
						multis[i][2] = multis[i][0]*multis[i][1];
					}
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + Math.floor( ESTADO_RESP/2 + 1) + "/4) Resuelva el  siguientes problema: " + pro2[ Math.floor( ESTADO_RESP/2 ) ];
				}
            break;
		
		case ESTADO_4:
				if( ESTADO_RESP >= 8 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_5;
					INSTRUCCION = "5) Resuelva los siguientes ejercicios. ";
					for( i = 0 ; i < multis.length ; i++ )
					{
						multis[i][0] = 8;
						multis[i][1] = Math.floor( Math.random()*8 ) + 1;
						multis[i][2] = multis[i][0]*multis[i][1];
					}
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_4;
					INSTRUCCION = "4) (" + Math.floor( ESTADO_RESP/2 + 1) + "/4) Resuelva el  siguientes problema: " + pro4[ Math.floor( ESTADO_RESP/2 ) ];
				}
            break;
		case ESTADO_6:
				if( ESTADO_RESP >= 8 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_7;
					INSTRUCCION = "7) Resuelva los siguientes ejercicios. ";
					for( i = 0 ; i < multis.length ; i++ )
					{
						multis[i][0] = 9;
						multis[i][1] = Math.floor( Math.random()*8 ) + 1;
						multis[i][2] = multis[i][0]*multis[i][1];
					}
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_6;
					INSTRUCCION = "6) (" + Math.floor( ESTADO_RESP/2 + 1) + "/4) Resuelva el  siguientes problema: " + pro6[ Math.floor( ESTADO_RESP/2 ) ];
				}
            break;
		case ESTADO_8:
				if( ESTADO_RESP >= 8 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_8;
					INSTRUCCION = "8) (" + Math.floor( ESTADO_RESP/2 + 1) + "/4) Resuelva el  siguientes problema: " + pro8[ Math.floor( ESTADO_RESP/2 ) ];
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
