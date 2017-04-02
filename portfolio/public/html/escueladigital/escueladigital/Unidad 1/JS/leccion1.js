//Estados probablemente esto servira para todas las lecciones
var ESTADO_A_1 = 3,ESTADO_A_2 = 4,ESTADO_1 = 5,ESTADO_2_1 = 6,
	  ESTADO_2_2 = 7,ESTADO_2_3 = 8,ESTADO_3_A = 9,ESTADO_3_B = 10,
	  ESTADO_3_C = 11,ESTADO_3_D = 12,ESTADO_3_E = 13,ESTADO_3_F = 14,
	  ESTADO_3_G = 15,ESTADO_4_1 = 16,ESTADO_4_2 = 17,ESTADO_4_3 = 18,
	  ESTADO_4_4 = 19,ESTADO_4_5 = 20,ESTADO_4_6 = 21;
		
//OBJETOS DIBUJABLES
var si = new Drawable(getImg("IMG/si.png"),450,550),
    no = new Drawable(getImg("IMG/no.png"),700,550);
	
var mundo = [si,no];

var ovejas = [ getImg("IMG/oveja0.png"),
               getImg("IMG/oveja1.png"),
               getImg("IMG/oveja2.png") ],
	imagenes = [getImg("IMG/carro.png"),
                getImg("IMG/basket.png"),
                getImg("IMG/hoja.png"),
                getImg("IMG/manzana.png") ],
	objetos = [ getImg("IMG/decena.png"),
                getImg("IMG/decena2.png"),
                getImg("IMG/centena.png"),
                getImg("IMG/centena2.png"),
                getImg("IMG/centena3.png"),
                getImg("IMG/ochenta.png"),
                getImg("IMG/noventa.png") ],
	flor = getImg("IMG/flor.png"),
	reja = getImg("IMG/reja.png");

var resp = 0, img_actual = 0, obj_actual,
	ovejas_action = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],      
    ovejas_delay  = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];
					
//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	fondo.Visible = true;
	si.SoyBoton(getImg("IMG/sis.png"));
	no.SoyBoton(getImg("IMG/nos.png"));

	LECCION_ACTUAL = LECCION_1;
	UNIDAD_ACTUAL = UNIDAD_1;
}

