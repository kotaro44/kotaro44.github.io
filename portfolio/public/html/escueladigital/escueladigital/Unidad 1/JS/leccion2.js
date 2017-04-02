//Estados probablemente esto servira para todas las lecciones
var   ESTADO_1 = 3,
        ESTADO_2_1_1 = 4,ESTADO_2_1_2 = 5, ESTADO_2_1_3 = 6,
        ESTADO_2_2_1 = 7,ESTADO_2_2_2 = 8, ESTADO_2_2_3 = 9,
        ESTADO_2_3_1 = 10,ESTADO_2_3_2 = 11, ESTADO_2_3_3 = 12,
        ESTADO_2_4_1 = 13,ESTADO_2_4_2 = 14, ESTADO_2_4_3 = 15,
        ESTADO_3_1 = 16,ESTADO_3_2 = 17,ESTADO_3_3 = 18,
        ESTADO_4 = 19,
        ESTADO_5_1 = 20,ESTADO_5_2 = 21,ESTADO_5_3 = 22,
        ESTADO_6_1 = 23,ESTADO_6_2 = 24,ESTADO_6_3 = 25,
        ESTADO_6_4 = 26,ESTADO_6_5 = 27,ESTADO_7_1 = 28,
        ESTADO_7_2 = 29,ESTADO_7_3 = 30,
        ESTADO_8_1_1 = 31,ESTADO_8_1_2 = 32, ESTADO_8_1_3 = 33, ESTADO_8_1_4 = 34,
        ESTADO_8_2_1 = 35,ESTADO_8_2_2 = 36, ESTADO_8_2_3 = 37, ESTADO_8_2_4 = 38,
        ESTADO_8_3_1 = 39,ESTADO_8_3_2 = 40, ESTADO_8_3_3 = 41, ESTADO_8_3_4 = 42,
        ESTADO_9_1 = 43,ESTADO_9_2 = 44,ESTADO_9_3 = 45,
        ESTADO_9_4 = 46,ESTADO_9_5 = 47,
        ESTADO_10_1_1 = 48,ESTADO_10_1_2 = 49, ESTADO_10_1_3 = 50,
        ESTADO_10_2_1 = 51,ESTADO_10_2_2 = 52, ESTADO_10_2_3 = 53,
        ESTADO_10_3_1 = 54,ESTADO_10_3_2 = 55, ESTADO_10_3_3 = 56,
        ESTADO_10_4_1 = 57,ESTADO_10_4_2 = 58, ESTADO_10_4_3 = 59,
        ESTADO_10_5_1 = 60,ESTADO_10_5_2 = 61, ESTADO_10_5_3 = 62;
		
//OBJETOS DIBUJABLES
var pajillas1 = new Drawable(getImg("IMG/pajillas1.png"),450,200),
    pajillas2 = new Drawable(getImg("IMG/pajillas2.png"),450,200),
    pajillas3 = new Drawable(getImg("IMG/pajillas3.png"),250,200),
    pajillas4 = new Drawable(getImg("IMG/pajillas4.png"),250,200),
    azulejos1 = new Drawable(getImg("IMG/azulejos1.png"),450,200),
    azulejos2 = new Drawable(getImg("IMG/azulejos2.png"),450,200),
    paginas1 = new Drawable(getImg("IMG/pag1.png"),150,200),
    cuadros1 = new Drawable(getImg("IMG/cuadros1.png"),350,200),
    cuadros2 = new Drawable(getImg("IMG/cuadros2.png"),350,200),
    cuadros3 = new Drawable(getImg("IMG/cuadros3.png"),350,200),
    cuadros4 = new Drawable(getImg("IMG/cuadros4.png"),350,200),
    ab1 = new Drawable(getImg("IMG/ab1.png"),500,200),
    ab2 = new Drawable(getImg("IMG/ab2.png"),500,200),
    ab3 = new Drawable(getImg("IMG/ab3.png"),500,200),
	
	centA1 = new Drawable(getImg("IMG/1_centA.png"),250,350),
    centB1 = new Drawable(getImg("IMG/1_centB.png"),600,450),
    centC1 = new Drawable(getImg("IMG/1_centC.png"),1050,250),
    centA2 = new Drawable(getImg("IMG/3_centA.png"),200,250),
    centB2 = new Drawable(getImg("IMG/3_centB.png"),600,350),
    centC2 = new Drawable(getImg("IMG/3_centC.png"),1050,550),
    centA3 = new Drawable(getImg("IMG/5_centA.png"),150,450),
    centB3 = new Drawable(getImg("IMG/5_centB.png"),600,550),
    centC3 = new Drawable(getImg("IMG/5_centC.png"),1050,450),
    centA4 = new Drawable(getImg("IMG/7_centA.png"),110,550),
    centB4 = new Drawable(getImg("IMG/7_centB.png"),600,250),
    centC4 = new Drawable(getImg("IMG/7_centC.png"),1050,350),
	c121A = new Drawable(getImg("IMG/c121A.png"),100,300),
    c347A = new Drawable(getImg( "IMG/c347A.png"),100,400),
    c569A = new Drawable(getImg("IMG/c569A.png"),100,500),
    c121B = new Drawable(getImg("IMG/c121B.png"),500,500),
    c347B = new Drawable(getImg("IMG/c347B.png"),500,300),
    c569B = new Drawable(getImg("IMG/c569B.png"),500,400);
	
