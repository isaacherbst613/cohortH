 const messageBox = function(){
    'use strict';
    
    const text = get('text');
        text.style.fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
        text.style.fontSize = '18px';
    
    get('submit').addEventListener('click', ()=>{ //not great style, reaching in to get element with every call
        text.innerText = get('info').value;
        box.style.display = 'block';
    });

    const box = get("box");
    const ok = get("ok");
    ok.addEventListener('click', ()=> //better style
        box.style.display = 'none');    
    

        
    function show(string){
        text.innerText = string;
    }     

    function get(id){
        return document.getElementById(id);
    }

    return{
            show: show
    };

}();