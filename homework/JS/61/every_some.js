'use strict';

console.log('every_some.js');

let letters = ['a', 'B', 'c', 'd', 'E', 'F', 'g', 'h', 'I'];
let uppers = ['A', 'B', 'C'];
let lowers = ['a', 'b', 'c'];

// const isUpper = function(letter){
//     return letter === letter.toUpperCase();
// };
const isUpper = (letter) => letter === letter.toUpperCase();
const isLower = (letter) => letter === letter.toLowerCase();

function myEvery(arrays, callback) {
    for (let i = 0; i < arrays.length; i++) {
        if (!callback(arrays[i])) {
            return false;
        }
    }
    return true;
}

console.log(myEvery(letters, isUpper)); //false
console.log(myEvery(uppers, isUpper)); //true
console.log(myEvery(letters, isLower)); //false
console.log(myEvery(lowers, isLower)); //true

/////////////////////////////

function mySome(arrays, callback) {
    for (let i = 0; i < arrays.length; i++) {
        if (callback(arrays[i])) {
            return true;
        }
    }
    return false;
}

console.log(mySome(letters, isUpper)); //true
console.log(mySome(lowers, isUpper)); //false
console.log(mySome(letters, isLower)); //true
console.log(mySome(uppers, isLower)); //false