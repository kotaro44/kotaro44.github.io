//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2,
		ESTADO_3 = 3;
        
		
//OBJETOS DIBUJABLES
var etiqs = [getImg("IMG/etiq1.png"),
             getImg("IMG/etiq2.png"),
			 getImg("IMG/etiq3.png"),
			 getImg("IMG/etiq4.png")];
			 
var mundo = [];
    
var preguntas2 = ["\xBFQue figura se forma con 3 pajillas de la misma longitud?",
                  "\xBFQue figura se forma con 4 pajillas de la misma longitud?",
				  "\xBFQue figura se forma con 2 pajillas cortas y 2 pajillas largas?"];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_1;
	UNIDAD_ACTUAL = UNIDAD_6;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) (1/4) \xBFCu\xE1ntos tri\xE1ngulos se necesitan para formar la siguiente figura?";
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
					INSTRUCCION = "2) ("+ Math.floor(ESTADO_RESP+1)+ "/4) " + preguntas2[ESTADO_RESP];
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) ("+ Math.floor(ESTADO_RESP+1)+ "/4) \xBFCu\xE1ntos tri\xE1ngulos se necesitan para formar la siguiente figura?";
					
				}
            break;
		case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 3 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) ("+ Math.floor(ESTADO_RESP+1)+ "/4) " + preguntas2[ESTADO_RESP];
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
		context.drawImage( etiqs[ESTADO_RESP] , 500*percentage_scale , 250*percentage_scale ,
			 etiqs[ESTADO_RESP].width*percentage_scale , etiqs[ESTADO_RESP].height*percentage_scale );
		
	}

	CONSOLA_COLOR = "#000000";
	DRAW_CONSOLA();		
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
						if( ESTADO_RESP == 0 )
							CORRECTO =  ( parseInt( CONSOLA ) == 4 || parseInt( CONSOLA ) == 2 );
						if( ESTADO_RESP == 1 )
							CORRECTO =  ( parseInt( CONSOLA ) == 1 || parseInt( CONSOLA ) == 2 || parseInt( CONSOLA ) == 4 );
						if( ESTADO_RESP == 2 )
							CORRECTO =  ( parseInt( CONSOLA ) >= 3 || parseInt( CONSOLA ) <= 6  );
						if( ESTADO_RESP == 3 )
							CORRECTO =  ( parseInt( CONSOLA ) == 4 );
					break;	
				case ESTADO_2:
						if( ESTADO_RESP == 0 )
							CORRECTO =  ( CONSOLA == "triangulo");
						if( ESTADO_RESP == 1 )
							CORRECTO =  ( CONSOLA == "cuadrado");
						if( ESTADO_RESP == 2 )
							CORRECTO =  ( CONSOLA == "rectangulo");
					break;	
			}
			
			if( CORRECTO )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	}
}
