//Estados probablemente esto servira para todas las lecciones
var	ESTADO_1 = 3,
		ESTADO_2 = 4,
		ESTADO_3 = 5,
		ESTADO_4 = 6,
		ESTADO_5 = 7,
		ESTADO_6 = 8,
		ESTADO_7 = 9;
		
//OBJETOS DIBUJABLES
var cuerpo = new Drawable(getImg("IMG/cuerpo.png"),450,350),
	tacha = getImg("IMG/tacha.png");
	
var mundo = [cuerpo];
    
	
var consola_pos = [[560,420],[660,420],[560,520],[660,520], [560,320],[660,320] , [660,620] ,[560,620]],
	num1D=0,num1U=0,num2D=0,num2U = 0,ESTADO_RESP = 0,p0 = getImg("IMG/p0.png"),p1 = getImg("IMG/p2.png");

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = LECCION_3;
	UNIDAD_ACTUAL = UNIDAD_5;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) (1/4) Haga las siguientes restas.";
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
		num1D=Math.floor(Math.random()*6 + 3);
		if( ESTADO_ACTUAL == ESTADO_4 ||  ESTADO_ACTUAL == ESTADO_5 )
		{
			num2D = num1D - 1;
		}
		else
		{
			do{
				num2D=Math.floor(Math.random()*4+1);
			}while(num2D>(num1D-2));
		}

		num1U=((ESTADO_ACTUAL==ESTADO_2||ESTADO_ACTUAL==ESTADO_5||ESTADO_ACTUAL==ESTADO_7)?
						0:Math.floor(Math.random()*4)+1);
		num2U=Math.floor(Math.random()*4+5);
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
					CalcNums();
					ESTADO_RESP=0;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Haga las siguientes restas.";
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Haga las siguientes restas.";
					if( ESTADO_RESP%4 == 0 )
						CalcNums();
				}
            break;
		case ESTADO_2:
				if( ESTADO_RESP >= 16 )
				{
					ESTADO_ACTUAL = ESTADO_3;
					CalcNums();
					ESTADO_RESP=0;
					INSTRUCCION = "3) (" + (Math.floor(ESTADO_RESP/4)+1) + "/6) Calcule cabaindo el PO a la forma vertical.";
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Haga las siguientes restas.";
					if( ESTADO_RESP%4 == 0 )
						CalcNums();
				}
            break;
		case ESTADO_3:
				if( ESTADO_RESP >= 48 )
				{
					ESTADO_ACTUAL = ESTADO_4;
					ESTADO_RESP = 0;
					INSTRUCCION = "4) (" + (Math.floor(ESTADO_RESP/8)+1) + "/4) Haga las siguientes restas.";
						CalcNums();
					
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) (" + (Math.floor(ESTADO_RESP/8)+1) + "/6) Calcule cabaindo el PO a la forma vertical.";
					if( ESTADO_RESP%8 == 0 )
						CalcNums();
				}
            break;
		case ESTADO_4:
				if( ESTADO_RESP >= 16 )
				{
					ESTADO_ACTUAL = ESTADO_5;
					ESTADO_RESP = 0;
					INSTRUCCION = "5) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Haga las siguientes restas.";
						CalcNums();
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_4;
					INSTRUCCION = "4) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Haga las siguientes restas.";
					if( ESTADO_RESP%4 == 0 )
						CalcNums();
				}
            break;
		case ESTADO_5:
				if( ESTADO_RESP >= 16 )
				{
					ESTADO_ACTUAL = ESTADO_6;
					ESTADO_RESP = 0;
					INSTRUCCION = "6) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Haga las siguientes restas.";
						CalcNums();
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_5;
					INSTRUCCION = "5) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Haga las siguientes restas.";
					if( ESTADO_RESP%4 == 0 )
						CalcNums();
				}
            break;
		case ESTADO_6:
				if( ESTADO_RESP >= 16 )
				{
					ESTADO_ACTUAL = ESTADO_7;
					ESTADO_RESP = 0;
					INSTRUCCION = "7) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Haga las siguientes restas.";
						CalcNums();
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_6;
					INSTRUCCION = "6) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Haga las siguientes restas.";
					if( ESTADO_RESP%4 == 0 )
						CalcNums();
				}
            break;
		case ESTADO_7:
				if( ESTADO_RESP >= 16 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_7;
					INSTRUCCION = "7) (" + (Math.floor(ESTADO_RESP/4)+1) + "/4) Haga las siguientes restas.";
					if( ESTADO_RESP%4 == 0 )
						CalcNums();
				}
            break;
		
    }
}


