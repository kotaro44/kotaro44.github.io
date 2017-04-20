//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2;
        
		
//OBJETOS DIBUJABLES
var imagenes = [getImg("IMG/img1.png"), getImg("IMG/img2.png"), getImg("IMG/img3.png"), getImg("IMG/img4.png"), getImg("IMG/img5.png"),getImg("IMG/img6.png") ],
      resp1 = ["5","5","6","6"],
	  resp2 = ["curvas","quebradas","mixtas","rectas"],
	  pos = [ [200,500] , [200, 600] , [200,600] ];
			 
var mundo = [];
   

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_2;
	UNIDAD_ACTUAL = UNIDAD_6;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) (1/2) \xBFCu\xE1ntos puntos y cu\xE1ntos segmentos necesitan la siguiente figura?";
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
					INSTRUCCION = "2) (" + (ESTADO_RESP+1) + "/4) \xBFEscriba el nombre de las l\xEDneas pintadas en color azul?";
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (Math.floor(ESTADO_RESP/2)+1) + "/2) \xBFCu\xE1ntos puntos y cu\xE1ntos segmentos necesitan la siguiente figura?";
					
				}
            break;
		case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 4 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + (ESTADO_RESP+1) + "/4) \xBFEscriba el nombre de las l\xEDneas pintadas en color azul?";
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
		context.drawImage( imagenes[Math.floor(ESTADO_RESP/2)] , 500*percentage_scale , 250*percentage_scale ,
			 imagenes[Math.floor(ESTADO_RESP/2)].width*percentage_scale , imagenes[Math.floor(ESTADO_RESP/2)].height*percentage_scale );
			
	    CONSOLA_X = pos[ ESTADO_RESP%2 ][0];
		CONSOLA_Y = pos[ ESTADO_RESP%2 ][1];
		
		context.fillText( ESTADO_RESP%2==1?"( " + resp1[ ESTADO_RESP - 1] : "( ", (pos[0][0] - 40)*percentage_scale , pos[0][1]*percentage_scale  );
		context.fillText( ") puntos" , (pos[0][0] + 60)*percentage_scale , pos[0][1]*percentage_scale  );
		context.fillText( "( " , (pos[1][0] - 40)*percentage_scale , pos[1][1]*percentage_scale  );
		context.fillText( ") puntos" , (pos[1][0] + 60)*percentage_scale , pos[1][1]*percentage_scale  );
	
		DRAW_CONSOLA();		
	}
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{
		context.drawImage( imagenes[ ESTADO_RESP + 2 ] , 500*percentage_scale , 250*percentage_scale ,
			 imagenes[ ESTADO_RESP + 2 ] .width*percentage_scale , imagenes[ ESTADO_RESP + 2 ] .height*percentage_scale );
			
	    CONSOLA_X = 400;
		CONSOLA_Y = 600;
		
		context.fillText( "L\xEDneas " , (CONSOLA_X - 120)*percentage_scale , pos[1][1]*percentage_scale  );
	
		DRAW_CONSOLA();		
	}
	

	
}

function MOUSE(X,Y)
{

}

function INPUT(KEYCODE)
{
	if( true )
	{
		if( CONSOLA_KEYDOWN(KEYCODE) )
		{
			
			CORRECTO = false;
			switch(ESTADO_ACTUAL)
			{
				case ESTADO_1:
							CORRECTO =  (CONSOLA == resp1[ESTADO_RESP]);
					break;	
				case ESTADO_2:
							CORRECTO =  (CONSOLA == resp2[ESTADO_RESP]);
					break;	
			}
			
			if( CORRECTO )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	}
}
