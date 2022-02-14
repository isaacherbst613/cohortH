import './index.css';
import $ from 'jquery';
import getJson from './getJson';
import getPosts from './createPost';


(async function blog() {

    const users = await getJson('https://jsonplaceholder.typicode.com/users');
    console.log(users);
    users.forEach(user => {
        $('<div>').attr({ 'id': user.id, 'class': 'user card' })
            .html(`
                <div class="card-header">Author</div>
                <div class="card-body">
                <h3 class="card-title">${user.name}</h3>
                <div>${user.website}</div><div>${user.company.name}</div>
                </div>`)
            .appendTo('#cardHolder')
            .on('click', async (e) => {
                $('#cardHolder').hide();
                $('#postsHolder').show();
                $('#postList').empty();
                $('#postAuthor').text(user.name);

                getPosts(e, user);
                
            });
    });

    $('#home').on('click', () => {
        $('#postsHolder').hide();
        $('#comments').hide();
        $('#cardHolder').show();
    });

}());