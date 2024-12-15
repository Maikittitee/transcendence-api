
function scaleValue(canvasToScaleIn, value)
{
    let widthRatio = canvasToScaleIn.width / 800;
    let heightRatio = canvasToScaleIn.height / 400;
    let Drawratio = value * Math.min(widthRatio, heightRatio);
    // console.log(Drawratio);
    return Drawratio;
}

function resizeCanvas(element) {
    let container = element.parentElement;
    let targetAspectRatio = 800 / 400;
    
    let containerWidth = container.clientWidth;
    let containerHeight = container.clientHeight;
    let containerRatio = containerWidth / containerHeight;
    
    let newWidth, newHeight;
    
    if (containerRatio > targetAspectRatio) {
        newHeight = containerHeight;
        newWidth = newHeight * targetAspectRatio;
    } else {
        newWidth = containerWidth;
        newHeight = newWidth / targetAspectRatio;
    }
    
    element.width = newWidth;
    element.height = newHeight;
    
    element.style.width = `${newWidth}px`;
    element.style.height = `${newHeight}px`;
}

class CircleObject
{
    constructor(canvas, x, y, radius, color, image)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.image = image;
    }

    draw()
    {
        let radToDraw = scaleValue(this.canvas, this.radius);
        let xToDraw = scaleValue(this.canvas, this.posX);
        let yToDraw = scaleValue(this.canvas, this.posY);
        // this.ctx.beginPath();
        let imageToDraw = new Image();
        imageToDraw.src = this.image;
        this.ctx.drawImage(imageToDraw, xToDraw - radToDraw, yToDraw - radToDraw, (radToDraw  * 2) , (radToDraw  * 2 ) );
        // this.ctx.arc(xToDraw, yToDraw, radToDraw, 0, Math.PI * 2); // full circle
        // this.ctx.strokeStyle = this.color;
        // this.ctx.lineWidth = 2;
        // this.ctx.stroke();
    }
}

class PongGame
{
    constructor(ParentElement ,elementName)
    {
        this.parentElement = document.getElementById(ParentElement);
        this.canvas = document.getElementById(elementName);
        this.dataBox = document.getElementById("data");
        this.ctx = this.canvas.getContext('2d');
        this.settingData = null;
        this.currentState = null;
        this.webSocketConnection = null;
        this.init();
        this.key = {
            "UP" : false,
            "DOWN" : false,
        }
        this.game_id = null;
    }

    scaleValue(canvasToScaleIn, value)
    {
        let widthRatio = canvasToScaleIn.width / this.settingData.baseWidth;
        let heightRatio = canvasToScaleIn.height / this.settingData.baseHeight;
        let Drawratio = value * Math.min(widthRatio, heightRatio);
        return Drawratio;
    }

    putbutton()
    {
        let button = document.createElement("button");
        button.textContent = "start_match";
        button.onclick = () => {
            this.webSocketConnection.send(JSON.stringify({
                "type": "queue"
            }));
            this.webSocketConnection.send(JSON.stringify({
                "type": "connected"
            }));

            button.remove();
            this.run();
        }
        this.parentElement.appendChild(button);
    }

    init()
    {
        this.setUpWebsocket();
        resizeCanvas(this.canvas);
        this.putbutton();
    }

    draw()
    {
        if (this.currentState != null)
        {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            let leftPaddle = new CircleObject(this.canvas,
                this.currentState.paddles.left.x, 
                this.currentState.paddles.left.y, 
                this.currentState.paddles.left.radius, "red",
                playerPicUrl
            );
            let rightPaddle = new CircleObject(this.canvas,
                this.currentState.paddles.right.x, 
                this.currentState.paddles.right.y, 
                this.currentState.paddles.right.radius, "blue",
                opponentPicUrl
                );
            let ball = new CircleObject(this.canvas, 
                this.currentState.ball.x , 
                this.currentState.ball.y , 
                this.currentState.ball.radius, "green",
                ballPicUrl);
        
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = "black";
            this.ctx.beginPath();
            this.ctx.moveTo(this.canvas.width / 2, 0);
            this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
            this.ctx.stroke();
            leftPaddle.draw();
            rightPaddle.draw();
            ball.draw();
        }
        // else if (this.settingData != null && this.currentState == null)
        // {
        //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //     let leftPaddle = new CircleObject(this.canvas,this.settingData.paddlePos.x, this.settingData.paddlePos.y, this.settingData.paddleRadius, "red");
        //     this.ctx.lineWidth = 2;
        //     this.ctx.strokeStyle = "black";
        //     this.ctx.beginPath();
        //     this.ctx.moveTo(this.canvas.width / 2, 0);
        //     this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
        //     this.ctx.stroke();
        //     this.ctx.font = `bold italic ${scaleValue(this.canvas, 20)}px Arial`;
        //     this.ctx.fillText("waiting for opponent", this.canvas.width / (scaleValue(this.canvas,150)) , scaleValue(this.canvas,100));
        //     leftPaddle.draw();
        //     rightPaddle.draw();
        //     ball.draw();
        // }
    }

    setUpWebsocket()
    {
        this.webSocketConnection = new WebSocket(`ws://${window.location.host}/ws/matchmaking/`);
        this.webSocketConnection.onopen = function() {
            console.log("connected");
        }

        this.webSocketConnection.onmessage = (e) => {
            let recieveData =  JSON.parse(e.data);
            console.log(recieveData);
            this.dataBox.innerHTML = e.data + "\nKey up : " + this.key.UP+ "\nKey Down : " + this.key.DOWN;
            if (recieveData.type === "connected") {
                console.log(`connected with ${recieveData.playerID}`);
            }
            if (recieveData.type === "game_setting") {
                this.settingData = recieveData.setting;
                console.log(`game_setting recieve`);
            }
            if (recieveData.type === "queue_ready") {
                console.log("queue_ready");
            }
            if (recieveData.type === "waiting") {
                console.log("connected");
            }

            if (recieveData.type === "game_start") {
                console.log("game_start");
                this.webSocketConnection.send(JSON.stringify({
                    "type": "game_start",
                    "game_id": recieveData.game_id
                }));
            }
            if (recieveData.type === "game_state") {
                this.game_id = recieveData.game_id;
                this.currentState = recieveData.state;

            }
        }

    }


    eventListener()
    {
        document.addEventListener('keydown', (e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") 
            {
                e.preventDefault();
            }

            if(e.key === "ArrowUp")
            {
                this.key.UP = true;
            }
            if(e.key === "ArrowDown")
            {
                this.key.DOWN = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") 
            {
                e.preventDefault();
            }

            if(e.key === "ArrowUp")
            {
                this.key.UP = false;
            }
            if(e.key === "ArrowDown")
            {
                this.key.DOWN = false;
            }
        });
    }

    run()
    {
        this.eventListener();
        this.webSocketConnection.send(JSON.stringify({
            "type": "player_input",
            "game_id": this.game_id,
            "inputs": this.key
        }));
        this.draw();
        requestAnimationFrame(this.run.bind(this));
    }
}

let pongGame = new PongGame('pong','pong-game');