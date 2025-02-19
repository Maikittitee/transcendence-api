const  SETTING = {
    CONVAS_ID : "pong-game",
    CANVAS_CONTEXT : "2d",
    BASE_WIDTH : 800,
    BASE_HEIGHT : 400,
    PLAYER_PLACE_OFFSET : 50,
    PONGBALL_IMG : "./pages/play/ball.png",
    BG_IMAGE : "./pages/play/BG.png",
    PONGBALL_COLOR : "red",
    PONGBALL_RAD : 10, 
    PLAYER_RAD : 30,
    PLAYER_IMG : "./pages/play/player.png",
    OPPONENT_IMG : "./pages/play/opponent.png",
    STROKE_SIZE : 0
}

var MATCH_DATA = {
    player : {
        x : SETTING.BASE_HEIGHT / 2,
        y : SETTING.PLAYER_PLACE_OFFSET,
    },
    opponent : {
        y : SETTING.BASE_HEIGHT / 2,
        x : SETTING.BASE_WIDTH - SETTING.PLAYER_PLACE_OFFSET,
    },
    ball : {
        y : SETTING.BASE_HEIGHT /2,
        x : SETTING.BASE_WIDTH / 2,
    },
    playerScore : 0,
    opponentScore : 0,
    currenMoveSpeed : 2
    // state : , player : { , } , score {}https://github.com/login?client_id=01ab8ac9400c4e429b23&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D01ab8ac9400c4e429b23%26prompt%3Dselect_account%26redirect_uri%3Dhttps%253A%252F%252Fvscode.dev%252Fredirect%26scope%3Duser%253Aemail%26state%3Dvscode%25253A%25252F%25252Fvscode.github-authentication%25252Fdid-authenticate%25253Fnonce%25253D5d1c9dd15552a4fa%252526windowId%25253D3
}


function scaleValue(canvasToScaleIn, value)
{
let widthRatio = canvasToScaleIn.width / SETTING.BASE_WIDTH;
let heightRatio = canvasToScaleIn.height / SETTING.BASE_HEIGHT;
let Drawratio = value * Math.min(widthRatio, heightRatio);
// console.log(Drawratio);
return Drawratio;
}

class Circle {
    constructor(canvas, x, y, rad, color, image, arcFrom, arcTo, imageOffset){
        this.canvas = canvas;
        this.ctx = canvas.getContext(SETTING.CANVAS_CONTEXT);
        this.posX = x;
        this.posY = y;
        this.rad = rad;
        this.StrokeColor = color;
        this.image = image;
        this.arcFrom = 0;
        this.arcTo = arcTo;
        this.arcFrom = arcFrom;
        this.imageOffset =imageOffset;
    }

    getDistanceTo(other) {
        const dx = other.posX - this.posX;
        const dy = other.posY - this.posY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    draw(){
        let radToDraw = scaleValue(this.canvas, this.rad);
        let xToDraw = scaleValue(this.canvas, this.posX);
        let yToDraw = scaleValue(this.canvas, this.posY);
        this.ctx.beginPath();
        this.ctx.arc(xToDraw, yToDraw, radToDraw, this.arcFrom, this.arcTo); // full circle
        this.ctx.strokeStyle = this.StrokeColor;
        this.ctx.lineWidth = SETTING.STROKE_SIZE;
        this.ctx.stroke();
        let imageToDraw = new Image();
        imageToDraw.src = this.image;
        this.ctx.drawImage(imageToDraw, xToDraw - radToDraw, yToDraw - radToDraw, (radToDraw  * 2) , (radToDraw  * 2 ) );
    }

    update()
    {
        this.draw();
    }
}

class PongBall extends Circle {
    constructor(canvas) {
        super(canvas, 
            SETTING.BASE_WIDTH / 2, 
            SETTING.BASE_HEIGHT / 2, 
            SETTING.PONGBALL_RAD,
            SETTING.PONGBALL_COLOR, 
            SETTING.PONGBALL_IMG, 0, 0, 0);
        
        this.axisSpeed = {
            x : 2,
            y : 2
        }
    }

