//Estados probablemente esto servira para todas las lecciones
var   ESTADO_CALIFICANDO = 2,
		ESTADO_1_1 = 3,
        ESTADO_1_2 = 4,
        ESTADO_1_3 = 5,
        ESTADO_1_4 = 6,
        ESTADO_1_5 = 7,
        ESTADO_2 = 8,
        ESTADO_3 = 9,
        ESTADO_4 = 10;
		
var num_buscado = 0,ESTADO_2_EJER = 0,ESTADO_3_EJER = 0,
	ESTADO_4_EJER = 0, LISTA = [0,0,0,0,0,0,0,0],cont4 = 1,
	ESTADO_1_1_EJER = 0,
    resp_pos = [[241,380],[503,380],[745,380],[930,380],[1063,380]],
    resp_1_1 = [110,250,380,480,550],
    ESTADO_1_2_EJER = 0,
    resp_pos2 = [[293,236],[395,236],[500,236],[812,236],[1018,236]],
    resp_1_2 = [80,90,100,130,150],
    ESTADO_1_3_EJER = 0,
    resp_pos3 = [[193,236],[535,236],[972,236],[1045,365],[1122,236]],
    resp_1_3 = [390,394,399,400,401],
    ESTADO_1_4_EJER = 0,
    resp_pos4 = [[332,366],[502,236],[670,366],[688,236],[820,366]],
    resp_1_4 = [281,290,299,300,307],
    ESTADO_1_5_EJER = 0,
    resp_pos5 = [[330,236],[505,236],[846,236],[930,366],[1020,236]],
    resp_1_5 = [100,110,130,135,140],
    cuadro_resp = getImg("IMG/campo_resp.png"),
    cuadro_resp1 = getImg("IMG/campo_resp1.png"),
    cuadro_respv = getImg("IMG/campo_respv.png"),
    cuadro_resp1v = getImg("IMG/campo_resp1v.png"),
    cubo1 = getImg("IMG/cubo1.png"),
    cubo2 = getImg("IMG/cubo2.png");
		
//OBJETOS DIBUJABLES
var regla1 = new Drawable(getImg("IMG/regla1.png"),100,300),
    regla2 = new Drawable(getImg("IMG/regla2.png"),100,300),
    regla3 = new Drawable(getImg("IMG/regla3.png"),50,300),
    regla4 = new Drawable(getImg("IMG/regla4.png"),100,300),
    regla5 = new Drawable(getImg("IMG/regla5.png"),100,300),
    libro = getImg("IMG/libro.png");
	
