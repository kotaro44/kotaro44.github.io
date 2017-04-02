var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2,
		ESTADO_3 = 3;
		
var billetes = [ getImg("IMG/l20.png") , getImg("IMG/l500.png") , getImg("IMG/l100.png")  , getImg("IMG/l5.png") ,
                       getImg("IMG/l2.png")  ,getImg("IMG/l50.png") , getImg("IMG/l1.png")  , getImg("IMG/l10.png") ],
	  billetes2 = [ getImg("IMG/img1.png") , getImg("IMG/img2.png") , getImg("IMG/img3.png")  , getImg("IMG/img4.png") ,
                       getImg("IMG/img5.png") ],
	  botones = [ [ getImg("IMG/l1A.png"),getImg("IMG/l1B.png")], [ getImg("IMG/l2A.png"),getImg("IMG/l2B.png")], [ getImg("IMG/l5A.png"),getImg("IMG/l5B.png")], 
                         [ getImg("IMG/l10A.png"),getImg("IMG/l10B.png")], [ getImg("IMG/l20A.png"),getImg("IMG/l20B.png")], [ getImg("IMG/l50A.png"),getImg("IMG/l50B.png")], 
                         [ getImg("IMG/l100A.png"),getImg("IMG/l100B.png")], [ getImg("IMG/l500A.png"),getImg("IMG/l500B.png")] ],
	  botones2 = [ [ getImg("IMG/l1PA.png"),getImg("IMG/l1PB.png")], [ getImg("IMG/l2PA.png"),getImg("IMG/l2PB.png")], [ getImg("IMG/l5PA.png"),getImg("IMG/l5PB.png")], 
                         [ getImg("IMG/l10PA.png"),getImg("IMG/l10PB.png")], [ getImg("IMG/l20PA.png"),getImg("IMG/l20PB.png")], [ getImg("IMG/l50PA.png"),getImg("IMG/l50PB.png")], 
                         [ getImg("IMG/l100PA.png"),getImg("IMG/l100PB.png")], [ getImg("IMG/l500PA.png"),getImg("IMG/l500PB.png")] ],
	  selected = -1,
	  monedas = getImg("IMG/monedas.png"),
	  resp = [4,7,6,2,1,5,0,3],
	  resp2 = [5,7,3,2,6],
	  resp3 = ["b","a"],
	  pos = [ [500,510] , [500,565] ];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_1;
	UNIDAD_ACTUAL = UNIDAD_11;
	
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) (1/8) Seleccione la cantidad que corresponde al billete.";
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
				if( ESTADO_RESP >= 8 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + (ESTADO_RESP+1) + "/6) Seleccione la cantidad de dinero que tiene el mismo valor.";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (ESTADO_RESP+1) + "/8) Seleccione la cantidad de dinero que corresponde al billete.";
				}
            break;
		case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 5 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) Escriba en el paréntesis la letra según corresponda.";
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + (ESTADO_RESP+1) + "/6) Seleccione la cantidad de dinero que tiene el mismo valor.";
				}
            break;
			case ESTADO_3:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 2 )
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
	
	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 )
	{
		cont =0;
		selected = -1;
		for( i = 0; i < 4; i++ )
			for( j = 0; j < 2; j++ )
			{
				if( DestX >= 50 + 320*i && DestX <= ( 50 + 320*i  + botones[0][0] .width) &&
					DestY >= 450 + 100*j && DestY <= (450 + 100*j + botones[0][0].height) )
				{
					context.drawImage(botones[cont][1], ( 50 + 320*i )*percentage_scale ,  ( 450 + 100*j )*percentage_scale  , 
								botones[0][0] .width*percentage_scale , botones[0][0].height*percentage_scale  );
					selected = cont;
				}
				else
				{
					context.drawImage(botones[cont][0], ( 50 + 320*i )*percentage_scale ,  ( 450 + 100*j )*percentage_scale  , 
								botones[0][0] .width*percentage_scale , botones[0][0].height*percentage_scale  );
				}
				cont++;
			}
			
						
		context.drawImage( billetes[ESTADO_RESP], 480*percentage_scale , 230*percentage_scale  , 
						billetes[ESTADO_RESP] .width*percentage_scale , billetes[ESTADO_RESP].height*percentage_scale  );

	}
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{
		cont =0;
		selected = -1;
		for( i = 0; i < 4; i++ )
			for( j = 0; j < 2; j++ )
			{
				if( DestX >= 200 + 250*i&& DestX <= ( 200 + 250*i + botones2[0][0] .width) &&
					DestY >= 450 + 100*j && DestY <= (450 + 100*j + botones2[0][0].height) )
				{
					context.drawImage(botones2[cont][1], ( 200 + 250*i )*percentage_scale ,  ( 450 + 100*j )*percentage_scale  , 
								botones2[0][0] .width*percentage_scale , botones2[0][0].height*percentage_scale  );
					selected = cont;
				}
				else
				{
					context.drawImage(botones2[cont][0], ( 200 + 250*i )*percentage_scale ,  ( 450 + 100*j )*percentage_scale  , 
								botones2[0][0] .width*percentage_scale , botones2[0][0].height*percentage_scale  );
				}
				cont++;
			}
			
						
		context.drawImage( billetes2[ESTADO_RESP], 380*percentage_scale , 190*percentage_scale  , 
						billetes2[ESTADO_RESP] .width*percentage_scale , billetes2[ESTADO_RESP].height*percentage_scale  );

	}
	
	if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 )
	{
		context.drawImage( monedas , 400*percentage_scale , 200*percentage_scale  , 
						monedas.width*percentage_scale , monedas.height*percentage_scale  );
		
		context.font = Math.floor(30*percentage_scale) + "pt CHALK";
		if( ESTADO_RESP ==  0 )
			context.fillText("La colecci\xF3n (                   ) equivale a 1 lempira.",200*percentage_scale,510*percentage_scale);
		else
			context.fillText("La colecci\xF3n (       b          ) equivale a 1 lempira.",200*percentage_scale,510*percentage_scale);
			
		context.fillText("La colecci\xF3n (                   ) no equivale a 1 lempira.",200*percentage_scale,560*percentage_scale);
						
		CONSOLA_X = pos[ESTADO_RESP][0];
		CONSOLA_Y = pos[ESTADO_RESP][1];
		CONSOLA_SIZE = 30;
		DRAW_CONSOLA();
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
		
	if( ESTADO_ACTUAL == ESTADO_2 && selected != -1 )
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

	if( ESTADO_ACTUAL != ESTADO_3 )
		return;
		
		if( CONSOLA_KEYDOWN(KEYCODE) )
		{
			CORRECTO = false;
			CORRECTO = (CONSOLA == resp3[ESTADO_RESP]);
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	
}
