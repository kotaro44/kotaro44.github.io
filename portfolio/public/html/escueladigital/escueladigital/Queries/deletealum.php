<?php
include 'dbconnect.php';
$idalumno = mysql_real_escape_string($_POST['value']);

$query = mysql_query("
	DELETE FROM  `$databaseName`.`Alumno` 
	WHERE `Alumno`.`ID` =  $idalumno;
");

	echo "SI";
?>