(function(){
    'use strict';
    
    for(let i = 0; i < 10; i++){
       window.app.increment(); 
    } 
    
    const count1 = window.app.createCounter();
    const count2 = window.app.createCounter();

    for(let i = 0; i < 5; i++){
       count1.increment(); 
    } 
   
    for(let i = 0; i < 15; i++){
       count2.increment(); 
    } 
    
    console.log(window.app.getCount());
    console.log(count1.count());
    console.log(count2.count());

}());