//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1_1 = 3,
        ESTADO_1_2 = 4,
        ESTADO_2_1 = 5,
        ESTADO_2_2 = 6,
        ESTADO_3 = 7,
        ESTADO_4 = 8,
        ESTADO_5 = 9,
        ESTADO_6 = 10;
        
//OBJETOS DIBUJABLES
var menor = new Drawable(getImg("IMG/menor.png"),600,250),
    mayor = new Drawable(getImg("IMG/mayor.png"),600,400),
    cuadrosA1 = new Drawable(getImg("IMG/cuadros5.png"),300,300),
    cuadrosA2 = new Drawable(getImg("IMG/cuadros6.png"),800,300),
    cuadrosB1 = new Drawable(getImg("IMG/cuadros7.png"),300,300),
    cuadrosB2 = new Drawable(getImg("IMG/cuadros8.png"),800,300),
    cuadrosC1 = new Drawable(getImg("IMG/cuadros9.png"),300,300),
    cuadrosC2 = new Drawable(getImg("IMG/cuadros10.png"),800,300),
    cuadrosD1 = new Drawable(getImg("IMG/cuadros11.png"),300,300),
    cuadrosD2 = new Drawable(getImg("IMG/cuadros12.png"),800,300),
    ej1 = new Drawable(getImg("IMG/ej1.png"),200,300),
    ej2 = new Drawable(getImg("IMG/ej2.png"),200,300),
    ej3 = new Drawable(getImg("IMG/ej3.png"),200,300),
    ej4 = new Drawable(getImg("IMG/ej4.png"),200,300),
	tacha = getImg("IMG/tacha.png");
     
var mundo = [menor,mayor,ej1,ej2,ej3,ej4,
             cuadrosA1,cuadrosA2,cuadrosB1,cuadrosB2,
             cuadrosC1,cuadrosC2,cuadrosD1,cuadrosD2];
    
//VARIABLES
var ordact = 0,resp = 0,ESTADO_1_1_EJER = 0,ESTADO_1_2_EJER = 0,ESTADO_3_EJER=0,
    numIzq = 0, numDer = 0,LISTA = [0,0,0,0,0,0,0,0], LISTAORD = [0,0,0,0,0,0,0,0],ESTADO_4_EJER=0,
    LISTAIND = [0,0,0,0,0,0,0,0] , YAESTA = [false,false,false,false,false,false,false,false],
    ENTRELISTA = [0,0,0,0,0,0,0],ENTRELIMITE = 0,ENTREINIT = 0,CDECENA = 0,CUNIDAD = 0,
    SCENTENA = 0, SDECENAUNIDAD = 0,ESTADO_6_EJER= 0,
    ENTREYAESTA = [false,false,false,false,false,false,false,false,false],ESTADO_5_EJER = 0;

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	fondo.Visible = true;
	
	LECCION_ACTUAL = LECCION_4;
	UNIDAD_ACTUAL = UNIDAD_1;
	
	menor.SoyBoton(getImg("IMG/menors.png"));
    mayor.SoyBoton(getImg("IMG/mayors.png"));
}

