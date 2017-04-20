var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2,
		ESTADO_3 = 3;
		
var consola_pos = [  [575,460] , [400,460] , [300,400] , [200,400] , [560,400] , [510,400] ],
       cuadro = getImg("IMG/cuadro.png"),
	   resp1 = ["7","5","3","4","4","4"],
	   resp2 = [["6x2",false],["2x6",false],["3x4",false],["4x3",false]],
	   resp3 = [["8x2",false],["2x8",false],["4x4",false]];
		
//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_5;
	UNIDAD_ACTUAL = UNIDAD_7;
	
	
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) (1/6) Escriba en las casillas los n\xFAmeros que corresponde.";
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
				if( ESTADO_RESP >= 6 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) Escriba las multiplicaciones cuyo producto sea 12.";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (ESTADO_RESP+1) + "/6) Escriba en las casillas los n\xFAmeros que corresponde.";
				}
            break;
		case ESTADO_2:
				TEMP = true;
				for( i = 0 ; i < resp2.length ; i++ )
					if( resp2[i][1] == false )
						TEMP = false;
				if( TEMP )
				{
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) Escriba las multiplicaciones cuyo producto sea 16.";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
				}
			break;
		case ESTADO_3:
				TEMP = true;
				for( i = 0 ; i < resp3.length ; i++ )
					if( resp3[i][1] == false )
						TEMP = false;
				if( TEMP )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
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
		context.font = Math.floor(35*(percentage_scale+percentage_scale)/2) + "pt CHALK";
		switch( ESTADO_RESP )
		{
			case 0:
					context.fillText("En la tabla del 7, cuando el multiplicador se aumenta en 1,",130*percentage_scale,400*percentage_scale);
					context.fillText("el producto aumenta en ",130*percentage_scale,460*percentage_scale);
				break;
			case 1:
					context.fillText("La tabla cuyos productos aumentan de 5 en 5 ",130*percentage_scale,400*percentage_scale);
					context.fillText("es la tabla del  ",130*percentage_scale,460*percentage_scale);
				break;
			case 2:
					context.fillText("3x8 es ",130*percentage_scale,400*percentage_scale);
					context.fillText("m\xE1s que 3x7",400*percentage_scale,400*percentage_scale);
				break;
			case 3:
					context.fillText("9x ",130*percentage_scale,400*percentage_scale);
					context.fillText(" es 9 m\xE1s que 9x3",300*percentage_scale,400*percentage_scale);
				break;
			case 4:
					context.fillText("6x3 es 6 menos que 6x ",130*percentage_scale,400*percentage_scale);
				break;
			case 5:
					context.fillText("4 menos que 4x3 es ",130*percentage_scale,400*percentage_scale);
					context.fillText("x2 ",580*percentage_scale,400*percentage_scale);
				break;
		}
		
		context.drawImage( cuadro, ( consola_pos[ESTADO_RESP][0] - 15)*percentage_scale,( consola_pos[ESTADO_RESP][1] - 44)*percentage_scale,                
							cuadro.width*percentage_scale,  cuadro.height*percentage_scale);   
		CONSOLA_X = consola_pos[ESTADO_RESP][0];
		CONSOLA_Y = consola_pos[ESTADO_RESP][1];
		CONSOLA_SIZE = 35;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();	
	}
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{
		for( i = 0 ; i < resp2.length ; i++ )
			if( resp2[i][1] )
				context.fillText( resp2[i][0],(300 + i*200 )*percentage_scale,560*percentage_scale);
			else
				context.fillText( " _x_" ,(300 + i*200 )*percentage_scale,560*percentage_scale);
		CONSOLA_X = 550;
		CONSOLA_Y = 350;
		CONSOLA_SIZE = 90;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();	
	}
	
	if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 )
	{
		for( i = 0 ; i < resp3.length ; i++ )
			if( resp3[i][1] )
				context.fillText( resp3[i][0],(300 + i*200 )*percentage_scale,560*percentage_scale);
			else
				context.fillText( " _x_" ,(300 + i*200 )*percentage_scale,560*percentage_scale);
		CONSOLA_X = 550;
		CONSOLA_Y = 350;
		CONSOLA_SIZE = 90;
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
						CORRECTO = ( CONSOLA == resp1[ESTADO_RESP] );
					break;	
				case ESTADO_2:
						for( i = 0 ; i < resp2.length; i++ )
						{
							if( resp2[i][0] == CONSOLA )
							{
								if( resp2[i][1]  )
									EJER_CORRECTO_CONSOLA(0);
								else
								{
									resp2[i][1] = true;
									EJER_CORRECTO_CONSOLA(1);
								}
								return;
							}
						}
					break;	
				case ESTADO_3:
						for( i = 0 ; i < resp3.length; i++ )
						{
							if( resp3[i][0] == CONSOLA )
							{
								if( resp3[i][1]  )
									EJER_CORRECTO_CONSOLA(0);
								else
								{
									resp3[i][1] = true;
									EJER_CORRECTO_CONSOLA(1);
								}
								return;
							}
						}
					break;	
			}
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
}
