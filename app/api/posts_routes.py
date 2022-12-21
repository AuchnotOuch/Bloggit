from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Post, User
from app.forms import NewPostForm

posts_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@posts_routes.route('/')
def all_posts():
    """
    Query for all posts in database and
    return them in a list of post dictionaries
    """
    posts = Post.query.all()

    return {'posts': [post.to_dict() for post in posts]}

@posts_routes.route('/new', methods=['POST'])
@login_required
def add_post():
    """
    Creates a new post based on submitted form data
    """
    form = NewPostForm()
    user = current_user

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        new_post = Post(
            owner_id = user.id,
            type = form.data['type'],
            title = form.data['title'],
            content = form.data['content'],
            quote_source = form.data['quote_source'],
            link_url = form.data['link_url']
        )

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
