<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<script type="text/javascript" src="jquery.js"></script> 
<script type="text/javascript" src="JS/base.js"></script> 
<script>
var id_sesion = -1;
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
					document.getElementById('mensaje').innerHTML = '¡Bienvenido ' + output + '! Seleccione la acción que desea realizar';
			});
		}
	
};
</script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Escuela Digital</title>
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
<div id ="contenido" style="

	text-align:center;
    background: url(IMG/formulariotitulo.jpg);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: auto;
    margin: 0px;
	padding: 0px;
    
    "> 

<img src="IMG/alpha.png" style="
    background-image: url(IMG/salir0.jpg) ,url(IMG/salir1.jpg);
    background-position: 0px , 75px;
    background-repeat: no-repeat , no-repeat;
    width: 75px;
    height: 20px;
    
	margin-left:290px;
    margin-top:7px;
"onmouseover="this.style.backgroundPosition = '75px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 75px';"
onmousedown=" 

$.post('Queries/logoutdirector.php' , { value: id_sesion },
    function(output)
    {
        window.location = 'login.html';
    });

 "/>
    
    
<font size="2" face="Arial, Helvetica, sans-serif">
<table align="center" style="padding-top: 150px;">
<tr><td><div id = "mensaje">¡Bienvenido! Seleccione la acción que desea realizar.</div> </td></tr>
<tr><td>
    <img src="IMG/alpha.png" style="
        background-image: url(IMG/bagregar0.jpg) ,url(IMG/bagregar1.jpg);
        background-position: 0px , 276px;
        background-repeat: no-repeat , no-repeat;
        width: 276px;
        height: 52px;
        
        margin-top:70px;
    "onmouseover="this.style.backgroundPosition = '276px , 0px';"
    onmouseout="this.style.backgroundPosition = '0px , 276px';"
    onmousedown=" post_to_url('formularioprofesor.php' , {param: id_sesion} , 'post' ); "/>
</td></tr>
<tr><td>
    <img src="IMG/alpha.png" style="
        background-image: url(IMG/beliminar0.jpg) ,url(IMG/beliminar1.jpg);
        background-position: 0px , 276px;
        background-repeat: no-repeat , no-repeat;
        width: 276px;
        height: 52px;
        
        margin-top:5px;
    "onmouseover="this.style.backgroundPosition = '276px , 0px';"
    onmouseout="this.style.backgroundPosition = '0px , 276px';"
    onmousedown=" post_to_url('eliminarprof.php' , {param: id_sesion} , 'post' );"/>
</td></tr>
<tr><td>
<img src="IMG/alpha.png" style="
        background-image: url(IMG/bestadisticas0.jpg) ,url(IMG/bestadisticas1.jpg);
        background-position: 0px , 276px;
        background-repeat: no-repeat , no-repeat;
        width: 276px;
        height: 52px;
        
        margin-top:5px;
    "onmouseover="this.style.backgroundPosition = '276px , 0px';"
    onmouseout="this.style.backgroundPosition = '0px , 276px';"
    onmousedown=" post_to_url('estadisticasdir.php' , {param: id_sesion} , 'post' );"/>
</td></tr>
</table>
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
