//Estados probablemente esto servira para todas las lecciones
var	ESTADO_1 = 3,
		ESTADO_2 = 4,
		ESTADO_3 = 5,
		ESTADO_4 = 6,
		ESTADO_5 = 7,
		ESTADO_6 = 8,
		ESTADO_7 = 9;
        
		
//OBJETOS DIBUJABLES
var cuerpo = new Drawable(getImg("IMG/cuerpo.png"),450,350);
	
var mundo = [cuerpo];
    
var consola_pos = [[560,420],[660,420],[560,520],[660,520],[560,620],[660,620]],
	num1D=0,num1U=0,num2D=0,num2U = 0,ESTADO_RESP = 0,pos4 = [0,1,2,3,5,4],pos6 = [0,1,3,5,4],
	problemas7 = [ "Mi mam\xE1 ten\xEDa 48 gallinas y vendi\xF3 15. \xBFCu\xE1ntoas gallinas le quedaron?",
	               "En segundo grado hay 45 alumnos pero hoy faltaron 10. \xBFCu\xE1ntos alumnos llegaron hoy?",
				   "Rita hizo 29 pasteles y vendi\xF3 17. \xBFCu\xE1ntos pasteles le quedaron?",
				   "Don Pedro cosech\xF3 87 sand\xEDas y don Juan 65. \xBFCu\xE1ntos sand\xEDas m\xE1s cosecho don Pedro que don Juan?"],
	respuestas7 = [4,8,1,5,3,3, 4,5,1,0,5,3 ,2,9,1,7,2,1 ,8,7,6,5,2,2 ],
	p0 = getImg("IMG/p0.png"),p1 = getImg("IMG/p2.png");

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = LECCION_2;
	UNIDAD_ACTUAL = UNIDAD_4;
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
			num2D=Math.floor(Math.random()*4+1);
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
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/2)+1) + "/4) Cambie el problema a la forma vertical y resuelvalo.";
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
				if( ESTADO_RESP >= 24 )
				{
					ESTADO_ACTUAL = ESTADO_3;        
					INSTRUCCION = "3) (1/8) Haga las siguientes restas.";
					ESTADO_RESP = 0;
					CalcNums();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/6)+1) + "/4) Cambie el problema a la forma vertical y resuelvalo.";
					if( ESTADO_RESP%6 == 0 )
						CalcNums();
				}
			break;
		case ESTADO_3:
				if( ESTADO_RESP >= 16 )
				{
					ESTADO_ACTUAL = ESTADO_4;
					ESTADO_RESP = 0;
					INSTRUCCION = "4) (1/4) Cambie el problema a la forma vertical y resuelvalo.";
					{
						num1D=Math.floor(Math.random()*7+1);
						num1U=Math.floor(Math.random()*7+1);
						num2D = num1D;
						num2U = num1U;
					}
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) (" + (Math.floor(ESTADO_RESP/2)+1) + "/8) Haga las siguientes restas.";
					if( ESTADO_RESP%2 == 0 )
						CalcNums();
				}
            break;
		case ESTADO_4:
				if( ESTADO_RESP >= 24 )
				{
					ESTADO_ACTUAL = ESTADO_5;        
					INSTRUCCION = "5) (1/8) Haga las siguientes restas.";
					ESTADO_RESP = 0;
					CalcNums();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_4;
					INSTRUCCION = "4) (" + (Math.floor(ESTADO_RESP/6)+1) + "/4) Cambie el problema a la forma vertical y resuelvalo.";
					if( ESTADO_RESP%6 == 0 )
					{
						num1D=Math.floor(Math.random()*7+1);
						num1U=Math.floor(Math.random()*7+1);
						num2D = num1D;
						num2U = num1U;
					}
				}
			break;
		case ESTADO_5:
				if( ESTADO_RESP >= 16 )
				{
					ESTADO_ACTUAL = ESTADO_6;
					ESTADO_RESP = 0;
					INSTRUCCION = "6) (" + (Math.floor(ESTADO_RESP/2)+1) + "/4) Cambie el problema a la forma vertical y resuelvalo.";
					{
						num1D=Math.floor(Math.random()*7+1);
						num1U=Math.floor(Math.random()*7+1);
						num2D = 0;
						num2U = 0;
					}
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_5;
					INSTRUCCION = "5) (" + (Math.floor(ESTADO_RESP/2)+1) + "/8) Haga las siguientes restas.";
					if( ESTADO_RESP%2 == 0 )
						CalcNums();
				}
			break;
		case ESTADO_6:
				if( ESTADO_RESP >= 20 )
				{
					ESTADO_ACTUAL = ESTADO_7;        
					INSTRUCCION = "7) (1/4) Resuelva los siguientes problemas desarrollando el C\xE1lculo: " + problemas7[0];
					ESTADO_RESP = 0;
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_6;
					INSTRUCCION = "6) (" + (Math.floor(ESTADO_RESP/5)+1) + "/4) Cambie el problema a la forma vertical y resuelvalo.";
					if( ESTADO_RESP%5 == 0 )
					{
						num1D=Math.floor(Math.random()*7+1);
						num1U=Math.floor(Math.random()*7+1);
						num2D = 0;
						num2U = 0;
					}
				}
			break;
		case ESTADO_7:
				if( ESTADO_RESP >= 24 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_7;
					if( ESTADO_RESP%6 == 0 )
						INSTRUCCION = "7) (" + (Math.floor(ESTADO_RESP/6)+1)  + 
							"/4) Resuelva los siguientes problemas desarrollando el C\xE1lculo: " + problemas7[Math.floor(ESTADO_RESP/6)];
				}
			break;
    }
}


