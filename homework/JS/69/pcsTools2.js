window.pcs = function (id) {
    'use strict';

    const theElem = document.getElementById(id);

    function setCss(elem, prop, value) {
        elem.style[prop] = value;
    }

    return {

        css: function (prop, value) {
            if (arguments === 1) {
                return getComputedStyle(theElem)[prop];
            }
            theElem.style[prop] = value;
            return this;
        },
        click: function (callback) {
            theElem.addEventListener('click', callback);
            return this;
        },
        hide: function () {
            setCss(theElem, "display", "none");
            return this;
        },
        show: function () {
            setCss(theElem, "display", "block");
            return this;
        },
        flash: function (len, speed) {//len in seconds, speed in 10th of seconds
            const currentclr = getComputedStyle(theElem)["backgroundColor"];
            const clrs = ["red", "green", "blue"];
            let i = 0;
            const int = setInterval(() => {
                setCss(theElem, "backgroundColor", clrs[i]);
                if(i === clrs.length - 1){
                    i = 0;
                }else{
                    i++;
                }
            }, (speed * 100));
            setTimeout(() => {
                clearInterval(int);
                setCss(theElem, "backgroundColor", currentclr);
            }, len * 1000);
        }
    };
};