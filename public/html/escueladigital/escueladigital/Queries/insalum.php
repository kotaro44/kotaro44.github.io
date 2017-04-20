<?php
include 'dbconnect.php';
$datos = mysql_real_escape_string($_POST['value']);
list( $idclase, $pnombre,  $snombre, $papellido, $sapellido ) = split('[,]', $datos);

$query = mysql_query("
	SELECT * 
	FROM `$databaseName`.`Alumno`;
");
$n1 = mysql_num_rows ( $query );

$query = mysql_query("
	INSERT INTO  `$databaseName`.`Alumno` ( `ID` , `P_Nombre` , `S_Nombre` , `P_Apellido` , `S_Apellido` , `ID_Clase` )
	VALUES ( NULL ,  '$pnombre',  '$snombre',  '$papellido',  '$sapellido',  $idclase );
");

$query = mysql_query("
	SELECT * 
	FROM `$databaseName`.`Alumno`;
");
$n2 = mysql_num_rows ( $query );

if( $n1 == $n2 )
	echo "NO";
else
	echo "SI";
?>