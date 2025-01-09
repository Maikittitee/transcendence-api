import { Component } from "../../Component.js";

const name = "game-play-page";

const componentStyle = `
    #pong {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: calc(100vw / 2);
        max-height: 100vh;
        max-width: calc(100vh * 2);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(255, 255, 255, 0.5);
    }
    #pong button {
        padding: 10px;
        font-size: 20px;
        align-self: center;
        position: absolute;
    }
    #pong-game {
        width: 100%;
        height: 100%;
    }
`;

export class GamePlayPage extends Component { 
  constructor() {
    super(componentStyle);
  }

  render() {
    return ` 
    <div id='pong'>
        <canvas id="pong-game"></canvas>
    </div>
    <p id="data"></p>
    `;
  }

  postCreate() {

    function scaleValue(canvasToScaleIn, value)
    {
        let widthRatio = canvasToScaleIn.width / 800;
        let heightRatio = canvasToScaleIn.height / 400;
        let Drawratio = value * Math.min(widthRatio, heightRatio);
        return Drawratio;
    }
    
    function resizeCanvas(element) {
        console.log(`element width : ${element.width} element height : ${element.height}`);
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
            this.imageObj = new Image();
            this.imageObj.src = this.image;
            this.imageObj.onload = () => {
                this.draw();
            }
            this.animationFrame = null;
        }
    
        draw()
        {
            let radToDraw = scaleValue(this.canvas, this.radius);
            let xToDraw = scaleValue(this.canvas, this.posX);
            let yToDraw = scaleValue(this.canvas, this.posY);
            console.log(`x : ${xToDraw} y : ${yToDraw} rad : ${radToDraw}`);
            this.ctx.drawImage(this.imageObj, xToDraw - radToDraw, yToDraw - radToDraw, (radToDraw  * 2) , (radToDraw  * 2 ) );
            this.ctx.beginPath();
            this.ctx.arc(xToDraw, yToDraw, radToDraw, 0, Math.PI * 2);
            this.ctx.strokeStyle = this.color;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
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
            this.leftPaddle = null;
            this.rightPaddle = null;
            this.ball = null;

            this.init();
            this.key = {
                "UP" : false,
                "DOWN" : false,
            }
        }
    
        putbutton()
        {
            let button = document.createElement("button");
            button.classList.add("btn", "btn-success");
            button.textContent = "~Ready!~";
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
    
        initGameAssets()
        {
            var playerPicUrl = window.Images.getFile("player.png");
            var opponentPicUrl = window.Images.getFile("opponent.png");
            var ballPicUrl = window.Images.getFile("ball.png");
            this.leftPaddle = new CircleObject(this.canvas,
                50, 
                this.canvas.height / 2, 
                this.settingData.paddleRadius, "red",
                playerPicUrl
            );
            this.rightPaddle = new CircleObject(this.canvas,
                this.canvas.width - 50, 
                this.canvas.height / 2, 
                this.settingData.paddleRadius, "blue",
                opponentPicUrl
            );
            this.ball = new CircleObject(this.canvas, 
                this.canvas.width / 2, 
                this.canvas.height / 2, 
                this.settingData.ballRadius, "green",
                ballPicUrl
            );
            this.ball.draw();
            this.leftPaddle.draw();
            this.rightPaddle.draw();
        }

        draw()
        {

            if (this.currentState != null)
            {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = "black";
                this.ball.posX = this.currentState.ball.x;
                this.ball.posY = this.currentState.ball.y;
                this.leftPaddle.posY = this.currentState.paddles.left.y;
                this.leftPaddle.posX = this.currentState.paddles.left.x;
                this.rightPaddle.posY = this.currentState.paddles.right.y;
                this.rightPaddle.posX = this.currentState.paddles.right.x;
                this.ctx.beginPath();
                this.ctx.moveTo(this.canvas.width / 2, 0);
                this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
                this.ctx.stroke();
                this.leftPaddle.draw();
                this.rightPaddle.draw();
                this.ball.draw();
            }
        }
    
        cleanUpGame()
        {
            this.webSocketConnection.onmessage = function() {}
            this.webSocketConnection.onclose = function() {}
            this.webSocketConnection.close();
            cancelAnimationFrame(this.animationFrame);
        }

        setUpWebsocket()
        {
            this.webSocketConnection = new WebSocket(`ws://127.0.0.1:25566/ws/matchmaking/`);
            this.webSocketConnection.onopen = function() {
            }
    
            this.webSocketConnection.onmessage = (e) => {
                let recieveData =  JSON.parse(e.data);
                this.dataBox.innerHTML = e.data + "\nKey up : " + this.key.UP+ "\nKey Down : " + this.key.DOWN;

                if (recieveData.type === "player_disconnected") {
                    this.cleanUpGame();
                    console.log("Player Disconnected You Win");
                }

                if (recieveData.type === "connected") {

                }
                if (recieveData.type === "game_setting") {
                    this.settingData = recieveData.setting;
                    this.initGameAssets();
                }
                if (recieveData.type === "queue_ready") {
                }
                if (recieveData.type === "waiting") {
                }
    
                if (recieveData.type === "game_start") {
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

            document.addEventListener('popstate', () => {
                this.webSocketConnection.close();
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
            this.animationFrame = requestAnimationFrame(this.run.bind(this));
        }
    }
    
    let pongGame = new PongGame('pong','pong-game');
    window.addEventListener('resize', () => {
        resizeCanvas(pongGame.canvas);
    });
  }

}

customElements.define(name, GamePlayPage);