var titulos = [
[["Recordemos","1er Grado","leccion1.html"],
 ["Lección 1","Conozcamos la centena","leccion2.html"],
 ["Lección 2","Leamos y escribamos números","leccion3.html"],
 ["Lección 3","Ordenemos números","leccion4.html"],
 ["Lección 4","Comparemos números","leccion5.html"] ],
[["Lección 1","Segmentos","leccion1.html"]],
[["Lección 1","Sumemos y restemos","leccion1.html"]],
[["Lección 1","Sumemos","leccion1.html"],
 ["Lección 2","Sigamos sumando","leccion2.html"],
 ["Ejercicios 1","Correspondientes a la lección 2","leccion3.html"],
 ["Lección 3","Sumemos llevando","leccion4.html"],
 ["Ejercicios 2","Correspondientes a la lección 3","leccion5.html"]],
[["Lección 1","Restemos","leccion1.html"],
 ["Lección 2","Sigamos restando","leccion2.html"],
 ["Ejercicios 1","Correspondientes a la lección 2","leccion3.html"],
 ["Lección 3","Restemos prestando","leccion4.html"],
 ["Ejercicios 2","Correspondientes a la lección 3","leccion5.html"]],
[["Lección 1","Formemos figuras planas","leccion1.html"],
 ["Lección 2","Dibujemos figuras planas","leccion2.html"]],
[["Lección 1","Sumemos y multipliquemos","leccion1.html"],
 ["Lección 2","Multipliquemos","leccion2.html"],
 ["Ejercicios 1","Correspondientes a la lección 2","leccion3.html"],
 ["Lección 3","Sigamos multiplicando","leccion4.html"],
 ["Ejercicios 2","Correspondientes a la lección 2","leccion5.html"],
 ["Lección 4","Multipliquemos con 1 y con 0","leccion6.html"],
 ["Ejercicios 3","Correspondientes a la lección 4","leccion7.html"],
 ["Lección 5","Tabla de la multiplicación","leccion8.html"],
 ["Ejercicios 4","Correspondientes a la lección 5","leccion9.html"]],
[["Lección 1","Midamos en metros y centimetros","leccion1.html"],
 ["Lección 2","Sumemos y restemos con la longitud","leccion2.html"],
 ["Ejercicios 1","Correspondientes a la lección 2","leccion3.html"]],
[["Lección 1","Repartamos en partes iguales","leccion1.html"],
 ["Lección 2","Dividamos","leccion2.html"]],
[["Lección 1","Clasifiquemos sólidos geométricos","leccion1.html"],
 ["Lección 2","Conozcamos los elementos de cubos y sólidos rectangulares","leccion2.html"]],
[["Lección 1","Conozcamos nuestra moneda","leccion1.html"],
 ["Lección 2","Sigamos conociendo nuestra moneda","leccion2.html"],
 ["Lección 3","Sumemos y restemos dinero","leccion3.html"]],
[["Lección 1","Leamos el reloj","leccion1.html"],
 ["Lección 2","Midamos el tiempo","leccion2.html"]],
 [["Lección 1","Organicemos e Interpretemos datos","leccion1.html"]],
[["Prueba 1","Febrero y Marzo","leccion1.html"],
 ["Prueba 2","Abril","leccion2.html"],
 ["Prueba 3","Mayo","leccion3.html"],
 ["Prueba 4","Junio","leccion4.html"],
 ["Prueba 5","Julio","leccion5.html"],
 ["Prueba 6","Agosto","leccion6.html"],
 ["Prueba 7","Septiembre","leccion7.html"],
 ["Prueba 8","Octubre y Noviembre","leccion8.html"]]
],unidadactual = 7;

mouseoverlapiz = function(ladiv,tipo)
{
	ladiv.style.backgroundPosition = "500px, 0px "; 
};

mouseoutlapiz = function(ladiv,tipo)
{
	ladiv.style.backgroundPosition = "0px, 500px "; 
};


mouseovereffect = function(ladiv)
{
	ladiv.style.backgroundPosition= "400px , 0px"; 
	var datos = getDatos( "u" + unidadactual , ladiv.id );
	ladiv.innerText = datos[0];
	document.getElementById("texto"+ladiv.id.substring(7,ladiv.id.length)).innerHTML = datos[1];
};

mouseouteffect = function(ladiv)
{
	ladiv.style.backgroundPosition= "0px , 400px"; 
	ladiv.innerText = getDatos( "u" + unidadactual , ladiv.id )[0];
	document.getElementById("texto"+ladiv.id.substring(7,ladiv.id.length)).innerHTML ="";
};

mousedownleccion = function(ladiv)
{
	leccionselect(unidadactual,parseInt( ladiv.id.substring(7,ladiv.id.length)));
};

leccionselect = function( unidad , leccion )
{
	window.open('Unidad ' + unidad + '/' + titulos[unidad-1][leccion-1][2]);
};

cargarunidad = function( unidad )
{
	unidadactual = unidad;
	document.getElementById("titulo_leccion").innerHTML = document.getElementById( 'u' + unidad ).innerHTML;
	for( i = 1; i <= 9; i++ )
	{
		document.getElementById("leccion"+i).style.visibility="hidden";
		document.getElementById("imgl"+i).style.visibility="hidden";
	}
	for( i = 1; i <= titulos[unidadactual-1].length; i++ )
	{
		document.getElementById("leccion"+i).style.visibility="visible";
		document.getElementById("imgl"+i).style.visibility="visible";
		document.getElementById("leccion"+i).innerText = getDatos( "u" + unidadactual , "leccion"+i )[0];
	}
};

getDatos = function( unidad , leccion )
{
	return titulos[ unidadactual-1 ][ parseInt( leccion.substring(7,leccion.length) )-1];
};

function crearleccion(ladiv)
{
	post_to_url('crearleccion.php' , {param: id_sesion + "," + unidadactual+","+ladiv.id.substring(4,ladiv.id.length) } , 'post' );
};




