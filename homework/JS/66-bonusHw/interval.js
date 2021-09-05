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
        return `rgb(${r},${g},${b})`;
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
        text.style.color = rgb(b,g,r);    
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

const data = [];

const firstRow = {
        color: page.style.backgroundColor,
        text: rgb(0,0,0),
        time: new Date().toLocaleTimeString()
};
data.push(firstRow);

rcd.addEventListener('click', ()=>{
    
    const date = new Date();

    const clickedData = {
        color: page.style.backgroundColor,
        text: text.style.color,
        time: date.toLocaleTimeString()
    };

    data.push(clickedData);

    const row = table.insertRow();
    const clr = row.insertCell();
    const time = row.insertCell();

    clr.innerText = clickedData.color;
    time.innerText = clickedData.time;
    clr.style.backgroundColor = page.style.backgroundColor;
    time.style.backgroundColor = page.style.backgroundColor;
    clr.style.color = text.style.color;
    time.style.color = text.style.color;

});

table.addEventListener('click', event=>{

    const clickRow = event.target.parentElement.rowIndex;
    console.log(data[clickRow]);
    page.style.backgroundColor = data[clickRow].color;
    text.style.color = data[clickRow].text;

    clearInterval(inter);
    inter = null;
    btn.innerText = 'start';

});

}());