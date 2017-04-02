<?php
include 'dbconnect.php';

$id = mysql_real_escape_string($_POST['value']);

$query = mysql_query("SELECT * FROM  `$databaseName`.`Director` WHERE  `Director`.`ID` = $id AND `Director`.`Valido` = 0 ");
$n = mysql_num_rows ( $query );
if( $n == 0 )
	echo "NO";
else
{
	$query = mysql_query("
		DELETE FROM  `$databaseName`.`Director` WHERE  `Director`.`ID` = $id ;
	");	

	$query = mysql_query("SELECT * FROM  `$databaseName`.`Director` WHERE  `Director`.`ID` = $id ");
	$n = mysql_num_rows ( $query );
	if( $n != 0 )
		echo "NO";
	else
		echo "SI";
}
?>




