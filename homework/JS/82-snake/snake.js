(function () {
    'use strict';

    const canvas = document.getElementById('canvas');

    const THING_SIZE = 30;
    let speed = 250;
    let score = 0;
    let level = 1;
    let levelUP = false;
    let gameOver = false;
    let border = 2;

    function resizeCanvas() {
        canvas.width = (window.innerWidth - border) - ((window.innerWidth - border) % THING_SIZE);
        canvas.height = (window.innerHeight - border) - ((window.innerHeight - border) % THING_SIZE);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    const ctx = canvas.getContext('2d');
    const crunch = new Audio('crunch.mp3');
    const crash = new Audio('crash.mp3');



    class Snake {
        constructor() {
            let midX = canvas.width / 2;
            let midY = canvas.height / 2;
            this.x = midX - midX % THING_SIZE;
            this.y = midY - midY % THING_SIZE;
            this.parts = [{ x: this.x, y: this.y }];
            this.direction = 'ArrowRight';
            this.backwards = 'ArrowLeft'


            document.addEventListener('keydown', (event) => {
                console.log(event.key, this.direction);
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
            ctx.drawImage(snakeHead, this.x, this.y, THING_SIZE, THING_SIZE);

            for (let i = 0; i < this.parts.length; i++) {
                ctx.drawImage(snakeBody, this.parts[i].x, this.parts[i].y, THING_SIZE, THING_SIZE);

                //while your redrawing anyway, you can use this to check if you have hit yourself
                if (this.x === this.parts[i].x && this.y === this.parts[i].y) {
                    gameOver = true;
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

            if (x < 0 || x > canvas.width - THING_SIZE || y < 0 || y > canvas.height - THING_SIZE) {
                if (level === 3) {
                    gameOver = true;
                } else {
                    if (x < 0) { this.x = (canvas.width - THING_SIZE); }
                    else if (x > canvas.width - THING_SIZE) { this.x = 0; }
                    if (y < 0) { this.y = (canvas.height - THING_SIZE); }
                    else if (y > canvas.height - THING_SIZE) { this.y = 0; }
                }
            } else {
                this.x = x;
                this.y = y;
            }

            //if you eat the food
            if (this.x === apple.x && this.y === apple.y) {
                score++;
                if (score % 5 === 0) {
                    level++;
                    speed = speed * 0.85;
                    levelUP = true;
                }

                crunch.currentTime = 0;
                crunch.play();
                apple.move();
                this.parts.push({ x: this.x + THING_SIZE * this.length, y: this.y });
            }

            this.draw();
        }
        moveBody() {
            this.parts.pop();
            this.parts.unshift({ x: this.x, y: this.y });
        }

    }

    class Apple {
        constructor() {
            this.move();//fix it shouldn't land on snake
        }

        draw() {
            ctx.drawImage(appleImg, this.x, this.y, THING_SIZE, THING_SIZE);
        }

        move() {
            this.x = this.getRandomNumber(0, canvas.width - 1);
            this.y = this.getRandomNumber(0, canvas.height - 1);

            //if the apple is on the snake, re-move it
            for (let i = 0; i < snake.parts.length; i++) {
                if (this.x === snake.parts[i].x && this.y === snake.parts[i].y) {
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
    let apple;
    let snake = new Snake();



    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = '25px Arial';
        ctx.fillText(`Score: ${score}`, 10, 20);
        ctx.font = '20px Arial';
        ctx.fillText(`level: ${level}`, 10, 50);

        if (levelUP) {
            ctx.font = '50px Arial';
            ctx.strokeText('Speed UP!!!', canvas.width / 2 - 100, canvas.height / 2);
            if (level === 3) {
                ctx.strokeText('NOTICE BORDERS!!', canvas.width / 2 - 180, canvas.height / 2 + 100);
            }
            setTimeout(() => {
                levelUP = false;
            }, 3000);
        }
        if (level >= 3) {
            canvas.style.border = '3px solid black';
            border = 6;
        }


        apple.draw();
        snake.move();
        snake.moveBody();
        if (!gameOver) {
            setTimeout(gameLoop, speed);
        } else {
            crash.play();
            ctx.font = '50px Arial';
            ctx.fillStyle = 'red';
            ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        }
    }



    const snakeHead = new Image();

    snakeHead.src = 'snakeHead.png';
    snakeHead.onload = () => {
        snake = new Snake();
        setTimeout(gameLoop, speed);
    };

    const snakeBody = new Image();
    snakeBody.src = 'snakeBody.png';

    const appleImg = new Image();
    appleImg.src = 'apple.png';
    appleImg.onload = () => {
        apple = new Apple();
    };



}());