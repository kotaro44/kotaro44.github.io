<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<script type = "text/javascript" src="jquery.js"></script>
<script type = "text/javascript" src="JS/base.js"></script>
<script>
var id_sesion=0,leccion=0,unidad=0,clases=[],alumnos=[];
	window.onload = function()
	{
			
			var param =  document.getElementById('param').value;
			var datos = param.split(',');
			id_sesion = datos[0];
			unidad = datos[1];
			leccion = datos[2];
			
			if( id_sesion.length == 0 )
				window.location = 'login.html';
			else
			{
				$.post('Queries/getnombreprofesor.php' , { value: id_sesion },
				function(output)
				{
					if( output.substring(0,2) == 'NO' )
						window.location = 'login.html';
					cargarclases();
				});
			}
		
	};
	
function cargarclases()
{
	document.getElementById('clases').options.length = 0;
	document.getElementById('clases').disabled = true;
	clases = [];
	$.post('Queries/getclases.php' , { value: id_sesion },
	function(output)
	{
		if( output.substring(0,2) == 'NO' )
			combo.options.add(new Option( 'No tiene ninguna clase' ) );
		else
		{
			clases = output.split(';');
			for( i = 0 ; i < clases.length; i++ )
			{
				clasesnombres = clases[i].split(',');
				document.getElementById('clases').options.add(new Option( clasesnombres[1] , i));
			}
			document.getElementById('clases').disabled = false;
			cargarselectedclase();
		}
		
	});	
};

	
var cantidad_elementos = 0;

function cargarselectedclase()
{
	removeall();
	$.post('Queries/getalumnos.php' , { value: clases[document.getElementById('clases').selectedIndex].split(',')[0] },
	function(output)
	{
		if( output.substring(0,2) == 'NO' )
		{
			alert("No hay alumnos en esta clase...");
		}
		else
		{
			alumnos = output.split(";");
			for( i = 0 ; i < alumnos.length ; i++ )
			{
				datos = alumnos[i].split(",");
				insert( datos[1] , datos[2] , datos[3], datos[4] );
			}
		}
	});
};

	
function insert(  pnombre_txt , snombre_txt , papellido_txt , sapellido_txt  )
{
	var tabla = document.getElementById("tabla");
	var row = document.createElement("TR"),
	    row2 = document.createElement("TR"),
	    td1 = document.createElement("TD"),
		td2 = document.createElement("TD"),
		td12 = document.createElement("TD"),
		td22 = document.createElement("TD"),
		pnombre = document.createElement("FONT"),
		snombre = document.createElement("FONT"),
		papellido = document.createElement("FONT"),
		sapellido = document.createElement("FONT"),
		espacios1 = document.createElement("FONT"),
		espacios2 = document.createElement("FONT"),
		espacios3 = document.createElement("FONT"),
		errorfont = document.createElement("FONT"),
		divstyle = document.createElement("DIV"),
		codigoinput = document.createElement("INPUT");

	row.id = "fila"+cantidad_elementos;
	row2.id = "filaerror"+cantidad_elementos;
		
	pnombre.appendChild( document.createTextNode(pnombre_txt) );
	pnombre.size = 3;
	pnombre.style.fontFamily = "Arial, Helvetica, sans-serif";
	pnombre.id = "pnombre" + cantidad_elementos;
	snombre.appendChild( document.createTextNode(snombre_txt) );
	snombre.size = 3;
	snombre.style.fontFamily = "Arial, Helvetica, sans-serif";
	snombre.id = "snombre" + cantidad_elementos;
	papellido.appendChild( document.createTextNode(papellido_txt) );
	papellido.size = 3;
	papellido.style.fontFamily = "Arial, Helvetica, sans-serif";
	papellido.id = "papellido" + cantidad_elementos;
	sapellido.appendChild( document.createTextNode(sapellido_txt) );
	sapellido.size = 3;
	sapellido.style.fontFamily = "Arial, Helvetica, sans-serif";
	sapellido.id = "sapellido" + cantidad_elementos;
	
	espacios1.appendChild( document.createTextNode(" ") );
	espacios1.size = 3;
	espacios1.style.fontFamily = "Arial, Helvetica, sans-serif";
	espacios2.appendChild( document.createTextNode(" ") );
	espacios2.size = 3;
	espacios2.style.fontFamily = "Arial, Helvetica, sans-serif";
	espacios3.appendChild( document.createTextNode(" ") );
	espacios3.size = 3;
	espacios3.style.fontFamily = "Arial, Helvetica, sans-serif";
	
	errorfont.appendChild( document.createTextNode("") );
	errorfont.id = "errorcodigo" + cantidad_elementos;
	errorfont.size = 3;
	errorfont.style.fontFamily = "Arial, Helvetica, sans-serif";
	errorfont.style.color = "#FF0000";
	
	td1.align = "left";
	td2.align = "left";
	td1.appendChild(pnombre);
	td1.appendChild(espacios1);
	td1.appendChild(snombre);
	if( snombre_txt != "" )
		td1.appendChild(espacios2);
	td1.appendChild(papellido);
	if( sapellido_txt != "" )
		td1.appendChild(espacios3);
	td1.appendChild(sapellido);
	
	td22.align = "left";
	td22.appendChild(errorfont);
	
	divstyle.style.float = "left";
	
	codigoinput.id = "codigo"+cantidad_elementos;
	codigoinput.value = "";
	codigoinput.type = "Text";
	codigoinput.maxLength = "50";
	codigoinput.size = "5";
	
	divstyle.appendChild(codigoinput);
	td2.appendChild(divstyle);
	
	row.appendChild(td1);
	row.appendChild(td2);
	row2.appendChild(td12);
	row2.appendChild(td22);
	tabla.appendChild(row);
	tabla.appendChild(row2);

	cantidad_elementos++;
};

