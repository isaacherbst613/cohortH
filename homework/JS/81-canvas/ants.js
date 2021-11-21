//(function () {
'use strict';

const canvas = document.getElementById('canvas');

/*    function resizeCanvas() {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
   } */



window.addEventListener('resize', resizeCanvas(canvas));
resizeCanvas(canvas);

const ctx = canvas.getContext('2d');

class Ant {
    constructor(color, x, y, rad=4) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.length = rad*2;
        this.dx = getRandSpacer();
        this.dy = getRandSpacer();

        setInterval(this.changeDirection.bind(this), getRandomNumber());


    }

    draw() {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
        if (this.dx !== 0 && this.dy === 0) {//moving right or left
            ctx.arc(this.x + this.rad +1, this.y, this.rad, 0, Math.PI * 2);
        } else if (this.dx === 0 && this.dy !== 0) {//moving up or down
            ctx.arc(this.x, this.y + this.rad+1, this.rad, 0, Math.PI * 2);
        } else if (this.dx === this.dy) {//moving /
            ctx.arc(this.x + this.rad, this.y + this.rad, this.rad, 0, Math.PI * 2);
        } else if (this.dx !== 0 && this.dy !== 0 && this.dx !== this.dy) {//moving \
            ctx.arc(this.x + this.rad, this.y - this.rad, this.rad, 0, Math.PI * 2);
        }

        ctx.fillStyle = this.color;
        ctx.fill();

        this.x += this.dx;
        this.y += this.dy;

        //turn around at screen edges ///buggy
        if (this.y < this.length || this.y > (canvas.height - this.length)) {
            this.dy = -this.dy;
        }
        if (this.x < this.length || this.x > (canvas.width - this.length)) {
            this.dx = -this.dx;
        }
    }

    changeDirection() {
        this.dx = getRandSpacer();
        this.dy = getRandSpacer();
    }

}

const ants = [];

const colInput = document.getElementById('color');
const amnt = document.getElementById('numOfAnts');
document.getElementById('addAnts').addEventListener('click', function (e) {
    e.preventDefault();
    for (let i = 0; i < amnt.value; i++) {
        const ant = new Ant(colInput.value, canvas.width / 2 + (Math.random() * 100), canvas.height / 2 + (Math.random() * 100));
        ants.changeDirection;
        ants.push(ant);
    }
});




const def = get('default');
const fast = get('fast');
const slow = get('slow');
let int = setInterval(drawer, 50);

def.addEventListener('click', function () {
    setInt(50);
});

fast.addEventListener('click', function () {
    setInt(16);
});

slow.addEventListener('click', function () {
    setInt(100);
});

function setInt(speed) {
    clearInterval(int);
    int = setInterval(drawer, speed);
}





function getRandSpacer() {
    if (Math.random() > 0.666) {
        return 1;
    } else if (Math.random() > 0.333) {
        return -1;
    } else {
        return 0;
    }
}

function drawer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ants.forEach(ant => {
        ant.draw();
    });
}

function getRandomNumber() {
    return Math.floor(Math.random() * 10000 + 3000);//3-10 seconds
}


//food
const fcanvas = document.getElementById('food');
window.addEventListener('resize', resizeCanvas(fcanvas));//so you shouldn't have to redraw the food with every ant redraw
resizeCanvas(fcanvas);

const fctx = fcanvas.getContext('2d');

class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = getRandomColor();
    }
    draw() {
        fctx.fillStyle = this.color;
        fctx.fillRect(this.x, this.y, 5, 5);
    }

}

const food = [];
for (let i = 0; i < (Math.random() * 20); i++) {
    const morsel = new Food(Math.random() * canvas.width - 5, Math.random() * canvas.height - 5);
    food.push(morsel);
}

food.forEach(food => {
    food.draw();
    console.log(food);
});


// //when ant touches food
// function checkCollision(ant, food) {
//     if (ant.x === food.x && ant.y === food.y) {
//         ant.rad = ant.rad + 1;
//     }
// }



function get(elem) {
    return document.getElementById(elem);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}




//}());