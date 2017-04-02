<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<script type = "text/javascript" src="jquery.js"></script>
<script type = "text/javascript" src="JS/menu.js"></script>
<script type = "text/javascript" src="JS/base.js"></script>
<script>
var id_sesion = -1;
	window.onload = function()
	{
		cargarunidad(1);
		
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
					document.getElementById('mensaje').innerHTML = '¡Bienvenido ' + output +
							 '! Elige la lección a la que deseas ingresar';
			});
		}
		
	};
</script>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Matemáticas 2do Grado</title>
<link href="CSS/menu.css" rel="stylesheet" type="text/css" />
</head>

<body> <?php echo "<input id=\"param\" type=\"text\" value = \""  . $_POST["param"] .  "\" style=\"visibility:hidden\"/>" ?>
	<div id = "titulo" style=" 
    	background-color:#8e8F8F;
        width: 100%;
        text-align: center;
        padding: 0px;
        margin: 0px;
        padding-bottom: 5px;
    ">

    <img src="IMG/alpha.png" style="
    background-image: url(IMG/salir0.jpg) ,url(IMG/salir1.jpg);
    background-position: 0px , 75px;
    background-repeat: no-repeat , no-repeat;
    width: 75px;
    height: 19px;
    
	 margin-left:400px;
     margin-top:7px;
"onmouseover="this.style.backgroundPosition = '75px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 75px';"
onmousedown=" $.post('Queries/logoutprofesor.php' , { value: id_sesion },
    function(output)
    {
        window.location = 'login.html';
    });"/>
    
    <br />
    <img src="IMG/menu_titulo.jpg" /></div>
