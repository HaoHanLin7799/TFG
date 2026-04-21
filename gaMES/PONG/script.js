var ctx;
var pelota;
var jugador1;
var jugador2;


var HEIGHT;
var WIDTH;

var keys = {};

class jugador {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.velX = 0;
        this.velY = 5;
        this.ancho = 25;
        this.alto = 150;
        this.puntos = 0;
    }

    mover(direccion){
        this.y +=direccion * this.velY;
    }
}

class ball {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.velX = 3;
        this.velY = 3;
        this.ancho = 25;
        this.alto = 25;
    }
    
    mover(direccion){
        this.x +=direccion * this.velX;
        this.y += direccion *this.velY;
    }
}


function createObjets(){
    
    jugador1 = new jugador(30, HEIGHT/2);
    jugador2 = new jugador(WIDTH-50, HEIGHT/2);
    pelota = new ball (WIDTH/2, HEIGHT/2);
}

function load(){
    const canvaArt = document.getElementById("gameCanvas");
    ctx = canvaArt.getContext("2d");

    WIDTH = parseInt(canvaArt.getAttribute("width"));
    HEIGHT= parseInt(canvaArt.getAttribute("height"));

    createObjets();
    gameLoop();
}

function moveObjets(){
    if (pelota.y < 0) {
        pelota.y = 0;
        pelota.velY = -pelota.velY;
    } else if (pelota.y + pelota.alto > HEIGHT) {
        pelota.y = HEIGHT - pelota.alto;
        pelota.velY = -pelota.velY;
    }

    pelota.mover(-1);
}
function colisiones(){
    // Limites de pantalla para jugadores
    if (jugador1.y < 0) jugador1.y = 0;
    if (jugador1.y + jugador1.alto > HEIGHT) jugador1.y = HEIGHT - jugador1.alto;

    if (jugador2.y < 0) jugador2.y = 0;
    if (jugador2.y + jugador2.alto > HEIGHT) jugador2.y = HEIGHT - jugador2.alto;
                
    //Colisión de la pelota con los jugadores
    if(pelota.x <jugador1.x+jugador1.ancho 
    && pelota.x + pelota.ancho > jugador1.x 
    && pelota.y < jugador1.y + jugador1.alto 
    && pelota.y + pelota.alto > jugador1.y){

        pelota.x =  jugador1.x + jugador1.ancho;
        pelota.velX = -Math.abs(pelota.velX);
    }

    
    if(pelota.x <jugador2.x+jugador2.ancho 
    && pelota.x + pelota.ancho > jugador2.x 
    && pelota.y < jugador2.y + jugador2.alto 
    && pelota.y + pelota.alto > jugador2.y){

        pelota.x =  jugador2.x-jugador2.ancho;
        pelota.velX = Math.abs(pelota.velX);
    }
}
 function puntos(){   // Lee si la pelota ha tocado la linea de fondo y alerta de quien ha puntuado

    //Puntos Jugador 1
    if (pelota.x + pelota.ancho > WIDTH+30){

        jugador1.y = HEIGHT/2;
        jugador2.y = HEIGHT/2;
        pelota.x = WIDTH/2;
        jugador1.puntos += 1;
        document.getElementById("pts-J1").innerHTML = jugador1.puntos;
    }

    //Puntos Jugador 2
    if (pelota.x + pelota.ancho < 0){

        jugador1.y = HEIGHT/2;
        jugador2.y = HEIGHT/2;
        pelota.x = WIDTH/2;
        jugador2.puntos += 1;
        document.getElementById("pts-J2").innerHTML = jugador2.puntos;
    }
    }

    function draw(){
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        ctx.fillStyle = "#fffc";

        //Linea del medio
        ctx.fillRect(WIDTH/2-4,10,WIDTH/WIDTH+5,HEIGHT-20);

        //Entidades
        ctx.fillRect(jugador1.x, jugador1.y, jugador1.ancho, jugador1.alto);
        ctx.fillRect(jugador2.x, jugador2.y, jugador2.ancho, jugador2.alto);
        ctx.fillRect(pelota.x, pelota.y, pelota.ancho, pelota.alto);
    }
    
    document.addEventListener("keydown", (e) => {
        keys[e.key] = true;
    });
    
    document.addEventListener("keyup", (e) => {
        keys[e.key] = false;
    });
    
    function moverJugador(){
        //Jugador 1
        if(keys["w"] || keys['W']){
            jugador1.mover(-1);
        }
        if(keys["s"] || keys['S']){
            jugador1.mover(1);
        }
        //Jugador 2
        if(keys["ArrowUp"]){
            jugador2.mover(-1);
        }
        if(keys["ArrowDown"]){
            jugador2.mover(1);
        }
    }
    function gameLoop(){
        moveObjets();
        colisiones();
        puntos();
        moverJugador();
        draw();
        requestAnimationFrame(gameLoop);
    }