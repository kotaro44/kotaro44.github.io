<?php
include 'dbconnect.php';

$value = mysql_real_escape_string($_POST['value']);

$query = mysql_query("SELECT  `$databaseName`.`Profesor`.`P_Nombre` ,  `$databaseName`.`Profesor`.`P_Apellido` 
FROM  `$databaseName`.`SesionProfesor` ,  `$databaseName`.`Profesor` 
WHERE  `$databaseName`.`SesionProfesor`.`ID_Profesor` =  `$databaseName`.`Profesor`.`ID` 
AND  `$databaseName`.`SesionProfesor`.`Activa` =1
AND  `$databaseName`.`SesionProfesor`.`ID` = $value");
$n = mysql_num_rows ( $query );
if( $n == 0 )
	echo "NO";
else
{
	$name = mysql_result($query , 0 , 0);
	$lastname = mysql_result($query , 0 , 1);
	echo "$name $lastname";
}

?>