from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Post, User, Comment
from app.forms import NewCommentForm, EditCommentForm

comments_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@comments_routes.route('/posts/<int:id>')
def get_post_comments(id):
    """
    Query for all comments of a post by postId
    """
    comments = Comment.query.filter(Comment.post_id == id)

    return {'Comments': [comment.to_dict() for comment in comments]}

@comments_routes.route('/posts/<int:id>', methods=['POST'])
@login_required
def add_comment(id):
    """
    Add a comment to a post
    """
    form = NewCommentForm()

    user = current_user

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            post_id = id,
            user_id = user.id,
            comment = form.data["comment"]
        )
        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@comments_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    """
    Edit a comment to a post
    """
    form = EditCommentForm()

    comment = Comment.query.get(id)

    form['csrf_token'].data = request.cookies['csrf_token']
    if comment is not None:
        if form.validate_on_submit():
            if form.data['comment']:
                comment.comment = form.data['comment']
            db.session.commit()
            return comment.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'Error': f"Comment {id} not found"}, 404

@comments_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):

    comment = Comment.query.get(id)

    if comment is not None:
        db.session.delete(comment)
        db.session.commit()
        return {'Message': f"Comment {id} successfully deleted"}
    return {"Error": f"Comment {id} not found"}, 404
