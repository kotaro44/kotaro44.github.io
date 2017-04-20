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
		UPDATE  `$databaseName`.`Director` SET  `Valido` =  1 WHERE  `Director`.`ID` = $id;
	");	

	$query = mysql_query("SELECT * FROM  `$databaseName`.`Director` WHERE  `Director`.`ID` = $id AND `Valido` =  1 ");
	$n = mysql_num_rows ( $query );
	if( $n != 0 )
		echo "SI";
	else
		echo "NO";
}
?>




