<?php
include 'dbconnect.php';
$idalumno = mysql_real_escape_string($_POST['value']);
$query = mysql_query("
	SELECT `Prueba`.`ID` , `Leccion`.`NLeccion` , `Unidad`.`NUnidad` , `Libro`.`Nombre` , `Prueba`.`Fecha`
	FROM `$databaseName`.`Prueba` ,  `$databaseName`.`Alumno` ,  `$databaseName`.`Leccion` , `$databaseName`.`Unidad`  , `$databaseName`.`Libro` 
	WHERE `Prueba`.`ID_Alumno` = $idalumno AND
	                `Prueba`.`ID_Alumno` = `Alumno` .`ID` AND
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

	for ($i = 0; $i < $n; $i++) 
	{
		if( $i != 0 )
			$result = "$result;"; 
		for ($j = 0; $j < 5; $j++) 
		{
			$name = mysql_result($query , $i , $j);	
			if( $j != 0 )
				$result = "$result,"; 
			$result = "$result$name"; 
		}	
	}

	echo "$result";
}
?>