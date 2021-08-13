'use strict';

const dayOfWeek = (function(){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];

    function getDayName(num) {
        if (num <= 7){
            return days[num - 1];
        } else{
            return 'NONEday';
        }            
    }

    function getDayNum(day){
        return days.findIndex(d => day.toLowerCase() === d.toLowerCase()) + 1;
    }

    return {
        getDayName: getDayName,
        getDayNum: getDayNum
    };
})();