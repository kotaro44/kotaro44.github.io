//Estados probablemente esto servira para todas las lecciones
var	ESTADO_1 = 3,
		ESTADO_2 = 4,
		ESTADO_3 = 5;
        
		
//OBJETOS DIBUJABLES
var cuerpo = new Drawable(getImg("IMG/cuerpo.png"),450,350);
	
var mundo = [cuerpo];
    
//VARIABLES
var END_CALIFICANDO = false, CORRECTO = true,boton_delay = 0,
    CONSOLA = "",INSTRUCCION = "";
	
var consola_pos = [[560,420],[660,420],[560,520],[660,520],[660,620],[560,620]],
	num1D=0,num1U=0,num2D=0,num2U = 0,ESTADO_RESP = 0,pos4 = [0,1,2,3,5,4],pos6 = [0,1,3,5,4],
	problemas7 = [ "En el patio estaban jugando 38 ni\xF1os y luego se fueron 12 ni\xF1os. \xBFCu\xE1ntos ni\xF1os quedaron en el patio?",
	               "Hay 77 bananos y 40 pi\xF1as. \xBFCu\xE1ntos bananos hay m\xE1s que pi\xF1as?",
				   "Hay 47 rosas entre rojas y blancas. si 15 rosas son blancas \xBFCu\xE1ntas rosas rojas hay?"],
	respuestas7 = [3,8,1,2,6,2, 7,7,4,0,7,3 ,4,7,1,5,2,3 ];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = EJERCICIOS_1;
	UNIDAD_ACTUAL = UNIDAD_5;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) (1/8) Haga las siguientes restas.";
				cuerpo.Visible = true;
				ESTADO_RESP = 0;
				CalcNums();
            break;
                
        case ESTADO_CALIFICANDO:
				CALIFICANDO_ANIM();
			break;
     }
}

function CalcNums()
{
		num1D=Math.floor(Math.random()*4+5);
		do{
			num2D=((Math.floor(Math.random()*100)<50)?Math.floor(Math.random()*4):0);
		}while(num2D>num1D);

		num1U=Math.floor(Math.random()*4+5);
		do{
			num2U=Math.floor(Math.random()*4+1);
		}while(num2U>=num1U);
}

function ESTADOS_ANTERIORES()
{
	ESTADO_RESP = ESTADO_RESP + 1;
    switch(ESTADO_ANTERIOR)
    {
        case ESTADO_1:
				if( ESTADO_RESP >= 16 )
				{
					ESTADO_ACTUAL = ESTADO_2;
					ESTADO_RESP = 0;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/6)+1) + "/8) Cambie el problema a la forma vertical y resuelvalo.";
					CalcNums();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (Math.floor(ESTADO_RESP/2)+1) + "/8) Haga las siguientes restas.";
					if( ESTADO_RESP%2 == 0 )
						CalcNums();
				}
            break;
		case ESTADO_2:
				if( ESTADO_RESP >=  48 )
				{
					ESTADO_ACTUAL = ESTADO_3;
					ESTADO_RESP = 0;
					INSTRUCCION = "3) (1/3) Resuelva los siguientes problemas desarrollando el C\xE1lculo: " + problemas7[0];
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/6)+1) + "/8) Cambie el problema a la forma vertical y resuelvalo.";
					if( ESTADO_RESP%6 == 0 )
						CalcNums();
				}
				
			break;
		case ESTADO_3:
				if( ESTADO_RESP >= 18 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
					if( ESTADO_RESP%6 == 0 )
						INSTRUCCION = "3) (" + (Math.floor(ESTADO_RESP/6)+1)  + 
							"/3) Resuelva los siguientes problemas desarrollando el C\xE1lculo: " + problemas7[Math.floor(ESTADO_RESP/6)];
				}
			break;
		
    }
}


