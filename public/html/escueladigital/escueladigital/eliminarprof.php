<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<script type = "text/javascript" src="jquery.js"></script>
<script type = "text/javascript" src="JS/base.js"></script>
<script>
var id_sesion=0,leccion=0,unidad=0;
	window.onload = function()
	{
		
		id_sesion = document.getElementById('param').value;
			if( id_sesion.length == 0 )
				window.location = 'login.html';
			else
			{
			
				$.post('Queries/getnombredirector.php' , { value: id_sesion },
				function(output)
				{
					
					if( output.substring(0,2) == 'NO' )
						window.location = 'login.html';
					else
					{
						cargarprofesores();
					}
				});
			}
		
	};
	
function cargarprofesores()
{
	$.post('Queries/getprofesores.php' , { value: id_sesion },
	function(output)
	{
		
		if( output.substring(0,2) == 'NO' )
			alert("No se ha creado ningun profesor");
		else
		{
			profesores = output.split(";");
			var combo = document.getElementById("prof");
			combo.options.length = 0;
			for( i = 0 ; i < profesores.length; i++ )
			{
				profesornombres = profesores[i].split(',');
				combo.options.add(new Option( getNombre(profesornombres[3],profesornombres[4],
					profesornombres[5],profesornombres[6]) , i));
			}
			document.getElementById('prof').disabled = false;
			
			var idprof = profesores[document.getElementById('prof').selectedIndex].split(",")[0];
			cargarprofesor();
		}
	});
};
	
function eliminar()
{
	profesordatos = profesores[document.getElementById('prof').selectedIndex].split(",");
	if( confirm('¿Está seguro que desea deshabilitar al profesor: \n ' + 
		getNombre(profesordatos[3],profesordatos[4],profesordatos[5],profesordatos[6]) + '?') )
	{
		$.post('Queries/deleteprof.php' , { value: profesordatos[0] },
		function(output)
		{
			if( output.substring(0,2) == "SI" )
			{
				alert("Se ha desactivado el profesor del sistema");
			}
			else
			{
				alert("Se produjo un error, contacta al administrador");
			}
			cargarprofesor();
		});
	}
};
	
	
function enviarcorreo()
{
	profesordatos = profesores[document.getElementById('prof').selectedIndex].split(",");
	$.post('Queries/reenviarcorreo.php' , { value: profesordatos[0] },
	function(output)
	{
		if( output.substring(0,2) == "SI" )
		{
			alert("Se ha vuelto a enviar el correo de notificacion al correo " + profesordatos[2]);
		}
		else
		{
			alert("Se produjo un error, contacta al administrador");
		}
	});
};

function cargarprofesor()
{
	document.getElementById('errorpnombre').innerHTML = '';
	document.getElementById('errorpapellido').innerHTML = '';
	document.getElementById('errorcelular').innerHTML = '';
	profesordatos = profesores[document.getElementById('prof').selectedIndex].split(",");
	
	if( profesordatos[1] == '0' )
	{
		document.getElementById("pnombre").disabled = true;
		document.getElementById("snombre").disabled = true;
		document.getElementById("papellido").disabled = true;
		document.getElementById("sapellido").disabled = true;
		document.getElementById("celular").disabled = true;
		document.getElementById("botoncorreo").style.visibility = "visible";
		document.getElementById("botoneliminar").style.visibility = "hidden";
		document.getElementById("botonmodificar").style.visibility = "hidden";
		document.getElementById("estado").innerHTML = "Deshabilitado";
		
	}
	else
	{
		document.getElementById("pnombre").disabled = false;
		document.getElementById("snombre").disabled = false;
		document.getElementById("papellido").disabled = false;
		document.getElementById("sapellido").disabled = false;
		document.getElementById("celular").disabled = false;
		document.getElementById("botoncorreo").style.visibility = "hidden";
		document.getElementById("botoneliminar").style.visibility = "visible";
		document.getElementById("botonmodificar").style.visibility = "visible";
		document.getElementById("estado").innerHTML = "Activo";
	}
	
	document.getElementById("correo").innerHTML = profesordatos[2];
	document.getElementById("pnombre").value = profesordatos[3];
	document.getElementById("snombre").value = profesordatos[4];
	document.getElementById("papellido").value = profesordatos[5];
	document.getElementById("sapellido").value = profesordatos[6];
	document.getElementById("celular").value = profesordatos[7];
};
	
function modificar()
{
	var pnombre = document.getElementById("pnombre").value,
	     snombre = document.getElementById("snombre").value,
		 papellido = document.getElementById("papellido").value,
		 sapellido = document.getElementById("sapellido").value ,
		 celular = document.getElementById("celular").value,
		 noenviar = false;
	
	if( celular == '' )
	{ document.getElementById('errorcelular').innerHTML = '*Ingrese el celular del director'; noenviar = true; }
	else
	{
		if( celular.match( /[0-9]*/ ) )
		{
			if( celular.length == 8 )
			{
				document.getElementById('errorcelular').innerHTML = '';
			}
			else
			{
				document.getElementById('errorcelular').innerHTML = '*Ingrese 8 dígitos';
				noenviar = true;
			}
		}
		else
		{
			document.getElementById('errorcelular').innerHTML = '*Ingrese un número válido (Sin guiones)';
			noenviar = true;
		}
	}
	
	if( pnombre == '' )
	{ document.getElementById('errorpnombre').innerHTML = '*Ingrese un nombre'; noenviar = true; }
	else document.getElementById('errorpnombre').innerHTML = '';
	
	
	if( papellido == '' )
	{ document.getElementById('errorpapellido').innerHTML = '*Ingrese el primer apellido'; noenviar = true; }
	else document.getElementById('errorpapellido').innerHTML = '';
	
	
	
	if( noenviar ) return;
	
	profesordatos = profesores[document.getElementById('prof').selectedIndex].split(",");
	$.post('Queries/updateprof.php' , { value: 
			profesordatos[0] + ',' + pnombre + ',' + snombre + ',' + papellido + ',' + sapellido + ',' + celular},
	function(output)
	{
		if( output.substring(0,2) == "SI" )
		{
			alert("Se ha actualizado el profesor");
		}
		else
		{
			alert("Se produjo un error, contacte al administrador");
		}
		cargarprofesores();
	});
};

