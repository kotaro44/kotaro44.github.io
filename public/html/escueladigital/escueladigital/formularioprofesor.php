<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<script type="text/javascript" src="jquery.js"></script> 
<script type="text/javascript" src="JS/base.js"></script> 
<script>
var id_sesion= "";
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
				
				if( output == 'NO' )
					window.location = 'login.html';

			});
		}
	
};

function enviar()
{
	var correo = document.getElementById('correo').value,
    pass = document.getElementById('pass').value,
    pass2 =  document.getElementById('pass2').value,
    noid = document.getElementById('noid').value,
    celular = document.getElementById('celular').value,
    pnombre = document.getElementById('pnombre').value,
    snombre = document.getElementById('snombre').value,
    papellido = document.getElementById('papellido').value,
    sapellido = document.getElementById('sapellido').value,
    noenviar = false;
    
    
	if( correo == '' )
	{ document.getElementById('errorcorreo').innerHTML = '*Ingrese un correo electrónico'; noenviar = true; }
	else
	{
		if( correo.match( /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/ )  )
			document.getElementById('errorcorreo').innerHTML = '';
		else
		{
			document.getElementById('errorcorreo').innerHTML = '*Ingrese un correo electrónico válido';
			noenviar = true;
		}
	}
	
	if( pass == '' )
	{ document.getElementById('errorpass').innerHTML = '*Ingrese una contrase\xF1a'; noenviar = true; }
	else document.getElementById('errorpass').innerHTML = '';
	
	if( pass2 == '' )
	{ document.getElementById('errorpass2').innerHTML = '*Ingrese nuevamente la contrase\xF1a'; noenviar = true; }
	else
	{
		if( pass2 == pass )
			document.getElementById('errorpass2').innerHTML = '';
		else { document.getElementById('errorpass2').innerHTML = '*Las contrase\xF1as no coinciden'; noenviar = true; }
	 }
	
	if( noid == '' )
	{ document.getElementById('errornoid').innerHTML = '*Ingrese el n\xFAmero de identidad del director'; noenviar = true; }
	else
	{
		if( noid.match( /^(?:\+|-)?\d+$/ ) )
		{
			if( noid.length == 13 )
			{
				document.getElementById('errornoid').innerHTML = '';
			}
			else
			{
				document.getElementById('errornoid').innerHTML = '*Ingrese 13 dígitos';
				noenviar = true;
			}
		}
		else
		{
			document.getElementById('errornoid').innerHTML = '*Ingrese un número válido (Sin guiones)';
			noenviar = true;
		}
	}
	
	if( celular == '' )
	{ document.getElementById('errorcelular').innerHTML = '*Ingrese el celular del director'; noenviar = true; }
	else
	{
		if( celular.match( /^(?:\+|-)?\d+$/ ) )
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
	
	$.post('Queries/insprof.php' , { value: correo+','+celular+','+pass+','+noid+','
		+pnombre+','+snombre+','+papellido+','+sapellido+','+id_sesion },
	function(output)
	{
		if( output.substring(0,6) == 'CORREO' )
			document.getElementById('errorcorreo').innerHTML = '*El Usuario ya existe';
		if( output.substring(0,2) == 'NO' )
			alert('Se produjo un error en la Base de datos, el usuario no fue creado');
		if( output.substring(0,2) == 'SI' )
		{
			alert('Se ha enviado una notificación al correo ' + correo + ', debes confirmar tu cuenta de correo electrónico antes de iniciar sesión en el sistema');
			post_to_url('menudirector.php' , {param: id_sesion} , 'post' );
		}
	});

};

function validarcel()
{
	if( document.getElementById('celular').value.match( /^(?:\+|-)?\d+$/ ) || 
				document.getElementById('celular').value == '')
		document.getElementById('errorcelular').innerHTML = '';
	else
		document.getElementById('errorcelular').innerHTML = '*Ingrese un número válido (Sin guiones)';
	
};

function validarnoid()
{
	if( document.getElementById('noid').value.match( /^(?:\+|-)?\d+$/ )|| 
				document.getElementById('noid').value == '' )
		document.getElementById('errornoid').innerHTML = '';
	else
		document.getElementById('errornoid').innerHTML = '*Ingrese un número válido';
	
}

</script>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Escuela Digital</title>
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
"onmouseover="this.style.backgroundPosition = '23px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 23px';"
onmousedown=" post_to_url('menudirector.php' , {param: id_sesion} , 'post' ); "/>

<img src="IMG/alpha.png" style="
    background-image: url(IMG/salir0.jpg) ,url(IMG/salir1.jpg);
    background-position: 0px , 75px;
    background-repeat: no-repeat , no-repeat;
    width: 75px;
    height: 19px;
    
	 margin-left:290px;
     margin-top:7px;
"onmouseover="this.style.backgroundPosition = '75px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 75px';"
onmousedown=" $.post('Queries/logoutdirector.php' , { value: id_sesion },
    function(output)
    {
        window.location = 'login.html';
    });"/>


