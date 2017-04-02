<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<script type = "text/javascript" src="jquery.js"></script>
<script type = "text/javascript" src="JS/base.js"></script>
<script>
var id_sesion=0,alumnos=[];
	window.onload = function()
	{

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
					
				});
			}
		
	};
	
var cantidad_elementos = 0;
function agregar_nuevo()
{
	var pnombre_txt = document.getElementById("pnombre").value,
	    snombre_txt = document.getElementById("snombre").value
		papellido_txt = document.getElementById("papellido").value
		sapellido_txt = document.getElementById("sapellido").value
		no_enviar = false;
	
	if( pnombre_txt == "" )
	{
		document.getElementById('errornombre').innerHTML = '*Ingrese un nombre';
		no_enviar = true;
	}
	else
	{
		document.getElementById('errornombre').innerHTML = '';
	}
	
	if( papellido_txt == "" )
	{
		document.getElementById('errorapellido').innerHTML = '*Ingrese un apellido';
		no_enviar = true;
	}
	else
	{
		document.getElementById('errorapellido').innerHTML = '';
	}

	if( yaexistenombre( pnombre_txt , snombre_txt , papellido_txt , sapellido_txt ) )
	{
		no_enviar = true;
		alert("Ya existe un alumno con ese nombre");
	}
		
	if( no_enviar ) return;

	document.getElementById("pnombre").value = "";
	document.getElementById("snombre").value = "";
	document.getElementById("papellido").value = "";
	document.getElementById("sapellido").value = "";
	insert( pnombre_txt , snombre_txt , papellido_txt , sapellido_txt );

};


function yaexistenombre( pnombre_txt , snombre_txt , papellido_txt , sapellido_txt )
{
	for( i = 0 ; i < cantidad_elementos; i++ )
		if( document.getElementById("pnombre"+i).innerHTML == pnombre_txt && 
		    document.getElementById("snombre"+i).innerHTML == snombre_txt &&
			document.getElementById("papellido"+i).innerHTML == papellido_txt &&
			document.getElementById("sapellido"+i).innerHTML == sapellido_txt )
			return true;
	return false;
}
	
function insert(  pnombre_txt , snombre_txt , papellido_txt , sapellido_txt  )
{
	var tabla = document.getElementById("tabla");
	var row = document.createElement("TR"),
	    td1 = document.createElement("TD"),
		td2 = document.createElement("TD"),
		pnombre = document.createElement("FONT"),
		snombre = document.createElement("FONT"),
		papellido = document.createElement("FONT"),
		sapellido = document.createElement("FONT"),
		espacios1 = document.createElement("FONT"),
		espacios2 = document.createElement("FONT"),
		espacios3 = document.createElement("FONT"),
		divstyle = document.createElement("DIV"),
		b1 = document.createElement("IMG"),
		b2 = document.createElement("IMG");

	row.id = "fila"+cantidad_elementos;
		
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
	
	td1.align = "left";
	td2.align = "right";
	td1.appendChild(pnombre);
	td1.appendChild(espacios1);
	td1.appendChild(snombre);
	if( snombre_txt != "" )
		td1.appendChild(espacios2);
	td1.appendChild(papellido);
	if( sapellido_txt != "" )
		td1.appendChild(espacios3);
	td1.appendChild(sapellido);
	
	divstyle.style.float = "right";
	
	b1.id = "edit" + cantidad_elementos;
	b2.id = "del" + cantidad_elementos;
	b1.src = "IMG/alpha.png";
	b1.style.backgroundImage = "url(IMG/beditar0.jpg),url(IMG/beditar1.jpg)";
	b1.style.backgroundPosition =  "0px,100px";
	b1.style.backgroundRepeat = "no-repeat";
	b1.style.paddingRight = "6px";
	b1.style.width = "24px";
	b1.style.height = "21px";
	b2.src = "IMG/alpha.png";
	b2.style.backgroundImage = "url(IMG/alumnobeliminar0.jpg),url(IMG/alumnobeliminar1.jpg)";
	b2.style.backgroundPosition =  "0px,100px";
	b2.style.backgroundRepeat = "no-repeat";
	b2.style.width = "24px";
	b2.style.height = "21px";
	b1.onmouseover = editover;
	b1.onmouseout = editout;
	b1.onmousedown = editthis;
	b2.onmouseover = delover;
	b2.onmouseout = delout;
	b2.onmousedown = deletethis;
	
	divstyle.appendChild(b1);
	divstyle.appendChild(b2);
	td2.appendChild(divstyle);
	
	row.appendChild(td1);
	row.appendChild(td2);
	tabla.appendChild(row);

	cantidad_elementos++;
};

