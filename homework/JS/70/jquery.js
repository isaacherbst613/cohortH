(function () {
    'use strict';
    $('#submit').click((e) => {e.preventDefault();});
    const name = $('#name');
    const add = $('#add');
    const sub = $('#submit');
    const check = $('#checkbox')
    name.prop('disabled',true);
    add.prop('disabled',true);
    sub.prop('disabled',true);
    check.prop('disabled',true);
    $('#checkbox2').click(()=>{
        if($('#checkbox2').is(':checked')){
            name.prop('disabled',false);
            add.prop('disabled',false);
            sub.prop('disabled',false);
            check.prop('disabled',false);
            sub.click((e) => {
                // e.preventDefault();
                if (check.is(':checked')) {
                    window.messageBox.show(`<h3>Welcome home</h3><h2>${$('#name').val()}</h2><br><h4>the crew at ${$('#add').val()}`);
                }
            });
        }else{
            name.prop('disabled',true);
            add.prop('disabled',true);
            sub.prop('disabled',true);
            check.prop('disabled',true);
        }
    });
    
}());