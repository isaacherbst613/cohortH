window.app = (function(module){
    'use strict';

    let count = 0;
    module.increment = () => count++;
    module.getCount = function(){return count;};

    return module;

}(window.app || {}));

// SL nice - but a little more complicated then needed for this example... Also window.app.increment is not so user friendly, better would be window.app.counter ... putting stuff in your top level object makes it a dumping ground for random stuff...