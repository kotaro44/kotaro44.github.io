var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2,
		ESTADO_3 = 3,
		ESTADO_4 = 4,
		ESTADO_5 = 5,
		ESTADO_6 = 6;
		
var pro1 = ["Un metro","Dos metros","Catorce metros","Veinte metros"],
      resp1 = ["1m" , "2m" , "14m" , "20m" ],
	  pos2 = [[690,300],[440,400],[510,500],[530,600]],
	  resp2 = ["7","10","2","8"],
	  resp3 = [3,6,11,14],
	  pos4 = [[320,300],[800,300],[320,400],[800,400],[350,500],[860,500]],
	  resp4 = ["10","100","40","300","5","7"],
	  pro5 = ["1) 2m 15cm","2) 9m 30cm","3) 6m 8cm","4) 472cm","5) 510cm","6) 703cm"],
	  resp5 = [  ["2","1","5","215"], ["9","3","0","930"],["6","0","8","608"], 
	                   ["4","7","2","4","72"], ["5","1","0","5","10"] , ["7","0","3","7","3"] ],
	  pos5 = [ [  [590,450] , [700,450] , [830,450] ,[700,560]  ],
                     [  [590,450] , [700,450] , [830,450] ,[630,560] ,[780,560]  ] ],
	  resp6 = ["m","cm","m","cm","cm","m"],
	  pos6 = [  [670,610] , [900,450] , [590,650] ,[730,400] ,[610,560] , [980,510] ],
	  ESTADO_RESP5 = 0;

