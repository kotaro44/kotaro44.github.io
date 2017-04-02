<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<script type = "text/javascript" src="jquery.js"></script>
<script type = "text/javascript" src="JS/menu.js"></script>
<script type = "text/javascript" src="JS/base.js"></script>
<script>
var lecciones=[],alumnos=[],id_sesion  = -1;
	window.onload = function()
	{

		document.getElementById('leccion').disabled = true;
		document.getElementById('alumno').disabled = true;
		document.getElementById('clases').disabled = true;
		

			id_sesion = document.getElementById('param').value;
			if( id_sesion.length == 0 )
				window.location = 'login.html';
			else
			{
				
				$.post('Queries/getnombreprofesor.php' , { value: id_sesion },
				function(output)
				{
					if( output.substring(0,2) == 'NO' )
						window.location = 'login.html';
					else
					{
						$.post('Queries/getidprof.php' , { value: id_sesion },
						function(output)
						{
								cargarclases(output);
						});
					}
				});
			}
		
	};
	
function cargarclases( idprof )
{
	document.getElementById('leccion').disabled = true;
	document.getElementById('alumno').disabled = true;
	document.getElementById('clases').disabled = true;
	
	$.post('Queries/getclasesconsulta.php' , { value: idprof },
	function(output)
	{
		if( output.substring(0,2) == "NO" )
		{
			alert("No tiene ninguna clase creada");
			document.getElementById('leccion').disabled = true;
			document.getElementById('alumno').disabled = true;
			document.getElementById('clases').disabled = true;
		}
		else
		{
			clases = output.split(";");
			combo = document.getElementById("clases");
			combo.options.length = 0;
			for( i = 0 ; i < clases.length; i++ )
			{
				datos = clases[i].split(',');
				combo.options.add(new Option(datos[1], i));
			}
			document.getElementById('clases').disabled = false;
			
			var idclase = clases[document.getElementById('clases').selectedIndex].split(",")[0];
			cargaralumnos(idclase);
		}
	});
};


function cargaralumnos( idclase )
{
	document.getElementById('leccion').disabled = true;
	document.getElementById('alumno').disabled = true;

	$.post('Queries/getalumnos.php' , { value: idclase },
	function(output)
	{
	
		if( output.substring(0,2) == "NO" )
		{
			alert("La clase seleccionada no tiene ningun alumno");
			document.getElementById('leccion').disabled = true;
			document.getElementById('alumno').disabled = true;
		}
		else
		{
			alumnos = output.split(";");
			combo = document.getElementById("alumno");
			combo.options.length = 0;
			for( i = 0 ; i < alumnos.length; i++ )
			{
				datos = alumnos[i].split(',');
				mostrar = datos[1] + " " + (datos[2]==""?"":datos[2]+" ") + datos[3] + (datos[4]==""?"":datos[4]);
				combo.options.add(new Option(mostrar, i));
			}
			document.getElementById('alumno').disabled = false;
			
			var idalumno = alumnos[document.getElementById('alumno').selectedIndex].split(",")[0];
			cargarlecciones(idalumno);
		}
	});
};

function cargarlecciones( idalumno )
{
	document.getElementById('leccion').disabled = true;
	
	$.post('Queries/getlecciones.php' , { value: idalumno },
	function(output)
	{
		if( output.substring(0,2) == "NO" )
		{
			alert("El alumno seleccionado no ha realizado ninguna lecci\xF3n");
			document.getElementById('leccion').disabled = true;
		}
		else
		{
			lecciones = output.split(";");
			combo = document.getElementById("leccion");
			combo.options.length = 0;
			for( i = 0 ; i < lecciones.length; i++ )
			{
				datos = lecciones[i].split(',');
				mostrar = datos[3] + " Leccion " + datos[1] + ", Unidad " + datos[2] + "   " + datos[4];
				combo.options.add(new Option(mostrar, i));
			}
			document.getElementById('leccion').disabled = false;
			var idleccion = lecciones[document.getElementById('leccion').selectedIndex].split(",")[0];
			cargarnotas(idleccion);
		}
	});
};

	
function cargarnotas( idleccion )
{
	$.post('Queries/getnotas.php' , { value: idleccion },
	function(output)
	{
		if( output.substring(0,2) == "NO" )
		{
			document.getElementById('nombre').innerHTML = "";
			document.getElementById('codigo').innerHTML = "";
			document.getElementById('score').innerHTML = "";
			document.getElementById('resp').innerHTML = "";
			document.getElementById('errores').innerHTML = "";
			document.getElementById('ayudas').innerHTML = "";
			document.getElementById('lecdisplay').innerHTML = "";
			document.getElementById('estadolec').innerHTML = "";
			document.getElementById('penayudas').innerHTML = "";
		}
		else
		{
			var notas = output.split(',');
			document.getElementById('nombre').innerHTML = getNombre(notas[0],notas[1],notas[2],notas[3]);
			document.getElementById('codigo').innerHTML = notas[4];
			document.getElementById('score').innerHTML = notas[5]+'%';
			document.getElementById('resp').innerHTML = notas[6];
			document.getElementById('errores').innerHTML = notas[7];
			document.getElementById('ayudas').innerHTML = notas[8];
			document.getElementById('penayudas').innerHTML = notas[14]+"%";
			if( notas[9] == "1" )
			{
				document.getElementById('estadolec').style.color = "#00FF00";
				document.getElementById('estadolec').innerHTML = "Activa";
			}
			else
			{
				document.getElementById('estadolec').style.color = "#FF0000";
				document.getElementById('estadolec').innerHTML = "Cerrada";
			}
			document.getElementById('lecdisplay').innerHTML = notas[12] + " Leccion " + notas[10] + 
							", Unidad " + notas[11] + "   " + notas[13];
		}
	});
};	
	