var selectables = [ [centA2,centA1,centA3,centA4] , 
                    [centB4,centB2,centB1,centB3] ,
                    [centC1,centC4,centC3,centC2] ],
	selectables2 =  [ [c121A,c347A,c569A] , 
                      [c347B,c569B,c121B] ];
	
var mundo = [pajillas1,pajillas2,pajillas3,pajillas4,azulejos1,azulejos2,paginas1,
             cuadros1,cuadros2,cuadros3,cuadros4,ab1,ab2,ab3,
             centA1,centB1,centC1, centA2,centB2,centC2, centA3,centB3,centC3, centA4,centB4,centC4, 
             c121A,c347A,c569A,c121B,c347B,c569B];

var selects_i = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]],
    selects_j = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]],
    selects_i2 = [[-1,-1],[-1,-1],[-1,-1]],
    selects_j2 = [[-1,-1],[-1,-1],[-1,-1]],
    selects_columns = [-1,-1,-1],selects_columns2 = [-1,-1]
    selected = 0,selected2 = 0 , round = 0, round2 = 0;

var resp = [[0,1,3],[1,2,0],[2,3,2],[3,0,1]],correcta = false,resp2 = [[0,2],[1,0],[2,1]];

//FUNCTIONS
function INITIALIZE()
{
    ESTADO_ACTUAL = ESTADO_INICIANDO;

	LECCION_ACTUAL = LECCION_2;
	UNIDAD_ACTUAL = UNIDAD_1;
	
	centA1.SoyBoton(getImg("IMG/1_centAsel.png"));centB1.SoyBoton(getImg("IMG/1_centBsel.png"));
	centC1.SoyBoton(getImg("IMG/1_centCsel.png"));centA2.SoyBoton(getImg("IMG/3_centAsel.png"));
	centB2.SoyBoton(getImg( "IMG/3_centBsel.png"));centC2.SoyBoton(getImg( "IMG/3_centCsel.png")); 
	centA3.SoyBoton(getImg( "IMG/5_centAsel.png"));centB3.SoyBoton(getImg("IMG/5_centBsel.png"));
	centC3.SoyBoton(getImg("IMG/5_centCsel.png"));centA4.SoyBoton(getImg("IMG/7_centAsel.png"));
	centB4.SoyBoton(getImg("IMG/7_centBsel.png"));centC4.SoyBoton(getImg("IMG/7_centCsel.png")); 
	c121A.SoyBoton(getImg("IMG/c121Asel.png"));c347A.SoyBoton(getImg("IMG/c347Asel.png"));
	c569A.SoyBoton(getImg("IMG/c569Asel.png"));c121B.SoyBoton(getImg("IMG/c121Bsel.png"));
	c347B.SoyBoton(getImg("IMG/c347Bsel.png"));c569B.SoyBoton(getImg("IMG/c569Bsel.png"));
	
	for( i = 0; i < 3 ; i = i +1 )
            for( j = 0; j < 4 ; j = j +1 )
                selectables[i][j].Visible = true;
}

