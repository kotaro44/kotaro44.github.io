CREATE TABLE  `escuela`.`Director` (
`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`Nombre_Escuela` VARCHAR( 50 ) NOT NULL ,
`Direccion_Escuela` VARCHAR( 100 ) NOT NULL ,
`ID_Distrito` INT UNSIGNED NOT NULL ,
`Telefono_Escuela` VARCHAR( 8 ) NOT NULL ,
`E_Mail_Director` VARCHAR( 50 ) NOT NULL ,
`Celular` VARCHAR( 8 ) NOT NULL ,
`Password` VARCHAR( 50 ) NOT NULL ,
`Numero_Id` VARCHAR( 13 ) NOT NULL ,
`P_Nombre` VARCHAR( 50 ) NOT NULL ,
`S_Nombre` VARCHAR( 50 ) NOT NULL ,
`P_Apellido` VARCHAR( 50 ) NOT NULL ,
`S_Apellido` VARCHAR( 50 ) NOT NULL ,
`Valido` BOOLEAN NOT NULL ,
PRIMARY KEY (  `ID` )
) ENGINE = MYISAM ;

CREATE TABLE  `escuela`.`SesionDirector` (
`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`ID_Director` INT UNSIGNED NOT NULL ,
`Activa` BOOLEAN NOT NULL ,
`Fecha` DATE NOT NULL ,
PRIMARY KEY (  `ID` )
) ENGINE = MYISAM ;

CREATE TABLE  `escuela`.`SesionProfesor` (
`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`ID_Profesor` INT UNSIGNED NOT NULL ,
`Activa` BOOLEAN NOT NULL ,
`Fecha` DATE NOT NULL ,
PRIMARY KEY (  `ID` )
) ENGINE = MYISAM ;

CREATE TABLE  `escuela`.`Departamento` (
`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`Nombre` VARCHAR( 50 ) NOT NULL ,
PRIMARY KEY (  `ID` )
) ENGINE = MYISAM ;

CREATE TABLE  `escuela`.`Distrito` (
`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`Nombre` VARCHAR( 50 ) NOT NULL ,
`ID_Departamento` INT UNSIGNED NOT NULL ,
PRIMARY KEY (  `ID` )
) ENGINE = MYISAM ;

CREATE TABLE  `escuela`.`Libro` (
`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`Nombre` VARCHAR( 50 ) NOT NULL ,
PRIMARY KEY (  `ID` )
) ENGINE = MYISAM ;

CREATE TABLE  `escuela`.`Unidad` (
`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`Nombre` VARCHAR( 50 ) NOT NULL ,
`NUnidad` INT UNSIGNED NOT NULL ,
`ID_Libro` INT UNSIGNED NOT NULL ,
PRIMARY KEY (  `ID` )
) ENGINE = MYISAM ;

CREATE TABLE  `escuela`.`Leccion` (
`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`Nombre` VARCHAR( 50 ) NOT NULL ,
`NLeccion` INT UNSIGNED NOT NULL ,
`ID_Unidad` INT UNSIGNED NOT NULL ,
PRIMARY KEY (  `ID` )
) ENGINE = MYISAM ;

CREATE TABLE  `escuela`.`Profesor` (
`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`Password` VARCHAR( 50 ) NOT NULL ,
`Numero_Id` VARCHAR( 13 ) NOT NULL ,
`P_Nombre` VARCHAR( 50 ) NOT NULL ,
`S_Nombre` VARCHAR( 50 ) NOT NULL ,
`P_Apellido` VARCHAR( 50 ) NOT NULL ,
`S_Apellido` VARCHAR( 50 ) NOT NULL ,
`E_Mail` VARCHAR( 50 ) NOT NULL ,
`Celular` VARCHAR( 8 ) NOT NULL ,
`ID_Director` INT UNSIGNED NOT NULL ,
`Valido` BOOLEAN NOT NULL ,
PRIMARY KEY (  `ID` )
) ENGINE = MYISAM ;


CREATE TABLE  `escuela`.`Clase` (
`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`Nombre` VARCHAR( 50 ) NOT NULL ,
`ID_Profesor` INT UNSIGNED NOT NULL ,
PRIMARY KEY (  `ID` )
) ENGINE = MYISAM;

CREATE TABLE  `escuela`.`Alumno` (
`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`P_Nombre` VARCHAR( 50 ) NOT NULL ,
`S_Nombre` VARCHAR( 50 ) NOT NULL ,
`P_Apellido` VARCHAR( 50 ) NOT NULL ,
`S_Apellido` VARCHAR( 50 ) NOT NULL ,
`ID_Clase` INT UNSIGNED NOT NULL ,
PRIMARY KEY (  `ID` )
) ENGINE = MYISAM;


CREATE TABLE  `escuela`.`Prueba` (
`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
`Codigo` VARCHAR( 50 ) NOT NULL ,
`Fecha` DATE NOT NULL ,
`Penalizacion` INT UNSIGNED NOT NULL ,
`Puntuacion` INT UNSIGNED NOT NULL ,
`Correctas` INT UNSIGNED NOT NULL ,
`Incorrectas` INT UNSIGNED NOT NULL ,
`Ayudas` INT UNSIGNED NOT NULL ,
`Valido` VARCHAR( 50 ) NOT NULL ,
`ID_Alumno` INT UNSIGNED NOT NULL ,
`ID_Leccion` INT UNSIGNED NOT NULL ,
PRIMARY KEY (  `ID` )
) ENGINE = MYISAM;


INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Atlantida' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Choluteca' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Colon' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Comayagua' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Copan' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Cortes' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'El Paraiso' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Francisco Morazan' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Gracias a Dios' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Intibuca' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Islas de la bahia' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'La Paz' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Lempira' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Ocotepeque' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Olancho' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Santa Barbara' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Valle' );
INSERT INTO  `escuela`.`Departamento` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Yoro' );

INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  1 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  1 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  1 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  2 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  2 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  2 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  3 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  3 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  3 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  4 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  4 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  4 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  5 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  5 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  5 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  6 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  6 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  6 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  7 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  7 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  7 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  8 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  8 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  8 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  9 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  9 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  9 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  10 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  10 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  10 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  11 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  11 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  11 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  12 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  12 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  12 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  13 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  13 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  13 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  14 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  14 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  14 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  15 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  15 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  15 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  16 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  16 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  16 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  17 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  17 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  17 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 1',  18 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 2',  18 );
INSERT INTO  `escuela`.`Distrito` ( `ID` , `Nombre` , `ID_Departamento` ) VALUES ( NULL ,  'Distrito 3',  18 );

INSERT INTO  `escuela`.`Libro` ( `ID` , `Nombre` ) VALUES ( NULL ,  'Matematicas 2do grado' );
INSERT INTO  `escuela`.`Unidad` ( `ID` , `Nombre` , `NUnidad` , `ID_Libro` ) VALUES ( NULL ,  'Unidad 1',  '1',  '1' );
INSERT INTO  `escuela`.`Unidad` ( `ID` , `Nombre` , `NUnidad` , `ID_Libro` ) VALUES ( NULL ,  'Unidad 2',  '2',  '1' );
INSERT INTO  `escuela`.`Unidad` ( `ID` , `Nombre` , `NUnidad` , `ID_Libro` ) VALUES ( NULL ,  'Unidad 3',  '3',  '1' );
INSERT INTO  `escuela`.`Unidad` ( `ID` , `Nombre` , `NUnidad` , `ID_Libro` ) VALUES ( NULL ,  'Unidad 4',  '4',  '1' );
INSERT INTO  `escuela`.`Unidad` ( `ID` , `Nombre` , `NUnidad` , `ID_Libro` ) VALUES ( NULL ,  'Unidad 5',  '5',  '1' );
INSERT INTO  `escuela`.`Unidad` ( `ID` , `Nombre` , `NUnidad` , `ID_Libro` ) VALUES ( NULL ,  'Unidad 6',  '6',  '1' );
INSERT INTO  `escuela`.`Unidad` ( `ID` , `Nombre` , `NUnidad` , `ID_Libro` ) VALUES ( NULL ,  'Unidad 7',  '7',  '1' );
INSERT INTO  `escuela`.`Unidad` ( `ID` , `Nombre` , `NUnidad` , `ID_Libro` ) VALUES ( NULL ,  'Unidad 8',  '8',  '1' );
INSERT INTO  `escuela`.`Unidad` ( `ID` , `Nombre` , `NUnidad` , `ID_Libro` ) VALUES ( NULL ,  'Unidad 9',  '9',  '1' );
INSERT INTO  `escuela`.`Unidad` ( `ID` , `Nombre` , `NUnidad` , `ID_Libro` ) VALUES ( NULL ,  'Unidad 10',  '10',  '1' );
INSERT INTO  `escuela`.`Unidad` ( `ID` , `Nombre` , `NUnidad` , `ID_Libro` ) VALUES ( NULL ,  'Unidad 11',  '11',  '1' );
INSERT INTO  `escuela`.`Unidad` ( `ID` , `Nombre` , `NUnidad` , `ID_Libro` ) VALUES ( NULL ,  'Unidad 12',  '12',  '1' );
INSERT INTO  `escuela`.`Unidad` ( `ID` , `Nombre` , `NUnidad` , `ID_Libro` ) VALUES ( NULL ,  'Unidad 13',  '13',  '1' );

INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Recordemos',  '1',  '1');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 1',  '2',  '1');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 2',  '3',  '1');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 3',  '4',  '1');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 4',  '5',  '1');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 1',  '1',  '2');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 1',  '1',  '3');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Ejercicios 1',  '3',  '3');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 1',  '1',  '4');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 2',  '2',  '4');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Ejercicios 1',  '3',  '4');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 3',  '4',  '4');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Ejercicios 2',  '5',  '4');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 1',  '1',  '5');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 2',  '2',  '5');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Ejercicios 1',  '3',  '5');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 3',  '4',  '5');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Ejercicios 2',  '5',  '5');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 1',  '1',  '6');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 2',  '2',  '6');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 1',  '1',  '7');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 2',  '2',  '7');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Ejercicios 1',  '3',  '7');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 3',  '4',  '7');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Ejercicios 2',  '5',  '7');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 4',  '6',  '7');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Ejercicios 5',  '7',  '7');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 5',  '8',  '7');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Ejercicios 6',  '9',  '7');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 1',  '1',  '8');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 2',  '2',  '8');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Ejercicios 1',  '3',  '8');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 1',  '1',  '9');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 2',  '2',  '9');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 1',  '1',  '10');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 2',  '2',  '10');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 1',  '1',  '11');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 2',  '2',  '11');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 3',  '3',  '11');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 1',  '1',  '12');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 2',  '2',  '12');
INSERT INTO  `escuela`.`Leccion` (`ID` ,`Nombre` ,`NLeccion` ,`ID_Unidad`)VALUES (NULL ,  'Leccion 1',  '1',  '13');












