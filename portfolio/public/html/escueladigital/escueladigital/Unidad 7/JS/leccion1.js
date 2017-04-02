//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 3,
		ESTADO_2 = 4,
		ESTADO_3 = 5;
        
//OBJETOS DIBUJABLES
var img1 = [new Drawable(getImg("IMG/img1.png"),300,300),
					new Drawable(getImg("IMG/img2.png"),300,300),
					new Drawable(getImg("IMG/img3.png"),300,300),
					new Drawable(getImg("IMG/img4.png"),300,300) ] ,
		img3 = [  getImg("IMG/jaula.png") , getImg("IMG/moto.png"), getImg("IMG/pelotas.png") , getImg("IMG/pasteles.png") ];

var Pelotas = [   [false,false,false,false,false,false,false] , 
							[false,false,false,false,false,false,false] , 
							[false,false,false,false,false,false,false] , 
							[false,false,false,false,false,false,false] , 
							[false,false,false,false,false,false,false] ,
							[false,false,false,false,false,false,false] , 
							[false,false,false,false,false,false,false] ,
							[false,false,false,false,false,false,false] ,
							[false,false,false,false,false,false,false] , 
							[false,false,false,false,false,false,false]   ] ,
      pro2 = [ "4x2" , "2x4" , "3x4" ] , cont = 0 , values = [8,8,12, [4,2] , [2,4] , [3,4] ],
	  problemas3 = ["Hay 3 conejos en cada jaula. Si hay 4 jaulas, \xBFCu\xE1ntos conejos hay en total?",
								"Cada moto tiene 2 llantas. Si hay 6 motos \xBFCu\xE1ntas llantas hay en total?",
								"En cada caja hay 8 pelotas. Si hay 3 cajas, \xBFCu\xE1ntas pelotas hay en total?",
								"Hay 4 pasteles en cada plato. Si hay 5 platos, \xBFCu\xE1ntos pasteles hay en total?"],
	 values3 = [  [3,4] , [2,6] , [8,3] , [4,5] ] , conspos = [  [730,450] , [400,550] , [400,650]  ],
	 resp3 = [ "3+3+3+3","3x4","12","2+2+2+2+2+2","2x6","12","8+8+8","8x3","24","4+4+4+4+4","4x5","20"] ;
					
var mundo = [];

function MismoProducto( producto1 , producto2 )
{
	return ( producto1 == producto2 || (producto1.charAt(0) == producto2.charAt(2) && producto1.charAt(2) == producto2.charAt(0)) ) && 
	          producto1.length == producto2.length;
}

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_1;
	UNIDAD_ACTUAL = UNIDAD_7;
	
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) Escriba el PO de la multiplicaci\xF3n para encontrar la cantidad total de cada tipo de verduras.";
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
				if( ESTADO_RESP >= 4 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) Pinte los circulos de modo que representen los siguientes problemas.";
					
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;
				}
            break;
		case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 3 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) (1/4) " + problemas3[0];
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;
				}
            break;
		case ESTADO_3:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 12 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) (" + (Math.floor(ESTADO_RESP/3)+1) + "/4) " + problemas3[Math.floor(ESTADO_RESP/3)];
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
		context.drawImage(
        		img1[ESTADO_RESP].imagen ,
				img1[ESTADO_RESP].X*percentage_scale,
				img1[ESTADO_RESP].Y*percentage_scale,                
                img1[ESTADO_RESP].imagen.width*percentage_scale,                                            
                img1[ESTADO_RESP].imagen.height*percentage_scale);   
				
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();		
	}
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{
		context.fillText( pro2[ESTADO_RESP],200*percentage_scale,400*percentage_scale);
		
		for(  i = 0 ; i < Pelotas.length ; i++ )
			for(  j =0 ; j < Pelotas[0].length ; j++ )
			{
				DRAW_CIRCLE( 450 + 40*i , 300 + 40*j ,15,"#000000");
				if( Pelotas[i][j] == false )
					DRAW_CIRCLE( 450 + 40*i , 300 + 40*j , 10 ,"#FFFFFF");
			}
	}

	if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 )
	{
		for( i = 0 ; i < values3[Math.floor( ESTADO_RESP/3 )][1] ; i++ )
			context.drawImage(
        		img3[Math.floor( ESTADO_RESP/3 )],
				(150 + 170*i)*percentage_scale,
				300*percentage_scale,                
                img3[Math.floor( ESTADO_RESP/3 )].width*percentage_scale,                                            
                img3[Math.floor( ESTADO_RESP/3 )].height*percentage_scale);  
				
		CONSOLA_SIZE = 30;
		
		context.font = Math.floor(CONSOLA_SIZE*(percentage_scale+percentage_scale)/2) + "pt CHALK";
		context.fillText( "Forma de encontrar el producto: "  + (ESTADO_RESP%3>0?  resp3[Math.floor(ESTADO_RESP/3)*3]  :"") , 200*percentage_scale,conspos[0][1]*percentage_scale);		
		context.fillText( "Problema: " + (ESTADO_RESP%3>1?  resp3[Math.floor(ESTADO_RESP/3)*3+1] :""), 200*percentage_scale,conspos[1][1]*percentage_scale);		
		context.fillText( "Respuesta: ", 200*percentage_scale,conspos[2][1]*percentage_scale);		
		
		CONSOLA_X = conspos[  ESTADO_RESP%3 ][0];
		CONSOLA_Y = conspos[  ESTADO_RESP%3 ][1];
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();		
	}
	
	
	
	
	
}

