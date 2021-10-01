(function(){
    'use strict';

    function get(id){
        return document.getElementById(id);
    }

    const contacts = [];
    
    const contactTable = get("ct");
    const form = get("contactForm");
    form.addEventListener('submit', event =>{

        event.preventDefault();
        
        if(!contacts.length){
            contactTable.deleteRow(0);
        }
        
        const newContact = {
            first: get('first').value,
            last: get('last').value,
            email: get('email').value,
            phone: get('phone').value
        };

        contacts.push(newContact);

        

        const row = contactTable.insertRow();
        const first = row.insertCell();
        const last = row.insertCell();
        const email = row.insertCell();
        const phone = row.insertCell();
        const remove = row.insertCell();

        first.innerText = newContact.first;
        last.innerText = newContact.last;
        email.innerText = newContact.email;
        phone.innerText = newContact.phone;
        remove.innerHTML = "<img src='trash.png' width='20px' alt='delete'>";
        form.reset();
        form.style.display = 'none';

    });

    get('add').addEventListener('click', ()=>{
        form.style.display = 'block';
    });
    get('cancel').addEventListener('click',()=>{
        form.style.display = 'none';
        form.reset();
    });

    contactTable.addEventListener('click', event => {
        //if clicked in <img = delete> get it's <td>s parentElement.rowIndex
        const clickRow = event.target.closest('td').parentElement.rowIndex;
        console.log(clickRow);
        if (event.target.parentElement.cellIndex === 4){
            contactTable.deleteRow(clickRow-1);
            contacts.splice(clickRow-1,1);
            if(!contacts.length){
                const temp = contactTable.insertRow();
                temp.innerHTML= "<td colspan='5'>no contacts yet</td>";
            }
        }
    });
}());