function UPDATE()
{        

	if( boton_delay > 0 )
    {
        boton_delay = boton_delay -1;
        if( boton_delay == 0 )
        {
            if( menor.Boton_Seleccionado )
                menor.SwapSelect();
            if( mayor.Boton_Seleccionado )
                mayor.SwapSelect();
        }
    }
	
	
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1_1;        
                INSTRUCCION = "1) (1/8) Compare y seleccione < \xF3 >.";
                cuadrosA1.Visible = true;
                cuadrosA2.Visible = true;
                menor.Visible = true;
                mayor.Visible = true;
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
		case ESTADO_1_1:
				ESTADO_1_1_EJER = ESTADO_1_1_EJER + 1;
				if( ESTADO_1_1_EJER >= 4 )
				{
					ESTADO_ACTUAL = ESTADO_1_2;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "1) (5/8) Compare y seleccione < \xF3 >.";
					
					cuadrosD1.Visible = false;
					cuadrosD2.Visible = false;
					numIzq = Math.floor( Math.random()*800 + 100);
					numDer = numIzq;
					while( numDer == numIzq )
						numDer = Math.floor( Math.random()*800 + 100);

				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1_1;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "1) (" + (ESTADO_1_1_EJER+1) + "/8) Compare y seleccione < \xF3 >.";
					
					switch(ESTADO_1_1_EJER)
					{
						case 1:
								cuadrosA1.Visible = false;
								cuadrosA2.Visible = false;
								cuadrosB1.Visible = true;
								cuadrosB2.Visible = true;
							break;
						case 2:
								cuadrosB1.Visible = false;
								cuadrosB2.Visible = false;
								cuadrosC1.Visible = true;
								cuadrosC2.Visible = true;
							break;
						case 3:
								cuadrosC1.Visible = false;
								cuadrosC2.Visible = false;
								cuadrosD1.Visible = true;
								cuadrosD2.Visible = true;
							break;
					}
					
				}
			break;
	   case ESTADO_1_2:
				ESTADO_1_2_EJER = ESTADO_1_2_EJER+1;
				if( ESTADO_1_2_EJER >= 4 )
				{
					ESTADO_ACTUAL = ESTADO_2_1;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "2) (1/2) Ingrese los siguientes numeros de menor a mayor.";
					menor.Visible = false;
					mayor.Visible = false;
					for( i = 0 ; i < LISTA.length ; i = i +1 )
					{
						LISTA[i] = Math.floor( Math.random()*800 + 100);
						LISTAORD[i] = LISTA[i];
					}
					LISTAORD.sort();
						
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1_2;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "1) (" + (ESTADO_1_2_EJER+5) + "/8) Compare y seleccione < \xF3 >.";
					numIzq = Math.floor( Math.random()*800 + 100);
					numDer = numIzq;
					while( numDer == numIzq )
						numDer = Math.floor( Math.random()*800 + 100);
				}
		   break;
	   case ESTADO_2_1:
		   
				if( ordact != 7 )
				{
					for( i = 0 ; i < LISTA.length ; i = i +1)
					if( LISTA[i] == LISTAORD[ordact] && YAESTA[i] == false )
					{
						LISTAIND[ordact] = i;
						YAESTA[i] = true;
						i = LISTA.length;
					}
					ordact =  ordact + 1;
					ESTADO_ACTUAL = ESTADO_2_1;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2_2;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "2) (2/2) Ingrese los siguientes numeros de mayor a menor";
					ordact = 0;
					YAESTA = [false,false,false,false,false,false,false,false];
					LISTAIND = [0,0,0,0,0,0,0,0];
					
					for( i = 0 ; i < LISTA.length ; i = i +1 )
					{
						LISTA[i] = Math.floor( Math.random()*800 + 100);
						LISTAORD[i] = LISTA[i];
					}

					LISTAORD.sort();
					LISTAORD.reverse();
				}
		   break;
		   
		   case ESTADO_2_2:
		   
				if( ordact != 7 )
				{
					for( i = 0 ; i < LISTA.length ; i = i +1)
					if( LISTA[i] == LISTAORD[ordact] && YAESTA[i] == false )
					{
						LISTAIND[ordact] = i;
						YAESTA[i] = true;
						i = LISTA.length;
					}
					ordact =  ordact + 1;
					ESTADO_ACTUAL = ESTADO_2_2;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "3) (1/4) Escriba qu\xE9 n\xFAmero estaba escrito en la parte rota (Puede haber varias respuestas)";
					ej1.Visible = true;
				}
		   
				
		   break;
		
		case ESTADO_3:
				if( ESTADO_3_EJER != 3 )
				{
					switch(ESTADO_3_EJER)
					{
						case 0: ej1.Visible = false;
								ej2.Visible = true;
							break;
						case 1: ej2.Visible = false;
								ej3.Visible = true;
							break;
						case 2: ej3.Visible = false;
								ej4.Visible = true;
							break;
					}
					ESTADO_ACTUAL = ESTADO_3;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					ESTADO_3_EJER++;
					INSTRUCCION = "3) (" + (ESTADO_3_EJER+1)+ "/4) Escriba qu\xE9 n\xFAmero estaba escrito en la parte rota (Puede haber varias respuestas)";
				}
				else
				{
					ej4.Visible = false;
					ESTADO_ACTUAL = ESTADO_4;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "4) (1/4) Escriba en la l\xEDnea todos los n\xFAmeros que"+
						" est\xE1n entre los dos n\xFAmeros dados";
					for( i = 0 ; i < ENTRELISTA.length ; i = i +1 )
					{
						ENTRELISTA[i] = 0;
						ENTREYAESTA[i] = false;
					}
					
					ENTRELIMITE = Math.floor(Math.random()*5 + 4);
					ENTREINIT = Math.floor(Math.random()*850 + 50);
					for( i = 0 ; i < ENTRELIMITE ; i = i +1 )
						ENTRELISTA[i] = ENTREINIT + 1 + i;
					
				}
			break;
		case ESTADO_4:
					ESTADO_ACTUAL = ESTADO_4;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					var aux = true;
					for( i = 0 ;  i < ENTRELIMITE ; i = i +1 )
						if( ENTREYAESTA[i] == false )
							aux = false;
					if( aux )
					{
						ESTADO_4_EJER = ESTADO_4_EJER + 1;
						if( ESTADO_4_EJER == 4 )
						{
							ESTADO_ACTUAL = ESTADO_5; 
							ESTADO_ANTERIOR = ESTADO_NINGUNO;
							INSTRUCCION = "5) (1/8) Encuentre la decena pr\xF3xima para cada n\xFAmero siguiente.";
							CDECENA = (Math.floor( Math.random()*8 + 1))*10;
							CUNIDAD = (Math.floor( Math.random()*9 ));
						}
						else
						{
							INSTRUCCION = "4) (" + (ESTADO_4_EJER+1) +  "/4) Escriba en la l\xEDnea todos los n\xFAmeros que"+
								" est\xE1n entre los dos n\xFAmeros dados";
							for( i = 0 ; i < ENTRELISTA.length ; i = i +1 )
							{
								ENTRELISTA[i] = 0;
								ENTREYAESTA[i] = false;
							}

							ENTRELIMITE = Math.floor(Math.random()*5 + 4);
							ENTREINIT = Math.floor(Math.random()*850 + 50);
							for( i = 0 ; i < ENTRELIMITE ; i = i +1 )
								ENTRELISTA[i] = ENTREINIT + 1 + i;
						}
					}
						
			break;
		case ESTADO_5:
				ESTADO_5_EJER = ESTADO_5_EJER + 1;
				if( ESTADO_5_EJER == 8)
				{
					ESTADO_ACTUAL = ESTADO_6;        
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "6) (1/8) Encuentre la centena pr\xF3xima para cada n\xFAmero siguiente.";
					SCENTENA = (Math.floor( Math.random()*8 + 1))*100;
					SDECENAUNIDAD = (Math.floor( Math.random()*99 ));
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_5;        
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "5) (" + (ESTADO_5_EJER+1) + 
						"/8) Encuentre la decena pr\xF3xima para cada n\xFAmero siguiente.";
					CDECENA = (Math.floor( Math.random()*8 + 1))*10;
					CUNIDAD = (Math.floor( Math.random()*9 ));
				}
			break;
	   case ESTADO_6:
				ESTADO_6_EJER = ESTADO_6_EJER + 1;
				if( ESTADO_6_EJER == 8)
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_6;        
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "6) (" + (ESTADO_6_EJER+1) + 
						"/8) Encuentre la centena pr\xF3xima para cada n\xFAmero siguiente.";
					SCENTENA = (Math.floor( Math.random()*8 + 1))*100;
					SDECENAUNIDAD = (Math.floor( Math.random()*99 ));
				}
			break;
		
	}
}


