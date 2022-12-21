from flask import Blueprint
from flask_login import login_required
from app.models import Post, User

posts_routes = Blueprint('posts', __name__)


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