function UPDATE()
{        
	if( boton_delay > 0 )
    {
        boton_delay = boton_delay -1;
        if( boton_delay == 0 )
        {
            if( si.Boton_Seleccionado )
                si.SwapSelect();
            if( no.Boton_Seleccionado )
                no.SwapSelect();
        }
    }
	
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_A_1;        
                INSTRUCCION = "\xBFCu\xE1ntas ovejas hay en la barrera?";
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
		case ESTADO_A_1:
				ESTADO_ACTUAL = ESTADO_A_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "Est\xE1 llegando una oveja m\xE1s. \xBFCu\xE1ntas ovejas hay por todo?";
			break;
		case ESTADO_A_2:
				ESTADO_ACTUAL = ESTADO_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				img_actual = 0;
				INSTRUCCION = "1) (1/4) Escriba con N\xFAmeros cu\xE1ntos hay.";
				resp = Math.floor( Math.random()*18 + 80 );
				ESTADO_1_RESP = 0;
			break;
		case ESTADO_1:
				ESTADO_1_RESP = ESTADO_1_RESP + 1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				if( ESTADO_1_RESP < 4 )
				{
					ESTADO_ACTUAL = ESTADO_1;
					INSTRUCCION = "1) (" + (ESTADO_1_RESP+1) + "/4) Escriba con N\xFAmeros cu\xE1ntos hay.";
					resp = Math.floor( Math.random()*19 + 80 );
					img_actual = img_actual +1;
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2_1;
					INSTRUCCION = "2) (1/3) \xBFCu\xE1ntos p\xE9talos tiene cada flor?";
				}
			break;
		case ESTADO_2_1:
				ESTADO_ACTUAL = ESTADO_2_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "2) (2/3) \xBFCu\xE1ntas flores hay?";
			break;
		case ESTADO_2_2:
				ESTADO_ACTUAL = ESTADO_2_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "2) (3/3) \xBFCu\xE1ntos p\xE9talos hay en total?";
			break;
		case ESTADO_2_3:
				ESTADO_ACTUAL = ESTADO_3_A;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "3) (1/7) \xBFEste objeto representa 1 centena?";
				obj_actual = Math.floor( Math.random()*7 );
				si.Visible = true;
				no.Visible = true;
			break;
		case ESTADO_3_A:
				ESTADO_ACTUAL = ESTADO_3_B;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "3) (2/7) \xBFEste objeto representa 1 centena?";
				obj_actual = Math.floor( Math.random()*7 );
			break;
		case ESTADO_3_B:
				ESTADO_ACTUAL = ESTADO_3_C;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "3) (3/7) \xBFEste objeto representa 1 centena?";
				obj_actual = Math.floor( Math.random()*7 );
			break;
		case ESTADO_3_C:
				ESTADO_ACTUAL = ESTADO_3_D;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "3) (4/7) \xBFEste objeto representa 1 centena?";
				obj_actual = Math.floor( Math.random()*7 );
			break;
		case ESTADO_3_D:
				ESTADO_ACTUAL = ESTADO_3_E;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "3) (5/7) \xBFEste objeto representa 1 centena?";
				obj_actual = Math.floor( Math.random()*7 );
			break;
		case ESTADO_3_E:
				ESTADO_ACTUAL = ESTADO_3_F;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "3) (6/7) \xBFEste objeto representa 1 centena?";
				obj_actual = Math.floor( Math.random()*7 );
			break;
		case ESTADO_3_F:
				ESTADO_ACTUAL = ESTADO_3_G;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "3) (7/7) \xBFEste objeto representa 1 centena?";
				obj_actual = Math.floor( Math.random()*7 );
			break;
		case ESTADO_3_G:
				ESTADO_ACTUAL = ESTADO_4_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "4) (1/6) 1 centena = ? decenas";
				si.Visible = false;
				no.Visible = false;
			break;
		case ESTADO_4_1:
				ESTADO_ACTUAL = ESTADO_4_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "4) (2/6) 100 unidades = ? decenas";       
			break;
		case ESTADO_4_2:
				ESTADO_ACTUAL = ESTADO_4_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "4) (3/6) 100 unidades = ? centena";       
			break;
		case ESTADO_4_3:
				ESTADO_ACTUAL = ESTADO_4_4;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "4) (4/6) 10 decenas = ? centena";       
			break;
		case ESTADO_4_4:
				ESTADO_ACTUAL = ESTADO_4_5;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "4) (5/6) 10 decenas = ? unidades";       
			break;
		case ESTADO_4_5:
				ESTADO_ACTUAL = ESTADO_4_6;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "4) (6/6) 1 centena = ? unidades";       
			break;
		case ESTADO_4_6:
				FIN_LECCION();
			break;
		
	}
}


