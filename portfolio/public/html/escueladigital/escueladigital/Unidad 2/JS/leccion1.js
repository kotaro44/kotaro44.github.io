//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 3,
        ESTADO_2_1 = 4,
        ESTADO_2_2 = 5,
		ESTADO_3 = 6,
		ESTADO_4 = 7;

//CONTROLS
var ESTADO_1_RESP = 0,ESTADO_2_1_RESP = 0,ESTADO_2_2_RESP = 0,ESTADO_3_RESP = 0,ESTADO_4_RESP=0,EJER_4 = 0;
    
//OBJETOS DIBUJABLES
var segrect = new Drawable(getImg("IMG/segrect.png"),280,200);
    
var mundo = [segrect];

//VARIABLES
var  resp = 0,puntos = [ [0,0,0,0], [0,0,0,0] , [0,0,0,0] , [0,0,0,0] ],
    puntos2 = [0,0,0,0],puntos22 = [0,0,0,0],LastPoint = false,
	resp3 = [['a','d','h','e'],['f','c','g','b']],
	SiguientePunto = 0,FiguraActual = 0,
	figuras = [
			   [[900,200],[400,200],[400,500],[900,500]],
	           [[400,200],[900,350],[400,500]],
			   [[400,350],[900,500],[900,200]],
			   [[400,200],[900,200],[900,500],[400,500]]
			  ],
	touches = [[0,0],[0,0],[0,0],[0,0],[0,0]];
    

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = LECCION_1;
	UNIDAD_ACTUAL = UNIDAD_2;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) Trace 3 l\xEDneas rectas en cualquier posici\xF3n.";
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
                ESTADO_ACTUAL = ESTADO_2_1;
                ESTADO_ANTERIOR = ESTADO_NINGUNO;
                INSTRUCCION = "2) (1/2) Dibuje dos puntos.";
            break;
        case ESTADO_2_1:
                ESTADO_ACTUAL = ESTADO_2_2;
                ESTADO_ANTERIOR = ESTADO_NINGUNO;
                INSTRUCCION = "2) (2/2) Dibuje una l\xEDnea entre los dos puntos.";
            break;
		case ESTADO_2_2:
                ESTADO_ACTUAL = ESTADO_3;
                ESTADO_ANTERIOR = ESTADO_NINGUNO;
                INSTRUCCION = "3) Escriba las letras de las l\xEDneas que representan un segmento.";
				segrect.Visible = true;
            break;
		case ESTADO_3:
				if( ESTADO_3_RESP == 0 )
				{
					ESTADO_ACTUAL = ESTADO_3;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "3) Escriba las letras de las l\xEDneas que representan una recta.";
					ESTADO_3_RESP = 1;
				}
                else
				{
					segrect.Visible = false;
					ESTADO_ACTUAL = ESTADO_4;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "4) (1/4) Una los puntos siguiendo el punto Naranja.";
				}
            break;
		case ESTADO_4:
				if( EJER_4 == 4 )
				{
					FIN_LECCION();
				}
                ESTADO_ACTUAL = ESTADO_4;
                ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = (ESTADO_4_RESP == 0)?"4) (" + (EJER_4+1) + "/4) Una los puntos siguiendo el punto Naranja.":
							  (ESTADO_4_RESP == 1)?"4) (" + (EJER_4+1) + "/4) Ingrese el nombre de la figura plana.":
							                       "4) (" + (EJER_4+1) + "/4) Ingrese el n\xFAmero de los segmentos.";
				
            break;
    }
}


