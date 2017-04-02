<?php
include 'dbconnect.php';
$idprueba = mysql_real_escape_string($_POST['value']);
$query = mysql_query("
	SELECT  `Alumno`.`P_Nombre` , `Alumno`.`S_Nombre` , `Alumno`.`P_Apellido` , `Alumno`.`S_Apellido` , 
					  `Prueba`.`Codigo` , `Prueba`.`Puntuacion` ,  `Prueba`.`Correctas` ,  `Prueba`.`Incorrectas` ,  `Prueba`.`Ayudas` , `Prueba`.`Valido` ,
					   `Leccion`.`NLeccion` , `Unidad`.`NUnidad` , `Libro`.`Nombre` , `Prueba`.`Fecha` , `Prueba`.`Penalizacion`
	FROM `$databaseName`.`Prueba` ,  `$databaseName`.`Alumno` , `$databaseName`.`Leccion` , `$databaseName`.`Unidad`  , `$databaseName`.`Libro`
	WHERE  `Prueba`.`ID` = $idprueba AND
	                 `Prueba`.`ID_Alumno` = `Alumno`.`ID` AND
					 `Prueba`.`ID_Leccion` = `Leccion`.`ID` AND
					`Leccion`.`ID_Unidad` = `Unidad`.`ID` AND
					`Unidad`.`ID_Libro` =  `Libro`.`ID`
");

$n = mysql_num_rows ( $query );
if( $n == 0 )
	echo "NO";
else
{
	$result = "";

		for ($j = 0; $j < 15; $j++) 
		{
			$name = mysql_result($query , 0 , $j);	
			if( $j != 0 )
				$result = "$result,"; 
			$result = "$result$name"; 
		}	


	echo "$result";
}

?>