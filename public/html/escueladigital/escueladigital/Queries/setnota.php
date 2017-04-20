<?php
include 'dbconnect.php';

$datos = mysql_real_escape_string($_POST['value']);
list($idprueba,  $score , $correctas , $incorrectas , $ayudas ) = split('[,]', $datos);

$query = mysql_query("
	SELECT  `Prueba`.`ID` 
	FROM `$databaseName`.`Prueba` 
	WHERE  `Prueba`.`ID` = $idprueba AND `Valido` =  1;
");	

$n = mysql_num_rows ( $query );

if( $n == 0 )
{
	echo "NO";
}
else
{
	$query = mysql_query("
		UPDATE  `$databaseName`.`Prueba` 
		SET `Puntuacion` =  $score,
				`Correctas` =  $correctas,
				`Incorrectas` =  $incorrectas,
				`Ayudas` =  $ayudas,
				`Valido` =  0 
		WHERE  `Prueba`.`ID` = $idprueba AND `Valido` =  1;
	");	
	echo "SI";
}
?>






