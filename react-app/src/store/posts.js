const GET_ALL_POSTS = 'posts/getPosts'
const CREATE_POST = 'posts/createPosts'
const UPDATE_POST = 'posts/updatePosts'
const DELETE_POST = 'posts/deletePosts'


const actionGetAllPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        payload: posts
    }
}