function DRAW(context)
{
        context.fillStyle = "#000000";
        context.font = Math.floor(20*(percentage_scale+percentage_scale)) + "pt CHALK";
		
        DRAW_INSTRUCTION();
		

		
		if( ( ESTADO_ACTUAL >= ESTADO_4_1 && ESTADO_ACTUAL <= ESTADO_4_6 ) ||
		    ( ESTADO_ANTERIOR >= ESTADO_4_1 && ESTADO_ANTERIOR <= ESTADO_4_6 ) )
			{
					CONSOLA_X = 400;
					CONSOLA_Y = 350;
					CONSOLA_SIZE = 100;
			}
		
		if( ESTADO_ACTUAL != ESTADO_3_A && ESTADO_ACTUAL != ESTADO_3_B && ESTADO_ACTUAL != ESTADO_3_C &&
			ESTADO_ACTUAL != ESTADO_3_D && ESTADO_ACTUAL != ESTADO_3_E && ESTADO_ACTUAL != ESTADO_3_F &&
			ESTADO_ACTUAL != ESTADO_3_G && ESTADO_ANTERIOR != ESTADO_3_A && ESTADO_ANTERIOR != ESTADO_3_B && ESTADO_ANTERIOR != ESTADO_3_C &&
			ESTADO_ANTERIOR != ESTADO_3_D && ESTADO_ANTERIOR != ESTADO_3_E && ESTADO_ANTERIOR != ESTADO_3_F &&
			ESTADO_ANTERIOR != ESTADO_3_G)
				DRAW_CONSOLA();
		
		if( ESTADO_ACTUAL == ESTADO_A_1 || ESTADO_ANTERIOR == ESTADO_A_1 ||
            ESTADO_ACTUAL == ESTADO_A_2 || ESTADO_ANTERIOR == ESTADO_A_2 )
        {
			context.drawImage(reja,(270)*percentage_scale,(190)*percentage_scale,                
								reja.width*percentage_scale,reja.height*percentage_scale); 
            for( i = 0 ; i < 10; i++ )
			{
                for( j = 0; j < 10; j++ )
				{
                    if ( !(j==9&&i==9) )
                    {
                         context.drawImage( ovejas[ovejas_action[i][j] ], (300 + 65*i)*percentage_scale ,(195 + 45*j)*percentage_scale,                
                            ovejas[ovejas_action[i][j]].width*percentage_scale,ovejas[ovejas_action[i][j]].height*percentage_scale); 
                            
                         if ( ovejas_delay[i][j] > 0 )
                         {
                             ovejas_delay[i][j]--;
                         }
                         else
                         {
                             ovejas_action[i][j] = Math.floor( Math.random()*3 );
                             ovejas_delay[i][j] = Math.floor( Math.random()*20 + 15 );
                         }
                             
                    }
				}
			}
					
              if( ESTADO_ACTUAL == ESTADO_A_2 || ESTADO_ANTERIOR == ESTADO_A_2 )
              {
                    context.drawImage(ovejas[ovejas_action[9][9]],1100*percentage_scale,570*percentage_scale,                
                            ovejas[ovejas_action[9][9]].width*percentage_scale,ovejas[ovejas_action[9][9]].height*percentage_scale); 
                  
                         if ( ovejas_delay[9][9] > 0 )
                             ovejas_delay[9][9]--;
                         else
                         {
                             ovejas_action[9][9] = Math.floor( Math.random()*3 );
                             ovejas_delay[9][9] = Math.floor( Math.random()*20 + 15 );
                         }
              }
              
        }
        
        
        if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 )
        {
            var cont = 0;
            for( i = 0 ; i < 10; i = i +1 )
                for( j = 0; j < 10; j = j + 1 )
                 {
					context.drawImage(imagenes[img_actual],(300 + 65*i)*percentage_scale,(165 + 45*j)*percentage_scale,                
					imagenes[img_actual].width*percentage_scale,imagenes[img_actual].height*percentage_scale);
					cont = cont+1;
					if( cont >= resp )
					{
						i = 10; j = 10;
					}
                 }
        }
        
        
        if( ESTADO_ACTUAL == ESTADO_2_1 || ESTADO_ANTERIOR == ESTADO_2_1 ||
            ESTADO_ACTUAL == ESTADO_2_2 || ESTADO_ANTERIOR == ESTADO_2_2 ||
            ESTADO_ACTUAL == ESTADO_2_3 || ESTADO_ANTERIOR == ESTADO_2_3)
        {
            for( i = 0; i < 5 ; i = i +1 )
            context.drawImage(flor,(250 + 200*i)*percentage_scale,(250)*percentage_scale,                
                      flor.width*percentage_scale,flor.height*percentage_scale);
            for( i = 0; i < 5 ; i = i +1 )
            context.drawImage(flor,(150 + 200*i)*percentage_scale,(350)*percentage_scale,                
                      flor.width*percentage_scale,flor.height*percentage_scale);
        }
        
        if( ESTADO_ACTUAL >= ESTADO_3_A && ESTADO_ACTUAL <= ESTADO_3_G || 
            ESTADO_ANTERIOR >= ESTADO_3_A && ESTADO_ANTERIOR <= ESTADO_3_G )
        {
            context.drawImage(objetos[obj_actual],(500)*percentage_scale,(200)*percentage_scale,                
                      objetos[obj_actual].width*percentage_scale,objetos[obj_actual].height*percentage_scale);
        }
}