function UPDATE()
{        
     switch(ESTADO_ACTUAL)
     {
        case ESTADO_INICIANDO:
                ESTADO_ACTUAL = ESTADO_1;        
                INSTRUCCION = "1) Una con l\xEDneas el dibujo y las palabras correspondientes.";
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
				ESTADO_ACTUAL = ESTADO_2_1_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "2) (1/4) Cuente las pajillas. \xBFCuantas centenas hay?";
				for( i = 0; i < 3 ; i = i +1 )
					for( j = 0; j < 4 ; j = j +1 )
						selectables[i][j].Visible = false;
				pajillas1.Visible = true;
			break;
		case ESTADO_2_1_1:
				ESTADO_ACTUAL = ESTADO_2_1_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "2) (1/4) Cuente las pajillas. \xBFCuantas decenas hay?";
			break;
		case ESTADO_2_1_2:
				ESTADO_ACTUAL = ESTADO_2_1_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "2) (1/4) Cuente las pajillas. \xBFCuantas unidades hay?";
			break;
			
		case ESTADO_2_1_3:
				ESTADO_ACTUAL = ESTADO_2_2_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "2) (2/4) Cuente las pajillas. \xBFCuantas centenas hay?";
				pajillas1.Visible = false;
				pajillas2.Visible = true;
			break;
		case ESTADO_2_2_1:
				ESTADO_ACTUAL = ESTADO_2_2_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "2) (2/4) Cuente las pajillas. \xBFCuantas decenas hay?";
			break;
		case ESTADO_2_2_2:
				ESTADO_ACTUAL = ESTADO_2_2_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "2) (2/4) Cuente las pajillas. \xBFCuantas unidades hay?";
			break;
			
		case ESTADO_2_2_3:
				ESTADO_ACTUAL = ESTADO_2_3_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "2) (3/4) Cuente los azulejos. \xBFCuantas centenas hay?";
				pajillas2.Visible = false;
				azulejos1.Visible = true;
			break;
		case ESTADO_2_3_1:
				ESTADO_ACTUAL = ESTADO_2_3_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "2) (3/4) Cuente los azulejos. \xBFCuantas decenas hay?";
			break;
		case ESTADO_2_3_2:
				ESTADO_ACTUAL = ESTADO_2_3_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "2) (3/4) Cuente los azulejos. \xBFCuantas unidades hay?";
			break;
			
		case ESTADO_2_3_3:
				ESTADO_ACTUAL = ESTADO_2_4_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "2) (4/4) Cuente los azulejos. \xBFCuantas centenas hay?";
				azulejos1.Visible = false;
				azulejos2.Visible = true;
			break;
		case ESTADO_2_4_1:
				ESTADO_ACTUAL = ESTADO_2_4_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "2) (4/4) Cuente los azulejos. \xBFCuantas decenas hay?";
			break;
		case ESTADO_2_4_2:
				ESTADO_ACTUAL = ESTADO_2_4_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "2) (4/4) Cuente los azulejos. \xBFCuantas unidades hay?";
			break;
			
			
		case ESTADO_2_4_3:
				ESTADO_ACTUAL = ESTADO_3_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "3) (1/3) Escriba con n\xFAmeros cu\xE1ntos hay y l\xE9alos.";
				azulejos2.Visible = false;
				paginas1.Visible = true;
			break;
		case ESTADO_3_1:
				ESTADO_ACTUAL = ESTADO_3_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "3) (2/3) Escriba con n\xFAmeros cu\xE1ntos hay y l\xE9alos.";
				paginas1.Visible = false;
				cuadros1.Visible = true;
			break;
		case ESTADO_3_2:
				ESTADO_ACTUAL = ESTADO_3_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "3) (3/3) Escriba con n\xFAmeros cu\xE1ntos hay y l\xE9alos.";
				cuadros1.Visible = false;
			break;
			
		case ESTADO_3_3:
				ESTADO_ACTUAL = ESTADO_4;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "4) Una con l\xEDneas el n\xFAmero y la palabra que corresponden";
				for( i = 0; i < 2 ; i = i +1 )
					for( j = 0; j < 3 ; j = j +1 )
						selectables2[i][j].Visible = true;
			break;
		case ESTADO_4:
				ESTADO_ACTUAL = ESTADO_5_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "5) (1/3) \xBFCuantas decenas hay en 625?";
				for( i = 0; i < 2 ; i = i +1 )
					for( j = 0; j < 3 ; j = j +1 )
						selectables2[i][j].Visible = false;
			break;
		case ESTADO_5_1:
				ESTADO_ACTUAL = ESTADO_5_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "5) (2/3) \xBFCuantas centenas hay en 947?";
			break;
		case ESTADO_5_2:
				ESTADO_ACTUAL = ESTADO_5_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "5) (3/3) \xBFCuantas unidades hay en 183?";
			break;
		case ESTADO_5_3:
				ESTADO_ACTUAL = ESTADO_6_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "6) (1/5) Escriba con n\xFAmeros cu\xE1ntos hay y l\xE9alos";
				pajillas3.Visible = true;
			break;
		case ESTADO_6_1:
				ESTADO_ACTUAL = ESTADO_6_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "6) (2/5) Escriba con n\xFAmeros cu\xE1ntos hay y l\xE9alos";
				pajillas4.Visible = true;
				pajillas3.Visible = false;
			break;
		case ESTADO_6_2:
				ESTADO_ACTUAL = ESTADO_6_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "6) (3/5) Escriba con n\xFAmeros cu\xE1ntos hay y l\xE9alos";
				cuadros2.Visible = true;
				pajillas4.Visible = false;
			break;
		case ESTADO_6_3:
				ESTADO_ACTUAL = ESTADO_6_4;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "6) (4/5) Escriba con n\xFAmeros cu\xE1ntos hay y l\xE9alos";
				cuadros3.Visible = true;
				cuadros2.Visible = false;
			break;
		case ESTADO_6_4:
				ESTADO_ACTUAL = ESTADO_6_5;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "6) (5/5) Escriba con n\xFAmeros cu\xE1ntos hay y l\xE9alos";
				cuadros4.Visible = true;
				cuadros3.Visible = false;
			break;
		case ESTADO_6_5:
				ESTADO_ACTUAL = ESTADO_7_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "7) (1/3) Escriba el n\xFAmero que corresponde a cada palabra";
				cuadros4.Visible = false;
			break;
		case ESTADO_7_1:
				ESTADO_ACTUAL = ESTADO_7_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "7) (2/3) Escriba el n\xFAmero que corresponde a cada palabra";
			break;
		case ESTADO_7_2:
				ESTADO_ACTUAL = ESTADO_7_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "7) (3/3) Escriba el n\xFAmero que corresponde a cada palabra";
			break;
		case ESTADO_7_3:
				ESTADO_ACTUAL = ESTADO_8_1_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "8) (1/3) \xBFCuantas centenas hay?";
				ab1.Visible = true;
			break;
		case ESTADO_8_1_1:
				ESTADO_ACTUAL = ESTADO_8_1_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "8) (1/3) \xBFCuantas decenas hay?";
			break;
		 case ESTADO_8_1_2:
				ESTADO_ACTUAL = ESTADO_8_1_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "8) (1/3) \xBFCuantas unidades hay?";
			break;
		case ESTADO_8_1_3:
				ESTADO_ACTUAL = ESTADO_8_1_4;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "8) (1/3) \xBF3 y 5 y 6 son?";
			break;
		case ESTADO_8_1_4:
				ESTADO_ACTUAL = ESTADO_8_2_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "8) (2/3) \xBFCuantas centenas hay?";
				ab1.Visible = false;
				ab2.Visible = true;
			break;
		case ESTADO_8_2_1:
				ESTADO_ACTUAL = ESTADO_8_2_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "8) (2/3) \xBFCuantas decenas hay?";
			break;
		 case ESTADO_8_2_2:
				ESTADO_ACTUAL = ESTADO_8_2_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "8) (2/3) \xBFCuantas unidades hay?";
			break;
		case ESTADO_8_2_3:
				ESTADO_ACTUAL = ESTADO_8_2_4;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "8) (2/3) \xBF2 y 7 y 0 son?";
			break;
		case ESTADO_8_2_4:
				ESTADO_ACTUAL = ESTADO_8_3_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "8) (3/3) \xBFCuantas centenas hay?";
				ab2.Visible = false;
				ab3.Visible = true;
			break;
	   case ESTADO_8_3_1:
				ESTADO_ACTUAL = ESTADO_8_3_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "8) (2/3) \xBFCuantas decenas hay?";
			break;
		 case ESTADO_8_3_2:
				ESTADO_ACTUAL = ESTADO_8_3_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "8) (2/3) \xBFCuantas unidades hay?";
			break;
		case ESTADO_8_3_3:
				ESTADO_ACTUAL = ESTADO_8_3_4;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "8) (2/3) \xBF5 y 0 y 2 son?";
			break;
		case ESTADO_8_3_4:
				ESTADO_ACTUAL = ESTADO_9_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "9) (1/5) \xBFQu\xE9 n\xFAmero se forma con 2 centenas, 8 decenas y 5 unidades?";
				ab3.Visible = false;
			break;
		case ESTADO_9_1:
				ESTADO_ACTUAL = ESTADO_9_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "9) (2/5) \xBFQu\xE9 n\xFAmero se forma con 3 centenas, 2 decenas y 7 unidades?";
			break;
		case ESTADO_9_2:
				ESTADO_ACTUAL = ESTADO_9_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "9) (3/5) \xBFQu\xE9 n\xFAmero se forma con 4 centenas, 1 decenas y 4 unidades?";
			break;
		case ESTADO_9_3:
				ESTADO_ACTUAL = ESTADO_9_4;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "9) (4/5) \xBFQu\xE9 n\xFAmero se forma con 7 centenas y 3 decenas?";
			break;
		case ESTADO_9_4:
				ESTADO_ACTUAL = ESTADO_9_5;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "9) (5/5) \xBFQu\xE9 n\xFAmero se forma con 9 centenas y 1 unidad?";
			break;
			
		case ESTADO_9_5:
				ESTADO_ACTUAL = ESTADO_10_1_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (1/5) \xBFPor cuantas centenas esta formado 934?";
			break;
		case ESTADO_10_1_1:
				ESTADO_ACTUAL = ESTADO_10_1_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (1/5) \xBFPor cuantas decenas esta formado 934?";
			break;
		case ESTADO_10_1_2:
				ESTADO_ACTUAL = ESTADO_10_1_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (1/5) \xBFPor cuantas unidades esta formado 934?";
			break;
			
		case ESTADO_10_1_3:
				ESTADO_ACTUAL = ESTADO_10_2_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (2/5) \xBFPor cuantas centenas esta formado 565?";
			break;
		case ESTADO_10_2_1:
				ESTADO_ACTUAL = ESTADO_10_2_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (2/5) \xBFPor cuantas decenas esta formado 565?";
			break;
		case ESTADO_10_2_2:
				ESTADO_ACTUAL = ESTADO_10_2_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (2/5) \xBFPor cuantas unidades esta formado 565?";
			break;
			
	   case ESTADO_10_2_3:
				ESTADO_ACTUAL = ESTADO_10_3_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (3/5) \xBFPor cuantas centenas esta formado 872?";
			break;
	   case ESTADO_10_3_1:
				ESTADO_ACTUAL = ESTADO_10_3_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (3/5) \xBFPor cuantas decenas esta formado 872?";
			break;
	   case ESTADO_10_3_2:
				ESTADO_ACTUAL = ESTADO_10_3_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (3/5) \xBFPor cuantas unidades esta formado 872?";
			break;
	   
	   case ESTADO_10_3_3:
				ESTADO_ACTUAL = ESTADO_10_4_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (4/5) \xBFPor cuantas centenas esta formado 180?";
			break;
	   case ESTADO_10_4_1:
				ESTADO_ACTUAL = ESTADO_10_4_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (4/5) \xBFPor cuantas decenas esta formado 180?";
			break;
	   case ESTADO_10_4_2:
				ESTADO_ACTUAL = ESTADO_10_4_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (4/5) \xBFPor cuantas unidades esta formado 180?";
			break;
			
			
	   case ESTADO_10_4_3:
				ESTADO_ACTUAL = ESTADO_10_5_1;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (5/5) \xBFPor cuantas centenas esta formado 209?";
			break;
	   case ESTADO_10_5_1:
				ESTADO_ACTUAL = ESTADO_10_5_2;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (5/5) \xBFPor cuantas decenas esta formado 209?";
			break;
	   case ESTADO_10_5_2:
				ESTADO_ACTUAL = ESTADO_10_5_3;
				ESTADO_ANTERIOR = ESTADO_NINGUNO;
				INSTRUCCION = "10) (5/5) \xBFPor cuantas unidades esta formado 209?";
			break;
		case ESTADO_10_5_3:
				FIN_LECCION();
			break;
	}
}