function DRAW(context)
{
        context.fillStyle = "#FFFFFF";
        context.font = Math.floor(50*percentage_scale + "pt CHALK");
		
        DRAW_INSTRUCTION();
		
		if( ESTADO_ACTUAL == ESTADO_2_1 || ESTADO_ACTUAL == ESTADO_2_2 
				|| (ESTADO_ACTUAL >= ESTADO_3 && ESTADO_ACTUAL <= ESTADO_6) ||
			ESTADO_ANTERIOR == ESTADO_2_1 || ESTADO_ANTERIOR == ESTADO_2_2 
				|| (ESTADO_ANTERIOR >= ESTADO_3 && ESTADO_ANTERIOR <= ESTADO_6))
		{
			CONSOLA_SIZE = 50;
			CONSOLA_X = 100;
			CONSOLA_Y = 700;
			DRAW_CONSOLA();
		}
		
		if( ESTADO_ACTUAL == ESTADO_5 || ESTADO_ANTERIOR == ESTADO_5 )
        {
			context.font = Math.floor(90*percentage_scale + "pt CHALK");
             context.fillText(((CDECENA+CUNIDAD)+""),300*percentage_scale,350*percentage_scale);
        }
        
        if( ESTADO_ACTUAL == ESTADO_6 || ESTADO_ANTERIOR == ESTADO_6 )
        {
			context.font = Math.floor(90*percentage_scale + "pt CHALK");
             context.fillText(((SCENTENA+SDECENAUNIDAD)+""),300*percentage_scale,350*percentage_scale);
        }
        
        if( ESTADO_ACTUAL == ESTADO_4 || ESTADO_ANTERIOR == ESTADO_4 )
        {
            context.font = Math.floor(20*(percentage_scale+percentage_scale)) + "pt CHALK";
            context.fillText(ENTREINIT + " y " + (ENTRELIMITE+ENTREINIT+1) ,300*percentage_scale,300*percentage_scale);
            for( i = 0 ; i < ENTRELIMITE ; i = i + 1)
            {
                if( ENTREYAESTA[i] )
                    context.fillText(ENTRELISTA[i],(150 + i*100)*percentage_scale,500*percentage_scale);
            }
        }
        
        if( ESTADO_ACTUAL == ESTADO_1_2 || ESTADO_ANTERIOR == ESTADO_1_2 )
        {
			context.font = Math.floor(80*(percentage_scale+percentage_scale)/2) + "pt CHALK";
            context.fillText(numIzq,350*percentage_scale,400*percentage_scale);
            context.fillText(numDer,800*percentage_scale,400*percentage_scale);
        }
        
        if( ESTADO_ACTUAL == ESTADO_2_1 || ESTADO_ANTERIOR == ESTADO_2_1 || 
            ESTADO_ACTUAL == ESTADO_2_2 || ESTADO_ANTERIOR == ESTADO_2_2 )
        {
            context.font = Math.floor(40*(percentage_scale+percentage_scale)/2) + "pt CHALK";
            for( i = 0 ; i < LISTA.length ; i = i + 1 )
                context.fillText(LISTA[i]+"",(100 + 150*i)*percentage_scale,300*percentage_scale);
            for( i = 0 ; i < ordact ; i = i + 1 )
                context.drawImage(tacha,(100 + 150*LISTAIND[i] )*percentage_scale,
                                          240*percentage_scale,                
                tacha.width*percentage_scale,tacha.height*percentage_scale);
        }
}

