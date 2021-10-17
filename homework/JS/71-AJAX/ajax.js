( function () {
    'use strict';
    
    $('#btn').click(() => {
        $('body').addClass('spinner');
        fetch($('#input').val())
            .then(responce => {     
                if (!responce.ok) {
                    return `<p>${responce.status}, ${responce.statusText}</p>`
                }else{
                    return responce.text()
                }
            })
            .then(r => { 
                setTimeout(()=>{
                    $('body').removeClass('spinner');
                    window.messageBox.show(`<p>${r}</p>`)
                },2000)                    
             })
    })

}())