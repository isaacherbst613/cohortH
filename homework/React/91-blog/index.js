(async function blog() {

    async function setUI(){
        const users = await getUsers();
        console.log(users);
        users.forEach(user => {
            $('<div>').attr({'id': user.id, 'class': 'user'})
            .html(`<h3 id="${user.id}">${user.name}</h3><div>${user.website}</div><div>${user.company.name}</div>`)
            .appendTo('#root');
        });

        $('#root').on('click','.user', async function(){
            console.log(this.id);
            const posts = await getPosts(this.id);
            $('.user').hide();
            posts.forEach(post => {
                $('<div>').attr({'id': post.id, 'class': 'post'})
                .html(`<h3>${post.title}</h3><div>${post.body}</div>`)
                .appendTo('#root');
            });
        });
    }
    setUI();









    async function getUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error, 'Users');
        }
    }

    async function getPosts(userId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error, 'Posts');
        }
    }

    async function getComments(postId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error, 'Comments');
        }
    }

}());


