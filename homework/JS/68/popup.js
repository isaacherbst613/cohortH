window.messageBox = (function () {
    'use strict';

    const offset = 30;
    let leftoffset = -175;
    let topoffset = 10;
    const width = 250;
    const height = 150;
    let nextIndex = 0;

    const modal = document.createElement('div');
    modal.style.position = "fixed";
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "grey";
    modal.style.opacity = ".5";
    document.body.appendChild(modal);


    function show(msg, array, callback, mdl) {
        const div = document.createElement('div');
        const span = document.createElement('span');
        span.innerHTML = msg;
        div.appendChild(span);

        if (mdl) {
            modal.style.display = "block";
            modal.style.zIndex = nextIndex++;
        }


        const btndiv = document.createElement('div');
        if (!array) {
            const button = document.createElement('button');
            btndiv.appendChild(button);
            button.style.padding = "5px 2em";
            button.innerText = "ok";
            button.addEventListener('click', () => {
                div.remove();
                modal.style.display = "none";
            });

        } else {
            array.forEach(element => {
                const button = document.createElement('button');
                button.innerText = element;
                button.style.padding = "5px 2em";
                btndiv.appendChild(button);

                if(typeof callback === "function"){
                    button.addEventListener('click', callback);
                }
            });
        }
        div.appendChild(btndiv);


        document.body.appendChild(div);

        div.style.position = "absolute";
        div.style.backgroundColor = "lightcyan";
        div.style.padding = "3em";
        div.style.boxSizing = "border-box";
        div.style.width = `${width}px`;
        div.style.height = `${height}px`;
        div.style.top = "2px";
        div.style.left = "50%";
        div.style.marginLeft = `${leftoffset}px`;
        div.style.marginTop = `${topoffset}px`;
        div.style.border = "2px solid black";
        div.style.borderRadius = "3px";
        div.style.textAlign = "center";

        span.style.fontFamily = "confortaa, Geneva, Tahoma, sans-serif";
        span.style.fontSize = '18px';
        span.style.overflow = "auto";
        span.style.height = "100%";
        span.style.display = "inline-block";

        btndiv.style.position = "absolute";
        btndiv.style.bottom = "1em";
        btndiv.style.width = "100%";
        btndiv.style.left = "0";
        btndiv.style.textAlign = "center";


        //for multiple modals...
        topoffset += offset;
        leftoffset += offset;

        if (parseFloat(getComputedStyle(div).left) + leftoffset + width > window.innerWidth) {
            leftoffset -= window.innerWidth - width;
        }
        if (parseFloat(getComputedStyle(div).top) + topoffset + height > window.innerHeight) {
            topoffset -= window.innerHeight - height;
        }
        
        div.addEventListener('click', () => {
            div.style.zIndex = nextIndex++;

        });

    }


    get('submit').addEventListener('click', () => { //not great style, reaching in to get element with every call
        show(get('info').value);
    });


    function get(id) {
        return document.getElementById(id);
    }

    return {
        show: show
    };

}());