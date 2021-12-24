import Snake from './Snake.js';
import Apple from './Apple.js';
import { THING_SIZE, border } from './consts.js';
import redAppleImg from '../items/apple.png';
import snakeHeadImg from '../items/snakeHead.png';
import snakeBodyImg from '../items/snakeBody.png';
import crunchSound from '../items/crunch.mp3';
import crashSound from '../items/crash.mp3';


const canvas = document.getElementById('canvas');

const crunch = new Audio(crunchSound);
const crash = new Audio(crashSound);



const appleImg = new Image();
appleImg.src = redAppleImg;
const snakeHead = new Image();
snakeHead.src = snakeHeadImg;
const snakeBody = new Image();
snakeBody.src = snakeBodyImg;

function resizeCanvas() {
    canvas.width = (window.innerWidth - border) - ((window.innerWidth - border) % THING_SIZE);
    canvas.height = (window.innerHeight - border) - ((window.innerHeight - border) % THING_SIZE);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.speed = 250;
        this.score = 0;
        this.level = 1;
        this.levelUP = false;
        this.gameOver = false;
        this.ctx = canvas.getContext('2d');
        this.snake = new Snake(this, snakeHead, snakeBody);
        this.apple = new Apple(this, appleImg);
        this.gameLoop = this.gameLoop.bind(this);
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.font = '25px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 20);
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`level: ${this.level}`, 10, 50);

        if (this.levelUP) {
            this.ctx.font = '50px Arial';
            this.ctx.strokeText('Speed UP!!!', canvas.width / 2 - 100, canvas.height / 2);
            if (this.level === 3) {
                this.ctx.strokeText('NOTICE BORDERS!!', canvas.width / 2 - 180, canvas.height / 2 + 100);
            }
            setTimeout(() => {
                this.levelUP = false;
            }, 3000);
        }
        if (this.level >= 3) {
            canvas.style.border = '1px solid black';
        }

        //if snake eats the food
        if (this.snake.x === this.apple.x && this.snake.y === this.apple.y) {
            this.score++;
            if (this.score % 5 === 0) {
                this.level++;
                this.speed = this.speed * 0.85;
                this.levelUP = true;
            }

            crunch.currentTime = 0;
            crunch.play();
            this.apple.move();
            this.snake.parts.push({ x: this.snake.x + THING_SIZE * this.snake.length, y: this.snake.y });
        }


        this.apple.draw();
        this.snake.move(this.ctx, this.apple);
        this.snake.moveBody();
        if (!this.gameOver) {
            setTimeout(this.gameLoop, this.speed);
        } else {
            crash.play();
            this.ctx.font = '50px Arial';
            this.ctx.fillStyle = 'red';
            this.ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        }
    }

    run() {
        setTimeout(this.gameLoop, this.speed);
    }

}



let allLoaded = 0;
appleImg.onload = () => {
    startGame(++allLoaded);
};
snakeHead.onload = () => {
    startGame(++allLoaded);
};
snakeBody.onload = () => {
    startGame(++allLoaded);
};

function startGame(allLoaded) {
    if (allLoaded === 3) {
        const game = new Game(canvas);
        game.run();
    }
}



