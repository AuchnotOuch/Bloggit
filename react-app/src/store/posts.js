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

const actionCreatePost = (post) => {
    return {
        type: CREATE_POST,
        payload: post
    }
}

const actionUpdatePost = (post) => {
    return {
        type: UPDATE_POST,
        payload: post
    }
}

const actionDeletePost = (postId) => {
    return {
        type: DELETE_POST,
        payload: postId
    }
}

export const thunkGetAllPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts", {
        method: 'GET'
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetAllPosts(data))
        return response
    }
}

export default function postsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_POSTS:
            const postsObj = { ...state }
            action.payload.Posts.forEach(post => postsObj[post.id] = post)
            newState = Object.assign({ ...state }, { ...postsObj })
            return newState
        default:
            return state
    }
}
