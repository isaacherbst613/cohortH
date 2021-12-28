(function () {
    'use strict';

    const input = $('input');
    const pic = $('#pic');
    const loadedPics = [];
    const backButton = $('#back');
    const frwdButton = $('#forward');
    let i = 0;


    // $.ajax({
    //     url:'kotel/kotelResult.js?callback=?',
    //     dataType:'jsonp',
    //     jsonpCallback:'jQ', 
    // })

    $.getJSON('kotel/kotelResult.json')
        .then(r => {
            $('#submit').click(() => {
                if (input.val().trim()){
                    r['items'].forEach(element => {
                        if (~element.title.toLowerCase().indexOf(input.val().trim().toLowerCase())) {//checks substring in pic title for input
                            loadedPics.push(element);
                        }
                    });
                    changePic();
                }
            })
        });

    
    
    backButton.click(() => {
        i--;
        annime();
    });
    frwdButton.click(() => {
        i++;
        annime();
    });

    function changePic() {
        if (i === loadedPics.length) {
            i = 0;
        }
        if (i < 0) {
            i = loadedPics.length - 1;
        }
        $('#display').slideDown();
        $('#result').text(`YOUR SEARCH RETURNED ${loadedPics.length} PIC/S`);
        pic.attr('src', `kotel/${loadedPics[i].media.m}`);
        $('#name').text(loadedPics[i].title);
        $('#date').text(loadedPics[i].date_taken);
        $('#credit').text("Author ID:" + loadedPics[i].author_id)
    }

    function annime(){
        $('#display').slideUp();
        setTimeout(()=>{changePic()},400);
    }
}());