<font size="2" face="Arial, Helvetica, sans-serif">
<table align="center" style="padding-top: 180px;">
	<tr><td>Ingresar un nuevo maestro al sistema<br /><br /><br /><br /><br /></tr></td>
</table>
<table align="center">
	<tr><td align="right">Correo Electronico:</td><td>
    	<input id="correo" type="text" maxlength="100" size="25" 
        	onkeyup=" document.getElementById('errorcorreo').innerHTML = '';"/>
    </td></tr>
    <tr><td></td><td align="left"><font id = "errorcorreo" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td></tr>
    <tr><td align="right">Contraseña:</td><td>
    	<input id="pass" type="password"  maxlength="100" size="25" 
        	onkeyup=" document.getElementById('errorpass').innerHTML = '';"/>
    </td></tr>
    <tr><td></td><td align="left"><font id = "errorpass" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td></tr>
    <tr><td align="right">Confirmar Contraseña:</td><td>
    	<input id="pass2" type="password"  maxlength="100" size="25" 
        	onkeyup=" document.getElementById('errorpass2').innerHTML = '';"/>
    </td></tr>
    <tr><td></td><td align="left"><font id = "errorpass2" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td></tr>
    <tr><td align="right">No. de Identidad (Sin guiones):</td><td>
    	<input id="noid" type="text"  maxlength="13" size="25" 
        	onkeyup=" validarnoid();"/>
    </td></tr>
    <tr><td></td><td align="left"><font id = "errornoid" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td></tr>
    <tr><td align="right">Celular:</td><td>
    	<input id="celular" type="text"  maxlength="8" size="25" 
        	onkeyup=" validarcel(); "/>
    </td></tr>
    <tr><td></td><td align="left"><font id = "errorcelular" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td></tr>
    <tr><td align="right">Primer Nombre:</td><td>
    	<input id="pnombre" type="text"  maxlength="50" size="25" 
        	onkeyup=" document.getElementById('errorpnombre').innerHTML = '';"/>
    </td></tr>
    <tr><td></td><td align="left"><font id = "errorpnombre" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td></tr>
    <tr><td align="right">Segundo Nombre (opcional):</td><td><input id="snombre" type="text" maxlength="50" size="25" /></td></tr>
    <tr><td></td><td align="left"><font id = "errorsnombre" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td></tr>
    <tr><td align="right">Primer Apellido:</td><td>
    	<input id="papellido" type="text"  maxlength="50" size="25" 
        	onkeyup=" document.getElementById('errorpapellido').innerHTML = '';"/>
    </td></tr>
    <tr><td></td><td align="left"><font id = "errorpapellido" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td></tr>
    <tr><td align="right">Segundo Apellido (opcional):</td><td><input id="sapellido" type="text" maxlength="50" size="25" /></td></tr>
    <tr><td></td><td align="left"><font id = "errorsapellido" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td></tr>
</table>
</font>

<div style="text-align:center;" >

<button id = "boton" type="button" style="
    background-image: url(IMG/botonenviar0.jpg) ,url(IMG/botonenviar1.jpg);
    background-position: 0px , 118px;
    background-repeat: no-repeat , no-repeat;
    width: 118px;
    height: 39px;
    border: none;
    
    margin-top: 20px;
"onmouseover="this.style.backgroundPosition = '118px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 118px';"
onmousedown=" enviar(); "></button>
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


            	