var mundo = [regla1,regla2,regla3,regla4,regla5];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	LECCION_ACTUAL = LECCION_3;
	UNIDAD_ACTUAL = UNIDAD_1;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1_1;        
                INSTRUCCION = "1) (1/5) Escriba en la casilla los n\xFAmeros que corresponden.";
                regla1.Visible = true;
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
				if( ESTADO_1_1_EJER >= 5 )
				{
					ESTADO_ACTUAL = ESTADO_1_2;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "1) (2/5) Escriba en la casilla los n\xFAmeros que corresponden.";
					regla1.Visible = false;
					regla2.Visible = true;
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1_1;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "1) (1/5) Escriba en la casilla los n\xFAmeros que corresponden.";
				} 
			break;
	   case ESTADO_1_2:
				ESTADO_1_2_EJER = ESTADO_1_2_EJER + 1;
				if( ESTADO_1_2_EJER >= 5 )
				{
					ESTADO_ACTUAL = ESTADO_1_3;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "1) (3/5) Escriba en la casilla los n\xFAmeros que corresponden.";
					regla2.Visible = false;
					regla3.Visible = true;
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1_2;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "1) (2/5) Escriba en la casilla los n\xFAmeros que corresponden.";
				} 
			break;
		case ESTADO_1_3:
				ESTADO_1_3_EJER = ESTADO_1_3_EJER + 1;
				if( ESTADO_1_3_EJER >= 5 )
				{
					ESTADO_ACTUAL = ESTADO_1_4;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "1) (4/5) Escriba en la casilla los n\xFAmeros que corresponden.";
					regla3.Visible = false;
					regla4.Visible = true;
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1_3;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "1) (3/5) Escriba en la casilla los n\xFAmeros que corresponden.";
				} 
			break;
		case ESTADO_1_4:
				ESTADO_1_4_EJER = ESTADO_1_4_EJER + 1;
				if( ESTADO_1_4_EJER >= 5 )
				{
					ESTADO_ACTUAL = ESTADO_1_5;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "1) (5/5) Escriba en la casilla los n\xFAmeros que corresponden.";
					regla4.Visible = false;
					regla5.Visible = true;
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1_4;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "1) (4/5) Escriba en la casilla los n\xFAmeros que corresponden.";
				} 
			break;
		case ESTADO_1_5:
				ESTADO_1_5_EJER = ESTADO_1_5_EJER + 1;
				if( ESTADO_1_5_EJER >= 5 )
				{
					ESTADO_ACTUAL = ESTADO_2;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "2) (" + (ESTADO_2_EJER+1) +"/6) Escriba el n\xFAmero que est\xE1 antes.";
					regla5.Visible = false;
					
					num_buscado = Math.floor( Math.random()*800 + 100 );
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1_5;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "1) (5/5) Escriba en la casilla los n\xFAmeros que corresponden.";
				} 
			break;
		case ESTADO_2:
				ESTADO_2_EJER = ESTADO_2_EJER + 1;
				if( ESTADO_2_EJER > 5 )
				{
					ESTADO_ACTUAL = ESTADO_3;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "3) (" + (ESTADO_3_EJER+1) +"/6) Escriba el n\xFAmero que est\xE1 despues.";
					regla5.Visible = false;
					num_buscado = Math.floor( Math.random()*800 + 100 );
				}
				else
				{
					INSTRUCCION = "2) (" + (ESTADO_2_EJER+1) +"/6) Escriba el n\xFAmero que est\xE1 antes.";
					num_buscado = Math.floor( Math.random()*800 + 100 );
					ESTADO_ACTUAL = ESTADO_2;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
				} 
			break;
		case ESTADO_3:
				ESTADO_3_EJER = ESTADO_3_EJER + 1;
				if( ESTADO_3_EJER > 5 )
				{
					ESTADO_ACTUAL = ESTADO_4;        
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "4) (1/4) Escriba en las casillas los n\xFAmeros que corresponden.";

					if( ESTADO_4_EJER%4 == 0 )
					{
						for( i = 0 ; i < LISTA.length; i = i + 1 )
							LISTA[i] = 0 ;
						LISTA[0] = Math.floor( Math.random()*790 + 100 );
						cont4++;
						switch(Math.floor(ESTADO_4_EJER/4))
						{
							case 0:
							case 3:
									LISTA[1] = LISTA[0] + 1;
									LISTA[6] = LISTA[0] + 6;
									LISTA[7] = LISTA[0] + 7;
								break;
							case 1:
							case 2:
									LISTA[1] = LISTA[0] + 1;
									LISTA[2] = LISTA[0] + 2;
									LISTA[7] = LISTA[0] + 7;
								break;
						}
				  }
				  ESTADO_4_EJER = ESTADO_4_EJER +1 ;
					
				}
				else
				{
					INSTRUCCION = "3) (" + (ESTADO_3_EJER+1) +"/6) Escriba el n\xFAmero que est\xE1 despues.";
					num_buscado = Math.floor( Math.random()*800 + 100 );
					ESTADO_ACTUAL = ESTADO_3;
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
				} 
			break;
		case ESTADO_4:
				if( ESTADO_4_EJER >= 16 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_4; 
					ESTADO_ANTERIOR = ESTADO_NINGUNO;
					INSTRUCCION = "4) (" + (Math.floor(ESTADO_4_EJER/4) + 1) + "/4) Escriba en las casillas los n\xFAmeros que corresponden.";

					if( ESTADO_4_EJER%4 == 0 )
					{
						for( i = 0 ; i < LISTA.length; i = i + 1 )
							LISTA[i] = 0 ;
						LISTA[0] = Math.floor( Math.random()*790 + 100 );
						cont4++;
						switch(Math.floor(ESTADO_4_EJER/4))
						{
							case 0:
							case 3:
									LISTA[1] = LISTA[0] + 1;
									LISTA[6] = LISTA[0] + 6;
									LISTA[7] = LISTA[0] + 7;
								break;
							case 1:
							case 2:
									LISTA[1] = LISTA[0] + 1;
									LISTA[2] = LISTA[0] + 2;
									LISTA[7] = LISTA[0] + 7;
								break;
						}
				  }
				  ESTADO_4_EJER = ESTADO_4_EJER +1 ;
				}
			break;
	}
}