function MOUSE(X,Y)
{
	if( ESTADO_ACTUAL == ESTADO_1_1 )
    {
	
        if( menor.Presionando(X,Y) && menor.Boton_Seleccionado == false )
        {
            menor.SwapSelect();
            boton_delay = 5;
                    CORRECTO = false;
                    switch(ESTADO_1_1_EJER)
                    {
                       case 0: case 1:
                           CORRECTO = false;
                           break;
                       case 2: case 3:
                           CORRECTO = true;
                           break;
                    }
                    if( CORRECTO )
						EJER_CORRECTO(1);
                    else
						EJER_INCORRECTO(-1);
        }
        
        if( mayor.Presionando(X,Y) && mayor.Boton_Seleccionado == false )
        {
            mayor.SwapSelect();
            boton_delay = 5;
            
            CORRECTO = false;
                    switch(ESTADO_1_1_EJER)
                    {
                       case 0: case 1:
                           CORRECTO = true;
                           break;
                       case 2: case 3:
                           CORRECTO = false;
                           break;
                    }
                    if( CORRECTO )
						EJER_CORRECTO(1);
                    else
						EJER_INCORRECTO(-1);
        }
    }
    
    if( ESTADO_ACTUAL == ESTADO_1_2 )
    {

        if( menor.Presionando(X,Y) && menor.Boton_Seleccionado == false )
        {
            menor.SwapSelect();
            boton_delay = 5;
                    if( numIzq < numDer )
						EJER_CORRECTO(1);
                    else
						EJER_INCORRECTO(-1);
        }
        
        if( mayor.Presionando(X,Y) && mayor.Boton_Seleccionado == false )
        {
            mayor.SwapSelect();
            boton_delay = 5;
                    if( numIzq > numDer )
						EJER_CORRECTO(1);
                    else
						EJER_INCORRECTO(-1);
        }
    }

}