function DRAW(context)
{
        context.fillStyle = "#FFFFFF";
        context.font = Math.floor(20*percentage_scale) + "pt CHALK";
		
        DRAW_INSTRUCTION();
		
		if( ESTADO_ACTUAL != ESTADO_1 && ESTADO_ANTERIOR != ESTADO_1 && 
		    ESTADO_ACTUAL != ESTADO_4 && ESTADO_ANTERIOR != ESTADO_4 )
			DRAW_CONSOLA();
			
		if( ESTADO_ACTUAL == ESTADO_7_1 || ESTADO_ANTERIOR == ESTADO_7_1 )
        {
            context.font = Math.floor(40*percentage_scale) + "pt CHALK";
            context.fillText("Novecientos tres",200*percentage_scale,250*percentage_scale);
        }
        
        if( ESTADO_ACTUAL == ESTADO_7_2 || ESTADO_ANTERIOR == ESTADO_7_2 )
        {
            context.font = Math.floor(40*percentage_scale) + "pt CHALK";
            context.fillText("Doscientos sesenta",200*percentage_scale,250*percentage_scale);
        }
        
        if( ESTADO_ACTUAL == ESTADO_7_3 || ESTADO_ANTERIOR == ESTADO_7_3 )
        {
            context.font = Math.floor(40*percentage_scale) + "pt CHALK";
            context.fillText("Quinientos",200*percentage_scale,250*percentage_scale);
        }
        
        if( ESTADO_ACTUAL == ESTADO_3_3 || ESTADO_ANTERIOR == ESTADO_3_3)
        {
            context.font = Math.floor(40*percentage_scale) + "pt CHALK";
            context.fillText("9 centenas, 6 decenas y 8 unidades.",200*percentage_scale,250*percentage_scale);
        }
        
        if( ESTADO_ACTUAL == ESTADO_1 || ESTADO_ANTERIOR == ESTADO_1 )
        {
            for( i = 0; i < 4 ; i = i +1 )
            {
                /*primera linea*/
                if( selects_i[i][0] != -1 && selects_i[i][1] != -1)
                {
                    context.lineWidth=2;
                    context.strokeStyle="blue";
                    context.beginPath();
                    context.moveTo(( 276 + selects_i[i][0]*425)*percentage_scale ,( 274 + selects_j[i][0]*100)*percentage_scale);
                    context.lineTo(( 276 + selects_i[i][1]*425)*percentage_scale , ( 274 + selects_j[i][1]*100)*percentage_scale);
                    context.stroke();
                }
                
                /*segunda linea*/
                if( selects_i[i][1] != -1 && selects_i[i][2] != -1)
                {
                    context.lineWidth=2;
                    context.strokeStyle="blue";
                    context.beginPath();
                    context.moveTo(( 276 + selects_i[i][1]*425)*percentage_scale ,( 274 + selects_j[i][1]*100)*percentage_scale);
                    context.lineTo(( 276 + selects_i[i][2]*425)*percentage_scale , ( 274 + selects_j[i][2]*100)*percentage_scale);
                    context.stroke();
                }

                
            }
        }
        
        if( ESTADO_ACTUAL == ESTADO_4 || ESTADO_ANTERIOR == ESTADO_4 )
        {
            for( i = 0; i < 3 ; i = i +1 )
            {
                if( selects_i2[i][0] != -1 && selects_i2[i][1] != -1)
                {
                    context.lineWidth=6;
                    context.strokeStyle="green";
                    context.beginPath();
                    context.moveTo(( 250+ selects_i2[i][0]*250)*percentage_scale ,( 320 + selects_j2[i][0]*100)*percentage_scale);
                    context.lineTo(( 250 + selects_i2[i][1]*250)*percentage_scale , ( 320 + selects_j2[i][1]*100)*percentage_scale);
                    context.stroke();
                }
                
            }
        }
		
}

