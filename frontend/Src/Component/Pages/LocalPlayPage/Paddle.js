export class Paddle extends Circle {
    constructor(canvas, posX, posY, image, side)
    {
        super(canvas, posX, posY, SETTING.PLAYER_RAD, "black", image, 0, 0, 0);
    }
}