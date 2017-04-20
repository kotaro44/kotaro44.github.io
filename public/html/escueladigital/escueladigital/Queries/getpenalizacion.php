<?php
include 'dbconnect.php';
$idprueba = mysql_real_escape_string($_POST['value']);
$query = mysql_query("
	SELECT  `Penalizacion` 
	FROM  `$databaseName`.`Prueba` 
	WHERE  `ID` = $idprueba
");

$n = mysql_num_rows ( $query );

if( $n == 0 )
{
	echo "NO";
}
else
{
	$result = mysql_result($query , 0 ,  0 );
	echo "$result";
}

?>