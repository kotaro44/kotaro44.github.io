<?php
include 'dbconnect.php';
$datos = mysql_real_escape_string($_POST['value']);
list( $idalumno, $pnombre,  $snombre, $papellido, $sapellido ) = split('[,]', $datos);

$query = mysql_query("
	UPDATE  `$databaseName`.`Alumno` 
	SET  `P_Nombre` = '$pnombre',  
	          `S_Nombre` = '$snombre' ,
			  `P_Apellido` = '$papellido', 
			  `S_Apellido` = '$sapellido' 
	WHERE `Alumno`.`ID` =  $idalumno;
");

	echo "SI";
?>