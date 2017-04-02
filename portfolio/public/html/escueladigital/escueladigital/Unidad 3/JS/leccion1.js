//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 3,
		ESTADO_2 = 4,
		ESTADO_3 = 5,
		ESTADO_4 = 6,
		ESTADO_5 = 7,
		ESTADO_6 = 8,
		ESTADO_7 = 9,
		ESTADO_8 = 10,
		ESTADO_9 = 11;
		
//OBJETOS DIBUJABLES
var cuerpo = new Drawable(getImg("IMG/cuerpo.png"),412,270);
	
var mundo = [cuerpo];
    
var num1 = 0,num2 = 0,num3 = 0, ESTADO_1_RESP = 0, cuadro_pos = [ [430,410] , [570,410] , [500,590] ],cuadro = 0,
	ESTADO_1_RESP = 0,ESTADO_2_RESP = 0,ESTADO_4_RESP = 0,ESTADO_5_RESP = 0,ESTADO_7_RESP = 0,ESTADO_8_RESP = 0;
	
//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = LECCION_1;
	UNIDAD_ACTUAL = UNIDAD_3;
	cuerpo.Visible = true;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) (1/2) Haga las siguientes sumas sucesivas.";
				num1 = Math.floor( Math.random()*8 + 1 );
				num2 = Math.floor( Math.random()*8 + 1 );
				num3 = Math.floor( Math.random()*8 + 1 );
				cuadro = 0;
				ESTADO_1_RESP = 0;
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
		case ESTADO_9:
				FIN_LECCION();
			break;
		case ESTADO_8:
				ESTADO_8_RESP = ESTADO_8_RESP +1;
				if( ESTADO_8_RESP > 4 )
				{
					INSTRUCCION = "9) En el bus estaban 9 ni\xF1os. En la estaci\xF3n se subieron 4 ni\xF1os y en la siguiente estaci\xF3n se bajaron 5 ni\xF1os. \xBFCu\xE1ntos ni\xF1os quedaron en el bus?";
					ESTADO_ACTUAL = ESTADO_9;
				}
				else
				{
					INSTRUCCION = "8) (" + (ESTADO_8_RESP +1) + "/4) Calcule haciendo el proceso.";
					ESTADO_ACTUAL = ESTADO_8;
					num2 = Math.floor( Math.random()*8 + 1 );
					num3 = Math.floor( Math.random()*8 + 1 );
					num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
				}
			break;
		case ESTADO_7:
				cuadro = cuadro + 1;
				if( cuadro == 3 )
				{
					ESTADO_7_RESP = ESTADO_7_RESP +1;
					cuadro = 0;
					num2 = Math.floor( Math.random()*8 + 1 );
					num3 = Math.floor( Math.random()*8 + 1 );
					num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
				}
				if( ESTADO_7_RESP > 2 )
				{
					INSTRUCCION = "8) (1/3) Calcule haciendo el proceso.";
					ESTADO_ACTUAL = ESTADO_8;
					cuerpo.Visible = false;
					num2 = Math.floor( Math.random()*8 + 1 );
					num3 = Math.floor( Math.random()*8 + 1 );
					num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
				}
				else
				{
					INSTRUCCION = "7) (" + (ESTADO_7_RESP+1) + "/3) Haga las siguientes c\xE1lculos.";
					ESTADO_ACTUAL = ESTADO_7;
				}
            break;
		case ESTADO_6:
				ESTADO_ACTUAL = ESTADO_7;
				cuerpo.Visible = true;
				num2 = Math.floor( Math.random()*8 + 1 );
				num3 = Math.floor( Math.random()*8 + 1 );
				num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
				INSTRUCCION = "7) (1/3) Haga los siguientes c\xE1lculos.";
			break;
		case ESTADO_4:
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				cuadro = cuadro + 1;
				if( cuadro == 3 )
				{
					ESTADO_4_RESP = ESTADO_4_RESP +1;
					cuadro = 0;
					num2 = Math.floor( Math.random()*8 + 1 );
					num3 = Math.floor( Math.random()*8 + 1 );
					num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
				}
				if( ESTADO_4_RESP > 1 )
				{
					INSTRUCCION = "5) (1/2) Reste haciendo el proceso.";
					ESTADO_ACTUAL = ESTADO_5;
					cuerpo.Visible = false;
					num2 = Math.floor( Math.random()*8 + 1 );
					num3 = Math.floor( Math.random()*8 + 1 );
					num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
				}
				else
				{
					INSTRUCCION = "4) (" + (ESTADO_4_RESP+1) + "/2) Haga las siguientes restas sucesivas.";
					ESTADO_ACTUAL = ESTADO_4;
				}
            break;
        case ESTADO_1:
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				cuadro = cuadro + 1;
				if( cuadro == 3 )
				{
					ESTADO_1_RESP = ESTADO_1_RESP +1;
					cuadro = 0;
					num2 = Math.floor( Math.random()*8 + 1 );
					num3 = Math.floor( Math.random()*8 + 1 );
					num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
				}
				if( ESTADO_1_RESP > 1 )
				{
					INSTRUCCION = "2) (1/2) Sume haciendo el proceso.";
					ESTADO_ACTUAL = ESTADO_2;
					cuerpo.Visible = false;
					num2 = Math.floor( Math.random()*8 + 1 );
					num3 = Math.floor( Math.random()*8 + 1 );
					num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
				}
				else
				{
					INSTRUCCION = "1) (" + (ESTADO_1_RESP+1) + "/2) Haga las siguientes sumas sucesivas.";
					ESTADO_ACTUAL = ESTADO_1;
				}
            break;
		case ESTADO_5:
				ESTADO_5_RESP = ESTADO_5_RESP +1;
				if( ESTADO_5_RESP > 1 )
				{
					INSTRUCCION = "6) Susana ten\xEDa 11 confites. En la calle perdi\xF3 4 confites y luego su hermano le comi\xF3 5 confites. \xBFCu\xE1ntos confites le quedaron a Susana?";
					ESTADO_ACTUAL = ESTADO_6;
				}
				else
				{
					INSTRUCCION = "5) (2/2) Reste haciendo el proceso.";
					ESTADO_ACTUAL = ESTADO_5;
					num2 = Math.floor( Math.random()*8 + 1 );
					num3 = Math.floor( Math.random()*8 + 1 );
					num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
				}
			break;
		case ESTADO_2:
				ESTADO_2_RESP = ESTADO_2_RESP +1;
				if( ESTADO_2_RESP > 1 )
				{
					INSTRUCCION = "3) Mi mam\xE1 ten\xEDa 7 mangos y compr\xF3 6 mangos en el mercado y su vecino le regal\xF3 5 mangos. \xBFCu\xE1ntos mangos tiene ahora mi mam\xE1?";
					ESTADO_ACTUAL = ESTADO_3;
				}
				else
				{
					INSTRUCCION = "2) (2/2) Sume haciendo el proceso.";
					ESTADO_ACTUAL = ESTADO_2;
					num2 = Math.floor( Math.random()*8 + 1 );
					num3 = Math.floor( Math.random()*8 + 1 );
					num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
				}
			break;
		case ESTADO_3:
				ESTADO_ACTUAL = ESTADO_4;        
                INSTRUCCION = "4) (1/2) Haga las siguientes restas sucesivas";
				num2 = Math.floor( Math.random()*8 + 1 );
				num3 = Math.floor( Math.random()*8 + 1 );
				num1 = Math.floor( (num2+num3) + Math.random()*8 + 1 );
				cuadro = 0;
				ESTADO_4_RESP = 0;
				cuerpo.Visible = true;
			break;
    }
}


