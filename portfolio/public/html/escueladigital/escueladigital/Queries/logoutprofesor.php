<?php
include 'dbconnect.php';
$value = mysql_real_escape_string($_POST['value']);

$query = mysql_query("
	UPDATE  `$databaseName`.`SesionProfesor` 
	SET  `Activa` =  '0' 
	WHERE  `SesionProfesor`.`ID_Profesor` = ( SELECT  `SesionProfesor`.`ID_Profesor` 
																		   FROM `$databaseName`.`SesionProfesor` 
																		   WHERE `SesionProfesor`.`ID` = $value );");
$query = mysql_query("
	SELECT `SesionProfesor`.`ID`
	FROM `$databaseName`.`SesionProfesor`
	WHERE  `Activa` = 1 AND `SesionProfesor`.`ID_Profesor` = ( SELECT  `SesionProfesor`.`ID_Profesor` 
																		                                FROM `$databaseName`.`SesionProfesor` 
																		                                WHERE `SesionProfesor`.`ID` = $value );
");	

$n = mysql_num_rows ( $query );
if( $n != 0 )
	echo "NO";
else
	echo "SI";
?>