'use strict';

const cal = (function(){

    let yrs = 0;
    let interestRate = 0;

    function setYears(years){
        if(years>=1){
            yrs = years;
        }
    }

    function setRate(num){
        interestRate = num;
    }

    function calculate(principle){
        let total = 0;
        for(let i = 0; i < yrs; i++){
            total = (total + principle) * interestRate;
        }
        return total;
    }

    return {
        setYears: setYears,
        setRate: setRate,
        calculate: calculate
    };

})();