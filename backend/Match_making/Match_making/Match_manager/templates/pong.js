const  SETTING = {
        CONVAS_ID : "pong-game",
        CANVAS_CONTEXT : "2d",
        BASE_WIDTH : 800,
        BASE_HEIGHT : 400,
        PLAYER_PLACE_OFFSET : 50,
        PONGBALL_IMG : "./ball.png",
        PONGBALL_COLOR : "red",
        PONGBALL_RAD : 10, 
        PLAYER_RAD : 30,
        PLAYER_IMG : "./player.png",
        OPPONENT_IMG : "./opponent.png",
        STROKE_SIZE : 0
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

class PongGame
{
    constructor(canvasElement)
    {
        this.canvasElement = canvasElement;
        this.player = new Paddle(this.canvasElement, 50, SETTING.BASE_HEIGHT / 2, SETTING.PLAYER_IMG);
        this.opponent = new Paddle(this.canvasElement, SETTING.BASE_WIDTH - 50, SETTING.BASE_HEIGHT / 2, SETTING.OPPONENT_IMG);
        this.ball = new PongBall(this.canvasElement);
        this.keyState = {
            UP: false, 
            DOWN: false, 
        };
        this.playerIDID = ""
        this.ctx = canvasElement.getContext(SETTING.CANVAS_CONTEXT);
        
    }
    setupWebSocket() {
        this.socket = new WebSocket(
            `ws://${window.location.host}/ws/matchmaking/`
        );
        this.socket.onopen = () => {console.log("ws connection establish")}

        this.socket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            console.log(data);
            switch(data.type) {
                case 'connected' :
                    this.playerID = data.playerID;
                    console.log(this.playerID);


                case 'game_state':
                    console.log("here\n\n\n\n")
                    break;
                case 'game_over':
                    console.log("game over");
                    break;
                case 'error':
                    console.error('Game error:', data.message);
                    break;
                default :
                    console.log(data);
                }
            };
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

    start()
    {
        drawBackground();
        this.detectBallAndUpdateScore();
        this.player.update();
        this.opponent.update();
        this.ball.update();
        requestAnimationFrame(() => this.start());
    }
}

var canvasss = document.getElementById("pong-game");
var game = new PongGame(canvasss)



function drawBackground() {
    let ctx = canvasss.getContext('2d');
    let bgImage = new Image();
    bgImage.src = "BG.png"; // Your background image path
        let scale = Math.max(
            canvasss.width / bgImage.width,
            canvasss.height / bgImage.height
        );

        // Calculate position to center the image
        let x = (canvasss.width - bgImage.width * scale) / 2;
        let y = (canvasss.height - bgImage.height * scale) / 2;

        // Draw scaled background
        ctx.drawImage(
            bgImage,
            x, y,
            bgImage.width * scale,
            bgImage.height * scale
        );
    // };
}

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