function MOUSE(X,Y)
{
	if( ESTADO_ACTUAL == ESTADO_3_A || ESTADO_ANTERIOR == ESTADO_3_A ||
        ESTADO_ACTUAL == ESTADO_3_B || ESTADO_ANTERIOR == ESTADO_3_B ||
        ESTADO_ACTUAL == ESTADO_3_C || ESTADO_ANTERIOR == ESTADO_3_C ||
        ESTADO_ACTUAL == ESTADO_3_D || ESTADO_ANTERIOR == ESTADO_3_D ||
        ESTADO_ACTUAL == ESTADO_3_E || ESTADO_ANTERIOR == ESTADO_3_E ||
        ESTADO_ACTUAL == ESTADO_3_F || ESTADO_ANTERIOR == ESTADO_3_F ||
        ESTADO_ACTUAL == ESTADO_3_G || ESTADO_ANTERIOR == ESTADO_3_G )
    {

            if( si.Presionando(X,Y) && si.Boton_Seleccionado == false )
            {
                si.SwapSelect();
                boton_delay = 5;
                if( obj_actual >= 2 && obj_actual <= 4 )
					EJER_CORRECTO(1);
				else
					EJER_INCORRECTO(-1);
            }
            
            if( no.Presionando(X,Y) && no.Boton_Seleccionado == false )
            {
                no.SwapSelect();
                boton_delay = 5;
               
                if( obj_actual < 2 || obj_actual > 4 )
					EJER_CORRECTO(1);
				else
					EJER_INCORRECTO(-1);

            }
    }
}

function INPUT(KEYCODE)
{
	if( ESTADO_ACTUAL != ESTADO_3_A && ESTADO_ACTUAL != ESTADO_3_B && ESTADO_ACTUAL != ESTADO_3_C &&
        ESTADO_ACTUAL != ESTADO_3_D && ESTADO_ACTUAL != ESTADO_3_E && ESTADO_ACTUAL != ESTADO_3_F &&
        ESTADO_ACTUAL != ESTADO_3_G && ESTADO_ACTUAL != ESTADO_CALIFICANDO )
    {
		if( CONSOLA_KEYDOWN(KEYCODE) )
		{
			var correcto = false,puntaje = 1;
			switch(ESTADO_ACTUAL)
			{
				case ESTADO_A_1:
						correcto = ( parseInt(CONSOLA) == 99 );
					break;
				case ESTADO_2_3:
				case ESTADO_A_2:
				case ESTADO_4_5:
				case ESTADO_4_6:
						correcto = ( parseInt(CONSOLA) == 100 );
					break;
				case ESTADO_1:
						correcto = ( parseInt(CONSOLA) == resp );
					break;
				case ESTADO_2_1:
				case ESTADO_2_2:
				case ESTADO_4_1:
				case ESTADO_4_2:
						correcto = ( parseInt(CONSOLA) == 10 );
					break;
				case ESTADO_4_3:
				case ESTADO_4_4:
						correcto = ( parseInt(CONSOLA) == 1 );
					break;
			}
			if( correcto )
					EJER_CORRECTO_CONSOLA(puntaje);
				else
					EJER_INCORRECTO_CONSOLA(puntaje*-1);
		}
	}
}