function removeall()
{
	var tabla = document.getElementById("tabla");
	while( cantidad_elementos != 0 )
	{
		tabla.removeChild( tabla.lastChild );
		cantidad_elementos--;
	}
};
	
function editover()
{ this.style.backgroundPosition =  "100px,0px"; };	
function editout()
{ this.style.backgroundPosition =  "0px,100px"; };	
function delover()
{ this.style.backgroundPosition =  "100px,0px"; };	
function delout()
{ this.style.backgroundPosition =  "0px,100px"; };


function deletethis()
{
	eliminar( parseInt(this.id.substring(3, this.id.length )) );
};

function editthis()
{
	var num = this.id.substring(4, this.id.length );
	document.getElementById("pnombre").value = document.getElementById("pnombre"+num).innerHTML;
	document.getElementById("snombre").value = document.getElementById("snombre"+num).innerHTML;
	document.getElementById("papellido").value = document.getElementById("papellido"+num).innerHTML;
	document.getElementById("sapellido").value = document.getElementById("sapellido"+num).innerHTML;
	eliminar( parseInt(num) );
};

function eliminar( num )
{
	var tabla = document.getElementById("tabla");
	for( i = num; i < (cantidad_elementos-1); i++ )
	{
		document.getElementById("pnombre"+i).innerHTML = document.getElementById("pnombre"+(i+1)).innerHTML;
		document.getElementById("snombre"+i).innerHTML = document.getElementById("snombre"+(i+1)).innerHTML;
		document.getElementById("papellido"+i).innerHTML = document.getElementById("papellido"+(i+1)).innerHTML;
		document.getElementById("sapellido"+i).innerHTML = document.getElementById("sapellido"+(i+1)).innerHTML;
	}
	tabla.removeChild( tabla.lastChild );
	cantidad_elementos--;
}

function crearleccion()
{
	if( document.getElementById("nombreclase").value != "" )
	{
		if( cantidad_elementos != 0 )
		{
			document.getElementById("nombreclase").disabled = true;
			document.getElementById("botonagregar").disabled = true;
			document.getElementById("botoncrear").disabled = true;
			document.getElementById("pnombre").disabled = true;
			document.getElementById("snombre").disabled = true;
			document.getElementById("papellido").disabled = true;
			document.getElementById("sapellido").disabled = true;
			$.post('Queries/getidprof.php' , { value: id_sesion },
			function(output)
			{
				enviar = output + ";" +  document.getElementById("nombreclase").value;
				for( i = 0 ; i < cantidad_elementos; i++ )
				{
					enviar += ";" + document.getElementById("pnombre"+i).innerHTML + "," + 
									document.getElementById("snombre"+i).innerHTML + "," +
									document.getElementById("papellido"+i).innerHTML + "," +
									document.getElementById("sapellido"+i).innerHTML;
				}
			
				$.post('Queries/crearclase.php' , { value: enviar },
				function(output)
				{
					if( output.substring(0,6) == "NOMBRE" )
					{
						document.getElementById("errornombreclase").innerHTML = "*el nombre de esta clase ya existe";
					}
					else
					{
						if( output.substring(0,2) == "NO" )
						{
							alert("Se produjo algun error, porfavor contacta al administrador");
						}
						else
						{
							alert("¡La clase se ha creado con éxito!");
							post_to_url('editarclases.php' , {param: id_sesion} , 'post' );
						}
					}
					document.getElementById("nombreclase").disabled = false;
					document.getElementById("botonagregar").disabled = false;
					document.getElementById("botoncrear").disabled = false;
					document.getElementById("pnombre").disabled = false;
					document.getElementById("snombre").disabled = false;
					document.getElementById("papellido").disabled = false;
					document.getElementById("sapellido").disabled = false;
					
				});
				
			});
			
		}
		else
		{
			alert("¡No puede crear una clase sin alumnos!");
		}
	}
	else
	{
		document.getElementById("errornombreclase").innerHTML = "*Ingrese el nombre de la clase";
	}
}
	
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
     margin-bottom: 100px;
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
<tr><td align="left" style="padding-right:100px;">Nombre de la clase:<br />
<input id="nombreclase" type="text" maxlength="50" size="25%" 
onkeyup=" document.getElementById('errornombreclase').innerHTML = '';"/></td><td width="200px"></td></tr>
<tr><td align="left" ><font id = "errornombreclase" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td><td></td></tr>
</table>
<br />
<br />
<br />

