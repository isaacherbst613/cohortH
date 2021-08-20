(function(){
    'use strict';

    function account(){
            return{ 
            balance: 0,
            performTransaction: function (amnt){ /* == performTransaction(amnt){ */
                this.balance += amnt;
                console.log('your new balance is $' + this.balance);
            }
        };
    }

    let acnt = account();
    acnt.performTransaction(1000);
    acnt.performTransaction(-500);

    
    
    function transaction(amnt){
            this.balance += amnt;
            console.log('your new balance is $' + this.balance);
    }

    function account2(){
        return{
            balance: 0,
        };
    }

    let acnt2 = account2();
    transaction.call(acnt2, 5000);
    transaction.call(acnt2, -1000);
    transaction.apply(acnt2, [1000,-500,750]);

}());