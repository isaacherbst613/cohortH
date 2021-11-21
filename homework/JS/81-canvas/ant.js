(function(){
    'use strict';

    const canvas = document.getElementById('canvas');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const ctx = canvas.getContext('2d');
    function drawAnt(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.arc(x+5, y, 4, 0, Math.PI * 2);
        ctx.fill();
    }
    drawAnt(canvas.width/2, canvas.height/2);


}()); 