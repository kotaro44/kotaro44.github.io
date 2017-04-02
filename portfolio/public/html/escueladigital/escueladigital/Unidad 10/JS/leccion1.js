var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2,
		ESTADO_3 = 3;
		
var imagenes = [  getImg("IMG/cu0.png") ,  getImg("IMG/es0.png") ,  getImg("IMG/sr0.png") ,
                              getImg("IMG/cu1.png") ,  getImg("IMG/es1.png") ,  getImg("IMG/sr1.png")  ],
	 imagenes2 = [  getImg("IMG/tc0.png") ,  getImg("IMG/tp0.png") ,
                              getImg("IMG/tc1.png") ,  getImg("IMG/tp1.png")  ],
	  figuras = [  getImg("IMG/f0.png") ,  getImg("IMG/f1.png") ,  getImg("IMG/f2.png") ,
                              getImg("IMG/f3.png") ,  getImg("IMG/f4.png") ,  getImg("IMG/f5.png")  ],
	  figuras2 = [  getImg("IMG/f6.png") ,  getImg("IMG/f7.png") ,  getImg("IMG/f8.png") ,
                              getImg("IMG/f9.png") ,  getImg("IMG/f10.png") ,  getImg("IMG/f11.png")  ],
		selected = -1,
		pos = [ [250,500] , [650,500] , [450,600] ],
		pos2 = [ [440,500] , [350,580] ],
		resp = [1,0,2,1,0,2],
		resp2 = [1,0,1,0,0,1];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_1;
	UNIDAD_ACTUAL = UNIDAD_10;
	
	
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) (1/6) Seleccione el Nombre de cada s\xF3lido ge\xF3metrico.";
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
				if( ESTADO_RESP >= 6 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2)  Escriba en el espacio en blanco, cubo o esfera.";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (ESTADO_RESP+1) + "/6) Seleccione el Nombre de cada s\xF3lido ge\xF3metrico.";
				}
            break;
		case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 2 )
				{
					ESTADO_ACTUAL = ESTADO_3;        
					INSTRUCCION = "3) (1/6) Seleccione el tipo de superficie correspondiente de cada s\xF3lido ge\xF3metrico.";
					ESTADO_RESP = 0;
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2)  Escriba en el espacio en blanco, cubo o esfera.";
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
					INSTRUCCION = "3) (" + (ESTADO_RESP+1) + "/6) Seleccione el tipo de superficie correspondiente de cada s\xF3lido ge\xF3metrico.";
				}
            break;
		
    }
}


function DRAW(context)
{
	DRAW_INSTRUCTION();
	
	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 )
	{
	
		selected = -1;
			for( i = 0; i < pos.length ; i++ )
			{
				if( DestX >= pos[i][0] && DestX <= (pos[i][0] + imagenes[i].width) &&
					DestY >= pos[i][1] && DestY <= (pos[i][1] + imagenes[i].height) )
					{
						selected = i;
					}
			}
						
		for( i = 0; i < pos.length ; i++ )
			context.drawImage( imagenes[i + (i==selected?3:0)] , pos[i][0]*percentage_scale , pos[i][1]*percentage_scale  , 
						imagenes[i] .width*percentage_scale , imagenes[i] .height*percentage_scale  );
						
		context.drawImage( figuras[ESTADO_RESP], 500*percentage_scale , 200*percentage_scale  , 
						figuras[ESTADO_RESP] .width*percentage_scale , figuras[ESTADO_RESP].height*percentage_scale  );

	}
	
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{
		context.font = Math.floor(30*percentage_scale) + "pt CHALK";
		context.fillText("Mi superficie es curva. Mi nombre es (   " + (ESTADO_RESP==1?"esfera":"               ")  + "   )",200,250);
		context.fillText("Todas mis superficies son planas. Mi compa\xF1ero es ",200,350);
		context.fillText("S\xF3lido Rectangular. Mi nombre es (                          )",200,450);
		
		if( ESTADO_RESP == 0 )
		{
			CONSOLA_X = 880;
			CONSOLA_Y = 280;
		}
		else
		{
			CONSOLA_X = 880;
			CONSOLA_Y = 510;
		}
		DRAW_CONSOLA();
	}
	
	if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 )
	{
	
		selected = -1;
			for( i = 0; i < pos2.length ; i++ )
			{
				if( DestX >= pos2[i][0] && DestX <= (pos2[i][0] + imagenes2[i].width) &&
					DestY >= pos2[i][1] && DestY <= (pos2[i][1] + imagenes2[i].height) )
					{
						selected = i;
					}
			}
						
		for( i = 0; i < pos2.length ; i++ )
			context.drawImage( imagenes2[i + (i==selected?2:0)] , pos2[i][0]*percentage_scale , pos2[i][1]*percentage_scale  , 
						imagenes2[i] .width*percentage_scale , imagenes2[i] .height*percentage_scale  );
						
		context.drawImage( figuras2[ESTADO_RESP], 500*percentage_scale , 300*percentage_scale  , 
						figuras2[ESTADO_RESP] .width*percentage_scale , figuras2[ESTADO_RESP].height*percentage_scale  );

	}
	
}

function MOUSE(X,Y)
{
	
	if( ESTADO_ACTUAL == ESTADO_1 && selected != -1 )
	{
		CORRECTO = (selected == resp[ESTADO_RESP]);

		if( CORRECTO  )
				EJER_CORRECTO(1);
			else
				EJER_INCORRECTO(-1);
	}
		
		
	if( ESTADO_ACTUAL == ESTADO_3 && selected != -1 )
	{
		CORRECTO = (selected == resp2[ESTADO_RESP]);

		if( CORRECTO  )
				EJER_CORRECTO(1);
			else
				EJER_INCORRECTO(-1);
	}
}

function INPUT(KEYCODE)
{

	if( ESTADO_ACTUAL != ESTADO_2 )
		return;
		
		if( CONSOLA_KEYDOWN(KEYCODE) )
		{
			CORRECTO = false;
			if( ESTADO_RESP == 0 )
				CORRECTO = (CONSOLA == "esfera");
			else
				CORRECTO = (CONSOLA == "cubo");
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	
}
