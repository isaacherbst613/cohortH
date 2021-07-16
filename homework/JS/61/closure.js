'use strict';

console.log('closures.js');

function multiply(a, b){
    return a * b;
}

console.log(multiply(2,3), multiply(5,10), multiply(23,100));

function getMultiplier(){
    return (a,b) => multiply(a,b);
}

let x = getMultiplier();
console.log(x(2,3), x(5,10), x(23,100));

function getMultiplier2(a){
    return (b) => multiply(a,b);
}

let dec = getMultiplier2(0.1);//dec 'remembers' it's parents params == closure
console.log(dec(2), dec(5), dec(23));