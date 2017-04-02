var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2,
		ESTADO_3 = 3,
		ESTADO_4 = 4,
		ESTADO_5 = 5;
		
var multis = [ [0,0,0] , [0,0,0] , [0,0,0] , [0,0,0] , [0,0,0] , 
                      [0,0,0] , [0,0,0] , [0,0,0] , [0,0,0] , [0,0,0] , 
					  [0,0,0] , [0,0,0] , [0,0,0] , [0,0,0] , [0,0,0] , 
					  [0,0,0] , [0,0,0] , [0,0,0] , [0,0,0] , [0,0,0] , 
					  [0,0,0] , [0,0,0] , [0,0,0] , [0,0,0] , [0,0,0]  ],
      pos1 = [  [250,200] , [250,300] , [250,400] , [250,500] , [250,600] ,
                      [500,200] , [500,300] , [500,400] , [500,500] , [500,600] ,
					  [750,200] , [750,300] , [750,400] , [750,500] , [750,600] ,
					  [1000,200] , [1000,300] , [1000,400] , [1000,500] , [1000,600]  ,
                      [1250,200] , [1250,300] , [1250,400] , [1250,500] , [1250,600]  ],
	  pos2 =[ [340,250] , [470,350] , [340,450] , [470,450] , [320,550] ,
                      [530,550] , [720,550]  ],
	  resp2 = ["8","4","3","9","8","4","2"],
	  img3=getImg("IMG/banana.png"),
	  resp3 = ["4x6","24"],
	  pos3 = [ [500,500] , [500,600] ],
	  pro4 = ["En cada bolsa hay 6 confites. Si hay 7 bolsas, \xBFCu\xE1ntos confites hay en total?",
	               "Tengo en las manos 2 diccionarios que pesan 4 libras cada uno. \xBFCu\xE1ntas libras pesan en total?",
				   "Si en cada mesa hay 8 invitados, \xBFCu\xE1ntos invitados hay en 3 mesas?",
				   "A 5 hermanos les regalaron 7 mables a cada uno. \xBFCu\xE1ntos mables les regalaron por todo?"],
	  resp4 = ["6x7","42","2x4","8","8x3","24","5x7","35"],
	  cuadro = getImg("IMG/cuadro.png"),cuadro1 = getImg("IMG/cuadro1.png");
	  
function MismoProducto( producto1 , producto2 )
{
	return ( producto1 == producto2 || (producto1.charAt(0) == producto2.charAt(2) && producto1.charAt(2) == producto2.charAt(0)) ) && 
	          producto1.length == producto2.length;
}

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = EJERCICIOS_4;
	UNIDAD_ACTUAL = UNIDAD_7;
	
	for( i = 0 ; i < multis.length ; i++ )
	{
		multis[i][0] =  Math.floor( Math.random()*8 ) + 1;
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
				if( ESTADO_RESP >= 25 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) Escriba en los cuadros el n\xFAmero que corresponde. ";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
				}
            break;
			
		case ESTADO_2:
				if( ESTADO_RESP >= 7 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) Encuentre cu\xE1ntos bananos hay.";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
				}
            break;
		
	    case ESTADO_3:
				if( ESTADO_RESP >= 2 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_4;
					INSTRUCCION = "4) (" + Math.floor( ESTADO_RESP/2 + 1) + "/4) Resuelva el  siguiente problema: " + pro4[ Math.floor( ESTADO_RESP/2 ) ];
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
				}
            break;
			
		case ESTADO_4:
				if( ESTADO_RESP >= 8 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_4;
					INSTRUCCION = "4) (" + Math.floor( ESTADO_RESP/2 + 1) + "/4) Resuelva el  siguiente problema: " + pro4[ Math.floor( ESTADO_RESP/2 ) ];
				}
            break;
    }
}


function DRAW(context)
{
	INSTRUCCION_COLOR = "#000000";
	DRAW_INSTRUCTION();
	context.font = Math.floor(30*percentage_scale) + "pt CHALK";
	
	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 )
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
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{
	
		context.fillText( "1) 8x6 es            m\xE1s que 8x5.", 165*percentage_scale, 250*percentage_scale);
		context.fillText( "2) En la tabla del             los productos aumentan de 4 en 4.", 165*percentage_scale, 350*percentage_scale);
		context.fillText( "3) 9x3 =            x            ", 165*percentage_scale, 450*percentage_scale);
		context.fillText( "4) 1x8,             x1, 2x            , 4x             dan el mismo producto 8.", 165*percentage_scale, 550*percentage_scale);
	
		for( i = 0 ; i < pos2.length ; i++ )
		{
			if( i < ESTADO_RESP )
				context.fillText( resp2[i] , pos2[i][0]*percentage_scale,
									   pos2[i][1]*percentage_scale);
				
			context.drawImage( i==ESTADO_RESP?cuadro1:cuadro, 
					( pos2[i][0] - 15)*percentage_scale,( pos2[i][1] - 44)*percentage_scale,                
							cuadro.width*percentage_scale,  cuadro.height*percentage_scale);   
		}
		
									   
		CONSOLA_X = pos2[  ESTADO_RESP ][0];
		CONSOLA_Y = pos2[  ESTADO_RESP ][1];
		CONSOLA_SIZE = 30;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();		
	}
	
	if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 )
	{
		context.drawImage( img3 , 
					200*percentage_scale,250*percentage_scale,                
							img3.width*percentage_scale,  img3.height*percentage_scale);   
							
		context.fillText( "Problema: " + (ESTADO_RESP==1?resp3[ 0]:""), 
			                          (pos3[0][0] -180)*percentage_scale,
									   pos3[0][1]*percentage_scale);
									   
		context.fillText( "Respuesta: " , 
			                          (pos3[1][0] -180)*percentage_scale,
									   pos3[1][1]*percentage_scale);
									   
		CONSOLA_X = pos3[  ESTADO_RESP%2 ][0];
		CONSOLA_Y = pos3[  ESTADO_RESP%2 ][1];
		CONSOLA_SIZE = 30;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();		
	}
	
	if( ESTADO_ACTUAL == ESTADO_4 || ESTADO_ANTERIOR == ESTADO_4 )
	{
		context.fillText( "Problema: " + (ESTADO_RESP%2==1?resp4[ ESTADO_RESP-1]:""), 
			                          (pos3[0][0] -180)*percentage_scale,
									   pos3[0][1]*percentage_scale);
		context.fillText( "Respuesta: " , 
			                          (pos3[1][0] -180)*percentage_scale,
									   pos3[1][1]*percentage_scale);
									   
		CONSOLA_X = pos3[  ESTADO_RESP%2 ][0];
		CONSOLA_Y = pos3[  ESTADO_RESP%2 ][1];
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
						CORRECTO = CONSOLA == multis[ESTADO_RESP][2];
					break;	
				case ESTADO_2:
						CORRECTO = CONSOLA ,resp2[ESTADO_RESP];
					break;	
				case ESTADO_3:
						CORRECTO = MismoProducto( CONSOLA , resp3[ESTADO_RESP] );
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