function INPUT(KEYCODE)
{

	if( ESTADO_ACTUAL == ESTADO_2_1 || ESTADO_ACTUAL == ESTADO_2_2 
        || (ESTADO_ACTUAL >= ESTADO_3 && ESTADO_ACTUAL <= ESTADO_6))
    {
		if( CONSOLA_KEYDOWN(KEYCODE) )
		{
			CORRECTO = false;
			switch(ESTADO_ACTUAL)
			{
				case ESTADO_2_1: case ESTADO_2_2:
						CORRECTO = (parseInt(CONSOLA) == LISTAORD[ordact]);
					break;
				case ESTADO_3: 
						switch(ESTADO_3_EJER)
						{
							case 0:
								CORRECTO = (parseInt(CONSOLA) >= 7 && parseInt(CONSOLA) <= 9);
								break;
							case 1:
								CORRECTO = (parseInt(CONSOLA) >= 0 && parseInt(CONSOLA) <= 9);
								break;
							case 2:
								CORRECTO = (parseInt(CONSOLA) >= 6 && parseInt(CONSOLA) <= 9);
								break;
							case 3:
								CORRECTO = (parseInt(CONSOLA) >= 0 && parseInt(CONSOLA) <= 4);
								break;
						}
					break;
				 case ESTADO_4:
						CORRECTO = false;
						for( i = 0 ; i < ENTRELIMITE; i++ )
							if( ENTREYAESTA[i] == false )
							{
								if( ENTRELISTA[i] == parseInt(CONSOLA) )
								{
									CORRECTO = true;
									ENTREYAESTA[i] = true;
								}   
							}
						
					break;
				case ESTADO_5:
						CORRECTO = (parseInt(CONSOLA) == (CDECENA+( CUNIDAD + 5 >= 10 ? 10:0)));
					break;
				case ESTADO_6:
						CORRECTO = (parseInt(CONSOLA) == (SCENTENA +( SDECENAUNIDAD + 50 >= 100 ? 100:0)));
					break;
			}
			if( CORRECTO )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	}
	

}
