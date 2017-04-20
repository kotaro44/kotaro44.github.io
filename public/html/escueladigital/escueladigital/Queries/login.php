<?php
include 'dbconnect.php';

$value = mysql_real_escape_string($_POST['value']);

list($correo,  $password ) = split('[,]', $value);
$query = mysql_query(
	"SELECT  `ID` FROM  `$databaseName`.`Director` 
    WHERE  `E_mail_Director` = '$correo' AND  `Password` =  '$password' AND `Valido` = 1"
);

$n = mysql_num_rows ( $query );

if( $n == 0 )
{
	$query = mysql_query("
		SELECT `ID` FROM  `$databaseName`.`Profesor`
		WHERE  `Password` =  '$password' AND  `E_mail` =  '$correo' AND `Valido` = 1 "
	);
	$n = mysql_num_rows ( $query );
	if( $n == 0 )
		echo "NO";
	else
	{
		$query = mysql_query("
			SELECT `$databaseName`.`SesionProfesor`.`ID` 
			FROM  `$databaseName`.`SesionProfesor` 
			WHERE  `Activa` = 1 AND `ID_Profesor` = ( SELECT `$databaseName`.`Profesor`.`ID` 
																					FROM `$databaseName`.`Profesor` 
								                                                    WHERE  `E_mail` = '$correo' AND  `Password` =  '$password' )");
		$n = mysql_num_rows ( $query );
		if( $n == 0 )
		{
			$query = mysql_query("
				INSERT INTO  `$databaseName`.`SesionProfesor` ( `ID` , `ID_Profesor` , `Activa` ,`Fecha` ) 
				VALUES ( NULL ,  ( SELECT  `ID`
												FROM  `$databaseName`.`Profesor` 
												WHERE  `E_mail` = '$correo' 
							AND  `Password` =  '$password'),  '1',  curDate() );");
			$query = mysql_query("
				SELECT `$databaseName`.`SesionProfesor`.`ID` 
				FROM  `$databaseName`.`SesionProfesor` 
				WHERE  `Activa` = 1 AND `ID_Profesor` = ( SELECT `$databaseName`.`Profesor`.`ID` 
																						FROM `$databaseName`.`Profesor` 
																						WHERE  `E_mail` = '$correo' AND  `Password` =  '$password' )");
			$codigo = mysql_result($query , 0 , 0);
			echo "RROFESOR$codigo";
		}
		else
		{
			$codigo = mysql_result($query , 0 , 0);
			echo "RROFESOR$codigo";
		}
	}
}
else
{
	$query = mysql_query("
		SELECT `$databaseName`.`SesionDirector`.`ID` 
		FROM  `$databaseName`.`SesionDirector` 
		WHERE  `Activa` = 1 AND `ID_Director` = ( SELECT `$databaseName`.`Director`.`ID` 
		                                                                        FROM `$databaseName`.`Director` 
																				WHERE  `E_mail_Director` = '$correo' AND  `Password` =  '$password' )");
	$n = mysql_num_rows ( $query );
	if( $n == 0 )
	{								
		$query = mysql_query("
			INSERT INTO  `$databaseName`.`SesionDirector` ( `ID` , `ID_Director` , `Activa` ,`Fecha` ) 
			VALUES ( NULL ,  ( SELECT  `ID` 
											FROM  `$databaseName`.`Director` 
											WHERE  `E_mail_Director` = '$correo'  AND  `Password` =  '$password'),  '1', curDate() );");
		$query = mysql_query("
			SELECT `$databaseName`.`SesionDirector`.`ID` 
			FROM  `$databaseName`.`SesionDirector` 
			WHERE  `Activa` = 1 AND `ID_Director` = ( SELECT `$databaseName`.`Director`.`ID` 
																					FROM `$databaseName`.`Director` 
																					WHERE  `E_mail_Director` = '$correo' AND  `Password` =  '$password' )");
		$codigo = mysql_result($query , 0 , 0);
		echo "DIRECTOR$codigo";
	}
	else
	{
		$codigo = mysql_result($query , 0 , 0);
		echo "DIRECTOR$codigo";
	}
}

?>




