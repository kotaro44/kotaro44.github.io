<?php
include 'dbconnect.php';
$idsesion = mysql_real_escape_string($_POST['value']);
$query = mysql_query("
	SELECT `SesionProfesor`.`ID_Profesor` 
	FROM `$databaseName`.`SesionProfesor` 
	WHERE `SesionProfesor`.`ID` = $idsesion
");

$result = mysql_result($query , 0 ,  0 );

$query = mysql_query("
	SELECT Max( `ID` ) 
	FROM  `$databaseName`.`Prueba` 
	WHERE  `ID_Profesor` = $result
");

$result = mysql_result($query , 0 ,  0 );
echo "$result";

?>