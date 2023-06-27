/********************************
 *                              *
 *           ON LOAD            *
 *                              *
 *******************************/

// ELEMENTI HTML
const layoverEl = document.getElementById("layover");
const closeButtonEl = document.querySelector(".btn-close");
const restartButtonEl = document.getElementById("restart_button");
const scoreEl = document.getElementById("score");
const totalScoreEl = document.getElementById("total_score");

// DIMENSIONI LAVAGNA
const blockSize = 25;
const rows = 20;
const cols = 20;
let board;
let context;

// POSIZIONE SERPENTE
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let snakeBody = [];

// DIREZIONE SERPENTE
let velocityX = 0;
let velocityY = 0;


// POSIZIONE CIBO
let foodX;
let foodY;

let gameOver = false;

let score = 0;

// * START
window.onload = game;


/********************************
 *                              *
 *           ON CLICK           *
 *                              *
 *******************************/

// * CHIUDI LAYOVER
closeButtonEl.addEventListener(
    "click",
    function () {
        layoverEl.classList.add("hidden");
    }
);

// * RICOMINCIA GIOCO
restartButtonEl.addEventListener(
    "click",
    function () {
        location.reload();
    }
);


/********************************
 *                              *
 *           FUNCTIONS          *
 *                              *
 *******************************/

/**
 * funzione che determina grandezza lavagna più tipologia context
 * e fa funzionare il gioco
 * 
 */
function game() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    getFoodPosition();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 100);
}

/**
 * funzione che riempie il layout, definisce serpente e cibo, e 
 * determina condizioni di gioco e di game over
 * 
 */
function update() {

    if (gameOver) {
        return;
    }

    // * DISEGNO LAVAGNA
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // * DISEGNO CIBO
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Stampo punteggio
    scoreEl.innerHTML = score;

    // Ingrandisco serpente se mangia e rigenero cibo
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        getFoodPosition();
        score++; // incremento punteggio
    }

    // Il corpo segue la testa
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // DISEGNO SERPENTE
    context.fillStyle = "limegreen";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // * GAME OVER
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        // alert("Game Over!");
        layoverEl.classList.remove("hidden");
        // console.log(score);
        totalScoreEl.innerHTML =
            `Hai totalizzato ${score} punti.`
            ;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            // alert("Game Over!");
            layoverEl.classList.remove("hidden");
            // console.log(score);
        }
    }
}

/**
 * funzione per cambiare direzione al click delle frecce direzionali
 * 
 */
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

/**
 * funzione per generare le coordinate randomiche del cibo sulla
 * lavagna di gioco
 * 
 */
function getFoodPosition() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}