function MOUSE(X,Y)
{
	if( ESTADO_ACTUAL == ESTADO_2 )
	{
		if( X > 450 - 15 && X < 465 + 40*Pelotas.length  &&
			Y > 300 - 15 && Y <  315 + 40*Pelotas[0].length  )
		{
			X -= 450 -15;
			Y -= 300 -15;
			i = Math.floor( X/40 );
			j = Math.floor( Y/40 );
			Pelotas[i][j] = !Pelotas[i][j];
			if(  Pelotas[i][j] )
				cont++;
			else
				cont--;
				
				
			if( cont >= values[ESTADO_RESP] )
			{
				if( PROBLEMA2() )
					EJER_CORRECTO(1);
				else
					EJER_INCORRECTO(-1);
				
				for(  i = 0 ; i < Pelotas.length ; i++ )
					for(  j =0 ; j < Pelotas[0].length ; j++ )
						Pelotas[i][j] = false;
				cont = 0;
			}
			
		}
	}
}

function PROBLEMA2()
{
	
	var valores = values[ESTADO_RESP + 3],
			iniciox = 0 , inicioy = 0, otro = 0;
	
	for(  i = 0 ; i < Pelotas.length ; i++ )
		for(  j =0 ; j < Pelotas[0].length ; j++ )
		{
			if( Pelotas[i][j] )
			{
				iniciox = i;
				inicioy = j;
				i = Pelotas.length;
				j = Pelotas[0].length;
			}
		}

	var puedeser = true;
	
	for(  i = iniciox ; i < valores[0] +iniciox; i++ )
		for(  j =inicioy ; j < valores[1]  +inicioy; j++ )
		{
			if( Pelotas[i][j] == false )
				puedeser = false;
		}
		
	if( puedeser )
		return true;
		
	for(  i = iniciox ; i < valores[1] + iniciox ; i++ )
		for(  j =inicioy ; j < valores[0]  +inicioy; j++ )
		{
			if( Pelotas[i][j] == false )
				return false;
		}	
		
		return true;
	
}

function INPUT(KEYCODE)
{
	if( ESTADO_ACTUAL != ESTADO_2 )
	{
		if( CONSOLA_KEYDOWN(KEYCODE) )
		{
			
			CORRECTO = false;
			switch(ESTADO_ACTUAL)
			{
				case ESTADO_1:
						if( ESTADO_RESP == 0 )
							CORRECTO =  ( CONSOLA  == "6x5" || CONSOLA == "5x6" );
						if( ESTADO_RESP == 1 )
							CORRECTO =  ( CONSOLA  == "8x2" || CONSOLA == "2x8" );
						if( ESTADO_RESP == 2 )
							CORRECTO =  ( CONSOLA  == "2x3" || CONSOLA == "3x2" );
						if( ESTADO_RESP == 3 )
							CORRECTO =  ( CONSOLA  == "4x5" || CONSOLA == "5x4" );
						
					break;	
				case ESTADO_3:
						switch(ESTADO_RESP)
						{
							case 0: CORRECTO = (CONSOLA == "3+3+3+3" || CONSOLA == "4+4+4"); break;
							case 1: CORRECTO = (CONSOLA == "3x4" || CONSOLA == "4x3"); break;
							case 2: CORRECTO = (CONSOLA == "12"); break;
							
							case 3: CORRECTO = (CONSOLA == "2+2+2+2+2+2" || CONSOLA == "6+6"); break;
							case 4: CORRECTO = (CONSOLA == "2x6" || CONSOLA == "6x2"); break;
							case 5: CORRECTO = (CONSOLA == "12"); break;
							
							case 6: CORRECTO = (CONSOLA == "8+8+8"  || CONSOLA == "3+3+3+3+3+3+3+3"); break;
							case 7: CORRECTO = (CONSOLA == "8x3" || CONSOLA == "3x8"); break;
							case 8: CORRECTO = (CONSOLA == "24"); break;
							
							case 9: CORRECTO = (CONSOLA == "5+5+5+5"  || CONSOLA == "4+4+4+4+4"); break;
							case 10: CORRECTO = (CONSOLA == "4x5" || CONSOLA == "5x4"); break;
							case 11: CORRECTO = (CONSOLA == "20"); break;	
						}
					break;	
			}
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	}
}
