let canvas,ctx;
let blocksize = 20;

let snakeX = 5*blocksize;
let snakeY = 5*blocksize;
let foodX = 10*blocksize;
let foodY = 10*blocksize;

let snake = [];
let snakesize = 1;
let nextX = 0, nextY = 0;
let score = 0;

window.onload = function (){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    document.addEventListener("keydown",changeDirection);

    setInterval(update, 1000/8);
    // update ทุก 8ms
};

function update(){
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="green";
    ctx.fillRect(snakeX,snakeY,blocksize,blocksize);
    
    snakeX += nextX * blocksize;
    snakeY += nextY * blocksize;

    // ทะลุหน้าจอ
    if(snakeX < 0){
        snakeX = blocksize*blocksize;
    }
    if(snakeX > canvas.width){
        snakeX = 0;
    }
    if(snakeY < 0){
        snakeY = blocksize*blocksize;
    }
    if(snakeY > canvas.height){
        snakeY = 0;
    }

    // ถ้ากินอาหาร 
    if(snakeX == foodX && snakeY == foodY){
        snakesize++;
        foodX = Math.floor(Math.random()*blocksize)*blocksize;
        foodY = Math.floor(Math.random()*blocksize)*blocksize;
        score += 10;
    }
    
    for(let i = 0;i < snake.length;i++){
        ctx.fillRect(snake[i][0],snake[i][1],blocksize,blocksize);
        // ถ้างูกินตัวเอง ให้เริ่มต้นใหม่
        if(snakeX == snake[i][0] && snakeY == snake[i][1]){
            snakesize = 1;
            score = 0;
        }
        
    }

    //เพิ่มขนาด snake ตามจำนวนอาหารที่ได้กิน
    snake.push([snakeX,snakeY]);
    while(snake.length > snakesize){
        snake.shift();
    }

    document.getElementById("score").innerHTML = score;
    ctx.fillStyle="red";
    ctx.fillRect(foodX,foodY,blocksize,blocksize);

};

function changeDirection(e){
    if(e.code == "ArrowUp"){
        nextX = 0;
        nextY = -1;
    }
    else if(e.code == "ArrowDown"){
        nextX = 0;
        nextY = 1;
    }
    else if(e.code == "ArrowLeft"){
        nextX = -1;
        nextY = 0;
    }
    else if(e.code == "ArrowRight"){
        nextX = 1;
        nextY = 0;
    }

};