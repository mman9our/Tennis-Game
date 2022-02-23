var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;
var player1Score = 0;
var player2Score = 0;
var WinScreen = false;
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 7;
const WINNING_SCORE = 3;
var StartStatus = false;

const start = () => {
        setTimeout(function() {
        confetti.start()
        }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
    };
    //  Stop
const stop = () => {
        setTimeout(function() {
        confetti.stop()
        }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
    };

function calculateMousePos(evt)
{
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return { x:mouseX , y:mouseY };
    
}
function handleMouseClick(evt)
{
    
    if (WinScreen)
    {
       player1Score = 0 ;
       player2Score = 0;
       WinScreen = false;
    }
}
function StartMouseClick(evt)
{
    if (StartStatus == false)
    {
       player1Score = 0 ;
       player2Score = 0;
       StartStatus = true;
       
    }
}
window.onload = function()
{
    canvas = document.getElementById('GameCanvas');
    canvasContext = canvas.getContext('2d');
    var framePerSecond =30;
    setInterval(function()
    {
        moveEverything();
        drawEverything();
    }, 1000/framePerSecond);
    canvas.addEventListener('mousedown', StartMouseClick);
    canvas.addEventListener('mousedown', handleMouseClick);
    canvas.addEventListener('mousemove', function(evt)
    {
     var mousePos = calculateMousePos(evt);
     paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    });
    
}

function ballReset()
{
    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE )
    {
        WinScreen = true;
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}
function ComputerMovment()
{
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY -35)
    {
        paddle2Y +=6;
    }
    else if(paddle2YCenter > ballY +35)
    {
        paddle2Y -=6;
    }
}
function moveEverything()
{
    if (WinScreen == true)
    {
        return;
    }
    ComputerMovment();
    ballY += ballSpeedY;
    if(ballY > canvas.height )
    {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY <0)
    {
        ballSpeedY = -ballSpeedY;
    }
    ballX += ballSpeedX;
    if(ballX > canvas.clientWidth )
    {
        if(ballY > paddle2Y && ballY <paddle2Y+PADDLE_HEIGHT)
        {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }
        else
        {
            player1Score++;
            ballReset();
        }
    }
    if (ballX <0)
    {
        if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT)
        {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }
        else
        {
            player2Score++; 
            ballReset();
            
        }
    }
}
function drawEverything()
{
    colorRect(0,0, canvas.clientWidth,canvas.height,'black');
    if(StartStatus == true)
    {

    stop();
    if (WinScreen)
    {
        canvasContext.textAlign = "center";
        canvasContext.font = "20px Arial";
        canvasContext.fillStyle = 'white';
        if (player1Score >= WINNING_SCORE)
        {
            canvasContext.fillText("Player Won:)", 510 ,200);
        }
        else
        if (player2Score >= WINNING_SCORE)
        {
            canvasContext.fillText("Computer Won:(", 510 ,200);
        }
        start();
        canvasContext.fillText("Click to Continue Game", 520 ,330);
        return;
    }
    drawNet();
     // left rect
     colorRect(0,paddle1Y, PADDLE_THICKNESS ,PADDLE_HEIGHT,'white');
     // right rect
     colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, 10, PADDLE_HEIGHT,'white');
     colorCircle(ballX,ballY, 10 , 'white');
     canvasContext.textAlign = "center";
     canvasContext.font = "20px Arial";
     canvasContext.fillText(player1Score, 100 ,100);
     canvasContext.fillText(player2Score, canvas.width - 100 ,100);
}

else
{
     canvasContext.textAlign = "center";
     canvasContext.font = "40px Arial";
     canvasContext.fillStyle = 'white';
     canvasContext.fillText("Start Game", 520 ,330);
}
}
function colorCircle(centerX, centerY, radius, drawColor)
{
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX ,centerY, radius , 0, Math.PI * 2 , true);
    canvasContext.fill();
}
function colorRect(leftX,leftY, width, height,drawColor)
{
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,leftY, width, height );
}
function drawNet()
{
    for (var i =0 ; i< canvas.height; i+=40)
    {
        colorRect(canvas.width/2-1, i,2 ,20,'white');
    }
}