function DRAW(context)
{
        context.fillStyle = "#FFFFFF";
        context.font = Math.floor(20*(percentage_scale+percentage_scale)) + "pt CHALK";
        DRAW_INSTRUCTION(context,INSTRUCCION);
		
		if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 || 
			( ESTADO_ACTUAL == ESTADO_4 && ESTADO_4_RESP != 0 ) || ( ESTADO_ANTERIOR == ESTADO_4 && ESTADO_4_RESP != 0 ) )
			DRAW_CONSOLA();
        
		if( ESTADO_ACTUAL == ESTADO_4 || ESTADO_ANTERIOR == ESTADO_4 )
		{
			for( i = 1 ; i <= figuras[FiguraActual].length ; i = i + 1 )
			{
				if( touches[i][0] != 0 && touches[i][1] != 0 )
				{
					context.lineWidth=2;
					context.strokeStyle="white";
					context.beginPath();
					context.moveTo(( touches[i-1][0] )*percentage_scale , ( touches[i-1][1] )*percentage_scale);
					context.lineTo(( touches[i][0] )*percentage_scale , ( touches[i][1])*percentage_scale);
					context.stroke();
				}
				else
				{
					if( touches[0][0] != 0 && touches[0][1] != 0 )
					{
						context.lineWidth=2;
						context.strokeStyle="white";
						context.beginPath();
						context.moveTo(( touches[i-1][0] )*percentage_scale , ( touches[i-1][1] )*percentage_scale);
						context.lineTo(( DestX )*percentage_scale , ( DestY )*percentage_scale);
						context.stroke();
					}
					
					i = touches.length;
				}
			}
		
			for( i = 0 ; i < figuras[FiguraActual].length ; i = i + 1 )
			{
				context.fillStyle = ((i==SiguientePunto)||(i==0&&LastPoint)?"#FF8808":"#FFFFFF");
                context.beginPath();
                context.arc( ( figuras[FiguraActual][i][0] )*percentage_scale,( figuras[FiguraActual][i][1] )*percentage_scale,8*(percentage_scale+percentage_scale)/2,0,Math.PI*2,true);
                context.closePath();
                context.fill();
			}
		}
		
        if( ESTADO_ACTUAL == ESTADO_2_1 || ESTADO_ANTERIOR == ESTADO_2_1 ||
		    ESTADO_ACTUAL == ESTADO_2_2 || ESTADO_ANTERIOR == ESTADO_2_2 )
        {
		
			if( puntos22[0] != 0 &&  puntos22[1] != 0 )
			{
				if( puntos22[2] != 0 &&  puntos22[3] != 0 )
				{
					context.lineWidth=2;
					context.strokeStyle="white";
					context.beginPath();
					context.moveTo(( puntos22[0] )*percentage_scale ,( puntos22[1] )*percentage_scale);
					context.lineTo(( puntos22[2] )*percentage_scale , ( puntos22[3])*percentage_scale);
					context.stroke();
				}
				else
				{
					context.lineWidth=2;
					context.strokeStyle="white";
					context.beginPath();
					context.moveTo(( puntos22[0] )*percentage_scale ,( puntos22[1] )*percentage_scale);
					context.lineTo(( DestX )*percentage_scale , ( DestY )*percentage_scale);
					context.stroke();

				}
			}
		
            if( puntos2[0] != 0 &&  puntos2[1] != 0 )
            {
                context.fillStyle="#FFFFFF";
                context.beginPath();
                context.arc(puntos2[0]*percentage_scale,puntos2[1]*percentage_scale,8*(percentage_scale+percentage_scale)/2,0,Math.PI*2,true);
                context.closePath();
                context.fill();
            }
            
            if( puntos2[2] != 0 &&  puntos2[3] != 0 )
            {
                context.fillStyle="#FFFFFF";
                context.beginPath();
                context.arc(puntos2[2]*percentage_scale,puntos2[3]*percentage_scale,8*(percentage_scale+percentage_scale)/2,0,Math.PI*2,true);
                context.closePath();
                context.fill();
            }
        }
        
        if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 )
        {
			
            for( i = 0 ; i < puntos.length; i = i + 1 )
            {
				
                if( puntos[i][0] != 0 &&  puntos[i][1] != 0 )
                {
					
                    if(  puntos[i][2] != 0 &&  puntos[i][3] != 0)
                    {
                        context.lineWidth=2;
                        context.strokeStyle="white";
                        context.beginPath();
                        context.moveTo(( puntos[i][0] )*percentage_scale ,( puntos[i][1] )*percentage_scale);
                        context.lineTo(( puntos[i][2] )*percentage_scale , ( puntos[i][3])*percentage_scale);
                        context.stroke();
						
                    }
                    else
                    {
						
                        context.lineWidth=2;
                        context.strokeStyle="white";
                        context.beginPath();
                        context.moveTo(( puntos[i][0] )*percentage_scale ,( puntos[i][1] )*percentage_scale);
                        context.lineTo(( DestX )*percentage_scale , ( DestY )*percentage_scale);
                        context.stroke();
						
                    }
					
					
                }  
            }       
        }
        
        
        
}

