<?php
include 'dbconnect.php';
$value = mysql_real_escape_string($_POST['value']);

$query = mysql_query("
	UPDATE  `$databaseName`.`SesionDirector` 
	SET  `Activa` =  '0' 
	WHERE  `SesionDirector`.`ID_Director` = ( SELECT  `SesionDirector`.`ID_Director` 
																		   FROM `$databaseName`.`SesionDirector` 
																		   WHERE `SesionDirector`.`ID` = $value );");
$query = mysql_query("
	SELECT `SesionDirector`.`ID`
	FROM `$databaseName`.`SesionDirector`
	WHERE  `Activa` = 1 AND `SesionDirector`.`ID_Director` = ( SELECT  `SesionDirector`.`ID_Director` 
																		                                FROM `$databaseName`.`SesionDirector` 
																		                                WHERE `SesionDirector`.`ID` = $value );
");	

$n = mysql_num_rows ( $query );
if( $n != 0 )
	echo "NO";
else
	echo "SI";
?>