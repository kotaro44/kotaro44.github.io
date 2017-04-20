<?php
include 'dbconnect.php';
$idsesion = mysql_real_escape_string($_POST['value']);
$query = mysql_query("
	SELECT  `Profesor`.`ID` , `Profesor`.`Valido` , `Profesor`.`E_Mail`  , `Profesor`.`P_Nombre` , `Profesor`.`S_Nombre` , `Profesor`.`P_Apellido`, `Profesor`.`S_Apellido` , `Profesor`.`Celular` 
	FROM `$databaseName`.`Profesor` , `$databaseName`.`Director` 
	WHERE `Profesor`.`ID_Director` = `Director`.`ID` AND `Director`.`ID` = ( SELECT `Director`.`ID`
                                                                                                                           FROM `$databaseName`.`Director` ,  `$databaseName`.`SesionDirector` 
                                                                                                                           WHERE `SesionDirector`.`ID_Director` = `Director`.`ID` AND `SesionDirector`.`ID` = $idsesion )
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
		for ($j = 0; $j < 8; $j++) 
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