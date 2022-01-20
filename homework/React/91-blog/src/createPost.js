import './post.css';
import $ from 'jquery';
import getJson from './getJson';
import showCommentsBtn  from './showComments';

export default async function getPosts(e, user) {

    const posts = await getJson(`https://jsonplaceholder.typicode.com/posts?userId=${e.currentTarget.id}`);
    console.log(posts);

    createPostList(0, 3, posts, user);
    let i = 0;
    $('#next').on('click', () => {
        $('#postList').empty();
        i += 3;
        createPostList(i, 3, posts, user);
    });
    $('#back').on('click', () => {
        $('#postList').empty();
        i -= 3;
        createPostList(i, 3, posts, user);
    });




}


function createPostList(index, amount, post, user) {
    $('#next').show();
    for (let i = index; i < (index + amount) && i < post.length; i++) {
        $(`<li class="postItem">${post[i].title}</li>`)
            .appendTo('#postList')
            .on('click',() => {
                $('#postsHolder').hide();
                $('#postTitle').text(post[i].title);
                $('#byAuthor').text(user.name).on('click', () => {
                    $('#postsHolder').show();
                    $('#postDisplay').hide();
                });
                $('#postContent').text(post[i].body);
                $('#postDisplay').show(); 
                showCommentsBtn(post[i].id);

            });
        if (index + amount >= post.length) {
            $('#next').hide();
        }
        if (index > 0) {
            $('#back').show();
        }else{
            $('#back').hide();
        }
    }

}
