var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
        ESTADO_2 = 2,
		ESTADO_3 = 3,
		ESTADO_4 = 4,
		ESTADO_5 = 5,
		ESTADO_6 = 6,
		ESTADO_7 = 7,
		ESTADO_8 = 8,
        ESTADO_9 = 9,
		ESTADO_10 = 10,
		ESTADO_11 = 11,
		ESTADO_12 = 12,
		ESTADO_13 = 13,
		ESTADO_14 = 14;
		
var tabla = getImg("IMG/ninios.png") ,
     puntitos = [ getImg("IMG/puntito0.jpg") , getImg("IMG/puntito1.jpg") , getImg("IMG/puntito2.jpg") ],
	  resp = ["4","3","4","6","2"],
	  preguntas = [ "\xBFC\xF3mo se escribe el n\xFAmero trescientos ochenta y cinco?" ,
                           "\xBFQu\xE9 n\xFAmero se representa en la figura?",
                           "\xBFCu\xE1l es el n\xFAmero que representa el dibujo?",
                           "\xBFC\xF3mo se escribe el n\xFAmero quinientos siete?",
                           "\xBFQu\xE9 n\xFAmero se representa en la figura?",
                           "\xBFQu\xE9 n\xFAmero se representa en la figura?",
                           "\xBFQu\xE9 n\xFAmero tiene 2 centenas y 5 unidades?",
                           "\xBFQu\xE9 n\xFAmero tiene 3 centenas, 6 decenas y 5 unidades?",
                           "\xBFQu\xE9 n\xFAmero est\xE1 entre 152 y 160?",
                           "\xBFQu\xE9 n\xFAmero est\xE1 antes de 499?",
						   "\xBFQu\xE9 n\xFAmero es mayor que 524?",
						   "\xBFQu\xE9 n\xFAmero corresponde a \"?\" ?",
						   "\xBFQu\xE9 n\xFAmero corresponde a \"?\" ?",
						   "Escriba los n\xFAmeros que hacen falta:" ];
	  respuestas = [ ["365" , "375" , "385" , "395"] ,
                            ["678" , "687" , "768" , "786"] ,
                            ["432" , "423" , "243" , "234"] ,
                            ["507" , "570" , "705" , "57"] ,		
                            ["543" , "534" , "453" , "435"] ,
                            ["15" , "51" , "105" , "501"] ,
                            ["25" , "52" , "205" , "250"] ,
                            ["356" , "365" , "635" , "653"] ,
                            ["168" , "164" , "157" , "150"] ,	
                            ["498" , "499" , "500" , "598"] ,	
                            ["319" , "425" , "519" , "625"] ,
                            ["2" , "5" , "6" , "9"] ,
                            ["2" , "4" , "6" , "8"]  ];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = PRUEBAS_1;
	UNIDAD_ACTUAL = PRUEBAS;
}

function UPDATE()
{        
	INSTRUCCION = ESTADO_ACTUAL + ") (" + ESTADO_ACTUAL + "/14) " + preguntas[ESTADO_ACTUAL-1];
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;    		
            break;
        case ESTADO_CALIFICANDO:
				CALIFICANDO_ANIM();
			break;
     }
}

function ESTADOS_ANTERIORES()
{
	ESTADO_ACTUAL++;
	if( ESTADO_ANTERIOR == ESTADO_14 )	
		FIN_LECCION();
}


function DRAW(context)
{

	DRAW_INSTRUCTION();
	context.font = Math.floor(20*percentage_scale) + "pt CHALK";
	
	for( i = 0 ; i < respuestas[ESTADO_ACTUAL-1].length ; i++ )
	{
		context.fillText( respuestas[ESTADO_ACTUAL-1][i] , 580*percentage_scale , (300 + 100*i)*percentage_scale  );
		context.drawImage( puntitos[0] , 530*percentage_scale , (278 + 100*i)*percentage_scale , puntitos[0].width*percentage_scale , puntitos[1].height*percentage_scale );
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
			switch( ESTADO_ACTUAL )
			{
				case ESTADO_1:
						CORRECTO = (CONSOLA == resp[ESTADO_RESP]);
					break;
				case ESTADO_2:
						CORRECTO = (CONSOLA == "4");
					break;
				case ESTADO_3:
						CORRECTO = (CONSOLA == "2");
					break;
				case ESTADO_4:
				case ESTADO_5:
						CORRECTO = (CONSOLA == "naranja");
					break;
				case ESTADO_6:
						CORRECTO = (CONSOLA == "sandia");
					break;
				case ESTADO_7:
						CORRECTO = (CONSOLA == "19");
					break;
			}
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	
}
