window.app = (function(module){
    'use strict';

    let counters = 0;
    module.createCounter = function(){
        let count = 0;
        counters++;
        return{
            count : () => count,
            increment : () => count++
        };
    };
    
    return module;

}(window.app || {}));