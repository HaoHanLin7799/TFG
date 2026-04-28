//VARIABLES GLOBALES
const baseHeight = 700,
baseWidth = 1000;

let scale = 1;

var ctx;
var pelota;
var jugador1;
var jugador2;

var HEIGHT;
var WIDTH;

let jugadorVel;
let pelotaVelX;
let pelotaVelY;
let maxRondas;

var keys = {};
//CLASES
class jugador {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velX = 0; //Sin utilidad por el momento, Idea: añadir un modo con controles para el eje X
        this.velY = 10;
        this.ancho = 25;
        this.alto = 150;
        this.puntos = 0;
        this.limit = 0;
    }

    mover(direccion) {
        this.y += direccion * this.velY;
    }
}

class ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velX = 7;
        this.velY = 7;
        this.ancho = 25; //450 MAX
        this.alto =this.ancho;
    }

    moverX() {
        this.x += this.velX;
    }
    moverY(){
    this.y += this.velY;
    }
}


function createObjets() { //CREA LOS OBJETOS COMO LA PALA QUE CONTROLAMOS EN EL JUEGO Y LA PELOTA QUE GOLPEAMOS EN BASE A LA CLASE CREADAA ANTERIORMENTE

    jugador1 = new jugador(30, HEIGHT / 2 - 75);
    jugador2 = new jugador(WIDTH - 50, HEIGHT / 2 - 75);
    pelota = new ball(WIDTH / 2 - 12.5, HEIGHT / 2 - 12.5);
}

function load() {
    const canvaAtr = document.getElementById("gameCanvas");
    ctx = canvaAtr.getContext("2d");

    jugadorVel = prompt("Velocidad del jugador:","");
    maxRondas = prompt("Máximos de rondas:","");

    WIDTH = baseWidth;
    HEIGHT = baseHeight;

    resizeCanvas();

    createObjets();
    gameLoop();
}
//REDIMENSIONA EL CANVAS EN BASE AL TAMAÑO DE LA VENTANA
function resizeCanvas(){
    const canvas = document.getElementById("gameCanvas");

    const availableW = window.innerWidth * 0.95;
    const availableH = window.innerHeight * 0.85;

    scale = Math.min(availableW / baseWidth, availableH / baseHeight);

    canvas.style.width = (baseWidth * scale) + "px";
    canvas.style.height = (baseHeight * scale) + "px";

    if (canvas.style.width > 1000){
        canvas.width = 700;
    }
}
//MUEVE LA PELOTA EN LOS EJES X E Y
function moveObjets() {
    
    pelota.moverX();
    pelota.moverY();   
}
//COLISIONES DE LOS OBJETOS CON EL ENTORNO
function colisiones() {
    //Limite de pantalla para la pelota
    if (pelota.y < 0) {
        pelota.y = 0;
        pelota.velY = -pelota.velY;
    } else if (pelota.y + pelota.alto > HEIGHT) {
        pelota.y = HEIGHT - pelota.alto;
        pelota.velY = -pelota.velY;
    }
    // Limites de pantalla para jugadores
    if (jugador1.y < 0) jugador1.y = 0;
    if (jugador1.y + jugador1.alto > HEIGHT) jugador1.y = HEIGHT - jugador1.alto;

    if (jugador2.y < 0) jugador2.y = 0;
    if (jugador2.y + jugador2.alto > HEIGHT) jugador2.y = HEIGHT - jugador2.alto;

    //Colisión de la pelota con los jugadores
    if (pelota.x < jugador1.x + jugador1.ancho
        && pelota.x + pelota.ancho > jugador1.x
        && pelota.y < jugador1.y + jugador1.alto
        && pelota.y + pelota.alto > jugador1.y) {

        pelota.x = jugador1.x + jugador1.ancho;
        pelota.velX = Math.abs(25);
    }


    if (pelota.x + pelota.ancho < jugador2.x + jugador2.ancho
        && pelota.x + pelota.ancho > jugador2.x
        && pelota.y < jugador2.y + jugador2.alto
        && pelota.y + pelota.alto > jugador2.y) {

        pelota.x = jugador2.x - pelota.ancho;
        pelota.velX = -Math.abs(25);
    }
}
function puntos() { //DETECTA SI LA PELOTA A SALIDO DEL CAMPO DE JUEGO POR ALGUNO DE LOS LATERALES Y EN BASE AL LATERAL SUMA PUNTOS A LOS JUGADORES

    //Puntos Jugador 1
    if (pelota.x > WIDTH) {

        jugador1.y = HEIGHT / 2 - 75;
        jugador2.y = HEIGHT / 2 - 75;
        pelota.x = WIDTH / 2 - 12.5;
        pelota.y = HEIGHT / 2 - 12.5; // ESTO HACE QUE LA PELOTA SE REINICIE POR COMPLETO TRAS EL PUNTO, SI SE ELIMINA SE HARIA EL JUEGO MÁS ALEATORIO
        jugador1.puntos += 1;
        pelota.velX = 7;
        jugador2.limit += 1;
        jugador1.limit = 0;
        document.getElementById("pts-J1").innerHTML = jugador1.puntos;
    }

    //Puntos Jugador 2
    if (pelota.x + pelota.ancho < 0) {

        jugador1.y = HEIGHT / 2 - 75;
        jugador2.y = HEIGHT / 2 - 75;
        pelota.x = WIDTH / 2 - 12.5;
        pelota.y = HEIGHT / 2 - 12.5; //LEER COMENTARIO DE "//Puntos Jugador 1"
        jugador2.puntos += 1;
        pelota.velX = -7;
        jugador1.limit += 1;
        jugador2.limit = 0;
        document.getElementById("pts-J2").innerHTML = jugador2.puntos;
    }
    //LIMITA EL NUMERO DE PUNTOS QUE PUEDE RECIBIR UN JUGADOR ANTES DE CAMBIAR EL LADO DEL SAQUE
    if (jugador1.limit == 3){
        jugador1.limit = 0;
        pelota.velX = 7;
    }

    if (jugador2.limit == 3){
        jugador2.limit = 0;
        pelota.velX = -7;
    }
}
//DIBUJA LOS OBJETOS DENTRO DEL CANVAS
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#fffc";

    //Linea del medio
    ctx.fillRect(WIDTH / 2 - 4, 10, WIDTH / WIDTH + 5, HEIGHT - 20);

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