function DRAW(context)
{
        context.fillStyle = "#000000";
        context.font = Math.floor(40*(percentage_scale+percentage_scale)/2) + "pt CHALK";
		
        DRAW_INSTRUCTION();

		if( ESTADO_ACTUAL == ESTADO_4 || ESTADO_ANTERIOR == ESTADO_4 )
        {
            context.fillStyle = "#000000";
            sect = true;
            for( i = 0 ; i < LISTA.length ; i++ )
            {
                
                context.fillText(LISTA[i]!=0?LISTA[i]+"":"",(130 + 150*i)*percentage_scale,425*percentage_scale);
                if( LISTA[i] == 0 && sect )
                {
                    cons = i;
                    sect = false;
                }
            }

			if( ESTADO_ACTUAL == ESTADO_4  )
			{
				CONSOLA_X = 130 + 150*cons;
				CONSOLA_Y = 425;
				CONSOLA_SIZE = 40;
				DRAW_CONSOLA();
			}
        }
		
		if( ESTADO_ANTERIOR == ESTADO_4 )
		{
			DRAW_CONSOLA();
		}
        
        if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
        {
		
		    context.drawImage(libro,420*percentage_scale,250*percentage_scale,                
                    libro.width*percentage_scale,libro.height*percentage_scale);
					
            context.fillStyle = "#000000";
            context.font = Math.floor(60*(percentage_scale+percentage_scale)/2) + "pt CHALK";
            context.fillText(num_buscado,750*percentage_scale,450*percentage_scale);   

			
					
			CONSOLA_X = 500;
			CONSOLA_Y = 450;
			CONSOLA_SIZE = 60;
			CONSOLA_COLOR = "#000000";
			DRAW_CONSOLA();
        }
        
        if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 )
        {
		    context.drawImage(libro,420*percentage_scale,250*percentage_scale,                
                    libro.width*percentage_scale,libro.height*percentage_scale);
					
            context.fillStyle = "#000000";
            context.font = Math.floor(60*(percentage_scale+percentage_scale)/2) + "pt CHALK";
            context.fillText(num_buscado,500*percentage_scale,450*percentage_scale);    
			
			
			
			CONSOLA_X = 750;
			CONSOLA_Y = 450;
			CONSOLA_SIZE = 60;
			CONSOLA_COLOR = "#000000";
            DRAW_CONSOLA();
        }
        
        if( ESTADO_ACTUAL == ESTADO_1_1 || ESTADO_ANTERIOR == ESTADO_1_1 )
        {
            context.font = Math.floor(40*(percentage_scale+percentage_scale)/2) + "pt CHALK";
            for( i = 0; i < ESTADO_1_1_EJER ; i = i + 1 )
            {
                context.fillText(""+resp_1_1[i],(resp_pos[i][0] + 20)*percentage_scale,(resp_pos[i][1] + 90)*percentage_scale);

                context.drawImage(cuadro_resp,resp_pos[i][0]*percentage_scale,
                                            resp_pos[i][1]*percentage_scale,                
                    cuadro_resp.width*percentage_scale,cuadro_resp.height*percentage_scale);
            } 
			CONSOLA_X = (resp_pos[ESTADO_1_1_EJER][0] + 20);
			CONSOLA_Y = (resp_pos[ESTADO_1_1_EJER][1] + 90);
			CONSOLA_SIZE = 40;
            DRAW_CONSOLA();
            context.drawImage(cuadro_resp1,resp_pos[ESTADO_1_1_EJER][0]*percentage_scale,
                                          resp_pos[ESTADO_1_1_EJER][1]*percentage_scale,                
                cuadro_resp1.width*percentage_scale,cuadro_resp1.height*percentage_scale); 
        }
        
        if( ESTADO_ACTUAL == ESTADO_1_2 || ESTADO_ANTERIOR == ESTADO_1_2 )
        {
            context.font = Math.floor(40*(percentage_scale+percentage_scale)/2) + "pt CHALK";
            for( i = 0; i < ESTADO_1_2_EJER ; i = i + 1 )
            {
                context.fillText(""+resp_1_2[i],(resp_pos2[i][0] + 20)*percentage_scale,(resp_pos2[i][1] + 53)*percentage_scale);
               
                context.drawImage(cuadro_respv,resp_pos2[i][0]*percentage_scale,
                                            resp_pos2[i][1]*percentage_scale,                
                    cuadro_respv.width*percentage_scale,cuadro_respv.height*percentage_scale);
            }         
			CONSOLA_X = (resp_pos2[ESTADO_1_2_EJER][0] + 20);
			CONSOLA_Y = (resp_pos2[ESTADO_1_2_EJER][1] + 53);
            CONSOLA_SIZE = 40;
            DRAW_CONSOLA();
            context.drawImage(cuadro_resp1v,resp_pos2[ESTADO_1_2_EJER][0]*percentage_scale,
                                          resp_pos2[ESTADO_1_2_EJER][1]*percentage_scale,                
                cuadro_resp1v.width*percentage_scale,cuadro_resp1v.height*percentage_scale); 
        }
        
        if( ESTADO_ACTUAL == ESTADO_1_3 || ESTADO_ANTERIOR == ESTADO_1_3 )
        {
            context.font = Math.floor(40*(percentage_scale+percentage_scale)/2) + "pt CHALK";
            for( i = 0; i < ESTADO_1_3_EJER ; i = i + 1 )
            {
                context.fillText(""+resp_1_3[i],(resp_pos3[i][0] + 20)*percentage_scale,(resp_pos3[i][1] + (i!=3?53:90))*percentage_scale);
               
           
                context.drawImage(i != 3?cuadro_respv:cuadro_resp,resp_pos3[i][0]*percentage_scale,
                                            resp_pos3[i][1]*percentage_scale,                
                    cuadro_respv.width*percentage_scale,cuadro_respv.height*percentage_scale);

            }         
			CONSOLA_X = (resp_pos3[ESTADO_1_3_EJER][0] + 20);
			CONSOLA_Y = (resp_pos3[ESTADO_1_3_EJER][1] + (i!=3?53:90));
            CONSOLA_SIZE = 40;
            DRAW_CONSOLA();
            context.drawImage(i != 3?cuadro_resp1v:cuadro_resp1,resp_pos3[ESTADO_1_3_EJER][0]*percentage_scale,
                                          resp_pos3[ESTADO_1_3_EJER][1]*percentage_scale,                
                cuadro_resp1v.width*percentage_scale,cuadro_resp1v.height*percentage_scale); 
        }
        
        if( ESTADO_ACTUAL == ESTADO_1_4 || ESTADO_ANTERIOR == ESTADO_1_4 )
        {
            context.font = Math.floor(40*(percentage_scale+percentage_scale)/2) + "pt CHALK";
            for( i = 0; i < ESTADO_1_4_EJER ; i = i + 1 )
            {
                context.fillText(""+resp_1_4[i],(resp_pos4[i][0] + 20)*percentage_scale,(resp_pos4[i][1] + (i%2!=0?53:90))*percentage_scale);
                context.drawImage(i%2!=0?cuadro_respv:cuadro_resp,resp_pos4[i][0]*percentage_scale,
                                            resp_pos4[i][1]*percentage_scale,                
                    cuadro_respv.width*percentage_scale,cuadro_respv.height*percentage_scale);

            }         
			CONSOLA_X = (resp_pos4[ESTADO_1_4_EJER][0] + 20);
			CONSOLA_Y = (resp_pos4[ESTADO_1_4_EJER][1] + (i%2!=0?53:90));
            CONSOLA_SIZE = 40;
            DRAW_CONSOLA();
            context.drawImage(i%2!=0?cuadro_resp1v:cuadro_resp1,resp_pos4[ESTADO_1_4_EJER][0]*percentage_scale,
                                          resp_pos4[ESTADO_1_4_EJER][1]*percentage_scale,                
                cuadro_resp1v.width*percentage_scale,cuadro_resp1v.height*percentage_scale); 
        }
        
        if( ESTADO_ACTUAL == ESTADO_1_5 || ESTADO_ANTERIOR == ESTADO_1_5 )
        {
            context.font = Math.floor(40*(percentage_scale+percentage_scale)/2) + "pt CHALK";
            for( i = 0; i < ESTADO_1_5_EJER ; i = i + 1 )
            {
                context.fillText(""+resp_1_5[i],(resp_pos5[i][0] + 20)*percentage_scale,(resp_pos5[i][1] + (i!=3?53:90))*percentage_scale);
               
           
                context.drawImage(i != 3?cuadro_respv:cuadro_resp,resp_pos5[i][0]*percentage_scale,
                                            resp_pos5[i][1]*percentage_scale,                
                    cuadro_respv.width*percentage_scale,cuadro_respv.height*percentage_scale);

            }         
			
			CONSOLA_X = (resp_pos5[ESTADO_1_5_EJER][0] + 20);
			CONSOLA_Y = (resp_pos5[ESTADO_1_5_EJER][1] + (i!=3?53:90));
			CONSOLA_SIZE = 40;
            DRAW_CONSOLA();
            context.drawImage(i != 3?cuadro_resp1v:cuadro_resp1,resp_pos5[ESTADO_1_5_EJER][0]*percentage_scale,
                                          resp_pos5[ESTADO_1_5_EJER][1]*percentage_scale,                
                cuadro_resp1v.width*percentage_scale,cuadro_resp1v.height*percentage_scale); 
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
		   case ESTADO_1_1:
					CORRECTO = (parseInt(CONSOLA) == resp_1_1[ESTADO_1_1_EJER]);
			   break;
		   case ESTADO_1_2:
					CORRECTO = (parseInt(CONSOLA) == resp_1_2[ESTADO_1_2_EJER]);
			   break;
		   case ESTADO_1_3:
					CORRECTO = (parseInt(CONSOLA) == resp_1_3[ESTADO_1_3_EJER]);
			   break;
		   case ESTADO_1_4:
					CORRECTO = (parseInt(CONSOLA) == resp_1_4[ESTADO_1_4_EJER]);
			   break;
		   case ESTADO_1_5:
					CORRECTO = (parseInt(CONSOLA) == resp_1_5[ESTADO_1_5_EJER]);
			   break;
		   case ESTADO_2:
					CORRECTO = (parseInt(CONSOLA) == (num_buscado-1));
			   break; 
		   case ESTADO_3:
					CORRECTO = (parseInt(CONSOLA) == (num_buscado+1));
			  break;  
		   case ESTADO_4:
					for( i = 1 ; i < LISTA.length ; i = i + 1 )
					{
						if( LISTA[i] == 0 )
						{
							CORRECTO = (parseInt(CONSOLA) == (LISTA[i-1]+1));
							if( CORRECTO )
							{
								LISTA[i] = parseInt(CONSOLA);
							}
							i = LISTA.length;
						}
					}
			   break;      
			   
		   
		}
		if( CORRECTO )
			EJER_CORRECTO_CONSOLA(1);
		else
			EJER_INCORRECTO_CONSOLA(-1);
	}

}
