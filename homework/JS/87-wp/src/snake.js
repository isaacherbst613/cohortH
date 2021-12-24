import { THING_SIZE } from "./consts.js";

export default class Snake {
    constructor(game, snakeHead, snakeBody) {
        this.game = game;
        this.canvas = game.canvas;
        this.ctx = game.ctx;
        let midX =  this.canvas.height/2;
        let midY = this.canvas.width/2;
        this.x = midX - midX % THING_SIZE;
        this.y = midY - midY % THING_SIZE;
        this.parts = [{ x: this.x, y: this.y }];
        this.snakeHead = snakeHead;
        this.snakeBody = snakeBody;
        this.direction = 'ArrowRight';
        this.backwards = 'ArrowLeft'


        document.addEventListener('keydown', (event) => {
            if (event.key !== this.backwards) {
                switch (event.key) {
                    case 'ArrowUp':
                        this.backwards = 'ArrowDown';
                        this.direction = event.key;
                        break;
                    case 'ArrowDown':
                        this.backwards = 'ArrowUp';
                        this.direction = event.key;
                        break;
                    case 'ArrowLeft':
                        this.backwards = 'ArrowRight';
                        this.direction = event.key;
                        break;
                    case 'ArrowRight':
                        this.backwards = 'ArrowLeft';
                        this.direction = event.key;
                        break;
                }
            }
        });

    }

    draw() {
        this.ctx.drawImage(this.snakeHead, this.x, this.y, THING_SIZE, THING_SIZE);

        for (let i = 0; i < this.parts.length; i++) {
            this.ctx.drawImage(this.snakeBody, this.parts[i].x, this.parts[i].y, THING_SIZE, THING_SIZE);

            //while your redrawing anyway, you can use this to check if you have hit yourself
            if (this.x === this.parts[i].x && this.y === this.parts[i].y) {
                this.game.gameOver = true;
            }
        }

    }

    move() {
        let x = this.x;
        let y = this.y;

        switch (this.direction) {
            case 'ArrowUp':
                y -= THING_SIZE;
                break;
            case 'ArrowDown':
                y += THING_SIZE;
                break;
            case 'ArrowLeft':
                x -= THING_SIZE;
                break;
            case 'ArrowRight':
                x += THING_SIZE;
                break;
        }

        if (x < 0 || x > this.canvas.width - THING_SIZE || y < 0 || y > this.canvas.height - THING_SIZE) {
            if (this.game.level === 3) {
                this.game.gameOver = true;
            } else {
                if (x < 0) { this.x = (this.canvas.width - THING_SIZE); }
                else if (x > this.canvas.width - THING_SIZE) { this.x = 0; }
                if (y < 0) { this.y = (this.canvas.height - THING_SIZE); }
                else if (y > this.canvas.height - THING_SIZE) { this.y = 0; }
            }
        } else {
            this.x = x;
            this.y = y;
        }


        this.draw();
    }
    moveBody() {
        this.parts.pop();
        this.parts.unshift({ x: this.x, y: this.y });
    }

}
