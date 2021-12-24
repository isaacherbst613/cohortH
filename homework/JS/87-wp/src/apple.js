import { THING_SIZE } from "./consts.js";


export default class Apple {
    constructor(game, appleImg) {
        this.canvas = game.canvas;
        this.ctx = game.ctx;
        this.snake = game.snake;
        this.appleImg = appleImg;
        this.move();

    }

    draw() {
        this.ctx.drawImage(this.appleImg, this.x, this.y, THING_SIZE, THING_SIZE);
    }

    move() {
        this.x = this.getRandomNumber(0, this.canvas.width - 1);
        this.y = this.getRandomNumber(0, this.canvas.height - 1);

        //if the apple is on the snake, re-move it
        for (let i = 0; i < this.snake.parts.length; i++) {
            if (this.x === this.snake.parts[i].x && this.y === this.snake.parts[i].y) {
                this.move();
            }
        }
        this.draw();
    }

    getRandomNumber(min, max) {
        let r = Math.floor(Math.random() * (max - min + 1)) + min;
        r = r - r % THING_SIZE;
        return r;
    }
}