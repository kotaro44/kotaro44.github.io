var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
		ESTADO_2 = 2;
		
var pos = [ [300,550] , [500,550] , [700,550] ];

var pro = [ getImg("IMG/img1.png") , getImg("IMG/img2.png"), getImg("IMG/img3.png"),
	                 getImg("IMG/img4.png") , getImg("IMG/img5.png"), getImg("IMG/img6.png"), getImg("IMG/img7.png") ],
	resp1 = ["12","2","6", "9","3","3", "6","2","3" ,"12","3","4" ,"6","3","2" ,"10","5","2" ,"15","3","5"],
	pro2 = ["Si se reparten 8 cuadernos entre 2 personas, \xBFCu\xE1ntos cuadernos le tocan a cada persona?",
	              "Si se reparten 18 l\xE1pices entre 9 alumnos, \xBFCu\xE1ntos l\xE1pices le tocan a cada alumno?"],
	resp2 = ["8","2","4" ,"18","9","2"],
	cuadro = getImg("IMG/cuadro.png"),
	cuadro1 = getImg("IMG/cuadro1.png");

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_1;
	UNIDAD_ACTUAL = UNIDAD_9;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) (1/7) Reparta en partes iguales.";
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
				if( ESTADO_RESP >= 21 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (1/2) Resuelva el siguiente problema: " + pro2[0];
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (Math.floor(ESTADO_RESP/3)+1) + "/7) Reparta en partes iguales.";
				}
            break;
		case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 6 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					TEMP = Math.floor( ESTADO_RESP/3 ) ;
					INSTRUCCION = "2) (" + (TEMP+1) + "/2) Resuelva el siguiente problema: " + pro2[TEMP];
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
	    TEMP = Math.floor(ESTADO_RESP/3);
		TEMP1 = ESTADO_RESP%3;
		
		for( i = 0 ; i < pos.length ; i++ )
		{
			if( i < ESTADO_RESP%3 )
			{
				context.font = Math.floor(35*percentage_scale) + "pt CHALK";
				context.fillText( resp1[  TEMP*3 + i], 
						 pos[i][0] *percentage_scale, pos[i][1]*percentage_scale);
			}
			context.drawImage( i==TEMP1?cuadro1:cuadro, 
					( pos[i][0] - 15)*percentage_scale,( pos[i][1] - 44)*percentage_scale,                
							cuadro.width*percentage_scale,  cuadro.height*percentage_scale);   
		}
		

		context.drawImage( pro[TEMP], 400*percentage_scale, 200*percentage_scale,                
							pro[TEMP].width*percentage_scale,  pro[TEMP].height*percentage_scale);  
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
						CORRECTO = (CONSOLA == resp1[ESTADO_RESP]);
					break;	
				case ESTADO_2:
						CORRECTO = (CONSOLA == resp2[ESTADO_RESP]);
					break;	
			}
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	
}
