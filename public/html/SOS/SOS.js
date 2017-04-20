var contador = 0;
var n = 0;
var v = "";
var puntuacion1 = 0;
var puntuacion2 = 0;
alert('Bienvenido a "The game of SOS".\n\vIntrucciones:\n 1. Ingrese los nombres de los dos jugadores (deben contener caracteres alfab\xe9ticos, no se dejan vac\xedos).\n\v 2. Defina el tama\xf1o de la tabla (debe ser mayor a 2).\n\v 3. Arrastre los posibles valores " S" y "O" del lado superior derecho, hacia la tabla para completar la palabra "SOS".\n\v 4. Gana quien forme m\xe1s veces dicha palabra.');
var player1 = prompt("Ingrese el nombre del primer jugador:");
while (player1 == "" || player1 == null){
    var player1 = prompt("Ingrese el nombre del primer jugador:");
}
var player2 = prompt("Ingrese el nombre del segundo jugador:");
while (player2 == " " || player2 == null){
    var player2 = prompt("Ingrese el nombre del primer jugador:");
}
limite = prompt("Defina una de las dimensiones del tablero:");
while (limite <= 2 || limite == " "){
    alert('El tablero debe tener m\xe1s de 2 cuadros de largo y alto.')
    limite = prompt("Defina una de las dimensiones del tablero:")
}
var limite2 = (limite*limite);
var turno = 0;
var juego = new Array(limite);
for (i = 0; i < limite; i++){
    juego[i]= new Array(limite);
}
document.write("<table>");
for (var i = 0; i < limite; i++) {
    document.write("<tr id='c"+i+"'>");
    for (var a = 0; a < limite; a++) {
        document.write("<td id='c" + i + "f" + a + "z'></td>");
    }
    document.write("</tr>");
}
document.write("</table>");

function allowDrop(ev){
    ev.preventDefault();
}

function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
}

if (turno == 0 && limite > 2){
    alert("Es turno de " + player1 + ".");
}

function drop(ev){
    ev.preventDefault();
    var dropId = event.target.id;
    var data = ev.dataTransfer.getData("text");
    var validacion = document.getElementById(dropId).innerText;
    if (validacion != " "){
        ev.target.appendChild(document.getElementById(data).cloneNode(true));
        var elemento = document.getElementById(data);
        asignar(dropId, elemento.id);
        turno = turno +1;
        if (turno%2 == 0 && limite > 2 && turno != limite2){
            alert("Es turno de " + player1 + ".");
        }
        else if (turno%2 != 0 && limite > 2 && turno != limite2){
            alert("Es turno de " + player2 + ".");    
        }
        if (turno == limite2) {
            alert("El juego ha terminado.");
            if (puntuacion1 > puntuacion2 && turno != 0){
                alert(player1 + " ha ganado la partida.");
            }
            else if (puntuacion1 < puntuacion2 && turno != 0){
                alert(player2 + " ha ganado la partida.");
            }
            else if (puntuacion1 == puntuacion2 && turno!=0) {
                alert("Ambos jugadores han empatado.")
            }
            if (confirm('Presione "aceptar" si desea volver a jugar.')){
                location.reload(true);
            }
            else {
                window.opener = self;
                self.window.close();
            }
        }     
        elemento.id = "cuadro" + turno;
        elemento.draggable = "false";
        elemento.ondragstart = "false";
        elemento.ondrop = "false";
        elemento.ondragover = "false";
        elemento.style.border = "0px";
    }
}
   
function asignar(a, b){
    var x = "";
    var y = "";
    var size = a.length;
    for(var i=0; i<(a.length); i++){
        if(a.substring(i+1, i+2) == "f"){
            break;
        }
        x = x + "" + a.substring(i+1, i+2);
    }
    size = x.length;
    for(var i=0; i<(a.length); i++){   
        if(a.substring(i + size + 2, i + size + 3) == "z"){
            break;
        }
        y = y + "" + a.substring(i + size + 2, i + size + 3);
    }
    if(b == "down1"){
        puntos(x,y,"o");
    } 
    else if(b == "down2"){
        puntos(x,y,"s");
    }
}

function puntos(x,y,z){
    x = parseInt(x);
    y = parseInt(y);
    this.juego[x][y] = z;
    if(z == "s"){
        this.v = "o";
        validar(x-1,y,x-2,y); // <-
        validar(x+1,y,x+2,y); // ->
        validar(x,y-1,x,y-2); //vertical abajo arriba
        validar(x,y+1,x,y+2); //vertical arriba abajo
        validar(x-1,y-1,x-2,y-2); //DSI
        validar(x+1,y+1,x+2,y+2); //DID
        validar(x-1,y+1,x-2,y+2); //DII
        validar(x+1,y-1,x+2,y-2); //DSD
    } else {
        this.v = "s";
        validar(x-1,y,x+1,y); // horizontal
        validar(x,y-1,x,y+1); // vertical
        validar(x+1,y-1,x-1,y+1); //diagonal "/"
        validar(x+1,y+1,x-1,y-1); //diagonal "\"
    }
}

function standardButtonClicked(eventInfo) {
	alert("El puntaje de " + player1 + " es de " + puntuacion1 + ".");
    alert("El puntaje de " + player2 + " es de " + puntuacion2 + ".");
}

function validar(a,b,c,d){ 
    try{
        if(this.juego[a][b] == this.v && this.juego[c][d] == "s"){ 
            if (turno <= limite2){
                if (turno%2 != 0){
                    puntuacion2 = puntuacion2 +1;
                 }
                else {
                    puntuacion1 = puntuacion1 + 1;
                }
            }
            if (turno != limite2){
                alert("El puntaje de " + player1 + " es de " + puntuacion1 + ".");
                alert("El puntaje de " + player2 + " es de " + puntuacion2 + ".");
            }
        } 
    }
    catch(err) {}          
}