function moverJugador() { //DETECTA LAS TECLAS PULSADAS Y MUEVE AL JUGADOR
    //Jugador 1
    if (keys["w"] || keys['W']) {
        jugador1.mover(-1);
    }
    if (keys["s"] || keys['S']) {
        jugador1.mover(1);
    }
    //Jugador 2
    if (keys["ArrowUp"]) {
        jugador2.mover(-1);
    }
    if (keys["ArrowDown"]) {
        jugador2.mover(1);
    }
    /* if (jugador2.y == jugador2.y + 0 && pelota.velX == -Math.abs(pelota.velX)){
            jugador2.y += pelota.velY * 1.3;
    } */

}

//BOT (DETECTA LA POSIVION DE LA PELOTA Y MUEVE AUTOMATICAMENTE A JUGADOR 2 A ELLA)
function moveBot() {
  let paddleCenter = jugador2.y + jugador2.alto / 2;
  let errorMargin =Math.random() * 95; //Margén de error para hacer el juego más justo (dicho margen es aleatorio)
    
        if (paddleCenter < pelota.y - errorMargin) {
        jugador2.y += jugador2.velY;
        } else if (paddleCenter > pelota.y + errorMargin) {
        jugador2.y -= jugador2.velY;
        }
}
//BUCLE QUE ACTUALIZA EL JUEGO CONSTANTEMENTE Y PERMITE SU CORRECTO FUNCIONAMIENTO
function gameLoop() {
    rondas();
    moveObjets();
    colisiones();
    puntos();
    moverJugador();
    draw();
    moveBot();
    requestAnimationFrame(gameLoop);
}
function rondas(){
    if(jugador1.puntos >= maxRondas || jugador2.puntos >= maxRondas){
        jugador1.puntos = 0;
        jugador2.puntos = 0;
        alert("partida finalizada");
        maxRondas = prompt("Máximos de rondas:","");
    }
}
function partidaPerso(){
    alert("Aquí puedes personalizar tu partida: \n" + pelotaVel + jugadorVel + maxRondas);
}
window.addEventListener("resize", resizeCanvas);