( function () {
    'use strict';
    
    $('#btn').click(() => {
        $('body').addClass('spinner');
        fetch($('#input').val())
            .then(response => {     
                if (!response.ok) {
                    return `<p>${response.status}, ${response.statusText}</p>`;
                }else{
                    return response.text();
                }
            })
            .then(r => { 
                setTimeout(()=>{
                    $('body').removeClass('spinner');
                    window.messageBox.show(`<p>${r}</p>`);
                },2000);                    
             });
    });

}());