function MOUSE(X,Y)
{
	if( ESTADO_ACTUAL == ESTADO_4 && ESTADO_4_RESP == 0)
    {  
		if( DISTANCIA(figuras[FiguraActual][LastPoint?0:SiguientePunto][0],
					  figuras[FiguraActual][LastPoint?0:SiguientePunto][1],X,Y) < 8 )
		{
			EJER_CORRECTO(1);
			touches[SiguientePunto][0] = X;
			touches[SiguientePunto][1] = Y;
			SiguientePunto = SiguientePunto + 1;
			if( LastPoint )
			{
				LastPoint = false;
				ESTADO_4_RESP = 1;
				
			}

			if( SiguientePunto == figuras[FiguraActual].length )
			{
				LastPoint = true;
			}
			
		}
		else
			EJER_INCORRECTO(-1);
		
		
	}

    if( ESTADO_ACTUAL == ESTADO_2_1 )
    {   
        if( ESTADO_2_1_RESP == 0 )
        {
            puntos2[0] = X;
            puntos2[1] = Y;
            ESTADO_2_1_RESP = 1;
        }
        else
        {
            puntos2[2] = X;
            puntos2[3] = Y;
            ESTADO_2_1_RESP = 2;
            EJER_CORRECTO(1);
        }
        
    }
	
	if( ESTADO_ACTUAL == ESTADO_2_2 )
    {   
        if( ESTADO_2_2_RESP == 0 )
        {
            puntos22[0] = X;
            puntos22[1] = Y;
            ESTADO_2_2_RESP = 1;
        }
        else
        {
            puntos22[2] = X;
            puntos22[3] = Y;
            ESTADO_2_2_RESP = 2;
			
			if( DISTANCIA(puntos2[0],puntos2[1],puntos22[0],puntos22[1]) < 8 && DISTANCIA(puntos2[2],puntos2[3],puntos22[2],puntos22[3]) < 8 ||
			    DISTANCIA(puntos2[0],puntos2[1],puntos22[2],puntos22[3]) < 8 && DISTANCIA(puntos2[2],puntos2[3],puntos22[0],puntos22[1]) < 8)
				EJER_CORRECTO(1);
			else
			{
				puntos22 = [0,0,0,0];
				ESTADO_2_2_RESP = 0;
				EJER_INCORRECTO(-1);
			}
			
			
        }
        
    }
    
    if( ESTADO_ACTUAL == ESTADO_1 )
    {    
        if( ESTADO_1_RESP%2 == 0 )
        {
            puntos[ESTADO_1_RESP/2][0] = X;
            puntos[ESTADO_1_RESP/2][1] = Y;
        }
        else
        {
            puntos[Math.floor(ESTADO_1_RESP/2)][2] = X;
            puntos[Math.floor(ESTADO_1_RESP/2)][3] = Y;
        }
        
        ESTADO_1_RESP = ESTADO_1_RESP + 1;
        
        if( ESTADO_1_RESP == 6 )
            EJER_CORRECTO(1);

    }
}


function INPUT(KEYCODE)
{
    if( ESTADO_ACTUAL == ESTADO_3 || ( ESTADO_ACTUAL == ESTADO_4 && ESTADO_4_RESP != 0 ) )
    {
        if( CONSOLA_KEYDOWN(KEYCODE) )
        {
			switch(ESTADO_ACTUAL)
			{
				case ESTADO_3:
						var x = 0;
						for( i = 0 ; i < CONSOLA.length; i = i + 1 )
							for( j = 0 ; j < resp3[ESTADO_3_RESP].length ; j = j + 1 )
								if( resp3[ESTADO_3_RESP][j] == CONSOLA[i] )
								{
									resp3[ESTADO_3_RESP][j] = 'X';
									x = x +1;
								}
						if( x == 4 && CONSOLA.length == 4  )
							EJER_CORRECTO_CONSOLA(1);
						else
							EJER_INCORRECTO_CONSOLA(-1);
						resp3 = [['a','d','h','e'],['f','c','g','b']];
					break;
				case ESTADO_4:
							if(  CONSOLA == ((EJER_4==0||EJER_4==3)?(ESTADO_4_RESP==1?"rectangulo":"4"):
												ESTADO_4_RESP==1?"triangulo":"3" ) )
							{
								EJER_CORRECTO_CONSOLA(1);
								ESTADO_4_RESP = (ESTADO_4_RESP+1)%3;
								
								if( EJER_4 == 3 )
								{
									EJER_4++;
									return;
								}
								
								if( ESTADO_4_RESP == 0 )
								{
									SiguientePunto = 0;
									FiguraActual++;
									LastPoint = false;
									touches = [[0,0],[0,0],[0,0],[0,0],[0,0]];
									EJER_4++;
								}
							}
							else
								EJER_INCORRECTO_CONSOLA(-1);
					break;
			}
        }
    }
}
