async function getAllAuthors(req, res){
    const authers = await global.posts.aggregate([
        {
            $group: {
                _id: {
                    _id: '$post.auther._id',
                    firstName: '$post.auther.firstName',
                    lastName: '$post.auther.lastName',
                    email: '$post.auther.email'
                },
                posts: {
                    $count: {}
                }
            }
        }
    ]).toArray();
    console.log(authers);
    res.send(authers);
}

async function getAuthorByID(req, res, next) {
    const id = req.params.id;
    const thePosts = await global.posts.find({ 'post.auther._id': { id } }).toArray();
    console.log(thePosts);
    res.send(thePosts);
}
module.exports = { getAllAuthors, getAuthorByID };