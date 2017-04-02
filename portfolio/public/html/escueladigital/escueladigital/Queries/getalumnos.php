<?php
include 'dbconnect.php';
$idclase = mysql_real_escape_string($_POST['value']);
$query = mysql_query("
	SELECT `Alumno`.`ID` , `Alumno`.`P_Nombre`  ,`Alumno`.`S_Nombre`  , `Alumno`.`P_Apellido`  , `Alumno`.`S_Apellido` 
	FROM `$databaseName`.`Alumno` 
	WHERE  `Alumno`.`ID_Clase` = $idclase
	
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