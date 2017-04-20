var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2,
		ESTADO_3 = 3;
		
function MismoProducto( producto1 , producto2 )
{
	return ( producto1 == producto2 || (producto1.charAt(0) == producto2.charAt(2) && producto1.charAt(2) == producto2.charAt(0)) ) && 
	          producto1.length == producto2.length;
}
		
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
	  pro3 = ["Una bolsa tiene 4 tortillas. Si compro 6 bolsas, \xBFCu\xE1ntas tortillas tendr\xE9 en total?",
	               "Una galleta cuesta 2 lempiras. Quiero comprar 7 galletas. \xBFCu\xE1ntos lempiras necesito?",
				   "Estan pasando 5 camiones. En cada cami\xF3n van 3 barriles de agua. \xBFCu\xE1ntos barriles de agua van por todo?",
				   "Hay 8 bancas que caben 5 personas en cada una. \xBFCu\xE1ntas personas pueden sentarse en total?"],
	  pos3 = [ [500,500] , [500,600] ],
	  resp2 = ["3x3","9","5x3","15","6x3","18"],
	  resp3 = ["4x6","24","2x7","14","5x3","15","8x5","40"],
	  img2 = [ getImg("IMG/robots.png") , getImg("IMG/pollitos.png") , getImg("IMG/uvas.png") ];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = EJERCICIOS_1;
	UNIDAD_ACTUAL = UNIDAD_7;
	
	for( i = 0 ; i < multis.length ; i++ )
	{
		multis[i][0] =  Math.random()<0.5? (Math.random()<0.5?5:3) : (Math.random()<0.5?2:4)  ;
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
					INSTRUCCION = "2) (" + Math.floor( ESTADO_RESP/2 + 1) + "/3) Resuelva cu\xE1ntas cosas hay en cada caso. ";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
				}
            break;
			
		case ESTADO_2:
				if( ESTADO_RESP >= 6 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) (" + Math.floor( ESTADO_RESP/2 + 1) + "/4) Resuelva el  siguientes problema: " + pro3[ Math.floor( ESTADO_RESP/2 ) ];
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + Math.floor( ESTADO_RESP/2 + 1) + "/3) Resuelva cu\xE1ntas cosas hay en cada caso. ";
				}
            break;
		
	    case ESTADO_3:
				if( ESTADO_RESP >= 8 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) (" + Math.floor( ESTADO_RESP/2 + 1) + "/4) Resuelva el  siguientes problema: " + pro3[ Math.floor( ESTADO_RESP/2 ) ];
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
		context.drawImage( img2[Math.floor(ESTADO_RESP/2)] ,400*percentage_scale,200*percentage_scale,                
                img2[Math.floor(ESTADO_RESP/2)].width*percentage_scale,                                            
                img2[Math.floor(ESTADO_RESP/2)].height*percentage_scale);   
	
		context.fillText( "Problema: " + (ESTADO_RESP%2==1?resp2[ ESTADO_RESP-1]:""), 
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
	
	if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 )
	{
		context.fillText( "Problema: " + (ESTADO_RESP%2==1?resp3[ ESTADO_RESP-1]:""), 
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
						CORRECTO = MismoProducto( CONSOLA , resp2[ESTADO_RESP] );
					break;	
				case ESTADO_3:
						CORRECTO = MismoProducto( CONSOLA , resp3[ESTADO_RESP] );
					break;	
			}
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
}
