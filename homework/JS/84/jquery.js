(function () {
    'use strict';
    $('#submit').click((e) => {e.preventDefault();});
    const name = $('#name');
    const add = $('#add');
    const sub = $('#submit');
    const check = $('#checkbox');
    name.prop('disabled',true);
    add.prop('disabled',true);
    sub.prop('disabled',true);
    check.prop('disabled',true);
    $('#checkbox2').change(()=>{
        let checker = !$('#checkbox2').is(':checked');
            name.prop('disabled',checker);
            add.prop('disabled',checker);
            sub.prop('disabled', checker);
            check.prop('disabled',checker);
            sub.click((e) => {
                // e.preventDefault();
                if (check.is(':checked')) {
                    window.messageBox.show(`<h3>Welcome home</h3><h2>${$('#name').val()}</h2><br><h4>the crew at ${$('#add').val()}`);
                }
            });
    });
    
}());