function DRAW(context)
{
	context.font = Math.floor(50*(percentage_scale+percentage_scale)/2) + "pt CHALK";
	INSTRUCCION_COLOR = "#000000";
	DRAW_INSTRUCTION();
	
	var n2 = (ESTADO_ACTUAL == ESTADO_6 || ESTADO_ANTERIOR == ESTADO_6 || 
	               ESTADO_ACTUAL == ESTADO_7 || ESTADO_ANTERIOR == ESTADO_7)? num2U :num2D*10+num2U;
	var n1 = num1D*10+num1U -n2;
			for( i = 0; i <  n1+n2; i++ )
				context.drawImage( i<n1?p0:p1 , (900 + 30*(i%10) )*percentage_scale , 
					  (200 + 30*(Math.floor(i/10)) )*percentage_scale , p0.width*percentage_scale , p0.height*percentage_scale );


	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1  ||
	    ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 ||
		ESTADO_ACTUAL == ESTADO_4 || ESTADO_ANTERIOR == ESTADO_4 ||
		ESTADO_ACTUAL == ESTADO_5 || ESTADO_ANTERIOR == ESTADO_5 ||
		ESTADO_ACTUAL == ESTADO_6 || ESTADO_ANTERIOR == ESTADO_6 ||
		ESTADO_ACTUAL == ESTADO_7 || ESTADO_ANTERIOR == ESTADO_7 )
	{
		
		context.fillText(num1D,(consola_pos[0][0])*percentage_scale,(consola_pos[0][1])*percentage_scale);
		
		if( ESTADO_RESP%4 == 3)
				context.fillStyle = "#FF0000";
		if( (ESTADO_ACTUAL != ESTADO_6 && ESTADO_ANTERIOR != ESTADO_6) && 
		    (ESTADO_ACTUAL != ESTADO_7 && ESTADO_ANTERIOR != ESTADO_7) )
		context.fillText(num2D,(consola_pos[2][0])*percentage_scale,(consola_pos[2][1])*percentage_scale);
		if( ESTADO_RESP%4 == 3)
				context.fillStyle = "#000000";
				
				
			
		if( ESTADO_RESP%4 >= 0 && ESTADO_RESP%4 <= 2)
				context.fillStyle = "#FF0000";
		context.fillText(num2U,(consola_pos[3][0])*percentage_scale,(consola_pos[3][1])*percentage_scale);
		if( ESTADO_RESP%4 >= 0 && ESTADO_RESP%4 <= 2)
				context.fillStyle = "#000000";
				
		if( ESTADO_RESP%4 == 0 || ESTADO_RESP%4 == 1)
				context.fillStyle = "#FF0000";		
		context.fillText(num1U,(consola_pos[1][0])*percentage_scale,(consola_pos[1][1])*percentage_scale);
		if( ESTADO_RESP%4 == 0 || ESTADO_RESP%4 == 1)
				context.fillStyle = "#000000";	
		
		if( ESTADO_RESP%4 > 0 )
		{
			if( ESTADO_RESP%4 == 3)
				context.fillStyle = "#FF0000";
				
			context.fillText((num1D-1),(consola_pos[4][0])*percentage_scale,(consola_pos[4][1])*percentage_scale);
			context.drawImage( tacha ,  (consola_pos[0][0]-15)*percentage_scale,(consola_pos[0][1] -60)*percentage_scale ,
					tacha.width*percentage_scale,tacha.height*percentage_scale);
					
			if( ESTADO_RESP%4 == 3)
				context.fillStyle = "#000000";
		}
		
		if( ESTADO_RESP%4 > 1 )
		{
			if( ESTADO_RESP%4 == 2)
				context.fillStyle = "#FF0000";
			context.fillText((num1U+10),(consola_pos[5][0])*percentage_scale,(consola_pos[5][1])*percentage_scale);
			context.drawImage( tacha ,  (consola_pos[1][0]-15)*percentage_scale,(consola_pos[1][1] -60)*percentage_scale ,
					tacha.width*percentage_scale,tacha.height*percentage_scale);
			if( ESTADO_RESP%4 == 2)
				context.fillStyle = "#000000";
		}
		
		if( ESTADO_RESP%4 > 2 )
			context.fillText((num1U+10-num2U),(consola_pos[6][0])*percentage_scale,(consola_pos[6][1])*percentage_scale);
		
		CONSOLA_X = consola_pos[ ESTADO_RESP%4 + 4][0];
		CONSOLA_Y = consola_pos[ ESTADO_RESP%4 + 4][1];
	}
	
	if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 )
	{
		context.fillText( (num1D*10+num1U) + "-" + (num2D*10+num2U)+ "=" ,(180)*percentage_scale,(300)*percentage_scale);
		
		if( ESTADO_RESP%8 > 0 )
			context.fillText(num1D,(consola_pos[0][0])*percentage_scale,(consola_pos[0][1])*percentage_scale);
		if( ESTADO_RESP%8 > 1 )
			context.fillText(num1U,(consola_pos[1][0])*percentage_scale,(consola_pos[1][1])*percentage_scale);
		if( ESTADO_RESP%8 > 2 )
			context.fillText(num2D,(consola_pos[2][0])*percentage_scale,(consola_pos[2][1])*percentage_scale);
		if( ESTADO_RESP%8 > 3 )
			context.fillText(num2U,(consola_pos[3][0])*percentage_scale,(consola_pos[3][1])*percentage_scale);
		
		if( ESTADO_RESP%8 > 4 )
		{
			context.fillText((num1D-1),(consola_pos[4][0])*percentage_scale,(consola_pos[4][1])*percentage_scale);
			context.drawImage( tacha ,  (consola_pos[0][0]-15)*percentage_scale,(consola_pos[0][1] -60)*percentage_scale ,
					tacha.width*percentage_scale,tacha.height*percentage_scale);
		}
		
		if( ESTADO_RESP%8 > 5 )
		{
			context.fillText((num1U+10),(consola_pos[5][0])*percentage_scale,(consola_pos[5][1])*percentage_scale);
			context.drawImage( tacha ,  (consola_pos[1][0]-15)*percentage_scale,(consola_pos[1][1] -60)*percentage_scale ,
					tacha.width*percentage_scale,tacha.height*percentage_scale);
		}
		
		if( ESTADO_RESP%8 > 6 )
			context.fillText((num1U+10-num2U),(consola_pos[6][0])*percentage_scale,(consola_pos[6][1])*percentage_scale);
			
		CONSOLA_X = consola_pos[ ESTADO_RESP%8 ][0];
		CONSOLA_Y = consola_pos[ ESTADO_RESP%8 ][1];
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
		CORRECTO = false;
		
		switch(ESTADO_ACTUAL)
		{
			case ESTADO_4:
			case ESTADO_5:
			case ESTADO_6:
			case ESTADO_7:
					if( ESTADO_RESP%4 == 3 )
						CORRECTO = (ESTADO_ACTUAL==ESTADO_6||ESTADO_ACTUAL==ESTADO_7)? 
									(parseInt(CONSOLA) == num1D-1):( CONSOLA == "" || CONSOLA == "0" );
					else
						CORRECTO = (parseInt(CONSOLA) ==  (ESTADO_RESP%4==0?(num1D-1):
													      (ESTADO_RESP%4==1?(num1U+10):
													                        (num1U+10-num2U))));
				break;
			case ESTADO_2:
			case ESTADO_1:
					CORRECTO = (parseInt(CONSOLA) ==  (ESTADO_RESP%4==0?(num1D-1):
													  (ESTADO_RESP%4==1?(num1U+10):
													  (ESTADO_RESP%4==2?(num1U+10-num2U):
													                    (num1D-num2D-1)))));
				break;
			case ESTADO_3:
					CORRECTO =  (parseInt(CONSOLA) == ( (ESTADO_RESP%8==0)? (num1D):
														(ESTADO_RESP%8==1)? (num1U):
														(ESTADO_RESP%8==2)? (num2D):
														(ESTADO_RESP%8==3)? (num2U):
														(ESTADO_RESP%8==4)? (num1D-1):
														(ESTADO_RESP%8==5)? (num1U+10):
														(ESTADO_RESP%8==6)? (num1U+10-num2U):
														                    (num1D-num2D-1) ));
				break;
		}
		if( CORRECTO )
			EJER_CORRECTO_CONSOLA(1);
		else
			EJER_INCORRECTO_CONSOLA(-1);
	}
}