function DRAW(context)
{
		INSTRUCCION_COLOR = "#000000";
        DRAW_INSTRUCTION();
		
		if( ESTADO_ACTUAL == ESTADO_8 || ESTADO_ANTERIOR == ESTADO_8  )
		{
			context.fillStyle = "#000000";
			context.font = Math.floor(50*percentage_scale) + "pt CHALK";
			context.fillText(num1 + (ESTADO_8_RESP%2==0?" + ":" - ") + num2 + (ESTADO_8_RESP%2==0?" - ":" + ") + num3 + " = " , 400*percentage_scale , 400*percentage_scale );

			CONSOLA_COLOR = "#000000";
			CONSOLA_SIZE = 50;
			CONSOLA_X = 750;
			CONSOLA_Y = 395;
			DRAW_CONSOLA();
		}
		
		if( ESTADO_ACTUAL == ESTADO_7 || ESTADO_ANTERIOR == ESTADO_7 )
		{
			context.fillStyle = "#000000";
			context.font = Math.floor(50*(percentage_scale+percentage_scale)/2) + "pt CHALK";
			
			context.fillText(num1 , 380*percentage_scale , 250*percentage_scale );
			context.fillText( (ESTADO_7_RESP==1?" - ":" + ")  + num2 , 430*percentage_scale , 250*percentage_scale );
			context.fillText( (ESTADO_7_RESP==1?" + ":" - ")  + num3 , 530*percentage_scale , 250*percentage_scale );
			context.fillText( "=", 640*percentage_scale , 250*percentage_scale );
			
			context.fillText((ESTADO_7_RESP==1?"+":"-"), 520*percentage_scale , 420*percentage_scale );
			
			CONSOLA_COLOR = "#000000";
			CONSOLA_SIZE = 40;
			CONSOLA_X = cuadro_pos[cuadro][0];
			CONSOLA_Y = cuadro_pos[cuadro][1];
			DRAW_CONSOLA();
			
			for( i = 0; i < cuadro ; i = i + 1 )
				context.fillText( ""+(i==0?((ESTADO_7_RESP==1?num1-num2:num1+num2)):(i==1?num3:(ESTADO_7_RESP==1?num1-num2+num3:num1+num2-num3))) ,
					cuadro_pos[i][0]*percentage_scale , cuadro_pos[i][1]*percentage_scale );
		}
		
		if( ESTADO_ACTUAL == ESTADO_4 || ESTADO_ANTERIOR == ESTADO_4 )
		{
			context.fillStyle = "#000000";
			context.font = Math.floor(45*(percentage_scale+percentage_scale)/2) + "pt CHALK";
			
			context.fillText(num1 , 380*percentage_scale , 250*percentage_scale );
			context.fillText( " - " + num2 , 430*percentage_scale , 250*percentage_scale );
			context.fillText( " - " + num3 , 530*percentage_scale , 250*percentage_scale );
			context.fillText( "=", 640*percentage_scale , 250*percentage_scale );
			
			context.fillText("-" , 520*percentage_scale , 420*percentage_scale );
			
			CONSOLA_COLOR = "#000000";
			CONSOLA_SIZE = 40;
			CONSOLA_X = cuadro_pos[cuadro][0];
			CONSOLA_Y = cuadro_pos[cuadro][1];
			DRAW_CONSOLA();
			
			for( i = 0; i < cuadro ; i = i + 1 )
				context.fillText( ""+(i==0?(num1 - num2):(i==1?num3:num1-num2-num3)) , cuadro_pos[i][0]*percentage_scale ,
						cuadro_pos[i][1]*percentage_scale );
		}
		
		if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 )
		{
			context.fillStyle = "#000000";
			context.font = Math.floor(45*(percentage_scale+percentage_scale)/2) + "pt CHALK";
			
			context.fillText(num1 , 380*percentage_scale , 250*percentage_scale );
			context.fillText( " + " + num2 , 430*percentage_scale , 250*percentage_scale );
			context.fillText( " + " + num3 , 530*percentage_scale , 250*percentage_scale );
			context.fillText( "=", 640*percentage_scale , 250*percentage_scale );
			
			context.fillText("+" , 520*percentage_scale , 420*percentage_scale );
			
			CONSOLA_COLOR = "#000000";
			CONSOLA_SIZE = 40;
			CONSOLA_X = cuadro_pos[cuadro][0];
			CONSOLA_Y = cuadro_pos[cuadro][1];
			DRAW_CONSOLA();
			
			for( i = 0; i < cuadro ; i = i + 1 )
				context.fillText( ""+(i==0?(num1 + num2):(i==1?num3:num1+num2+num3)) , cuadro_pos[i][0]*percentage_scale ,
						cuadro_pos[i][1]*percentage_scale );
		}
		
		if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2  )
		{
			context.fillStyle = "#000000";
			context.font = Math.floor(50*(percentage_scale+percentage_scale)/2) + "pt CHALK";
			context.fillText(num1 + " + " + num2 + " + " + num3 + " = " , 400*percentage_scale , 400*percentage_scale );

			CONSOLA_COLOR = "#000000";
			CONSOLA_SIZE = 50;
			CONSOLA_X = 750;
			CONSOLA_Y = 395;
			DRAW_CONSOLA();
		}
		
		if( ESTADO_ACTUAL == ESTADO_5 || ESTADO_ANTERIOR == ESTADO_5  )
		{
			context.fillStyle = "#000000";
			context.font = Math.floor(50*(percentage_scale+percentage_scale)/2) + "pt CHALK";
			context.fillText(num1 + " - " + num2 + " - " + num3 + " = " , 400*percentage_scale , 400*percentage_scale );

			CONSOLA_COLOR = "#000000";
			CONSOLA_SIZE = 50;
			CONSOLA_X = 750;
			CONSOLA_Y = 395;
			DRAW_CONSOLA();
		}
		
		if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3  ||
		    ESTADO_ACTUAL == ESTADO_6 || ESTADO_ANTERIOR == ESTADO_6  ||
			ESTADO_ACTUAL == ESTADO_9 || ESTADO_ANTERIOR == ESTADO_9 )
		{
			CONSOLA_COLOR = "#000000";
			CONSOLA_SIZE = 90;
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
		CORRECTO = false;
		switch(ESTADO_ACTUAL)
		{
			case ESTADO_1:
					CORRECTO = (parseInt(CONSOLA) == (cuadro==0?(num1 + num2):(cuadro==1?num3:num1+num2+num3)));
				break;
			case ESTADO_2:
					CORRECTO = (parseInt(CONSOLA) == num1+num2+num3);
				break;
			case ESTADO_3:
					CORRECTO = (parseInt(CONSOLA) == 18);
				break;
			case ESTADO_4:
					CORRECTO = (parseInt(CONSOLA) == (cuadro==0?(num1 - num2):(cuadro==1?num3:num1-num2-num3)));
				break;
			case ESTADO_5:
					CORRECTO = (parseInt(CONSOLA) == num1-num2-num3);
				break;
			case ESTADO_6:
					CORRECTO = (parseInt(CONSOLA) == 2);
				break;
			case ESTADO_7: 
					CORRECTO = (parseInt(CONSOLA) == (cuadro==0?((ESTADO_7_RESP==1? num1-num2: num1+num2)):(cuadro==1?num3:(ESTADO_7_RESP==1? num1-num2+num3:num1+num2-num3 ))));
				break;
			case ESTADO_8:
					CORRECTO = (parseInt(CONSOLA) == (ESTADO_8_RESP%2==0?num1+num2-num3:num1-num2+num3));
				break;
			case ESTADO_9:
					CORRECTO = (parseInt(CONSOLA) == 8);
				break;
		}
		if( CORRECTO )
			EJER_CORRECTO_CONSOLA(1);
		else
			EJER_INCORRECTO_CONSOLA(-1);
	}

}