function MOUSE(X,Y)
{
	if( ESTADO_ACTUAL == ESTADO_4 )
    {
        for( i = 0; i < 2 ; i = i +1 )
            for( j = 0; j < 3 ; j = j +1 )
            {
                if( selectables2[i][j].Boton_Seleccionado == false && selectables2[i][j].Presionando(X,Y) )
                {
                    for( k = 0 ; k < 2 ; k = k +1 )
                    {
                        if( selects_columns2[k] == i )
                            return;
                    }
                    selects_columns2[selected2] = i;
                    selectables2[i][j].SwapSelect();
                    selects_i2[round2][selected2] = i;
                    selects_j2[round2][selected2] = j;
                    selected2 = selected2 +1;
                }
            }

        if( selected2 == 2)
        {
            for( i = 0; i < 2 ; i = i +1 )
                selects_columns2[i] = -1;
            selected2 = 0;
            round2 = round2 + 1;
            if( round2 == 3 )
            {
               
                var linea = [0,0];
                for( i = 0; i < 3 ; i = i +1 )
                {
                    linea = [0,0];
                    linea[selects_i2[i][0]] = selects_j2[i][0];
                    linea[selects_i2[i][1]] = selects_j2[i][1];
                    for( i = 0; i < 3 ; i++ )
                    {
                        if( resp2[i][0] == linea[0] && 
                            resp2[i][1] == linea[1]  )
                            {
                                resp2[i][0] = -1;
                                correcta = true;
                            }
                    }
                    if( correcta == false )
                    {
                        EJER_INCORRECTO(-1);
                        selects_i2 = [[-1,-1],[-1,-1],[-1,-1]];
                        selects_j2 = [[-1,-1],[-1,-1],[-1,-1]];
                        selects_columns2 = [-1,-1];
                        selected2 = 0 ;
                        round2 = 0;
                        resp2 = [[0,2],[1,0],[2,1]];
                        for( i = 0; i < 2 ; i = i +1 )
                            for( j = 0; j < 3 ; j = j +1 )
                                selectables2[i][j].SwapSelect();
                      
                        return;
                    }
                }
                EJER_CORRECTO(1);
            }
        }
            
        
    }
    
    if( ESTADO_ACTUAL == ESTADO_1 )
    {
        for( i = 0; i < 3 ; i = i +1 )
            for( j = 0; j < 4 ; j = j +1 )
            {
                if( selectables[i][j].Boton_Seleccionado == false && selectables[i][j].Presionando(X,Y) )
                {
					
                    for( k = 0 ; k < 3 ; k = k +1 )
                    {
                        if( selects_columns[k] == i )
                            return;
                    }
                    selects_columns[selected] = i;
                    selectables[i][j].SwapSelect();
                    selects_i[round][selected] = i;
                    selects_j[round][selected] = j;
                    selected = selected +1;
                }
            }
            
            if( selected == 3)
            {
                for( i = 0; i < 3 ; i = i +1 )
                    selects_columns[i] = -1;
                selected = 0;
                round = round + 1;
                if( round == 4 )
                {

                    var linea = [0,0,0];
                    for( i = 0; i < 4 ; i = i +1 )
                    {
						
                        linea = [0,0,0];
                        linea[selects_i[i][0]] = selects_j[i][0];
                        linea[selects_i[i][1]] = selects_j[i][1];
                        linea[selects_i[i][2]] = selects_j[i][2];
                        correcta = false;
						
                        for( i = 0; i < 4 ; i++ )
                        {
                            if( resp[i][0] == linea[0] && 
                                resp[i][1] == linea[1] && 
                                resp[i][2] == linea[2] )
                                {
                                    resp[i][0] = -1;
                                    correcta = true;
                                }
                        }
                        if( correcta == false )
                        {
                            EJER_INCORRECTO(-1);
                            selects_i = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
                            selects_j = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
                            selects_columns = [-1,-1,-1];
                            selected = 0 ;
                            round = 0;
                            resp = [[0,1,3],[1,2,0],[2,3,2],[3,0,1]];
                            for( i = 0; i < 3 ; i = i +1 )
                                for( j = 0; j < 4 ; j = j +1 )
                                    selectables[i][j].SwapSelect();
                            return;
                        }
                    }
                    EJER_CORRECTO(1);
                }
            }
    }
}

