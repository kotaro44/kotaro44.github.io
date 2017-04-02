var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
        ESTADO_2 = 2,
		ESTADO_3 = 3,
		ESTADO_4 = 4;
		
var relojes = [ getImg("IMG/r1.png") , getImg("IMG/r2.png") ,  getImg("IMG/r3.png") , getImg("IMG/r4.png") ],
      reloj = new Reloj(1,34,0),reloj2 = new Reloj(1,34,0),
	  pro1 = [ "Mar\xEDa y Lila pasearon en el parque de las 3 y 30 a las 4 de la tarde. \xBFCu\xE1ntos minutos pasearon?",
	               "Jorge vio un programa un programa de televisi\xF3n desde las 10 hasta las 12 de la ma\xF1ana. \xBFCu\xE1ntas horas vio  televisi\xF3n?",
				   "Jos\xE9 y su mam\xE1 estuvieron en la casa de la abuela de las 8 a las 8 y 45 de la noche. \xBFCu\xE1ntos minutos estuvieron en la casa de la abuela?"],
	  problemas2 = [ "Suyapa empez\xF3 a estudiar en la casa a la 1, y continu\xF3 durante 2 horas. \xBFA que hora dej\xF3 de estudiar?",
	               "Enrique estuvo jugando en el jard\xEDn durante 50 minutos desde las 10 de la mañana. \xBFA que hora dej\xF3 de jugar?",
				   "A\xEDda dibuj\xF3 en al escuela durante 35 minutos desde las 7 y 15 de la ma\xF1ana. \xBFA qu\xE9 hora termin\xF3 de dibujar?"],
	  pro3 = [ "\xBFCu\xE1ntos d\xEDas hay desde el 8 de febrero hasta el 23 de febrero?",
	              "\xBFCu\xE1ntos d\xEDas hay desde el 5 de febrero hasta el 26 de febrero?",
				  "\xBFCu\xE1ntos d\xEDas hay desde el 11 de marzo hasta el 28 de febrero?"],
	  resp3 = ["15","21","17"],
	  pro2 = [ [3,0],[10,50],[7,50]],
	  resp1 = ["30","2","45"],relojes1 = [  [3,30,4,0] , [10,0,12,0] , [8,0,8,45] ],
	  pos = [ [200,600]  , [320,600] ],
	  cuadro = getImg("IMG/cuadro.png"),
	  cuadro1 = getImg("IMG/cuadro1.png");

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;
	
	LECCION_ACTUAL = LECCION_1;
	UNIDAD_ACTUAL = UNIDAD_12;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;    
				ESTADO_RESP = 0;				
                INSTRUCCION = "1) (" + (ESTADO_RESP+1) + "/3) " + pro1[ESTADO_RESP];
				
				reloj.Hora = relojes1[ESTADO_RESP][0];
				reloj.Minutos = relojes1[ESTADO_RESP][1];
				reloj2.Hora = relojes1[ESTADO_RESP][2];
				reloj2.Minutos = relojes1[ESTADO_RESP][3];
				
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
				if( ESTADO_RESP >= 3 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/2)+1) + "/3) " + problemas2[Math.floor(ESTADO_RESP/2)];
					reloj = new Reloj( 12, 0, 0);
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;    			
					INSTRUCCION = "1) (" + (ESTADO_RESP+1) + "/3) " + pro1[ESTADO_RESP];
					
					reloj.Hora = relojes1[ESTADO_RESP][0];
					reloj.Minutos = relojes1[ESTADO_RESP][1];
					reloj2.Hora = relojes1[ESTADO_RESP][2];
					reloj2.Minutos = relojes1[ESTADO_RESP][3];
				}
            break;
		case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 6 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) (" + ((ESTADO_RESP)+1) + "/3) " + pro3[ESTADO_RESP];
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;    			
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/2)+1) + "/3) " + problemas2[Math.floor(ESTADO_RESP/2)];
					if( ESTADO_RESP%2 == 1 )
						reloj.Hora = pro2[ Math.floor(ESTADO_RESP/2) ][0];
					else
						reloj.Minutos = 0;
					
				}
            break;
			
		case ESTADO_3:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 3 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_3;
					INSTRUCCION = "3) (" + ((ESTADO_RESP)+1) + "/3) " + pro3[ESTADO_RESP];
					
				}
            break;

		
    }
}


