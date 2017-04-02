var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2,
		ESTADO_3 = 3;
		
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
	  pro2 = [  getImg("IMG/img8.png"), getImg("IMG/img9.png"), getImg("IMG/img10.png") ],
	  cuadro = getImg("IMG/cuadro.png"),
	  cuadro1 = getImg("IMG/cuadro1.png"),
	  resp2 = ["8","2","4" , "15","5","3" , "18","2","9"],
	  pro3 = ["Un pap\xE1 reparti\xF3 18 naranjas entre sus 3 hijos y le dio a cada uno la misma cantidad. \xBFCu\xE1ntas naranjas le dio a cada uno?",
	              "En una caja hay 48 manzanas y hay 8 ni\xF1os. \xBFCu\xE1ntas manzanas le toca a cada ni\xF1o si se reparten equitativamente?"],
	  resp3 = ["18","3","6" ,"48","8","6"];
	  
var pos = [ [300,550] , [500,550] , [700,550] ];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_2;
	UNIDAD_ACTUAL = UNIDAD_9;
	
	for( i = 0 ; i < multis.length ; i++ )
	{
		multis[i][1] = Math.floor( Math.random()*8 ) + 1;
		multis[i][0] =  multis[i][1] * ( Math.floor( Math.random()*8 ) + 1 ) ;
		multis[i][2] = multis[i][0]/multis[i][1];
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
	
    switch(ESTADO_ANTERIOR)
    {
        case ESTADO_1:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 25 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (1/3) Reparta en partes iguales.";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
				}
            break;
		case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 9 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) (1/2) Resuelva el siguiente problema: " + pro3[0];
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/3)+1) + "/3) Reparta en partes iguales.";
				}
            break;
		case ESTADO_3:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 6 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
					TEMP = Math.floor( ESTADO_RESP/3 ) ;
					INSTRUCCION = "3) (" + (TEMP+1) + "/2) Resuelva el siguiente problema: " + pro3[TEMP];
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
			context.fillText( multis[i][0] +  "\xF7" + multis[i][1] + " = " +  (ESTADO_RESP>i?multis[i][2]:"")  , 
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
	    TEMP = Math.floor(ESTADO_RESP/3);
		TEMP1 = ESTADO_RESP%3;
		
		for( i = 0 ; i < pos.length ; i++ )
		{
			if( i < ESTADO_RESP%3 )
			{
				context.font = Math.floor(35*percentage_scale) + "pt CHALK";
				context.fillText( resp2[  TEMP*3 + i], 
						 pos[i][0] *percentage_scale, pos[i][1]*percentage_scale);
			}
			context.drawImage( i==TEMP1?cuadro1:cuadro, 
					( pos[i][0] - 15)*percentage_scale,( pos[i][1] - 44)*percentage_scale,                
							cuadro.width*percentage_scale,  cuadro.height*percentage_scale);   
		}
		

		context.drawImage( pro2[TEMP], 400*percentage_scale, 200*percentage_scale,                
							pro2[TEMP].width*percentage_scale,  pro2[TEMP].height*percentage_scale);  
		context.fillText( "\xF7", 
						( pos[0][0] + 110)*percentage_scale, pos[0][1]*percentage_scale);
		context.fillText( "=", 
						( pos[1][0] + 110)*percentage_scale, pos[0][1]*percentage_scale);
						
		CONSOLA_X = pos[TEMP1][0];
		CONSOLA_Y = pos[TEMP1][1];
		CONSOLA_SIZE = 35;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();	
	}
	
	if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 )
	{
	    TEMP = Math.floor(ESTADO_RESP/3);
		TEMP1 = ESTADO_RESP%3;
		
		for( i = 0 ; i < pos.length ; i++ )
		{
			if( i < ESTADO_RESP%3 )
			{
				context.font = Math.floor(35*percentage_scale) + "pt CHALK";
				context.fillText( resp3[  TEMP*3 + i], 
						 pos[i][0] *percentage_scale, pos[i][1]*percentage_scale);
			}
			context.drawImage( i==TEMP1?cuadro1:cuadro, 
					( pos[i][0] - 15)*percentage_scale,( pos[i][1] - 44)*percentage_scale,                
							cuadro.width*percentage_scale,  cuadro.height*percentage_scale);   
		}
		
		context.fillText( "\xF7", 
						( pos[0][0] + 110)*percentage_scale, pos[0][1]*percentage_scale);
		context.fillText( "=", 
						( pos[1][0] + 110)*percentage_scale, pos[0][1]*percentage_scale);
						
		CONSOLA_X = pos[TEMP1][0];
		CONSOLA_Y = pos[TEMP1][1];
		CONSOLA_SIZE = 35;
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
						CORRECTO = (CONSOLA == resp2[ESTADO_RESP]);
					break;	
				case ESTADO_3:
						CORRECTO = (CONSOLA == resp3[ESTADO_RESP]);
					break;	
			}
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
}