function DRAW(context)
{
	context.font = Math.floor(50*(percentage_scale+percentage_scale)/2) + "pt CHALK";
	INSTRUCCION_COLOR = "#000000";
	DRAW_INSTRUCTION();
	if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3  )
	{
		for( i = 0 ; i < ESTADO_RESP%6 ; i++ )
			context.fillText( respuestas7[Math.floor(ESTADO_RESP/6)*6 + i] ,consola_pos[i%6][0]*percentage_scale,
														consola_pos[i%6][1]*percentage_scale);
		CONSOLA_X = consola_pos[ESTADO_RESP%6][0];
		CONSOLA_Y = consola_pos[ESTADO_RESP%6][1];
	}
	
	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 )
	{
		context.fillText(num1D,(consola_pos[0][0])*percentage_scale,(consola_pos[0][1])*percentage_scale);
		context.fillText(num1U,(consola_pos[1][0])*percentage_scale,(consola_pos[1][1])*percentage_scale);
		if( num2D != 0 )
			context.fillText(num2D,(consola_pos[2][0])*percentage_scale,(consola_pos[2][1])*percentage_scale);
		context.fillText(num2U,(consola_pos[3][0])*percentage_scale,(consola_pos[3][1])*percentage_scale);
		
		if( ESTADO_RESP%2 > 0 )
			context.fillText(num1U-num2U,(consola_pos[4][0])*percentage_scale,(consola_pos[4][1])*percentage_scale);
			
		CONSOLA_X = consola_pos[ ESTADO_RESP%2 + 4][0];
		CONSOLA_Y = consola_pos[ ESTADO_RESP%2 + 4][1];
		
	}
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{
		context.fillText( (num1D*10+num1U) + "-" + (num2D*10+num2U)+ "=" ,(180)*percentage_scale,(300)*percentage_scale);
		
		if( ESTADO_RESP%6 > 0 )
			context.fillText(num1D,(consola_pos[0][0])*percentage_scale,(consola_pos[0][1])*percentage_scale);
		if( ESTADO_RESP%6 > 1 )
			context.fillText(num1U,(consola_pos[1][0])*percentage_scale,(consola_pos[1][1])*percentage_scale);
		if( ESTADO_RESP%6 > 2 && num2D != 0 )
			context.fillText(num2D,(consola_pos[2][0])*percentage_scale,(consola_pos[2][1])*percentage_scale);
		if( ESTADO_RESP%6 > 3 )
			context.fillText(num2U,(consola_pos[3][0])*percentage_scale,(consola_pos[3][1])*percentage_scale);
		if( ESTADO_RESP%6 > 4 )
			context.fillText((num1U-num2U),(consola_pos[4][0])*percentage_scale,(consola_pos[4][1])*percentage_scale);	
			
		CONSOLA_X = consola_pos[ ESTADO_RESP%6 ][0];
		CONSOLA_Y = consola_pos[ ESTADO_RESP%6 ][1];
		
	}

	CONSOLA_COLOR = "#000000";
	CONSOLA_SIZE = 50;
	DRAW_CONSOLA();
		
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
					CORRECTO = (parseInt(CONSOLA) == (ESTADO_RESP%2==0?(num1U-num2U):(num1D-num2D) ));
				break;
			case ESTADO_2:
					if( ESTADO_RESP%6 == 2 )
						CORRECTO =  ((num2D==0)?(CONSOLA==""||CONSOLA=="0"):parseInt(CONSOLA)==(num2D));
					else
						CORRECTO = (parseInt(CONSOLA) == ( (ESTADO_RESP%6==0)?num1D:
														   (ESTADO_RESP%6==1)?num1U: 
														   (ESTADO_RESP%6==3)?num2U:
														   (ESTADO_RESP%6==4)?num1U-num2U:num1D-num2D));
				break;
			case ESTADO_3:
					 CORRECTO = parseInt(CONSOLA) == respuestas7[ESTADO_RESP];
				break;
		}
		if( CORRECTO )
			EJER_CORRECTO_CONSOLA(1);
		else
			EJER_INCORRECTO_CONSOLA(-1);
	}
}