function getNombre(nombre0,nombre1,nombre2,nombre3)
{
	return nombre0 + " " + (nombre1!=""?nombre1+" ":"") + nombre2 + " " + (nombre3!=""?nombre3:"")
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
    <div id="titulo" align="center">
<img src="IMG/alpha.png" style="
    background-image: url(IMG/home0.jpg) ,url(IMG/home1.jpg);
    background-position: 0px , 23px;
    background-repeat: no-repeat , no-repeat;
    width: 23px;
    height: 19px;
    
	 margin-left:20px;
     margin-top:7px;
     margin-bottom: 0px;
"onmouseover="this.style.backgroundPosition = '23px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 23px';"
onmousedown=" post_to_url('menu.php' , {param: id_sesion} , 'post' ); "/>

<img src="IMG/alpha.png" style="
    background-image: url(IMG/salir0.jpg) ,url(IMG/salir1.jpg);
    background-position: 0px , 75px;
    background-repeat: no-repeat , no-repeat;
    width: 75px;
    height: 19px;
    
	 margin-left:290px;
     margin-top:7px;
     margin-bottom: 0px;
"onmouseover="this.style.backgroundPosition = '75px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 75px';"
onmousedown=" $.post('Queries/logoutprofesor.php' , { value: id_sesion },
            function(output)
            {
                window.location = 'login.html';
            });"/>
    </div>
<font size="2" face="Arial, Helvetica, sans-serif" >

<table align="center" style=" padding-top: 120px;">
	<tr><td align="left">Clases:</td><td align="right"></td></tr>
    <tr><td><SELECT id="clases" size="1" style="width:200px" onchange="
			var idclase = clases[document.getElementById('clases').selectedIndex].split(',')[0];
			cargaralumnos(idclase);
    "> </SELECT></td><td></td></tr>
    <tr><td  align="left">Alumno:</td><td align="left">Leccion:</td></tr>
    <tr>
        <td><SELECT id="alumno" size="1" style="width:200px" onchange="
            var idalumno = alumnos[document.getElementById('alumno').selectedIndex].split(',')[0];
            cargarlecciones( idalumno );
        "> </SELECT></td>
        <td><SELECT id="leccion" size="1" style="width:200px" onchange=" 
        	var idleccion = lecciones[document.getElementById('leccion').selectedIndex].split(',')[0];
			cargarnotas(idleccion);
        "> </SELECT></td></tr>
</table>

<div align="center" style="padding-top:50px;">
    <div align="center" style="background-color:#FFFFFF;
                width:400px;
                height:200px;
                background-image:url(IMG/basepagina.jpg);
                background-position:left bottom;
                background-repeat: no-repeat;
                background-size: 100%;
                text-align:left;
                padding-left: 40px;
                padding-top: 40px;
                padding-bottom: 40px;">
        <font id="lecdisplay"></font><br />  
        <font id="estadolec"></font><br /><br />     
        Nombre del Alumno: <font id="nombre"></font><br />
        Código: <font id="codigo"></font><br />
        <br /><br />
        Nota final: <font id="score"></font><br />
        Total Respuestas: <font id="resp"></font><br />
        Total Errores: <font id="errores"></font><br />
        Total de consultas a la ayuda: <font id="ayudas"></font><br />
        Penalización por ayudas: <font id="penayudas"></font><br />
    </div>
</div>


</font>
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
