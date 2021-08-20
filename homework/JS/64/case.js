window.myApp = window.myApp || {};

window.myApp.utils = (function(module){
    'use strict';

    module.stringCaseInsensitiveEquals = (a,b) => a.toLowerCase() === b.toLowerCase(); 

    return module;
}(window.myApp.utils || {}));