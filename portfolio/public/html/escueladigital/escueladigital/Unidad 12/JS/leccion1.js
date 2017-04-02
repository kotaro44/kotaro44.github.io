var mundo = [];

//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 1,
        ESTADO_2 = 2,
		ESTADO_3 = 3,
		ESTADO_4 = 4;
		
var relojes = [ getImg("IMG/r1.png") , getImg("IMG/r2.png") ,  getImg("IMG/r3.png") , getImg("IMG/r4.png") ],
      reloj = new Reloj(1,34,0),
	  pro1 = [ [5,0] , [11,0] , [9,0] , [3,0] , [10,30] , [7,30] , [1,30] , [3,30] , [12,35],[12,20],[12,52],[12,59],[1,25],[3,15],[7,37] ],
	  pro2 = [ [8,0] , [11,30] , [8,30] , [4,0] ,[12,25],[3,32],[4,15],[5,47],[5,43],[11,56],[1,28],[6,19],[7,42],[10,37],[4,55],[9,59]],
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
                //INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/2)+1) + "/15) Escriba en el espacio la hora que marca el reloj.";
				INSTRUCCION = "1) (" + (Math.floor(ESTADO_RESP/2)+1) + "/16) Dibuje las agujas en cada reloj de acuerdo a la hora indicada.";
				reloj = new Reloj( pro1[ Math.floor(ESTADO_RESP/2) ][0] ,pro1[ Math.floor(ESTADO_RESP/2) ][1], Math.floor(ESTADO_RESP/2) );
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
        case ESTADO_2:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 30 )
				{
					FIN_LECCION();
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_2;    			
					INSTRUCCION = "2) (" + (Math.floor(ESTADO_RESP/2)+1) + "/15) Escriba en el espacio la hora que marca el reloj.";
					if( ESTADO_RESP%2 == 0 )
						reloj = new Reloj( pro1[ Math.floor(ESTADO_RESP/2) ][0] ,pro1[ Math.floor(ESTADO_RESP/2) ][1], Math.floor(ESTADO_RESP/2)%4 );
				}
            break;
		case ESTADO_1:
				ESTADO_RESP++;
				if( ESTADO_RESP >= 32 )
				{
					ESTADO_RESP = 0;
					ESTADO_ACTUAL = ESTADO_2;
					INSTRUCCION = "1) (" + (Math.floor(ESTADO_RESP/2)+1) + "/16) Dibuje las agujas en cada reloj de acuerdo a la hora indicada.";
					reloj = new Reloj( 12, 0, 0);
				}
				else
				{
					ESTADO_ACTUAL = ESTADO_1;    			
					INSTRUCCION = "1) (" + (Math.floor(ESTADO_RESP/2)+1) + "/16) Dibuje las agujas en cada reloj de acuerdo a la hora indicada.";
					if( ESTADO_RESP%2 == 1 )
						reloj.Hora = pro2[ Math.floor(ESTADO_RESP/2) ][0];
					else
						reloj.Minutos = 0;
					
				}
            break;

		
    }
}


function DRAW(context)
{
	INSTRUCCION_COLOR = "#000000";
	DRAW_INSTRUCTION();
	context.font = Math.floor(30*percentage_scale) + "pt CHALK";
			
	reloj.Dibujar(500,250);
	
	if( ESTADO_ACTUAL == ESTADO_2 || ESTADO_ANTERIOR == ESTADO_2 )
	{					
		context.font = Math.floor(35*percentage_scale) + "pt CHALK";
		TEMP = Math.floor(ESTADO_RESP/2);
		TEMP1 = ESTADO_RESP%2;
		
		for( i = 0 ; i < pos.length ; i++ )
		{	
			context.drawImage( i==TEMP1?cuadro1:cuadro, 
					( pos[i][0] - 15)*percentage_scale,( pos[i][1] - 44)*percentage_scale,                
							cuadro.width*percentage_scale,  cuadro.height*percentage_scale);   
		}
		
		if( ESTADO_RESP%2 == 1 )
			context.fillText( pro1[  TEMP ][0], 
					 pos[0][0] *percentage_scale, pos[0][1]*percentage_scale);
					 
		context.fillText( ":",  (pos[0][0] + 80)*percentage_scale, pos[0][1]*percentage_scale);
		
		CONSOLA_X = pos[TEMP1][0];
		CONSOLA_Y = pos[TEMP1][1];
		CONSOLA_SIZE = 35;
		CONSOLA_COLOR = "#000000";
		DRAW_CONSOLA();	
	}
	
	if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 )
	{		
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
			
		var minutitos = pro2[Math.floor(ESTADO_RESP/2)][1];
		context.fillText( pro2[Math.floor(ESTADO_RESP/2)][0]+(minutitos<10?":0"+minutitos:":"+minutitos),  300*percentage_scale, 300*percentage_scale);
	}
	
}

function MOUSE(X,Y)
{
	if( ESTADO_ACTUAL == ESTADO_1 )
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

		if( CONSOLA_KEYDOWN(KEYCODE) )
		{
			CORRECTO = false;
			switch( ESTADO_ACTUAL )
			{
				case ESTADO_2:
						if( ESTADO_RESP%2 == 0 )
							CORRECTO = parseInt( CONSOLA ) == pro1[ Math.floor( ESTADO_RESP/2) ][0];
						else
						{
							if( ESTADO_RESP < 8 )
								CORRECTO = CONSOLA == "00";
							else
							    CORRECTO = parseInt( CONSOLA ) == pro1[ Math.floor( ESTADO_RESP/2) ][1];
						}
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








