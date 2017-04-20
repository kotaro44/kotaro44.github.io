<?php
include 'dbconnect.php';
$value = mysql_real_escape_string($_POST['value']);
$query = mysql_query("SELECT  `$databaseName`.`Distrito`.`Nombre` 
FROM  `$databaseName`.`Distrito` 
WHERE  `$databaseName`.`Distrito`.`ID_Departamento` = (
SELECT  `$databaseName`.`Departamento`.`ID` 
FROM  `$databaseName`.`Departamento` 
WHERE  `Departamento`.`Nombre` =  '$value'
)");

$n = mysql_num_rows ( $query );
$result = "";

for ($i = 0; $i < $n; $i++) {
	$name = mysql_result($query , $i , 0);
	if( $i == 0 )
		$result =  "$name";
	else
		$result = "$result,$name";
}

echo "$result";

?>