function validarcel()
{
	if( document.getElementById('celular').value.match( /[1-9][0-9]*/ ) )
		document.getElementById('errorcelular').innerHTML = '';
	else
		document.getElementById('errorcelular').innerHTML = '*Ingrese un número válido (Sin guiones)';
	
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
"> <?php echo "<input id=\"param\" type=\"text\" value = \""  . $_POST["param"] .  "\" style=\"visibility:hidden\"/>" ?>
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
     margin-bottom:150px;
"onmouseover="this.style.backgroundPosition = '23px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 23px';"
onmousedown=" post_to_url('menudirector.php' , {param: id_sesion} , 'post' );
"/>

<img src="IMG/alpha.png" style="
    background-image: url(IMG/salir0.jpg) ,url(IMG/salir1.jpg);
    background-position: 0px , 75px;
    background-repeat: no-repeat , no-repeat;
    width: 75px;
    height: 19px;
    
	 margin-left:290px;
     margin-top:7px;
     margin-bottom:150px;
"onmouseover="this.style.backgroundPosition = '75px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 75px';"
onmousedown=" $.post('Queries/logoutdirector.php' , { value: id_sesion },
    function(output)
    {
        window.location = 'login.html';
    });"/>
    <font size="2" face="Arial, Helvetica, sans-serif">
    <br />
<SELECT id="prof" size="1" style="width:300px; margin-bottom: 30px;" onchange="
	cargarprofesor();
    "> </SELECT>
<br />
<br />
<br />

<div>
<font size="2" face="Arial, Helvetica, sans-serif" color="#000000">
<br />
<br />
<table align="center" width="700px">
	<tr>
    <td align="left">Correo Electrónico: <font id="correo"></font></td>
    <td align="left">Estado: <font id="estado"></font></td>
    <td></td>
    <td>
    
    <button id = "botoncorreo" type="button" style="
        background-image: url(IMG/correo0.png) ,url(IMG/correo1.png);
        background-position: 0px , 123px;
        background-repeat: no-repeat , no-repeat;
        width: 123px;
        height: 39px;
        border: none;
    "onmouseover="this.style.backgroundPosition = '123px , 0px';"
    onmouseout="this.style.backgroundPosition = '0px , 123px';"
    onmousedown=" enviarcorreo(); "></button>
    
    </td>
    <td>
    
    <button id = "botoneliminar" type="button" style="
        background-image: url(IMG/alumnobeliminar0.jpg) ,url(IMG/alumnobeliminar1.jpg);
        background-position: 0px , 100px;
        background-repeat: no-repeat , no-repeat;
        width: 24px;
        height: 22px;
        border: none;
    "onmouseover="this.style.backgroundPosition = '100px , 0px';"
    onmouseout="this.style.backgroundPosition = '0px , 100px';"
    onmousedown=" eliminar(); "></button>

</td>
    </tr>
</table>
<br />
<br />
<table align="center" width="700px">
	<tr>
    	<td align="left">Primer Nombre:</td>
        <td align="left">Segundo Nombre:</td>
        <td align="left">Primer Apellido:</td>
        <td align="left">Segundo Apellido:</td>
    	<td align="left" >Celular:</td>
    </tr>
    <tr>
    	<td align="left"><input id="pnombre" type="text" maxlength="50" size="5%"
        	onkeyup=" document.getElementById('errorpnombre').innerHTML = '';"/></td>
        <td align="left"><input id="snombre" type="text" maxlength="50" size="5%" /></td>
        <td align="left"><input id="papellido" type="text" maxlength="50" size="5%" 
        	onkeyup=" document.getElementById('errorpapellido').innerHTML = '';"/></td>
        <td align="left"><input id="sapellido" type="text" maxlength="50" size="5%" /></td>
    	<td align="left"><input id="celular" type="text" maxlength="50"  size="5%"
        	onkeyup=" validarcel();"  /></td>
    </tr>
    <tr>
    	<td align="left"><font id = "errorpnombre" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td>
        <td></td>
        <td align="left"><font id = "errorpapellido" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td>
        <td></td>
    	<td align="left"><font id = "errorcelular" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td>
    </tr>
</table>
<button id = "botonmodificar" type="button" style="
    background-image: url(IMG/bcambios0.jpg) ,url(IMG/bcambios1.jpg);
    background-position: 0px , 173px;
    background-repeat: no-repeat , no-repeat;
    width: 173px;
    height: 40px;
    border: none;
    
    margin-top: 20px;
"onmouseover="this.style.backgroundPosition = '173px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 173px';"
onmousedown=" modificar(); "></button>
</font>
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
