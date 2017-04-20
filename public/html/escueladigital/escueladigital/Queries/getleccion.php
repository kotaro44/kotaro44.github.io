<?php
include 'dbconnect.php';

$codigo = mysql_real_escape_string($_POST['value']);
$query = mysql_query("
	SELECT  `Alumno`.`P_Nombre` ,  
	                  `Alumno`.`S_Nombre` ,  
					  `Alumno`.`P_Apellido` ,  
					  `Alumno`.`S_Apellido` , 
					  `Leccion`.`NLeccion` , 
					  `Unidad`.`NUnidad` , 
					  `Prueba`.`ID`
	FROM `$databaseName`.`Prueba` , 
	             `$databaseName`.`Alumno` , 
				 `$databaseName`.`Leccion` , 
				 `$databaseName`.`Unidad`
	WHERE `Prueba`.`Codigo` = '$codigo' AND 
	                `Prueba`.`Valido` = 1 AND 
		            `Alumno`.`ID` = `Prueba`.`ID_Alumno` AND
		            `Leccion`.`ID` = `Prueba`.`ID_Leccion` AND
		            `Leccion`.`ID_Unidad` = `Unidad`.`ID`;
");

$n = mysql_num_rows ( $query );

if( $n == 0 )
{
	echo "NO";
}
else
{
	$pnombre =  mysql_result($query , 0 , 0);
	$snombre =  mysql_result($query , 0 , 1);
	$papellido =  mysql_result($query , 0 , 2);
	$sapellido =  mysql_result($query , 0 , 3);
	$leccion =  mysql_result($query , 0 , 4);
	$unidad =  mysql_result($query , 0 , 5);
	$id =  mysql_result($query , 0 , 6);
	echo "$pnombre,$snombre,$papellido,$sapellido,$leccion,$unidad,$id";
}









?>