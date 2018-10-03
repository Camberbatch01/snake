let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let score = 0;
let highScore = localStorage.getItem("highScore");
let snakeHead = {x: 0, y: 0}
let snake = [{x: 150, y: 150}, {x: 135, y: 150}, {x: 120, y: 150}]; //initial position multiples of 15 as snake moves in increments of 15
let snakeLength = snake.length;
let xMove = 15;          //initialise by moving right so they dont stay still while score increases
let yMove = 0;
let dinner = {x: Math.floor(Math.random()*10)*75, y: Math.floor(Math.random()*10)*45};
    //math.floor would make math.random 0 so *10 to prevent that then *x, where 10*x = canvas height/width. multiple of 15 so snake can reach edges
if (highScore === null) {
    highScore = 0;
} else {
    document.getElementById("highScore").innerHTML = `High Score: ${highScore}`;
}

this.document.addEventListener("keydown", key);

function start() {
    document.getElementById("play").style.visibility = "hidden";    //hide button so it cant be clicked again
    timer = setInterval(play, 125); //set an interval to repeatedly run play() to allow the game to run continuously
}
function play() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height); //initialises canvas to a blank slate
    draw(snake);
    ctx.fillStyle = "red";
    ctx.fillRect(dinner.x, dinner.y, 15, 15)    //food same width as snake for consistency
    eat();
    slither();
    document.getElementById("score").innerHTML = `Score: ${score}`;
}
function draw(snake) {
    for (let i=0; i<snake.length; i++) {
        let x = snake[i].x;
        let y = snake[i].y;
        ctx.fillStyle = "white";    //colour current position on the snake to see on the canvas
        ctx.fillRect(snake[i].x, snake[i].y, 15, 15);
        ctx.strokeRect(snake[i].x, snake[i].y, 15, 15); //give outline so the snake is more defined
    }
}
function slither() {
    snakeHead.x = snake[0].x + xMove;   //new x axis for head is old front position + direction movement from key press
    snakeHead.y = snake[0].y + yMove;   //new y axis ' '
    snake.unshift({x: snakeHead.x, y: snakeHead.y}); //adding new position to the array at the front because snake moves forward
    score++;
    if (snake.length > snakeLength) {  
        snake.pop();    //by adding new head, will be larger so remove tail to keep size consistent
    }
    if (snake[0].x > canvas.width || snake[0].y > canvas.height || snake[0].x < 0 || snake[0].y < 0) {
        gameover();     //end the game if the snake goes out of bounds
    }
    for (let i = 1; i < snakeLength; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            gameover(); //end the game if the snake hits itself
        }
    }
}
function eat() {
    if (snake[0].x === dinner.x && snake[0].y === dinner.y) {
        snakeLength++;  //increase by 1. in slither() statement to pop wont be true so will increase snake on canvas
        score += 100;
        dinner = {x: Math.floor(Math.random()*10)*75, y: Math.floor(Math.random()*10)*45};  //food needs to move as its been eaten
    }
}
function gameover() {
    clearInterval(timer);   //clear the interval running play function so the snake stops.
    ctx.clearRect(0, 0, canvas.width, canvas.height);   //clear the canvas so the snake goes
    ctx.font = "30px fantasy";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", canvas.width/2, canvas.height/2);        //say gameover in the middle of the canvas
    if (score > highScore) {
        highScore = score;      //re-adjust high score if new score is larger
        document.getElementById("highScore").innerHTML = `High Score: ${highScore}`;
        localStorage.setItem("highScore", highScore);
    }
    score = 0;
    snakeHead = {x: 0, y: 0}
    snake = [{x: 150, y: 150}, {x: 135, y: 150}, {x: 120, y: 150}];
    snakeLength = snake.length;
    document.getElementById("play").style.visibility = "visible";       //reset everything. Show button to allow game to start again
    

    xMove = 15; //initialise by moving right
    yMove = 0;
}
function key(e) {
    switch(e.keyCode) {
        case 37:        //left
            if (xMove <= 0) {
                xMove = -15; yMove = 0;     //stops the opposite direction being chosen
            } 
            break;  
        case 38:        //up
            if (yMove <= 0) {
                xMove = 0; yMove = -15;
            }
            break;
        case 39:        //right
            if (xMove >= 0) {
                xMove = 15; yMove = 0;
            }
            break;
        case 40:        //down
            if (yMove >= 0) {
                xMove = 0; yMove = 15; 
            }   
            break;
    }
}