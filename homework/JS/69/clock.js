window.clock = (function () {
    'use strict';

    const d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    const time = document.createElement('div');
    //styling(time, "height", '3em');
    styling(time, "width", '6em');
    styling(time, "backgroundColor", 'lightgrey');
    styling(time, "border", '1px solid black');
    styling(time, "borderRadius", '3px');
    styling(time, "fontFamily", "'Stardos Stencil', cursive");
    styling(time, "textAlign", "center");
    styling(time,"position", "fixed");
    styling(time,"top", "20px");
    styling(time,"right", "2em");
    time.id = "clock";




    document.body.appendChild(time);
    setInterval(() => {
        if (s < 59) {
            s++;
        } else {
            s = 0;
            if (m < 59) {
                m++;
            } else {
                m = 0;
                if (h < 12) {
                    h++;
                } else {
                    h = 0;
                }
            }
        }
        const amPm = h - 12 <= 0 ? "am" : "pm";
        //turn into 12 hr (not 24)
        let h12 = h - 12 <= 0 ? h : (h-12);
        const ps = pad(s);
        const pm = pad(m);
        const tm = `${h12}:${pm}:${ps} ${amPm}`;
        time.innerText = tm;
    }, 1000);

    function pad(sec) {
        if (String(sec).length < 2) {
            return `0${sec}`;
        }
        return sec;
    }

    function styling(elem, type, prop) {
        elem.style[type] = prop;
    }


    //font
    const font = document.createElement('link');
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Stardos+Stencil&display=swap';
    const fontPre = document.createElement('link');
    fontPre.rel = 'preconnect';
    fontPre.href = 'https://fonts.googleapis.com';
    const fontPre2 = document.createElement('link');
    fontPre2.rel = 'preconnect';
    fontPre2.href = 'https://fonts.gstatic.com';
    document.head.appendChild(font);
    document.head.appendChild(fontPre);
    document.head.appendChild(fontPre2);



}());