var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2,
		ESTADO_3 = 3,
		ESTADO_4 = 4,
		ESTADO_5 = 5;
		
var cuadro = getImg("IMG/cuadro.png"),
	  cuadro1 = getImg("IMG/cuadro1.png"),
	  regla2 = getImg("IMG/regla.png"),
	  pro3 = [ getImg("IMG/img7.png") , getImg("IMG/img8.png"), getImg("IMG/img9.png") ];
		
var pos1 = [ [350,300],[940,300],[1080,300],[300,400],[970,400],[320,500],[920,500],[300,600],[920,600] ],
      resp1 = ["3","2","63","400","123","20","5","30","7"],
	  resp2 = [8,13,4],
	  resp3 = ["cm","m","cm"],
	  pos3 = [  [730,570] , [800,490] , [960,460]  ],
	  pos4 = [ [560,300],[710,300],
	                 [540,400],[690,400],
					 [560,500],[710,500],
					 [520,600],[670,600]],
      resp4 = ["59","56","65","43","34","42","36","13"];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = EJERCICIOS_1;
	UNIDAD_ACTUAL = UNIDAD_8;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) Escriba en el cuadro el n\xFAmero que corresponde.";
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
				if( ESTADO_RESP >= 9 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (1/3) Trace la l\xEDnea de las siguientes longitudes.";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
				}
            break;
		case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 3 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) ("+(ESTADO_RESP+1)+"/3) Escriba en el cuadro la unidad adecuada ( m o cm ).";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) ("+(ESTADO_RESP+1)+"/3) Trace la l\xEDnea de las siguientes longitudes.";
				}
            break;
		case ESTADO_3:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 3 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_4;
					INSTRUCCION = "4) Haga los siguientes c\xE1lculos.";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) ("+(ESTADO_RESP+1)+"/3) Escriba en el cuadro la unidad adecuada ( m o cm ).";
				}
            break;
		case ESTADO_4:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 8 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_4;
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
		context.font = Math.floor(25*percentage_scale) + "pt CHALK";
		context.fillText( "1) 300cm =              m                                     2) 263cm =              m              cm", 180*percentage_scale, 300*percentage_scale);
		context.fillText( "3) 4m =              cm                                         4) 1m 23cm =              cm ", 180*percentage_scale, 400*percentage_scale);
		context.fillText( "5) 2dm =              cm                                       6) 50cm =              dm", 180*percentage_scale, 500*percentage_scale);
		context.fillText( "7) 3m =              dm                                         8) 70dm =              m", 180*percentage_scale, 600*percentage_scale);
	
		for( i = 0 ; i < pos1.length ; i++ )
		{
			if( i < ESTADO_RESP )
				context.fillText( resp1[i] , pos1[i][0]*percentage_scale,
									   pos1[i][1]*percentage_scale);
				
			context.drawImage( i==ESTADO_RESP?cuadro1:cuadro, 
					( pos1[i][0] - 15)*percentage_scale,( pos1[i][1] - 44)*percentage_scale,                
							cuadro.width*percentage_scale,  cuadro.height*percentage_scale);   
		}
		
									   
		CONSOLA_X = pos1[  ESTADO_RESP ][0];
		CONSOLA_Y = pos1[  ESTADO_RESP ][1];
		CONSOLA_SIZE = 30;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();		
	}
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{
		context.drawImage( regla2 , 250*percentage_scale,400*percentage_scale,                
							regla2.width*percentage_scale,  regla2.height*percentage_scale); 
		DRAW_CIRCLE(282,398,3,"#000000");
		DRAW_LINE(282,398,DestX,DestY,2,"#000000");
		context.font = Math.floor(60*percentage_scale) + "pt CHALK";
		context.fillText( resp2[ESTADO_RESP] + "cm", 500*percentage_scale, 600*percentage_scale);
	}
	
	if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 )
	{
		context.drawImage( pro3[ESTADO_RESP], 
					400*percentage_scale,300*percentage_scale,                
							pro3[ESTADO_RESP].width*percentage_scale,  
							pro3[ESTADO_RESP].height*percentage_scale);  
									   
		CONSOLA_X = pos3[  ESTADO_RESP ][0];
		CONSOLA_Y = pos3[  ESTADO_RESP ][1];
		CONSOLA_SIZE = 40;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();		
	}
	
	if( ESTADO_ACTUAL == ESTADO_4 || ESTADO_ANTERIOR == ESTADO_4 )
	{
		context.font = Math.floor(25*percentage_scale) + "pt CHALK";
		context.fillText( "1) 48m 35cm + 11m 21cm =              m              cm", 180*percentage_scale, 300*percentage_scale);
		context.fillText( "2) 56m 37cm + 9m 6cm =              m              cm", 180*percentage_scale, 400*percentage_scale);
		context.fillText( "3) 58m 65cm - 24m 23cm =              m              cm", 180*percentage_scale, 500*percentage_scale);
		context.fillText( "4) 43m 21cm - 7m 8cm =              m              cm", 180*percentage_scale, 600*percentage_scale);
	
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
	
}

function MOUSE(X,Y)
{
	if( ESTADO_ACTUAL == ESTADO_2 )
	{
		if( Math.abs( DISTANCIA(282,398,X,Y)  - 55*resp2[ESTADO_RESP]) < 10 )
			EJER_CORRECTO(1);
		else
			EJER_INCORRECTO(-1);
	}
}

function INPUT(KEYCODE)
{
	if( ESTADO_ACTUAL != ESTADO_2 )
	{
		if( CONSOLA_KEYDOWN(KEYCODE) )
		{
			CORRECTO = false;
			switch(ESTADO_ACTUAL)
			{
				case ESTADO_1:
						CORRECTO = (CONSOLA == resp1[ESTADO_RESP]);
					break;	
				case ESTADO_3:
						CORRECTO = (CONSOLA == resp3[ESTADO_RESP]);
					break;	
				case ESTADO_4:
						CORRECTO = (CONSOLA == resp4[ESTADO_RESP]);
					break;	
			}
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	}
}
