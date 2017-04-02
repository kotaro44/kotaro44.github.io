//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1_1 = 3,
        ESTADO_1_2 = 4,
		ESTADO_2 = 5,
		ESTADO_3 = 6,
		ESTADO_4_1 = 7,
        ESTADO_4_2 = 8,
        ESTADO_4_3 = 9,
        ESTADO_4_4 = 10;
		
//OBJETOS DIBUJABLES
var menor = new Drawable(getImg("IMG/menor.png"),600,250),
    mayor = new Drawable(getImg("IMG/mayor.png"),600,400);
	
var mundo = [menor,mayor];

var palabras_decenas = ["","","","treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"],
      palabras_unidades = ["","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"];
    
//VARIABLES
var decenas = 0, unidades = 0,num_izq = 0,num_der = 0, text = "";
	
var decenaimg = getImg("IMG/decena.png"), 
      unidadimg = getImg("IMG/unidad.png");

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;

	menor.SoyBoton(getImg("IMG/menors.png"));
    mayor.SoyBoton(getImg("IMG/mayors.png"));
	
	LECCION_ACTUAL = LECCION_R;
	UNIDAD_ACTUAL = UNIDAD_1;
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
                decenas = Math.floor( Math.random()*4 + 2);
                unidades = Math.floor( Math.random()*7 + 1); 
                INSTRUCCION = "1) (1/2) Escriba con N\xFAmeros cu\xE1ntos hay.";
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
		case ESTADO_4_4:
				FIN_LECCION();
			break;
		case ESTADO_4_3:
				ESTADO_ACTUAL = ESTADO_4_4;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "4) (4/4) Compare el n\xFAmero y seleccione < \xF3 >";
				num_izq = Math.floor( Math.random()*98 + 1);
				num_der = num_izq;
				while( num_izq == num_der )
					num_der = Math.floor( Math.random()*98 + 1);
			break;
		case ESTADO_4_2:
				ESTADO_ACTUAL = ESTADO_4_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "4) (3/4) Compare el n\xFAmero y seleccione < \xF3 >";
				num_izq = Math.floor( Math.random()*98 + 1);
				num_der = num_izq;
				while( num_izq == num_der )
					num_der = Math.floor( Math.random()*98 + 1);
			break;
		case ESTADO_4_1:
				ESTADO_ACTUAL = ESTADO_4_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "4) (2/4) Compare el n\xFAmero y seleccione < \xF3 >";
				num_izq = Math.floor( Math.random()*98 + 1);
				num_der = num_izq;
				while( num_izq == num_der )
					num_der = Math.floor( Math.random()*98 + 1);
			break;
		case ESTADO_3:
				ESTADO_ACTUAL = ESTADO_4_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				num_izq = Math.floor( Math.random()*98 + 1);
				num_der = num_izq;
				while( num_izq == num_der )
					num_der = Math.floor( Math.random()*98 + 1);
				INSTRUCCION = "4) (1/4) Compare el n\xFAmero y seleccione < \xF3 >";
				menor.Visible = true;
				mayor.Visible = true;
			break;
		case ESTADO_2:
				ESTADO_ACTUAL = ESTADO_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				decenas = Math.floor( Math.random()*6 + 3);
				unidades = Math.floor( Math.random()*8 + 2);
				INSTRUCCION = "3) \xBFQu\xE9 n\xFAmero est\xE1 formado por " + decenas +
					" decenas y " + unidades + " unidades?"
			break;
		case ESTADO_1_2:
				ESTADO_ACTUAL = ESTADO_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				decenas = Math.floor( Math.random()*6 + 3);
				unidades = Math.floor( Math.random()*8 + 1);
				INSTRUCCION = "2) Escriba \"" + palabras_decenas[decenas] + " y " + 
					palabras_unidades[unidades] + "\" con n\xFAmeros."
			break;
		case ESTADO_1_1:
				ESTADO_ACTUAL = ESTADO_1_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				decenas = Math.floor( Math.random()*7 + 2);
				unidades = 0;
				INSTRUCCION = "1) (2/2) Escriba con N\xFAmeros cu\xE1ntos hay.";
				for( i = 0 ; i < decenas; i = i+1 )
					text = text + "10 ";
			break;
		
		
		
	}
}


