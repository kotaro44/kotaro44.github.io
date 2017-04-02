<?php
include 'dbconnect.php';
$value = mysql_real_escape_string($_POST['value']);

list($nameescuela,  $direccionescuela, $departamento, $distrito,
      $telescuela,  $emaildir, $celular, $pass,  $numid, $pnombre,
      $snombre, $papellido, $sapellido ) = split('[,]', $value);
	  
$query = mysql_query("
	SELECT `$databaseName`.`Director`.`ID` 
	FROM `$databaseName`.`Director` 
	WHERE `$databaseName`.`Director`.`E_mail_Director` = '$emaildir'
");	
$n = mysql_num_rows ( $query );
if( $n != 0 )
{
	echo "CORREO"; //usuario ya existe
}
else
{ 	  

	$query = mysql_query("
		SELECT `$databaseName`.`Profesor`.`ID`
		FROM `$databaseName`.`Profesor` 
		WHERE `$databaseName`.`Profesor`.`E_mail` = '$emaildir'
	");	
	$n = mysql_num_rows ( $query );
	if( $n != 0 )
	{
		echo "CORREO"; //usuario ya existe
	}
	else
	{
		$query = mysql_query("
			INSERT INTO  `$databaseName`.`Director` 
				(`ID` ,`Nombre_Escuela` ,`Direccion_Escuela` ,`ID_Distrito` ,`Telefono_Escuela` ,`E_mail_Director` ,
				 `Celular` ,`Password` ,`Numero_Id` ,`P_Nombre` ,`S_Nombre` ,`P_Apellido` ,`S_Apellido` , `Valido` )
			 VALUES ( NULL ,  '$nameescuela',  '$direccionescuela',(SELECT  `ID` 
																	FROM  `$databaseName`.`Distrito` 
																	WHERE `Nombre` =  '$distrito' and 
																		  `ID_Departamento` = (SELECT `ID` 
																							   FROM  `$databaseName`.`Departamento` 
																							   WHERE  `Nombre` =  '$departamento')),                   
							 '$telescuela',  '$emaildir',  '$celular', '$pass',  '$numid',  '$pnombre',  '$snombre',  '$papellido',  '$sapellido' , 0 );
		");
		$query = mysql_query("
			SELECT `$databaseName`.`Director`.`ID` 
			FROM `$databaseName`.`Director` 
			WHERE `$databaseName`.`Director`.`E_mail_Director` = '$emaildir'
		");	
		$n = mysql_num_rows ( $query );
		if( $n != 0 )
		{
			/*Enviar el correo al director*/
			$id = mysql_result($query , 0 , 0);
			$subject = "Escuela Digital de Honduras";
			$body = "¡Bienvenido a Escuela Digital!\n Su correo electrónico se ha registrado al sistema, para confirmar su suscripción porfavor ingrese al siguiente link: \n\n   http://kotarosproject.t15.org/cd.html?id=$id \n\n Si usted no se ha registrado a este sistema porfavor cancele la suscripción ingresando al siguiente link: \n\n http://kotarosproject.t15.org/nd.html?id=$id";
			mail($emaildir, $subject, $body); 
			echo "SI"; 
		}
		else
			echo "NO";//error de datos
	}
}
?>