function DRAW(context)
{
	context.font = Math.floor(50*(percentage_scale+percentage_scale)/2) + "pt CHALK";
	INSTRUCCION_COLOR = "#000000";
	DRAW_INSTRUCTION();
	if( ESTADO_ACTUAL == ESTADO_7 || ESTADO_ANTERIOR == ESTADO_7  )
	{
		for( i = 0 ; i < ESTADO_RESP%6 ; i++ )
			context.fillText( respuestas7[Math.floor(ESTADO_RESP/6)*6 + i] ,consola_pos[i==4?5:i==5?4:i][0]*percentage_scale,
														consola_pos[i==4?5:i==5?4:i][1]*percentage_scale);
		CONSOLA_X = consola_pos[ESTADO_RESP%6==4?5:ESTADO_RESP%6==5?4:ESTADO_RESP%6][0];
		CONSOLA_Y = consola_pos[ESTADO_RESP%6==4?5:ESTADO_RESP%6==5?4:ESTADO_RESP%6][1];
	}
	else
	{
		var n2 = (ESTADO_ACTUAL==ESTADO_3||ESTADO_ANTERIOR==ESTADO_3)?num1D*10+num2U:
					( (ESTADO_ACTUAL==ESTADO_5||ESTADO_ANTERIOR==ESTADO_5)?num2U: num2D*10+num2U);
		var n1 = num1D*10+num1U - n2;
			for( i = 0; i <  n1+n2; i++ )
				context.drawImage( i<n1?p0:p1 , (900 + 30*(i%10) )*percentage_scale , 
					  (200 + 30*(Math.floor(i/10)) )*percentage_scale , p0.width*percentage_scale , p0.height*percentage_scale );
	}
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2  )
	{
		context.fillText( (num1D*10 + num1U) + " - " + (num2D*10+num2U) ,400*percentage_scale,260*percentage_scale);	
		if( ESTADO_RESP%6 == 5 )
				context.fillStyle = "#FF0000";
				
		if( ESTADO_RESP%6 > 0 ) context.fillText(num1D,consola_pos[0][0]*percentage_scale,consola_pos[0][1]*percentage_scale);
		if( ESTADO_RESP%6 > 2 ) context.fillText(num2D,consola_pos[2][0]*percentage_scale,consola_pos[2][1]*percentage_scale);
		
		if( ESTADO_RESP%6 == 5 )
				context.fillStyle = "#000000";
			
		
		if( ESTADO_RESP%6 == 4 )
			context.fillStyle = "#FF0000";
		
		if( ESTADO_RESP%6 > 3 ) context.fillText(num2U,consola_pos[3][0]*percentage_scale,consola_pos[3][1]*percentage_scale);
		if( ESTADO_RESP%6 > 1 ) context.fillText(num1U,consola_pos[1][0]*percentage_scale,consola_pos[1][1]*percentage_scale);
		
		if( ESTADO_RESP%6 == 4 )
				context.fillStyle = "#000000";
				
		if( ESTADO_RESP%6 > 4 ) context.fillText((num1U-num2U),consola_pos[5][0]*percentage_scale,consola_pos[5][1]*percentage_scale);
			CONSOLA_X = consola_pos[ESTADO_RESP%6==4?5:ESTADO_RESP%6==5?4:ESTADO_RESP%6][0];
			CONSOLA_Y = consola_pos[ESTADO_RESP%6==4?5:ESTADO_RESP%6==5?4:ESTADO_RESP%6][1];
	}
	if( ESTADO_ACTUAL == ESTADO_4 || ESTADO_ANTERIOR == ESTADO_4  ||
	    ESTADO_ACTUAL == ESTADO_6 || ESTADO_ANTERIOR == ESTADO_6 )
	{
		
		context.fillText( (num1D*10 + num1U)+ " - " + 
						  ((num2D*10 + num2U)) ,400*percentage_scale,260*percentage_scale);	
						  
		if( (ESTADO_ACTUAL==ESTADO_4||ESTADO_ANTERIOR==ESTADO_4) )
		{
			if( ESTADO_RESP%6 == 5 )
				context.fillStyle = "#FF0000";
			if( ESTADO_RESP%6 > 0 ) context.fillText(num1D,consola_pos[0][0]*percentage_scale,consola_pos[0][1]*percentage_scale);
			if( ESTADO_RESP%6 > 2 ) context.fillText(num2D,consola_pos[2][0]*percentage_scale,consola_pos[2][1]*percentage_scale);
			
			if( ESTADO_RESP%6 == 5 )
				context.fillStyle = "#000000";
			if( ESTADO_RESP%6 == 4 )
				context.fillStyle = "#FF0000";
				
			if( ESTADO_RESP%6 > 1 ) context.fillText(num1U,consola_pos[1][0]*percentage_scale,consola_pos[1][1]*percentage_scale);
			if( ESTADO_RESP%6 > 3 ) context.fillText(num2U,consola_pos[3][0]*percentage_scale,consola_pos[3][1]*percentage_scale);
			if( ESTADO_RESP%6 == 4 )
				context.fillStyle = "#000000";
				
			if( ESTADO_RESP%6 > 4 ) context.fillText((num1U-num2U),consola_pos[5][0]*percentage_scale,consola_pos[5][1]*percentage_scale);
		}
		else
		{/*ESTADO 6*/
			if( ESTADO_RESP%5 > 0 ) context.fillText(num1D,consola_pos[0][0]*percentage_scale,consola_pos[0][1]*percentage_scale);
			if( ESTADO_RESP%5 > 1 ) context.fillText(num1U,consola_pos[1][0]*percentage_scale,consola_pos[1][1]*percentage_scale);
			if( ESTADO_RESP%5 > 2 ) context.fillText(num2U,consola_pos[3][0]*percentage_scale,consola_pos[3][1]*percentage_scale);
			if( ESTADO_RESP%5 > 3 ) context.fillText(num1U-num2U,consola_pos[5][0]*percentage_scale,consola_pos[5][1]*percentage_scale);
		}
		
		
		CONSOLA_X = consola_pos[   (ESTADO_ACTUAL==ESTADO_4||ESTADO_ANTERIOR==ESTADO_4)?pos4[ESTADO_RESP%6]:pos6[ESTADO_RESP%5]    ][0];
		CONSOLA_Y = consola_pos[   (ESTADO_ACTUAL==ESTADO_4||ESTADO_ANTERIOR==ESTADO_4)?pos4[ESTADO_RESP%6]:pos6[ESTADO_RESP%5]    ][1];
	}

	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 || 
	    ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 ||
		ESTADO_ACTUAL == ESTADO_5 || ESTADO_ANTERIOR == ESTADO_5 )
	{
		
		
		if( ESTADO_RESP%2 == 0 )
				context.fillStyle = "#FF0000";
		context.fillText(num1U,(consola_pos[1][0])*percentage_scale,(consola_pos[1][1])*percentage_scale);
		context.fillText(num2U,(consola_pos[3][0])*percentage_scale,(consola_pos[3][1])*percentage_scale);
		if( ESTADO_RESP%2 == 0 )
				context.fillStyle = "#000000";
		
			if( ESTADO_RESP%2 == 1 )
				context.fillStyle = "#FF0000";
		context.fillText(num1D,(consola_pos[0][0])*percentage_scale,(consola_pos[0][1])*percentage_scale);
		if( ESTADO_ACTUAL != ESTADO_5 && ESTADO_ANTERIOR != ESTADO_5 )
		{
			if( ESTADO_ACTUAL != ESTADO_3 && ESTADO_ANTERIOR != ESTADO_3 ) 
				context.fillText(num2D,(consola_pos[2][0])*percentage_scale,(consola_pos[2][1])*percentage_scale);
			else
				context.fillText(num1D,(consola_pos[2][0])*percentage_scale,(consola_pos[2][1])*percentage_scale);
		}
		
		if( ESTADO_RESP%2 == 1 )
				context.fillStyle = "#000000";
		
		if( ESTADO_RESP%2 == 0 )
		{
			CONSOLA_X = consola_pos[5][0];
			CONSOLA_Y = consola_pos[5][1];
		}
		else
		{
			context.fillText(num1U-num2U,(consola_pos[5][0])*percentage_scale,(consola_pos[5][1])*percentage_scale);
			CONSOLA_X = consola_pos[4][0];
			CONSOLA_Y = consola_pos[4][1];
		}
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
			case ESTADO_3:
					if ( ESTADO_RESP%2==0 )
						CORRECTO = (parseInt(CONSOLA) == (num1U-num2U) );
					else
						CORRECTO = (CONSOLA == "" || CONSOLA == "0");
				break;
			case ESTADO_5:
					CORRECTO = (parseInt(CONSOLA) == (ESTADO_RESP%2==0?(num1U-num2U):(num1D) ));
				break;
			case ESTADO_2:
					switch(ESTADO_RESP%6){
						case 0: CORRECTO = parseInt(CONSOLA) == num1D; break;
						case 1: CORRECTO = parseInt(CONSOLA) == num1U; break;
						case 2: CORRECTO = parseInt(CONSOLA) == num2D; break;
						case 3: CORRECTO = parseInt(CONSOLA) == num2U; break;
						case 4: CORRECTO = parseInt(CONSOLA) == num1U-num2U; break;
						case 5: CORRECTO = parseInt(CONSOLA) == num1D-num2D; break;}
				break;
			case ESTADO_4:
					switch(ESTADO_RESP%6){
						case 0: CORRECTO = parseInt(CONSOLA) == num1D; break;
						case 1: CORRECTO = parseInt(CONSOLA) == num1U; break;
						case 2: CORRECTO = parseInt(CONSOLA) == num2D; break;
						case 3: CORRECTO = parseInt(CONSOLA) == num2U; break;
						case 4: CORRECTO = parseInt(CONSOLA) == num1U-num2U; break;
						case 5: CORRECTO = (CONSOLA == "" || CONSOLA == "0"); break;}
				break;
			case ESTADO_6:
					switch(ESTADO_RESP%5){
						case 0: CORRECTO = parseInt(CONSOLA) == num1D; break;
						case 1: CORRECTO = parseInt(CONSOLA) == num1U; break;
						case 2: CORRECTO = parseInt(CONSOLA) == num2U; break;
						case 3: CORRECTO = parseInt(CONSOLA) == num1U; break;
						case 4: CORRECTO = parseInt(CONSOLA) == num1D; break;}
				break;
			case ESTADO_7:
					 CORRECTO = parseInt(CONSOLA) == respuestas7[ESTADO_RESP];
				break;
		}
		if( CORRECTO )
			EJER_CORRECTO_CONSOLA(1);
		else
			EJER_INCORRECTO_CONSOLA(-1);
	}
}
