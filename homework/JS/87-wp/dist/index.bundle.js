/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Apple.js":
/*!**********************!*\
  !*** ./src/Apple.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Apple)
/* harmony export */ });
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts.js */ "./src/consts.js");



class Apple {
    constructor(game, appleImg) {
        this.canvas = game.canvas;
        this.ctx = game.ctx;
        this.snake = game.snake;
        this.move();
        this.appleImg = appleImg;
    }

    draw() {
        this.ctx.drawImage(this.appleImg, this.x, this.y, _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE, _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE);
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
        r = r - r % _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE;
        return r;
    }
}

/***/ }),

/***/ "./src/Snake.js":
/*!**********************!*\
  !*** ./src/Snake.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Snake)
/* harmony export */ });
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts.js */ "./src/consts.js");


class Snake {
    constructor(game, snakeHead, snakeBody) {
        this.game = game;
        this.canvas = game.canvas;
        this.ctx = game.ctx;
        let midX =  this.canvas.height/2;
        let midY = this.canvas.width/2;
        this.x = midX - midX % _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE;
        this.y = midY - midY % _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE;
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
        this.ctx.drawImage(this.snakeHead, this.x, this.y, _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE, _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE);

        for (let i = 0; i < this.parts.length; i++) {
            this.ctx.drawImage(this.snakeBody, this.parts[i].x, this.parts[i].y, _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE, _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE);

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
                y -= _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE;
                break;
            case 'ArrowDown':
                y += _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE;
                break;
            case 'ArrowLeft':
                x -= _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE;
                break;
            case 'ArrowRight':
                x += _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE;
                break;
        }

        if (x < 0 || x > this.canvas.width - _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE || y < 0 || y > this.canvas.height - _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE) {
            if (this.game.level === 3) {
                this.game.gameOver = true;
            } else {
                if (x < 0) { this.x = (this.canvas.width - _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE); }
                else if (x > this.canvas.width - _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE) { this.x = 0; }
                if (y < 0) { this.y = (this.canvas.height - _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE); }
                else if (y > this.canvas.height - _consts_js__WEBPACK_IMPORTED_MODULE_0__.THING_SIZE) { this.y = 0; }
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


/***/ }),

/***/ "./src/consts.js":
/*!***********************!*\
  !*** ./src/consts.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "THING_SIZE": () => (/* binding */ THING_SIZE),
/* harmony export */   "border": () => (/* binding */ border),
/* harmony export */   "crunch": () => (/* binding */ crunch),
/* harmony export */   "crash": () => (/* binding */ crash)
/* harmony export */ });
const THING_SIZE = 30;
const border = 2;
const crunch = new Audio('./items/crunch.mp3');
const crash = new Audio('./items/crash.mp3');


/***/ }),

/***/ "./items/apple.png":
/*!*************************!*\
  !*** ./items/apple.png ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ee36aef46cccb1562e30.png";

/***/ }),

/***/ "./items/snakeBody.png":
/*!*****************************!*\
  !*** ./items/snakeBody.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b825afbb822bd80e5e5b.png";

/***/ }),

/***/ "./items/snakeHead.png":
/*!*****************************!*\
  !*** ./items/snakeHead.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "794c3bb91c8f8d51e9a8.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Snake_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Snake.js */ "./src/Snake.js");
/* harmony import */ var _Apple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Apple.js */ "./src/Apple.js");
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./consts.js */ "./src/consts.js");
/* harmony import */ var _items_apple_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../items/apple.png */ "./items/apple.png");
/* harmony import */ var _items_snakeHead_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../items/snakeHead.png */ "./items/snakeHead.png");
/* harmony import */ var _items_snakeBody_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../items/snakeBody.png */ "./items/snakeBody.png");








const canvas = document.getElementById('canvas');

const appleImg = new Image();
appleImg.src = _items_apple_png__WEBPACK_IMPORTED_MODULE_3__;
const snakeHead = new Image();
snakeHead.src = _items_snakeHead_png__WEBPACK_IMPORTED_MODULE_4__;
const snakeBody = new Image();
snakeBody.src = _items_snakeBody_png__WEBPACK_IMPORTED_MODULE_5__;


function resizeCanvas() {
    canvas.width = (window.innerWidth - _consts_js__WEBPACK_IMPORTED_MODULE_2__.border) - ((window.innerWidth - _consts_js__WEBPACK_IMPORTED_MODULE_2__.border) % _consts_js__WEBPACK_IMPORTED_MODULE_2__.THING_SIZE);
    canvas.height = (window.innerHeight - _consts_js__WEBPACK_IMPORTED_MODULE_2__.border) - ((window.innerHeight - _consts_js__WEBPACK_IMPORTED_MODULE_2__.border) % _consts_js__WEBPACK_IMPORTED_MODULE_2__.THING_SIZE);
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
        this.snake = new _Snake_js__WEBPACK_IMPORTED_MODULE_0__["default"](this, snakeHead, snakeBody);
        appleImg.onload = () => {
            this.apple = new _Apple_js__WEBPACK_IMPORTED_MODULE_1__["default"](this, appleImg);
          };
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

            _consts_js__WEBPACK_IMPORTED_MODULE_2__.crunch.currentTime = 0;
            _consts_js__WEBPACK_IMPORTED_MODULE_2__.crunch.play();
            this.apple.move();
            this.snake.parts.push({ x: this.snake.x + _consts_js__WEBPACK_IMPORTED_MODULE_2__.THING_SIZE * this.snake.length, y: this.snake.y });
        }


        this.apple.draw();
        this.snake.move(this.ctx, this.apple);
        this.snake.moveBody();
        if (!this.gameOver) {
            setTimeout(this.gameLoop, this.speed);
        } else {
            _consts_js__WEBPACK_IMPORTED_MODULE_2__.crash.play();
            this.ctx.font = '50px Arial';
            this.ctx.fillStyle = 'red';
            this.ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        }
    }

    run(){
        setTimeout(this.gameLoop, this.speed);
    }

}

snakeHead.onload = () => {
    const game = new Game(canvas);
    game.run();
  };




})();

/******/ })()
;
//# sourceMappingURL=index.bundle.js.map