function DRAW(context)
{
	INSTRUCCION_COLOR = "#000000";
	DRAW_INSTRUCTION();
	context.font = Math.floor(30*percentage_scale) + "pt CHALK";
			

	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 )
	{					
		reloj.Dibujar(250,300);
		reloj2.Dibujar(750,300);
		
		CONSOLA_X = 100;
		CONSOLA_Y = 670;
		CONSOLA_SIZE = 35;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();	
	}
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{		
		reloj.Dibujar(500,250);
		var orx =  reloj.Imagen.width/2 +500,ory =  reloj.Imagen.width/2 +250,angulo = 0;
		if( DestX >= 500 && DestX <=500 + reloj.Imagen.width &&
			DestY >= 250 && DestY <= 250 + reloj.Imagen.width )
		          angulo = getAngulo(   10,  0 , DestX  - orx, DestY -ory );
	
		if( ESTADO_RESP%2 == 0)
		{
			reloj.Hora = Math.floor(angulo/30);
			if( reloj.Hora == 0 )
				reloj.Hora = 12;
		}
		else
			reloj.Minutos = Math.floor(angulo/6);
			
	}
	
	if( ESTADO_ACTUAL == ESTADO_3 || ESTADO_ANTERIOR == ESTADO_3 )
	{	
		CONSOLA_X = 100;
		CONSOLA_Y = 670;
		CONSOLA_SIZE = 35;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();	
	}
	

	
}

function MOUSE(X,Y)
{
	if( ESTADO_ACTUAL == ESTADO_2 )
	{
		if( ESTADO_RESP%2 == 0 )
			CORRECTO = reloj.Hora == pro2[Math.floor(ESTADO_RESP/2)][0];
		else
			CORRECTO = reloj.Minutos == pro2[Math.floor(ESTADO_RESP/2)][1];
		
		if( CORRECTO  )
			EJER_CORRECTO(1);
		else
			EJER_INCORRECTO(-1);
	}
}

function INPUT(KEYCODE)
{

	if( ESTADO_ACTUAL == ESTADO_2 )
		return;

		if( CONSOLA_KEYDOWN(KEYCODE) )
		{
			CORRECTO = false;
			switch( ESTADO_ACTUAL )
			{
				case ESTADO_1:
						CORRECTO = CONSOLA == resp1[ESTADO_RESP];
					break;
				case ESTADO_3:
						CORRECTO = CONSOLA == resp3[ESTADO_RESP];
					break;
			}
			
			if( CORRECTO  )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	
}

/*Clases*/
function Reloj( Hora , Minutos , tipo )
{
	this.Hora = Hora;
	this.Minutos = Minutos;
	this.X;
	this.Y;
	this.Imagen = relojes[tipo];
	this.Dibujar = function(  X , Y )
	{
		context.drawImage( this.Imagen , X*percentage_scale , Y*percentage_scale  , 
						this.Imagen.width*percentage_scale , this.Imagen.height*percentage_scale  );
						
		var angulo = ( this.Minutos*6 -90)*(Math.PI/180);
		      fx = X +  this.Imagen.width /2 + Math.cos(angulo)*110 ;
			  fy = Y +  this.Imagen.width /2 +  Math.sin(angulo)*110;
		DRAW_LINE( X +  this.Imagen.width/2 , Y + this.Imagen.width /2 ,  fx,fy,  6 , "#FF0000" ); 
		
		     angulo = (this.Hora*30 -90 + (this.Minutos/2) )*(Math.PI/180),
		      fx = X +  this.Imagen.width /2 + Math.cos(angulo)*60 ,
			  fy = Y +  this.Imagen.width /2 +  Math.sin(angulo)*60;
		DRAW_LINE( X +  this.Imagen.width/2 , Y + this.Imagen.width /2 ,  fx,fy,  6 , "#00FF00" ); 
		
		DRAW_CIRCLE( X +  this.Imagen.width/2 , Y + this.Imagen.width /2 , 8 , "#000000");
		
	};
	
}      

function getAngulo( u1 , u2 , v1 , v2 )
{
	var u1v1mu2v2 = u1*v1 + u2*v2,
	      r1 = Math.sqrt(  Math.pow(u1,2) +  Math.pow(u2,2) ),
		  r2 = Math.sqrt(  Math.pow(v1,2) +  Math.pow(v2,2) );
		  rad =  v2<0? Math.PI*2-Math.acos( u1v1mu2v2 / (r1*r2) ) : Math.acos( u1v1mu2v2 / (r1*r2) );
	return ((rad + Math.PI/2)*180/Math.PI)%360;
}