    reflect(paddle) {
        let dx = this.posX - paddle.posX;
        let dy = this.posY - paddle.posY;

        let mag = Math.sqrt(dx * dx + dy * dy);
        let nx = dx / mag;
        let ny = dy / mag;

        let overlap = this.rad + paddle.rad - mag;
        this.posX += nx * overlap;
        this.posY += ny * overlap;

        const dotProduct = this.axisSpeed.x * nx + this.axisSpeed.y * ny;
        this.axisSpeed.x -= 2 * dotProduct * nx;
        this.axisSpeed.y -= 2 * dotProduct * ny;
    }

    update()
    {
        // let scaleRad = scaleValue(this.canvas, SETTING, this.rad);
        let scaleRad = this.rad;
        if (this.posX + scaleRad >= SETTING.BASE_WIDTH || this.posX - scaleRad <= 0) 
            this.axisSpeed.x *= -1;
        if (this.posY + scaleRad >= SETTING.BASE_HEIGHT || this.posY - scaleRad <= 0) 
            this.axisSpeed.y *= -1;
        this.posX += this.axisSpeed.x;
        this.posY += this.axisSpeed.y;
        super.update();
    }
}

class Paddle extends Circle {
    constructor(canvas, posX, posY, image, side)
    {
        super(canvas, posX, posY, SETTING.PLAYER_RAD, "black", image, 0, 0, 0);
    }
}

class PongGame
{
    constructor(canvasElement, opponent)
    {
        this.canvasElement = canvasElement;
        this.player = new Paddle(this.canvasElement, 50, SETTING.BASE_HEIGHT / 2, SETTING.PLAYER_IMG);
        this.opponent = new Paddle(this.canvasElement, SETTING.BASE_WIDTH - 50, SETTING.BASE_HEIGHT / 2, SETTING.OPPONENT_IMG);
        this.ball = new PongBall(this.canvasElement);
        this.keyState = {
            UP: false, 
            DOWN: false, 
            W: false, 
            S: false
        };

        this.ctx = canvasElement.getContext(SETTING.CANVAS_CONTEXT);
    }

    incressGame_speed() {
        MATCH_DATA.currenMoveSpeed += 0.005;

        if (this.ball.axisSpeed.x > 0)
            this.ball.axisSpeed.x = MATCH_DATA.currenMoveSpeed;
        else
            this.ball.axisSpeed.x = MATCH_DATA.currenMoveSpeed * -1;
        if (this.ball.axisSpeed.y > 0)
            this.ball.axisSpeed.y = MATCH_DATA.currenMoveSpeed;
        else
            this.ball.axisSpeed.y = MATCH_DATA.currenMoveSpeed * -1;
    }

    detectKeyAndAdjustPosition() {
        if (this.keyState.UP) 
            this.player.posY -= MATCH_DATA.currenMoveSpeed + 5;
        if (this.keyState.DOWN) 
            this.player.posY += MATCH_DATA.currenMoveSpeed + 5;
        if (this.keyState.W) 
            this.opponent.posY -= MATCH_DATA.currenMoveSpeed + 5;
        if (this.keyState.S) 
            this.opponent.posY += MATCH_DATA.currenMoveSpeed + 5;
        if (this.player.posY - this.player.rad < 0) 
            this.player.posY = this.player.rad;
        if (this.player.posY + this.player.rad > SETTING.BASE_HEIGHT) 
            this.player.posY = SETTING.BASE_HEIGHT - this.player.rad;
        if (this.opponent.posY - this.opponent.rad < 0)
            this.opponent.posY = this.opponent.rad;
        if (this.opponent.posY + this.opponent.rad > SETTING.BASE_HEIGHT)
            this.opponent.posY = SETTING.BASE_HEIGHT - this.opponent.rad;
        if (this.ball.getDistanceTo(this.player) < this.ball.rad + this.player.rad) 
            this.ball.reflect(this.player);
        if (this.ball.getDistanceTo(this.opponent) < this.ball.rad + this.opponent.rad) 
            this.ball.reflect(this.opponent);

    }

