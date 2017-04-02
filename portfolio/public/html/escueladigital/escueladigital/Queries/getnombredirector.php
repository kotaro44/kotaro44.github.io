<?php
include 'dbconnect.php';

$value = mysql_real_escape_string($_POST['value']);

$query = mysql_query("SELECT  `$databaseName`.`Director`.`P_Nombre` ,  `$databaseName`.`Director`.`P_Apellido` 
FROM  `$databaseName`.`SesionDirector` ,  `$databaseName`.`Director` 
WHERE  `$databaseName`.`SesionDirector`.`ID_Director` =  `$databaseName`.`Director`.`ID` 
AND  `$databaseName`.`SesionDirector`.`Activa` =1
AND  `$databaseName`.`SesionDirector`.`ID` = $value");
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