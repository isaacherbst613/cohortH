window.app = (function(module){
    'use strict';
    
    let count = 0;
    module.increment = () => count++;
    module.getCount = function(){return count;};
   
    return module;

}(window.app || {}));