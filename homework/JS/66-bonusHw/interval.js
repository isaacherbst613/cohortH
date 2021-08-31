(function(){
    'use strict';

    function get(id){
        return document.getElementById(id);
    }


    const page = get("body");
    const text = get("text");
    const btn = get("btn");
    const table = get("table");
    const rcd = get("rcd-btn");


    function rgb(r, g, b){
        return "rgb("+r+","+g+","+b+")";
    }

    let r = 255, g = 255 ,b = 255, i = 0; 
    page.style.backgroundColor = rgb(r,g,b); 
    function changeColors(){ 
        if(i <= 255){
            r--;
        }else if(i <= 511){
            r++;
            g--;
        }else if(i <= 767){
            r--;
        }else if(i <= 1023){
            r++;
            g++;
            b--;
        }else if(i <= 1279){
            r--;
        }else if(i <= 1535){
            r++;
            g--;
        }else if(i <= 1791){
            r--;
        }else if(i <= 2047){
            r++;
            g++;
            b++;
        }
        else if(i === 2048){
            i = 0;
        }
        i++;
        page.style.backgroundColor = rgb(r,g,b);   
        text.style.color = rgb(b,r,g);     
    }

let inter;
btn.addEventListener('click',()=> {
    if(!inter){
        inter = setInterval(changeColors,50);
        btn.innerText = 'stop';
    }else{
        clearInterval(inter);
        inter = null;
        btn.innerText = 'start';
    }
});

const data = [];
let row;

rcd.addEventListener('click', ()=>{
    
    const date = new Date();

    const clickedData = {
        color: page.style.backgroundColor,
        time: date.toLocaleTimeString()
    };

    data.push(clickedData);

    row = table.insertRow();
    const clr = row.insertCell();
    const time = row.insertCell();

    clr.innerText = clickedData.color;
    time.innerText = clickedData.time;

});

table.addEventListener('click', event=>{

    let clickedRow = event.target.innerText;
    if(clickedRow[0]==='r'){//so it shouldn't crash if you clicked on time cell
        page.style.backgroundColor = clickedRow;
        clearInterval(inter);
        inter = null;
        btn.innerText = 'start';
    }
});

}());