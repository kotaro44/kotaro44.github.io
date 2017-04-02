<?php
include 'dbconnect.php';

$param = mysql_real_escape_string($_POST['value']);
$codes = split('[,]', $param);

$result = "";

for( $i = 0; $i < count( $codes ) ; $i++ )
{
	$query = mysql_query("
		SELECT `Prueba`.`ID`  FROM  `$databaseName`.`Prueba`  WHERE  `Codigo` =  '$codes[$i]' AND  `Valido` =  1
	");	

	$n = mysql_num_rows ( $query );
	if( $i == 0 )
	{
		if( $n != 0 )
			$result  = "NO";
		else
			$result =  "SI";
	}
	else
	{
		if( $n != 0 )
			$result  = "$result,NO";
		else
			$result =  "$result,SI";
	}
	

}

echo "$result";
?>






