window.myApp = window.myApp || {};

window.myApp.utils = (function (module){
    'use strict';
    
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];
    
        module.getDayName = (num) => {
            if (num <= 7){
                return days[num - 1];
            } else{
                return 'NONEday';
            }            
        };
    
        module.getDayNum = (day) => {
            return days.findIndex(d => module.stringCaseInsensitiveEquals(d, day)) + 1;
        };

    return module;
}(window.myApp.utils || {}));