function removeall()
{
	var tabla = document.getElementById("tabla");
	while( cantidad_elementos != 0 )
	{
		tabla.removeChild( tabla.lastChild );
		tabla.removeChild( tabla.lastChild );
		cantidad_elementos--;
	}
};

function crearleccion()
{
	
	
	var no_enviar=false;
	document.getElementById("botoncrear").disabled = true;
	document.getElementById("clases").disabled = true;
	document.getElementById("penalizacion").disabled = true;
	for( i = 0 ; i < cantidad_elementos; i++ )
		document.getElementById("codigo"+i).disabled = true;
		
	if( document.getElementById("penalizacion").value == "" )
	{
		document.getElementById("errorpen").innerHTML = "*Ingrese un valor";
		no_enviar = true;
	}
	else if( !IsNumeric( document.getElementById("penalizacion").value ) )
	{
		document.getElementById("errorpen").innerHTML = "*Ingrese un valor numérico";
		no_enviar = true;
	}
	
	
	codigos = "";
	for( i = 0 ; i < cantidad_elementos; i++ )
	{
		if( document.getElementById("codigo"+i).value != "" )
		{
			repetido = false;
			for( j = 0 ; j < cantidad_elementos; j++ )
				if( j != i )
					if( document.getElementById("codigo"+i).value == document.getElementById("codigo"+j).value )
					{
						document.getElementById("errorcodigo"+i).innerHTML = "*Código duplicado";
						no_enviar = true;
						repetido = true;
					}
			codigos += (i==0?"":",") + document.getElementById("codigo"+i).value;
			document.getElementById("errorcodigo"+i).innerHTML = "";
		}
		else
		{
			no_enviar = true;
			document.getElementById("errorcodigo"+i).innerHTML = "*Ingrese un código";
		}
	}
	
	
	if( no_enviar )
	{
		document.getElementById("botoncrear").disabled = false;
		document.getElementById("clases").disabled = false;
		document.getElementById("penalizacion").disabled = false;
		for( i = 0 ; i < cantidad_elementos; i++ )
			document.getElementById("codigo"+i).disabled = false;
		return;
	}
	
	$.post('Queries/validcode.php' , { value: codigos },
	function(output)
	{ 
		no_enviar = false;
		resultados = output.split(',');
		for( i = 0 ; i < cantidad_elementos; i++ )
		{
			if( resultados[i].substring(0,2) == "NO" )
			{
				no_enviar = true;
				document.getElementById("errorcodigo"+i).innerHTML = "*Este código ya esta siendo utilizado";
			}
			else
			{
				document.getElementById("errorcodigo"+i).innerHTML = "";
			}
		}
		
		if( no_enviar )
		{
			document.getElementById("botoncrear").disabled = false;
			document.getElementById("clases").disabled = false;
			document.getElementById("penalizacion").disabled = false;
			for( i = 0 ; i < cantidad_elementos; i++ )
				document.getElementById("codigo"+i).disabled = false;
			return;
		}
		
		enviar = document.getElementById("penalizacion").value + ";" + 
				 clases[document.getElementById('clases').selectedIndex].split(',')[0] + ";" +
				 leccion + ";" + unidad ;
		for( i = 0 ; i < cantidad_elementos; i++ )
		{
			enviar += ";" + document.getElementById('pnombre'+i).innerHTML + "," +
					  document.getElementById('snombre'+i).innerHTML + "," +
					  document.getElementById('papellido'+i).innerHTML + "," +
					  document.getElementById('sapellido'+i).innerHTML + "," +
					  document.getElementById('codigo'+i).value;
		}
		$.post('Queries/crearleccion.php' , { value: enviar },
		function(output)
		{ 
			alert("¡La lección ha sido creada!");
			post_to_url('menu.php' , {param: id_sesion} , 'post' );
		});
	});
	
	
	
	
};
	