<div id = "contenido">
<font size="2" face="Arial, Helvetica, sans-serif">
	<table align="center" style=" width: 800px;" >
    	<tr><td style="
        	padding-left:50px;
            padding-top: 40px;
            padding-bottom: 20px;
        "><div id = "mensaje"> Elige la lección a la que deseas ingresar</div> </td>
        <td style="text-align:right">
         <button 
            id = "botonclases"
            type="button" style="
            	background-image: url(IMG/bclases0.jpg) ,url(IMG/bclases1.jpg);
                background-position: 0px , 111px;
    			background-repeat: no-repeat , no-repeat;
                padding-left:20px;
                padding-right:20px;
                padding-top:8px;
                padding-bottom:8px;
                margin-top:20px;
                margin-right:40px;
                width: 111px;
                height: 39px;
                border: 0;
            "
            onmouseover="this.style.backgroundPosition = '111px , 0px';"
            onmouseout="this.style.backgroundPosition = '0px , 111px';"
            onmousedown=" post_to_url('editarclases.php' , {param: id_sesion} , 'post' ); ">
        </button>
        <button 
            id = "botonestadisticas"
            type="button" style="
            	background-image: url(IMG/bverestadistica0.jpg) ,url(IMG/bverestadisticas1.jpg);
                background-position: 0px , 163px;
    			background-repeat: no-repeat , no-repeat;
                padding-left:20px;
                padding-right:20px;
                padding-top:8px;
                padding-bottom:8px;
                margin-top:20px;
                margin-right:40px;
                width: 163px;
                height: 39px;
                border: 0;
            "
            onmouseover="this.style.backgroundPosition = '163px , 0px';"
            onmouseout="this.style.backgroundPosition = '0px , 163px';"
            onmousedown=" post_to_url('estadisticasprof.php' , {param: id_sesion} , 'post' );">
        </button>
        </td></tr>
    	<tr>
        	<td>
            	<div id = "u1" onmousedown="cargarunidad(1);" 
                	onmouseover="mouseoverlapiz(this,1);" 
                    onmouseout="mouseoutlapiz(this,1);">
                	Unidad 1: Números hasta 999
                </div>
                <div id = "u2" onmousedown="cargarunidad(2);" 
                	onmouseover="mouseoverlapiz(this,0);" onmouseout="mouseoutlapiz(this,0);">
                	Unidad 2: Líneas
                </div>
                <div id = "u3" onmousedown="cargarunidad(3);" onmouseover="mouseoverlapiz(this,2);" onmouseout="mouseoutlapiz(this,3);">
                	Unidad 3: Suma y resta combinadas
                </div>
                <div id = "u4" onmousedown="cargarunidad(4);" onmouseover="mouseoverlapiz(this,0);" onmouseout="mouseoutlapiz(this,0);">
                	Unidad 4: Suma
                </div>
                <div id = "u5" onmousedown="cargarunidad(5);" onmouseover="mouseoverlapiz(this,0);" onmouseout="mouseoutlapiz(this,0);">
                	Unidad 5: Resta
                </div>
                <div id = "u6" onmousedown="cargarunidad(6);" onmouseover="mouseoverlapiz(this,1);" onmouseout="mouseoutlapiz(this,1);">
                	Unidad 6: Figuras geométricas
                </div>
                <div id = "u7" onmousedown="cargarunidad(7);" onmouseover="mouseoverlapiz(this,1);" onmouseout="mouseoutlapiz(this,1);">
                	Unidad 7: Multiplicación
                </div>
                <div id = "u8" onmousedown="cargarunidad(8);" onmouseover="mouseoverlapiz(this,0);" onmouseout="mouseoutlapiz(this,0);">
                	Unidad 8: Longitud
                </div>
                <div id = "u9" onmousedown="cargarunidad(9);" onmouseover="mouseoverlapiz(this,0);" onmouseout="mouseoutlapiz(this,0);">
                	Unidad 9: División
                </div>
                <div id = "u10" onmousedown="cargarunidad(10);" onmouseover="mouseoverlapiz(this,2);" onmouseout="mouseoutlapiz(this,2);">
                	Unidad 10: Sólidos geométricos
                </div>
                <div id = "u11" onmousedown="cargarunidad(11);" onmouseover="mouseoverlapiz(this,0);" onmouseout="mouseoutlapiz(this,0);">
                	Unidad 11: Monedas
                </div>
                <div id = "u12" onmousedown="cargarunidad(12);" onmouseover="mouseoverlapiz(this,0);" onmouseout="mouseoutlapiz(this,0);">
                	Unidad 12: Tiempo
                </div>
                <div id = "u13" onmousedown="cargarunidad(13);" onmouseover="mouseoverlapiz(this,0);" onmouseout="mouseoutlapiz(this,0);">
                	Unidad 13: Tablas
                </div>
            </td>
            <td>
            	<div id = "papel"> 
                <div id = "titulo_leccion" >Unidad 1: Números hasta 999 </div><br /><br /><br />
                <table>
                	<tr><td><img id="imgl1" src="IMG/alpha.png" onmouseover ="this.style.backgroundPosition = '25px, 0px'; "; 
                    onmouseout ="this.style.backgroundPosition = '0px, 25px'; " onmousedown="crearleccion(this);"/></td><td>
                    <div id = "leccion1" onmouseover="mouseovereffect(this);" onmouseout="mouseouteffect(this);" 
                    	onmousedown="mousedownleccion(this);" >
                    	Lección 1
                    </div></td><td><div id = "texto1"> </div></td></tr>
                    <tr><td><img id="imgl2" src="IMG/alpha.png" onmouseover ="this.style.backgroundPosition = '25px, 0px'; "; 
                    onmouseout ="this.style.backgroundPosition = '0px, 25px'; " onmousedown="crearleccion(this);" /></td><td>
                    <div id = "leccion2" onmouseover="mouseovereffect(this);" onmouseout="mouseouteffect(this);"
                    	onmousedown="mousedownleccion(this);">
                    	Lección 2
                    </div></td><td><div id = "texto2"> </div></td></tr>
                    <tr><td><img id="imgl3" src="IMG/alpha.png" onmouseover ="this.style.backgroundPosition = '25px, 0px'; "; 
                    onmouseout ="this.style.backgroundPosition = '0px, 25px'; " onmousedown="crearleccion(this);"/></td><td>
                    <div id = "leccion3" onmouseover="mouseovereffect(this);" onmouseout="mouseouteffect(this);"
                    	onmousedown="mousedownleccion(this);">
                    	Lección 3
                    </div></td><td><div id = "texto3"> </div></td></tr>
                    <tr><td><img id="imgl4" src="IMG/alpha.png" onmouseover ="this.style.backgroundPosition = '25px, 0px'; "; 
                    onmouseout ="this.style.backgroundPosition = '0px, 25px'; " onmousedown="crearleccion(this);"/></td><td>
                    <div id = "leccion4" onmouseover="mouseovereffect(this);" onmouseout="mouseouteffect(this);"
                    	onmousedown="mousedownleccion(this);">
                    	Lección 4
                    </div></td><td><div id = "texto4"> </div></td></tr>
                    <tr><td><img id="imgl5" src="IMG/alpha.png" onmouseover ="this.style.backgroundPosition = '25px, 0px'; "; 
                    onmouseout ="this.style.backgroundPosition = '0px, 25px'; " onmousedown="crearleccion(this);"/></td><td>
                    <div id = "leccion5" onmouseover="mouseovereffect(this);" onmouseout="mouseouteffect(this);"
                    	onmousedown="mousedownleccion(this);">
                    	Lección 5
                    </div></td><td><div id = "texto5"> </div></td></tr>
                    <tr><td><img id="imgl6" src="IMG/alpha.png" onmouseover ="this.style.backgroundPosition = '25px, 0px'; "; 
                    onmouseout ="this.style.backgroundPosition = '0px, 25px'; " onmousedown="crearleccion(this);"/></td><td>
                    <div id = "leccion6" onmouseover="mouseovereffect(this);" onmouseout="mouseouteffect(this);"
                    	onmousedown="mousedownleccion(this);">
                    	Lección 6
                    </div></td><td><div id = "texto6"> </div></td></tr>
                    <tr><td><img id="imgl7" src="IMG/alpha.png" onmouseover ="this.style.backgroundPosition = '25px, 0px'; "; 
                    onmouseout ="this.style.backgroundPosition = '0px, 25px'; " onmousedown="crearleccion(this);"/></td><td>
                    <div id = "leccion7" onmouseover="mouseovereffect(this);" onmouseout="mouseouteffect(this);"
                    	onmousedown="mousedownleccion(this);">
                    	Lección 7
                    </div></td><td><div id = "texto7"> </div></td></tr>
                    <tr><td><img id="imgl8" src="IMG/alpha.png" onmouseover ="this.style.backgroundPosition = '25px, 0px'; "; 
                    onmouseout ="this.style.backgroundPosition = '0px, 25px'; " onmousedown="crearleccion(this);"/></td><td>
                    <div id = "leccion8" onmouseover="mouseovereffect(this);" onmouseout="mouseouteffect(this);"
                    	onmousedown="mousedownleccion(this);">
                    	Lección 8
                    </div></td><td><div id = "texto8"> </div></td></tr>
                    <tr><td><img id="imgl9" src="IMG/alpha.png" onmouseover ="this.style.backgroundPosition = '25px, 0px'; "; 
                    onmouseout ="this.style.backgroundPosition = '0px, 25px'; " onmousedown="crearleccion(this);"/></td><td>
                    <div id = "leccion9" onmouseover="mouseovereffect(this);" onmouseout="mouseouteffect(this);"
                    	onmousedown="mousedownleccion(this);">
                    	Lección 9
                    </div></td><td><div id = "texto9"> </div></td></tr>
                </table>
                  </div>
            </td>
        </tr>
    </table>
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
