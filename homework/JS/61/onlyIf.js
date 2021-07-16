'use strict';

console.log('onlyIf.js');
let theArray = [1, 2, 3, 4, 5, 11, 22, 33, 44, 55, 111, 222, 333, 444, 555];
let theTest = (n) => n > 50;
let theAction = (n, i, a) => n = n / 2;

let theArray2 = ['apple', 'banana', 'watermelon', 'peach', 'grape', 'orange', 'pear', 'papaya', 'mango'];
let theTest2 = (n) => n.length > 5;
let theAction2 = (n, i, a) => n = n + 's';

function onlyIf(array, test, action) {
    for (let i = 0; i < array.length; i++) {
        if (test(array[i])) {
            array[i] = action(array[i]);
        }
        console.log(array[i]);
    }
}

onlyIf(theArray, theTest, theAction);
onlyIf(theArray2, theTest2, theAction2);

console.log('/////////////////////');

function onlyIf2(array, test, n) {
    array.forEach(function (n) {
        if (test(n)) {
            console.log(n);
        }
    });
}

function onlyIf3(array, test) {
    let newArray = array.filter(i => test(i));
    console.log(newArray);
}

onlyIf2(theArray, theTest);
onlyIf3(theArray2, theTest2);