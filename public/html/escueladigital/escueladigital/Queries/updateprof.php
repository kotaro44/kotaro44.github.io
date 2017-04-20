<?php
include 'dbconnect.php';
$datos = mysql_real_escape_string($_POST['value']);
list( $idalumno, $pnombre,  $snombre, $papellido, $sapellido , $celular ) = split('[,]', $datos);

$query = mysql_query("
	UPDATE  `$databaseName`.`Profesor` 
	SET  `P_Nombre` = '$pnombre',  
	          `S_Nombre` = '$snombre' ,
			  `P_Apellido` = '$papellido', 
			  `S_Apellido` = '$sapellido' ,
			  `Celular` = '$celular'
	WHERE `Profesor`.`ID` =  $idalumno;
");

echo "SI";


?>