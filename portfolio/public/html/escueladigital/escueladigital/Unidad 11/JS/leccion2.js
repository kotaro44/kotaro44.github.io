var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1;
		
var imagenes = [ getImg("IMG/din1.png"), getImg("IMG/din2.png"), getImg("IMG/din3.png"), getImg("IMG/din4.png") ],
      pos = [ [400,600] , [600,600] ],
	  resp = ["535","85","300","45","670","95","725","75"],
	  cuadro = getImg("IMG/cuadro.png"),
	  cuadro1 = getImg("IMG/cuadro1.png");

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_2;
	UNIDAD_ACTUAL = UNIDAD_11;

}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
				ESTADO_RESP = 0;
                INSTRUCCION = "1) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Escriba cu\xE1nto dinero hay.";
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
				if( ESTADO_RESP >= 8 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (Math.floor(ESTADO_RESP/4)+1)  + "/4) Escriba cu\xE1nto dinero hay.";
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
			context.drawImage( imagenes[ Math.floor( ESTADO_RESP/2 ) ] , 450*percentage_scale , 150*percentage_scale  , 
						 imagenes[ Math.floor( ESTADO_RESP/2 ) ] .width*percentage_scale ,  imagenes[ Math.floor( ESTADO_RESP/2 ) ] .height*percentage_scale  );
						
		for( i = 0 ; i < pos.length ; i++ )
		{		
			context.drawImage( i==(ESTADO_RESP%2)?cuadro1:cuadro, 
					( pos[i][0] - 15)*percentage_scale,( pos[i][1] - 44)*percentage_scale,                
							cuadro.width*percentage_scale,  cuadro.height*percentage_scale); 
			
		}
		
		if( ESTADO_RESP%2 == 1 )
			context.fillText( resp[ESTADO_RESP-1], pos[0][0]*percentage_scale  , pos[0][1]*percentage_scale ); 
		
		context.fillText( "L" , (pos[0][0] - 50)*percentage_scale  , pos[0][1]*percentage_scale ); 
		context.fillText( "C" , (pos[1][0] - 50)*percentage_scale , pos[1][1]*percentage_scale ); 
		
			CONSOLA_X = pos[ESTADO_RESP%2][0];
			CONSOLA_Y = pos[ESTADO_RESP%2][1];
			CONSOLA_SIZE = 30;
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
			CORRECTO = ( CONSOLA == resp[ESTADO_RESP] );
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	
}
