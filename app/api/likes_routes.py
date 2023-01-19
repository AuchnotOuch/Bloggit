from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Post, User


likes_routes = Blueprint('likes', __name__)


@likes_routes.route('/post/<int:id>')
def likes_count(id):
    '''
    Query for post, then do a count on the number of likes attributed to
    post.
    '''
    post = Post.query.get(id)

    if post is not None:
        likes = post.user_like
        return {'Likes': len(likes)}

    return {"Error": f'Post {id} not found'}, 404

@likes_routes.route('/post/<int:id>', methods=['POST'])
def add_like(id):
    '''
    Query for post based on id and add the like to the join table using
    current user.
    '''

    post = Post.query.get(id)
    if post is not None:
        user = current_user
        user.post_like.append(post)
        db.session.commit()
        return {"message": "like added!"}

    return {"Error": f'Could not add like for post {id}'}, 404

@likes_routes.route('/post/<int:id>', methods=['DELETE'])
def remove_like(id):
    '''
    Query for post based on id and remove like from join table using
    current user
    '''

    post = Post.query.get(id)
    if post is not None:
        user = current_user
        user.post_like.remove(post)
        db.session.commit()
        return {"message": 'like removed!'}

        return {"Error": f'Could not remove like for post {id}'}, 404
