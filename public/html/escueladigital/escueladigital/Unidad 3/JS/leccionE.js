//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 3,
		ESTADO_2 = 4,
		ESTADO_3 = 5;
		
var ESTADO_ANTERIOR = 0, ESTADO_ACTUAL = 0;

var mundo = [];
    
//VARIABLES
var num1=0,num2=0,num3=0,
	ESTADO_1_RESP = 0,ESTADO_2_RESP = 0,ESTADO_3_RESP = 0;

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = EJERCICIOS_1;
	UNIDAD_ACTUAL = UNIDAD_3;
	fondo.Visible = true;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) (1/6) Haga el c\xE1lculo de sumas y restas sucesivas.";
				num2 = Math.floor( Math.random()*8 + 1 );
				num3 = Math.floor( Math.random()*8 + 1 );
				num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
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
				ESTADO_1_RESP = ESTADO_1_RESP + 1;
				if( ESTADO_1_RESP < 6 )
				{
					ESTADO_ACTUAL = ESTADO_1;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "1) (" + (ESTADO_1_RESP + 1) + "/6) Haga el c\xE1lculo de sumas y restas sucesivas.";
					num2 = Math.floor( Math.random()*8 + 1 );
					num3 = Math.floor( Math.random()*8 + 1 );
					num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "2) (" + (ESTADO_2_RESP + 1) + "/6) Calcule las siguientes operaciones combinadas.";
					num2 = Math.floor( Math.random()*8 + 1 );
					num3 = Math.floor( Math.random()*8 + 1 );
					num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
				}
            break;
		case ESTADO_2:
				ESTADO_2_RESP = ESTADO_2_RESP + 1;
				if( ESTADO_2_RESP < 6 )
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + (ESTADO_2_RESP + 1) + "/6) Calcule las siguientes operaciones combinadas.";
					num2 = Math.floor( Math.random()*8 + 1 );
					num3 = Math.floor( Math.random()*8 + 1 );
					num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) (1/3) En la cancha estan jugando 8 ni\xF1as, despu\xE9s llegaron 3 ni\xF1as y luego 5 ni\xF1as m\xE1s. \xBFCu\xE1ntas ni\xF1as est\xE1n jugando ahora en la cancha?";	
				}
            break;
		case ESTADO_3:
				ESTADO_3_RESP = ESTADO_3_RESP + 1;
				if( ESTADO_3_RESP < 3 )
				{
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = (ESTADO_3_RESP==1?("3) (2/3) Mar\xEDa ten\xEDa 16 pi\xF1atas. El lunes vendi\xF3 4 pi\xF1atas y el martes vendi\xF3 6 pi\xF1atas. \xBFCu\xE1ntas pi\xF1atas le quedaron a Mar\xEDa?"):
								("3) (3/3)  En una finca hab\xEDan 9 caballos. Vendieron 5 caballos y despu\xE9s compraron 6 caballos. \xBFCu\xE1ntos caballos hay ahora?"));
				}
				else
				{
					FIN_LECCION();
				}
			break;
    }
}


function DRAW(context)
{
        context.fillStyle = "#FFFFFF";
        context.font = Math.floor(20*(percentage_scale+percentage_scale)) + "pt CHALK";
		
		INSTRUCCION_COLOR = "#000000";
        DRAW_INSTRUCTION();
		
		if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1  )
		{
			context.fillStyle = "#000000";
			context.font = Math.floor(50*(percentage_scale+percentage_scale)/2) + "pt CHALK";
			context.fillText(num1 + (ESTADO_1_RESP%2==0?" + ":" - ") + num2 + (ESTADO_1_RESP%2==0?" + ":" - ") + num3 + " = " , 400*percentage_scale , 400*percentage_scale );

			CONSOLA_COLOR = "#000000";
			CONSOLA_SIZE = 50;
			CONSOLA_X = 750;
			CONSOLA_Y = 395;
			DRAW_CONSOLA();
		}
		
		if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2  )
		{
			context.fillStyle = "#000000";
			context.font = Math.floor(50*(percentage_scale+percentage_scale)/2) + "pt CHALK";
			context.fillText(num1 + (ESTADO_2_RESP%2==0?" + ":" - ") + num2 + (ESTADO_2_RESP%2==0?" - ":" + ") + num3 + " = " , 400*percentage_scale , 400*percentage_scale );

			CONSOLA_COLOR = "#000000";
			CONSOLA_SIZE = 50;
			CONSOLA_X = 750;
			CONSOLA_Y = 395;
			DRAW_CONSOLA();
		}
		
		if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3  )
		{
			CONSOLA_COLOR = "#000000";
			CONSOLA_SIZE = 50;
			CONSOLA_X = 400;
			CONSOLA_Y = 450;
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
		switch(ESTADO_ACTUAL)
		{
			case ESTADO_1:
					CORRECTO = (parseInt(CONSOLA) == ((ESTADO_1_RESP%2==0)?(num1+num2+num3):(num1-num2-num3)));
				break;
			case ESTADO_2:
					CORRECTO = (parseInt(CONSOLA) == ((ESTADO_2_RESP%2==0)?(num1+num2-num3):(num1-num2+num3)));
				break;
			case ESTADO_3:
					CORRECTO = (parseInt(CONSOLA) == (ESTADO_3_RESP==0?16:ESTADO_3_RESP==1?6:10));
				break;
		}
		
		if( CORRECTO )
			EJER_CORRECTO_CONSOLA(1);
		else
			EJER_INCORRECTO_CONSOLA(-1);
	}

}