var regla1 = getImg("IMG/regla1.png"),
      cuadro = getImg("IMG/cuadro.png"),
	  cuadro1 = getImg("IMG/cuadro1.png"),
	  regla3 = getImg("IMG/regla.png"),
	  tabla = getImg("IMG/tabla.png"),
	  tabla1 = getImg("IMG/tabla1.png"),
	  pro6 = [ getImg("IMG/img1.png") , getImg("IMG/img2.png"), getImg("IMG/img3.png"),
	                 getImg("IMG/img4.png") , getImg("IMG/img5.png"), getImg("IMG/img6.png") ];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_1;
	UNIDAD_ACTUAL = UNIDAD_8;
	
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) Escriba las siguientes longitudes con el n\xFAmero y el s\xEDmbolo.";
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
				if( ESTADO_RESP >= 4 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) Escriba en la casilla el n\xFAmero que corresponde.";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
				}
            break;
		case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 4 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) (1/4) Trace la l\xEDnea de las siguientes longitudes.";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
				}
            break;
		case ESTADO_3:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 4 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_4;
					INSTRUCCION = "4) Escriba en la l\xEDnea el n\xFAmero que corresponde.";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) (" + (ESTADO_RESP+1) + "/4) Trace la l\xEDnea de las siguientes longitudes.";
				}
            break;
		case ESTADO_4:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 6 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_5;
					INSTRUCCION = "5) Represente las siguientes longitudes en la tabla de unidades (m , dm, cm) y escriba en la l\xEDnea el n\xFAmero que corresponde.";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_4;
				}
            break;
		case ESTADO_5:
				ESTADO_RESP5++;
				if( ESTADO_RESP5 >= resp5[ESTADO_RESP].length )
				{
					ESTADO_RESP++;
					ESTADO_RESP5 = 0;
					
					if( ESTADO_RESP >= 6 )
					{
						ESTADO_RESP = 0;
						ESTADO_ACTUAL = ESTADO_6;
				        INSTRUCCION = "6) (" + (ESTADO_RESP+1) + "/6) Escriba en el cuadro la unidad adecuada ( cm o m ).";
					}
					else
						ESTADO_ACTUAL = ESTADO_5;
				}
				else
					ESTADO_ACTUAL = ESTADO_5;
            break;
			case ESTADO_6:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 6 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_6;
					 INSTRUCCION = "6) (" + (ESTADO_RESP+1) + "/6) Escriba en el cuadro la unidad adecuada ( cm o m ).";
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
		for( i = 0 ; i < resp1.length ; i++ )
		{
			if( i < ESTADO_RESP )
			{
				context.font = Math.floor(40*percentage_scale) + "pt CHALK";
				context.fillText( resp1[i],  ( 200 + 250*i )*percentage_scale,
										   500*percentage_scale);
			}
			context.font = Math.floor(25*percentage_scale) + "pt CHALK";
			context.fillText( pro1[i],  ( 170 + 250*i )*percentage_scale,
									   400*percentage_scale);
			DRAW_LINE( 150 + 250*i , 520 , 350 + 250*i  , 520 , 2 , "#000000" );
		}
		
		CONSOLA_X = ( 200 + 250*ESTADO_RESP );
		CONSOLA_Y = 500;
		CONSOLA_SIZE = 40;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();	
	}
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{
		context.font = Math.floor(25*percentage_scale) + "pt CHALK";
		context.fillText( "1) La longitud que es 7 veces 1cm es              cm.", 180*percentage_scale, 300*percentage_scale);
		context.fillText( "2) 1dm equivale a              cm.", 180*percentage_scale, 400*percentage_scale);
		context.fillText( "3) La cinta rosada mide              cm", 180*percentage_scale, 500*percentage_scale);
		context.fillText( "4) La cinta amarilla mide             cm.", 180*percentage_scale, 600*percentage_scale);
		
		context.drawImage( regla1 , 720*percentage_scale,480*percentage_scale,                
							regla1.width*percentage_scale,  regla1.height*percentage_scale); 
	
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
		context.drawImage( regla3 , 250*percentage_scale,400*percentage_scale,                
							regla3.width*percentage_scale,  regla3.height*percentage_scale); 
		DRAW_CIRCLE(282,398,3,"#000000");
		DRAW_LINE(282,398,DestX,DestY,2,"#000000");
		context.font = Math.floor(60*percentage_scale) + "pt CHALK";
		context.fillText( resp3[ESTADO_RESP] + "cm", 500*percentage_scale, 600*percentage_scale);
	}
	
	if( ESTADO_ACTUAL == ESTADO_4 || ESTADO_ANTERIOR == ESTADO_4 )
	{
		context.font = Math.floor(25*percentage_scale) + "pt CHALK";
		context.fillText( "1) 1m =               dm                            2) 1m =               cm", 180*percentage_scale, 300*percentage_scale);
		context.fillText( "3) 4m =               dm                            4) 3m =               cm", 180*percentage_scale, 400*percentage_scale);
		context.fillText( "5) 50dm =               m                            6) 700cm =               m", 180*percentage_scale, 500*percentage_scale);
	
		for( i = 0 ; i < pos4.length ; i++ )
		{
			if( i < ESTADO_RESP )
				context.fillText( resp4[i] , pos4[i][0]*percentage_scale,
									   pos4[i][1]*percentage_scale);
				
			context.drawImage( i==ESTADO_RESP?cuadro1:cuadro, 
					( pos4[i][0] - 15)*percentage_scale,( pos4[i][1] - 44)*percentage_scale,                
							cuadro.width*percentage_scale,  cuadro.height*percentage_scale);   
		}
		
									   
		CONSOLA_X = pos4[  ESTADO_RESP ][0];
		CONSOLA_Y = pos4[  ESTADO_RESP ][1];
		CONSOLA_SIZE = 30;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();		
	}
	
	if( ESTADO_ACTUAL == ESTADO_5 || ESTADO_ANTERIOR == ESTADO_5 )
	{
		context.font = Math.floor(30*percentage_scale) + "pt CHALK";
		context.fillText( pro5[ESTADO_RESP], 180*percentage_scale, 350*percentage_scale);
		context.drawImage( ESTADO_RESP<3?tabla:tabla1 , 550*percentage_scale,300*percentage_scale,                
							tabla.width*percentage_scale,  tabla.height*percentage_scale); 
				
		for( i = 0 ; i < ESTADO_RESP5 ; i++ )
				context.fillText( resp5[ESTADO_RESP][i] , 
				                       pos5[  ESTADO_RESP<3?0:1 ][ i ][0]*percentage_scale,
									   pos5[  ESTADO_RESP<3?0:1 ][ i ][1]*percentage_scale);
		
									   
		CONSOLA_X = pos5[  ESTADO_RESP<3?0:1 ][ ESTADO_RESP5 ][0];
		CONSOLA_Y = pos5[  ESTADO_RESP<3?0:1 ][ ESTADO_RESP5 ][1];
		CONSOLA_SIZE = 30;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();		
	}
	
	if( ESTADO_ACTUAL == ESTADO_6 || ESTADO_ANTERIOR == ESTADO_6 )
	{
		context.drawImage( pro6[ESTADO_RESP], 
					400*percentage_scale,300*percentage_scale,                
							pro6[ESTADO_RESP].width*percentage_scale,  
							pro6[ESTADO_RESP].height*percentage_scale);  
									   
		CONSOLA_X = pos6[  ESTADO_RESP ][0];
		CONSOLA_Y = pos6[  ESTADO_RESP ][1];
		CONSOLA_SIZE = 40;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();		
	}
}

function MOUSE(X,Y)
{
	if( ESTADO_ACTUAL == ESTADO_3 )
	{
		if( Math.abs( DISTANCIA(282,398,X,Y)  - 55*resp3[ESTADO_RESP]) < 10 )
			EJER_CORRECTO(1);
		else
			EJER_INCORRECTO(-1);
	}
}

function INPUT(KEYCODE)
{
	if( ESTADO_ACTUAL != ESTADO_3 )
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
				case ESTADO_4:
						CORRECTO = (CONSOLA == resp4[ESTADO_RESP]);
					break;	
				case ESTADO_5:
						CORRECTO = (CONSOLA == resp5[ESTADO_RESP][ESTADO_RESP5]);
					break;	
				case ESTADO_6:
						CORRECTO = (CONSOLA == resp6[ESTADO_RESP]);
					break;	
			}
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	}
}
