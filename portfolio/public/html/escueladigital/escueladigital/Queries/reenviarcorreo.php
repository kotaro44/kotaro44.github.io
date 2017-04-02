<?php
include 'dbconnect.php';
$id = mysql_real_escape_string($_POST['value']);

		$query = mysql_query("
			SELECT `$databaseName`.`Profesor`.`E_mail`
			FROM `$databaseName`.`Profesor` 
			WHERE `$databaseName`.`Profesor`.`ID` = $id;
		");	
		
		$n = mysql_num_rows ( $query );
		
		if( $n != 0 )
		{
			/*Enviar el correo al profesor*/
			$correo = mysql_result($query , 0 , 0);
			$subject = "Escuela Digital de Honduras";
			$body = "¡Bienvenido a Escuela Digital!\n Su correo electrónico se ha registrado al sistema, para confirmar su suscripción porfavor ingrese al siguiente link: \n\n  http://escueladigital.t15.org/confirmacionprof.html?id=$id \n\n Si usted no se ha registrado a este sistema porfavor cancele la suscripción ingresando al siguiente link: \n\n http://escueladigital.t15.org/negarprof.html?id=$id";
			mail($correo, $subject, $body); 
			echo "SI"; 
		}
		else
			echo "NO";   //error de datos
?>









