<?php
include 'dbconnect.php';

$query = mysql_query("SELECT  `Nombre` FROM  `$databaseName`.`Departamento` ");

$n = mysql_num_rows ( $query );
$result = "";

for ($i = 0; $i < $n; $i++) {
	$name = mysql_result($query , $i , 0);
	if( $i == 0 )
		$result =  "$name";
	else
		$result = "$result,$name";
}

echo "$dbconnected";

?>