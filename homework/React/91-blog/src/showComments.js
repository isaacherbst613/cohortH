import $ from 'jquery';
import getJson from './getJson';

async function comments(postId) {
    const comments = await getJson(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    console.log(comments);
    $('#comments').append(comments.map(comment => createComment(comment)).join(''));
}

function createComment(comment) {
    return (`<div class="commentElem">
                <h5 class="commenter">${comment.name}</h5>
                <p class="theComment">${comment.body}</p>
            </div>`);
}

export default function showCommentsBtn(postId) {
    $('#comments').empty();
    const btn = $('#showComments');
    let showing = false;
    let commentsLoaded;
    btn.on('click', async () => {
        if (!commentsLoaded) {
            await comments(postId);
            commentsLoaded = true;
        }
        if (!showing) {
            $('#comments').slideDown();
        } else {
            $('#comments').slideUp();
        }
        showing = !showing;
        btn.text(showing ? 'Hide Comments' : 'Show Comments');
    });
}