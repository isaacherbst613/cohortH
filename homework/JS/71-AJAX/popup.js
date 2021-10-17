window.messageBox = (function () {
    'use strict';

    const modal = document.createElement('div');
    modal.style.position = "fixed";
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "inherit";
    modal.style.opacity = ".3";
    modal.style.display = "none";
    document.body.appendChild(modal);


    function show(msg, array = ["ok"], callback = {}, mdl = true) {
        const div = document.createElement('div');
        const span = document.createElement('span');
        span.innerHTML = msg;
        div.appendChild(span);

        if (mdl) {
            modal.style.display = "block";
        }


        const btndiv = document.createElement('div');
        array.forEach(element => {
            const button = document.createElement('button');
            btndiv.appendChild(button);
            button.style.padding = "5px 2em";
            button.innerText = element;
            button.addEventListener('click', () => {
                div.remove();
                modal.style.display = "none";

                if (typeof callback === "function") {
                    button.addEventListener('click', callback);
                }
            });
        });
        div.appendChild(btndiv);


        document.body.appendChild(div);

        div.style.position = "absolute";
        div.style.backgroundColor = "#fff";
        div.style.padding = "2em";
        div.style.boxSizing = "border-box";
        div.style.width = `400px`;
        div.style.height = `600px`;
        div.style.top = "2px";
        div.style.left = "50%";
        div.style.marginLeft = "-150px";
        div.style.border = "2px solid black";
        div.style.borderRadius = "10px";
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

   }

    return {
        show: show
    };

}());