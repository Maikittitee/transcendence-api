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

export class PongBall extends Circle {
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