function INPUT(KEYCODE)
{
	if( ESTADO_ACTUAL != ESTADO_1 && ESTADO_ACTUAL != ESTADO_CALIFICANDO && ESTADO_ACTUAL != ESTADO_4)
    {
		if( CONSOLA_KEYDOWN(KEYCODE) )
		{
			CORRECTO = false;
			switch(ESTADO_ACTUAL)
			{
			   case ESTADO_2_1_1:
			   case ESTADO_2_1_2:
			   case ESTADO_2_2_1:
			   case ESTADO_8_2_1:
			   case ESTADO_8_3_3:
				   CORRECTO = ( parseInt(CONSOLA) == 2 );
				   break;
			   case ESTADO_2_1_3:
			   case ESTADO_2_3_1:
			   case ESTADO_8_1_2:
			   case ESTADO_8_3_1:
				   CORRECTO = ( parseInt(CONSOLA) == 5 );
				   break;
			   case ESTADO_2_2_2:
			   case ESTADO_2_4_1:
				   CORRECTO = ( parseInt(CONSOLA) == 1 );
				   break;
			   case ESTADO_2_2_3:
			   case ESTADO_2_3_2:
			   case ESTADO_8_1_1:
				   CORRECTO = ( parseInt(CONSOLA) == 3 );
				   break;
			   case ESTADO_2_3_3:
				   CORRECTO = ( parseInt(CONSOLA) == 8 );
				   break;
			   case ESTADO_2_4_2:
				   CORRECTO = ( parseInt(CONSOLA) == 9 );
				   break;
			   case ESTADO_2_4_3:
			   case ESTADO_8_2_2:
				   CORRECTO = ( parseInt(CONSOLA) == 7 );
				   break;
			   case ESTADO_3_1:
				   CORRECTO = ( parseInt(CONSOLA) == 424 );
				   break;
			   case ESTADO_3_2:
				   CORRECTO = ( parseInt(CONSOLA) == 581 );
				   break;
			   case ESTADO_3_3:
				   CORRECTO = ( parseInt(CONSOLA) == 968 );
				   break;
			   case ESTADO_5_1:
				   CORRECTO = ( parseInt(CONSOLA) == 2 );
				   break;
			   case ESTADO_5_2:
				   CORRECTO = ( parseInt(CONSOLA) == 9 );
				   break;
			   case ESTADO_5_3:
				   CORRECTO = ( parseInt(CONSOLA) == 3 );
				   break;
			   case ESTADO_6_1:
				   CORRECTO = ( parseInt(CONSOLA) == 270 );
				   break;
			   case ESTADO_6_2:
				   CORRECTO = ( parseInt(CONSOLA) == 506 );
				   break;
			   case ESTADO_6_3:
				   CORRECTO = ( parseInt(CONSOLA) == 409 );
				   break;
			   case ESTADO_6_4:
				   CORRECTO = ( parseInt(CONSOLA) == 600 );
				   break;
			   case ESTADO_6_5:
				   CORRECTO = ( parseInt(CONSOLA) == 180 );
				   break;
			   case ESTADO_7_1:
				   CORRECTO = ( parseInt(CONSOLA) == 903 );
				   break;
			   case ESTADO_7_2:
				   CORRECTO = ( parseInt(CONSOLA) == 260 );
				   break;
			   case ESTADO_7_3:
				   CORRECTO = ( parseInt(CONSOLA) == 500 );
				   break;
			   case ESTADO_8_1_3:
				   CORRECTO = ( parseInt(CONSOLA) == 6 );
				   break;
			   case ESTADO_8_2_3:
			   case ESTADO_8_3_2:
				   CORRECTO = ( parseInt(CONSOLA) == 0 );
				   break;
			   case ESTADO_8_1_4:
				   CORRECTO = ( parseInt(CONSOLA) == 356 );
				   break;
			   case ESTADO_8_2_4:
				   CORRECTO = ( parseInt(CONSOLA) == 270 );
				   break;
			   case ESTADO_8_3_4:
				   CORRECTO = ( parseInt(CONSOLA) == 502 );
				   break;
			   case ESTADO_9_1:
				   CORRECTO = ( parseInt(CONSOLA) == 285 );
				   break;
			   case ESTADO_9_2:
				   CORRECTO = ( parseInt(CONSOLA) == 327 );
				   break;
			   case ESTADO_9_3:
				   CORRECTO = ( parseInt(CONSOLA) == 414 );
				   break;
			   case ESTADO_9_4:
				   CORRECTO = ( parseInt(CONSOLA) == 73 );
				   break;
			   case ESTADO_9_5:
				   CORRECTO = ( parseInt(CONSOLA) == 91 );
				   break;
				   
			   case ESTADO_10_1_1:
				   CORRECTO = ( parseInt(CONSOLA) == 9 );
				   break;
			   case ESTADO_10_1_2:
				   CORRECTO = ( parseInt(CONSOLA) == 3 );
				   break;
			   case ESTADO_10_1_3:
				   CORRECTO = ( parseInt(CONSOLA) == 4 );
				   break;
				   
				   
			   case ESTADO_10_2_1:
				   CORRECTO = ( parseInt(CONSOLA) == 5 );
				   break;
			   case ESTADO_10_2_2:
				   CORRECTO = ( parseInt(CONSOLA) == 6 );
				   break;
			   case ESTADO_10_2_3:
				   CORRECTO = ( parseInt(CONSOLA) == 5 );
				   break;
				   
				   
			   case ESTADO_10_3_1:
				   CORRECTO = ( parseInt(CONSOLA) == 8 );
				   break;
			   case ESTADO_10_3_2:
				   CORRECTO = ( parseInt(CONSOLA) == 7 );
				   break;
			   case ESTADO_10_3_3:
				   CORRECTO = ( parseInt(CONSOLA) == 2 );
				   break;
				   
			   case ESTADO_10_4_1:
				   CORRECTO = ( parseInt(CONSOLA) == 1 );
				   break;
			   case ESTADO_10_4_2:
				   CORRECTO = ( parseInt(CONSOLA) == 8 );
				   break;
			   case ESTADO_10_4_3:
				   CORRECTO = ( parseInt(CONSOLA) == 0 );
				   break;
				   
			   case ESTADO_10_5_1:
				   CORRECTO = ( parseInt(CONSOLA) == 2 );
				   break;
			   case ESTADO_10_5_2:
				   CORRECTO = ( parseInt(CONSOLA) == 0 );
				   break;
			   case ESTADO_10_5_3:
				   CORRECTO = ( parseInt(CONSOLA) == 9 );
				   break;
			}
			if( CORRECTO )
				EJER_CORRECTO_CONSOLA(1);
			else
				EJER_INCORRECTO_CONSOLA(-1);
		}
	}
	
	

}