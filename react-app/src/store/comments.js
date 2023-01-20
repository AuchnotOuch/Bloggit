const GET_ALL_COMMENTS = 'comments/getComments'
const CREATE_COMMENT = 'comments/createComment'
const UPDATE_COMMENT = 'comments/updateComments'
const DELETE_COMMENT = 'comments/deleteComments'
const CLEAR_STATE = 'comments/clearComments'


const actionGetAllComments = (comments) => {
    return {
        type: GET_ALL_COMMENTS,
        payload: comments
    }
}

const actionCreateComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        payload: comment
    }
}

const actionUpdateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        payload: comment
    }
}

const actionDeleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        payload: commentId
    }
}

export const actionClearComments = () => {
    return {
        type: CLEAR_STATE
    }
}

export const thunkGetAllComments = (postId) => async (dispatch) => {
    const response = await fetch(`/api/comments/posts/${postId}`, {
        method: 'GET'
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetAllComments(data))
        return response
    }
}

export const thunkCreateComment = (newComment) => async (dispatch) => {
    const { userId, postId, comment } = newComment
    const response = await fetch(`/api/comments/posts/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userId,
            post_id: postId,
            comment
        })
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionCreateComment(data))
        return response
    }
}

export const thunkUpdateComment = (editedComment) => async (dispatch) => {
    const { commentId, comment } = editedComment
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            comment
        })
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionUpdateComment(data))
    }
    return response
}

export const thunkDeleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(actionDeleteComment(commentId))
    }
}

export default function commentsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_COMMENTS:
            const commentsObj = { ...state }
            action.payload.Comments.forEach(comment => commentsObj[comment.id] = comment)
            newState = Object.assign({ ...state }, { ...commentsObj })
            return newState
        case CREATE_COMMENT:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        case UPDATE_COMMENT:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        case DELETE_COMMENT:
            newState = { ...state }
            delete newState[action.payload]
            return newState
        case CLEAR_STATE:
            newState = {}
            return newState
        default:
            return state
    }
}