<div>
<table id="tabla" align="center" width="600px">
	<tr><td align="left" style=""><font size="2" face="Arial, Helvetica, sans-serif" color="#999999">Nombre del alumno:</font></td></tr>
</table>

<table align="center" width="700px">
	<tr> 
    	<td><div style="background-color: #F1F0EB; height: 3px;"> </div></td>
        <td><div style="background-color: #F1F0EB; height: 3px;"> </div></td>
        <td><div style="background-color: #F1F0EB; height: 3px;"> </div></td>
        <td><div style="background-color: #F1F0EB; height: 3px;"> </div></td>
    </tr>
	<tr>
    	<td align="left"><font size="2" face="Arial, Helvetica, sans-serif" color="#000000">Primer Nombre:</font></td>
        <td align="left"><font size="2" face="Arial, Helvetica, sans-serif" color="#000000">Segundo Nombre:</font></td>
        <td align="left"><font size="2" face="Arial, Helvetica, sans-serif" color="#000000">Primer Apellido:</font></td>
        <td align="left"><font size="2" face="Arial, Helvetica, sans-serif" color="#000000">Segundo Apellido:</font></td>
    </tr>
    <tr>
    	<td align="left"><input id="pnombre" type="text" maxlength="50" size="5%" 
        	onkeyup=" document.getElementById('errornombre').innerHTML = '';"/></td>
        <td align="left"><input id="snombre" type="text" maxlength="50" size="5%" /></td>
        <td align="left"><input id="papellido" type="text" maxlength="50" size="5%" 
        	onkeyup=" document.getElementById('errorapellido').innerHTML = '';"/></td>
        <td align="left"><input id="sapellido" type="text" maxlength="50" size="5%" /></td>
    </tr>
    <tr>
    	<td align="left"><font id = "errornombre" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td>
        <td></td>
        <td align="left"><font id = "errorapellido" size="2" face="Arial, Helvetica, sans-serif" color="#FF0000" ></font></td>
        <td></td>
    </tr>
</table>
<table align="center" width="700px">
    <tr>
    	<td align="left">
        <button id = "botonagregar" type="button" style="
    background-image: url(IMG/alumbagregar0.jpg) ,url(IMG/alumbagregar1.jpg);
    background-position: 0px , 229px;
    background-repeat: no-repeat , no-repeat;
    width: 229px;
    height: 43px;
    border: none;
    
    margin-top: 20px;
"onmouseover="this.style.backgroundPosition = '229px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 229px';"
onmousedown=" agregar_nuevo();"></button>
        </td><td></td>
    </tr>
    <tr>
    <td></td>
    <td align="right">
            
        <button id = "botoncrear" type="button" style="
    background-image: url(IMG/crearclase0.jpg) ,url(IMG/crearclase1.jpg);
    background-position: 0px , 146px;
    background-repeat: no-repeat , no-repeat;
    width: 146px;
    height: 38px;
    border: none;
    
    margin-top: 20px;
"onmouseover="this.style.backgroundPosition = '146px , 0px';"
onmouseout="this.style.backgroundPosition = '0px , 146px';"
onmousedown=" crearleccion();"></button>
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
