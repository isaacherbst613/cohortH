(function(){
    'use strict';

    let theArray = [1,2,3,4,5];

    function myMap(array, callback){
        const newArray = [];
        for(let i = 0; i < array.length; i++){
            newArray.push(callback(array[i]));
        }
        return newArray;
    }

    let multi = x => x * 2;

    console.log(theArray);
    console.log(myMap(theArray, multi));
    console.log(theArray);
}());

// SL - nice