function DRAW(context)
{
        context.fillStyle = "#FFFFFF";
        context.font = Math.floor(20*(percentage_scale+percentage_scale)) + "pt CHALK";
		
        DRAW_INSTRUCTION();
		
		if( ESTADO_ACTUAL == ESTADO_2 ||  ESTADO_ACTUAL == ESTADO_3 || ESTADO_ACTUAL == ESTADO_1_1 || ESTADO_ACTUAL == ESTADO_1_2 ||
		    ESTADO_ANTERIOR == ESTADO_2 ||  ESTADO_ANTERIOR == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_1_1 || ESTADO_ANTERIOR == ESTADO_1_2 )
		{
			CONSOLA_SIZE= 50;
			CONSOLA_X = 100;
			CONSOLA_Y = 700;
			DRAW_CONSOLA();
		}
		
        if( ESTADO_ACTUAL == ESTADO_1_2 || ESTADO_ANTERIOR == ESTADO_1_2 )
        {
            context.font = Math.floor(40*(percentage_scale+percentage_scale)) + "pt CHALK";
            context.fillText(text,60*percentage_scale,400*percentage_scale);
        }  
        
        if( ESTADO_ACTUAL == ESTADO_1_1 || ESTADO_ANTERIOR == ESTADO_1_1 )
        {  
            for( i = 0; i < decenas ; i = i+1 )
                context.drawImage(decenaimg,(250 + 60*i)*percentage_scale,(180)*percentage_scale,
                    decenaimg.width*percentage_scale,decenaimg.height*percentage_scale);
            for( i = 0; i < unidades ; i = i+1 )
                context.drawImage(unidadimg,(250 + 60*decenas)*percentage_scale,(450 - i*30)*percentage_scale,
                    unidadimg.width*percentage_scale,unidadimg.height*percentage_scale);
        }
        
        if( (ESTADO_ACTUAL >= ESTADO_4_1 && ESTADO_ACTUAL <= ESTADO_4_4) ||
            (ESTADO_ANTERIOR >= ESTADO_4_1 && ESTADO_ANTERIOR <= ESTADO_4_4))
        {  
            context.font = Math.floor(70*(percentage_scale+percentage_scale)) + "pt CHALK";
            context.fillText(num_izq,325*percentage_scale,400*percentage_scale);
            context.font = Math.floor(70*(percentage_scale+percentage_scale)) + "pt CHALK";
            context.fillText(num_der,825*percentage_scale,400*percentage_scale);
        }   
}

function MOUSE(X,Y)
{
	if( ESTADO_ACTUAL >= ESTADO_4_1 && ESTADO_ACTUAL <= ESTADO_4_4   )
    {
            if( menor.Presionando(X,Y) && menor.Boton_Seleccionado == false )
            {
                menor.SwapSelect();
                boton_delay = 5;
                if( num_izq < num_der )
					EJER_CORRECTO(1);
                else
					EJER_INCORRECTO(-1);
            }
            
            if( mayor.Presionando(X,Y) && mayor.Boton_Seleccionado == false)
            {
                mayor.SwapSelect();
                boton_delay = 5;
                if( num_izq > num_der )
					EJER_CORRECTO(1);
                else
					EJER_INCORRECTO(-1);
            }
    }
}

function INPUT(KEYCODE)
{
	if( ESTADO_ACTUAL == ESTADO_2 ||  ESTADO_ACTUAL == ESTADO_3 || ESTADO_ACTUAL == ESTADO_1_1 || ESTADO_ACTUAL == ESTADO_1_2 )
    {
		if( CONSOLA_KEYDOWN(KEYCODE) )
		{
			if( parseInt(CONSOLA) == decenas*10 + unidades )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	}
	

}
