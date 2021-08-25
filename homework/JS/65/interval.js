(function(){
    'use strict';

    const page = document.getElementById("body");
    const text = document.getElementById("text");
    const btn = document.getElementById("btn");

    function rgb(r, g, b){
        return "rgb("+r+","+g+","+b+")";
    }
    let r = 255, g = 255 ,b = 255, i = 0; 
    function changeColors(){ 
        if(i <= 255){
            r--;
        }else if(i <= 511){
            r++;
            g--;
        }else if(i <= 766){
            g++;
            b--;
        }else if(i <= 1021){
            b++;
            r--;
        }
        else if(i === 1022){
            i = 256;
        }
        i++;
        page.style.backgroundColor = rgb(r,g,b);   
        text.style.color = rgb(b,r,g);     
    }

let inter;
btn.addEventListener('click',()=> {
    if(!inter){
        inter = setInterval(changeColors,20);
        btn.innerText = 'stop';
    }else{
        clearInterval(inter);
        inter = null;
        btn.innerText = 'start';
    }
});

}());