    drawScoreBoard(){
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "black";
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvasElement.width / 2, 0);
        this.ctx.lineTo(this.canvasElement.width / 2, this.canvasElement.height);
        this.ctx.stroke();
        this.ctx.font = `bold italic ${scaleValue(this.canvasElement, 50)}px Arial`;
        this.ctx.fillText(`${MATCH_DATA.opponentScore}`, this.canvasElement.width / 2 + (scaleValue(this.canvasElement,125)) , scaleValue(this.canvasElement,100));
        this.ctx.fillText(`${MATCH_DATA.playerScore}`, this.canvasElement.width / 2 - (scaleValue(this.canvasElement,150)) , scaleValue(this.canvasElement,100));
    }

    detectBallAndUpdateScore()
    {

        this.drawScoreBoard();
        if (this.ball.posX - this.ball.rad < SETTING.PLAYER_PLACE_OFFSET- 40)
            {

                console.log("player 2 win");
                this.ball.posX = SETTING.BASE_WIDTH / 2;
                this.ball.posY = SETTING.BASE_HEIGHT / 2;
                this.ball.axisSpeed.x = 2 * Math.round(Math.random()) ? 1 : -1 ;
                this.ball.axisSpeed.y = 2 * Math.round(Math.random()) ? 1 : -1;
                MATCH_DATA.currenMoveSpeed = 2;
                MATCH_DATA.opponentScore += 1;
                
            }
            else if (this.ball.posX + this.ball.rad > SETTING.BASE_WIDTH - SETTING.PLAYER_PLACE_OFFSET + 40)
            {
                console.log("player 1 win");
                this.ball.posX = SETTING.BASE_WIDTH / 2;
                this.ball.posY = SETTING.BASE_HEIGHT / 2;
                this.ball.axisSpeed.x = 2 * Math.round(Math.random()) ? 1 : -1;
                this.ball.axisSpeed.y = 2 * Math.round(Math.random()) ? 1 : -1;
                MATCH_DATA.currenMoveSpeed = 2;
                MATCH_DATA.playerScore += 1;
                
            }
    }

    start()
    {

        this.detectKeyAndAdjustPosition();
        this.incressGame_speed();
        // this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
        this.detectBallAndUpdateScore();
        this.player.update();
        this.opponent.update();
        this.ball.update();
        requestAnimationFrame(() => this.start());
    }
}

var canvasss = document.getElementById("pong-game");
var game = new PongGame(canvasss , "eiei")

//when prees key
document.addEventListener("keydown", (e) => {
e.preventDefault();
console.log(e.key);
if (e.key === "ArrowUp")
    game.keyState.UP = true;
if (e.key === "ArrowDown")
    game.keyState.DOWN = true;
if (e.key === "w")
    game.keyState.W = true;
if (e.key === "s")
    game.keyState.S = true;
});
// when key up
document.addEventListener("keyup", (e) => {
e.preventDefault();
console.log(e.key);
if (e.key === "ArrowUp")
    game.keyState.UP = false;
if (e.key === "ArrowDown")
    game.keyState.DOWN = false;
if (e.key === "w")
    game.keyState.W = false;
if (e.key === "s")
    game.keyState.S = false;
if (e.key === " ")
    console.log("SPACE");
}); 

function resizeCanvas() {
    const container = canvasss.parentElement;
    const targetAspectRatio = SETTING.BASE_WIDTH / SETTING.BASE_HEIGHT;

    // Get container dimensions
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const containerRatio = containerWidth / containerHeight;

    let newWidth, newHeight;

    if (containerRatio > targetAspectRatio) {
        // Container is wider than needed
        newHeight = containerHeight;
        newWidth = newHeight * targetAspectRatio;
    } else {
        // Container is taller than needed
        newWidth = containerWidth;
        newHeight = newWidth / targetAspectRatio;
    }

    // Set canvas size
    canvasss.width = newWidth;
    canvasss.height = newHeight;

    // Update CSS to prevent blurriness
    canvasss.style.width = `${newWidth}px`;
    canvasss.style.height = `${newHeight}px`;
}

//when element are resize resize 
window.onload = resizeCanvas;
window.onresize  = resizeCanvas;

game.start();