function IsNumeric(expression)
{
    return (String(expression).search(/^\d+$/) != -1);
};


function validarpen()
{
	if( document.getElementById('penalizacion').value.match( /[1-9][0-9]*/ ) )
		document.getElementById('errorpen').innerHTML = '';
	else
		document.getElementById('errorpen').innerHTML = '*Ingrese un número válido';
};

</script>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Matemáticas 2do Grado</title>
<link href="CSS/menu.css" rel="stylesheet" type="text/css" />
</head>

<body style="
	background-color: #f7f7f5;
    margin: 0px;
	padding: 0px;
"><?php echo "<input id=\"param\" type=\"text\" value = \""  . $_POST["param"] .  "\" style=\"visibility:hidden\"/>" ?>
<div style="
    background: url(IMG/fondo.jpg);
    background-repeat: repeat-x;
    background-position: left top;
    background-size: 1px 250px;
    "> 
    <div id ="contenido" align="center" style="
	text-align:center;
    background: url(IMG/formulariotitulo.jpg);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: auto;
    margin: 0px;
	padding: 0px;
    
    ">
<img src="IMG/alpha.png" style="
    background-image: url(IMG/home0.jpg) ,url(IMG/home1.jpg);
    background-position: 0px , 23px;
    background-repeat: no-repeat , no-repeat;
    width: 23px;
    height: 19px;
    
	 margin-left:20px;
     margin-top:7px;
     margin-bottom: 100px;
"onmouseover="this.style.backgroundPosition = '23px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 23px';"
onmousedown=" 
post_to_url('menu.php' , {param: id_sesion} , 'post' );"/>

<img src="IMG/alpha.png" style="
    background-image: url(IMG/salir0.jpg) ,url(IMG/salir1.jpg);
    background-position: 0px , 75px;
    background-repeat: no-repeat , no-repeat;
    width: 75px;
    height: 19px;
    
	 margin-left:290px;
     margin-top:7px;
     margin-bottom: 100px;
"onmouseover="this.style.backgroundPosition = '75px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 75px';"
onmousedown=" $.post('Queries/logoutprofesor.php' , { value: id_sesion },
            function(output)
            {
                window.location = 'login.html';
            });"/>
    <font size="2" face="Arial, Helvetica, sans-serif">
    <table align="center" >
<tr><td></td><td>
</td></tr>
<tr><td align="left" style="padding-right:100px;">Clases:<br /><SELECT id="clases" style="width:250px"  size="1" onchange="cargarselectedclase();" > </SELECT></td><td width="200px">
Penalización por ayudas:
<br />
<input id="penalizacion" type="text" maxlength="3" size="2%" value="0" 
onkeyup=" validarpen(); "/>%
</td></tr>
<tr><td></td><td><font id = "errorpen" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td></tr>
</table>
<br />
<br />
<br />

<div>
<table id="tabla" align="center" width="600px">
	<tr><td align="left" style=""><font size="2" face="Arial, Helvetica, sans-serif" color="#999999">Nombre del alumno:</font></td>
    <td align="left" style="width:250px"><font size="2" face="Arial, Helvetica, sans-serif" color="#999999">Código:</font></td></tr>
</table>

<table align="center" width="700px" style="margin-top:50px">
    <tr>
    <td></td>
    <td align="right">
       <button id = "botoncrear" type="button" style="
    background-image: url(IMG/botoncrear0.jpg) ,url(IMG/botoncrear1.jpg);
    background-position: 0px , 146px;
    background-repeat: no-repeat , no-repeat;
    width: 146px;
    height: 38px;
    border: none;
"onmouseover="this.style.backgroundPosition = '146px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 146px';"
onmousedown=" crearleccion(); "></button>
    </td>
    </tr>
</table>

</div>

</font>
    </div>
</div>
    
<div id = "pie" style="
	text-align:center;
    margin-top: 50px;
    
"> <font size="2" face="Arial, Helvetica, sans-serif">
  <p>Creditos: www.algodeeducacion.com<br />
    Enero 2013
  </p></font>
  
  <img src="IMG/login_logo.jpg" hspace="10px" />
  <img src="IMG/login_logo.jpg" hspace="10px" />
  <img src="IMG/login_logo.jpg" hspace="10px" />
</div>

</body>
</html>
