function load(){
     var ctx = document.getElementById('gameCanvas').getContext('2d');
        ctx.fillStyle = '#fffc';

        const 
            canvaAtr = document.getElementById("gameCanvas");
            
        var 
            WIDTH = canvaAtr.getAttribute("width"),
            HEIGHT= canvaAtr.getAttribute("height");
            
        /*  
        entidades = function(nombre,puntos,x,y,velX,velY,ancho,alto) {    
            var entity = {
                nombre: nombre,
                puntos: puntos,
                x: x,
                y: y,
                velX: velX,
                velY: velY,
                ancho: ancho,
                alto: alto,
            }
        }

        jugador = function(nombre,puntos,x,y,velX,velY,ancho,alto){
            var entity = entidades(nombre,puntos,x,y,velX,velY,ancho,alto);
        }

        jugador1 =function(){
            var entity = jugador('J1',0,30,HEIGHT/2,0,10,25,150);
        }
         */
            var jugador1 = {
                nombre: 'J1',
                puntos: 0,
                x: 30,
                y: HEIGHT/2,
                velX: 0,
                velY: 10,
                ancho: 25,
                alto: 150,
            }


            var jugador2 = {
                nombre: 'J2',
                puntos: 0,
                x: WIDTH-40,
                y: HEIGHT/2,
                velX: 0,
                velY: 10,
                ancho: 25,
                alto: 150,
            }
            
            
            var pelota ={
                nombre: 'Ball',
                x: WIDTH/2,
                y: HEIGHT/2,
                velX: 10,
                velY: 10,
                ancho: 25,
                alto: 25,
            }
            function actEnt(entity){
                entity.x += entity.velX;
                entity.y += entity.velY;
                ctx.fillRect(entity.x,entity.y,entity.ancho,entity.alto);
                
                if(jugador1.x < 0 || jugador1.x + jugador1.ancho > WIDTH){
                    jugador1.velX = -jugador1.velX;
                }
                if(jugador1.y < 0 || jugador1.y + jugador1.alto > HEIGHT){
                    jugador1.velY = -jugador1.velY;
                }
                
                if(jugador2.x < 0 || jugador2.x + jugador2.ancho > WIDTH){
                    jugador2.velX = -jugador2.velX;
                }
                if(jugador2.y < 0 || jugador2.y + jugador2.alto > HEIGHT){
                    jugador2.velY = -jugador2.velY;
                }

                if(pelota.y < 0 || pelota.y + pelota.alto > HEIGHT){
                    pelota.velY = -pelota.velY;
                }
                
                // Lee si la pelota ha tocado la linea de fondo y alerta de quien ha puntuado
                if (pelota.x + pelota.ancho > parseInt(WIDTH)+40){
                    alert("Punto para J1");
                    jugador1.y = HEIGHT/2;
                    jugador2.y = HEIGHT/2;
                    pelota.x = WIDTH/2;
                    pelota.velX = 10;
                    jugador1.puntos += 1;
                    document.getElementById("pts-J1").innerHTML = jugador1.puntos;
                }
                if (pelota.x + pelota.ancho < 0){
                    alert ("Punto para J2");
                    jugador1.y = HEIGHT/2;
                    jugador2.y = HEIGHT/2;
                    pelota.x = WIDTH/2;
                    jugador2.puntos += 1;
                    document.getElementById("pts-J2").innerHTML = jugador2.puntos;
                }
                //Colisión de la pelota con los jugadores
                if(pelota.x <jugador1.x+jugador1.ancho && pelota.x + pelota.ancho > jugador1.x && pelota.y < jugador1.y + jugador1.alto && pelota.y + pelota.alto > jugador1.y){
                    pelota.velX = -pelota.velX;
                }
                if(pelota.x <jugador2.x+jugador2.ancho && pelota.x + pelota.ancho > jugador2.x && pelota.y < jugador2.y + jugador2.alto && pelota.y + pelota.alto > jugador2.y){
                    pelota.velX = -pelota.velX;
                }
            }
            
            function actualizar(){
                ctx.clearRect(0,0,WIDTH,HEIGHT);
                ctx.fillRect(WIDTH/2-4,10,WIDTH/WIDTH+5,HEIGHT-20); // linea del medio
                actEnt(jugador1);
                actEnt(jugador2);
                actEnt(pelota);
            }
        setInterval(actualizar,30);
    }

    function resetGame(){
        document.getElementById("reloadBtn").addEventListener("click", function() {
        location.reload();
  });
    } 