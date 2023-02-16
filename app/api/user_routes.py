from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Follower, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/following')
@login_required
def following(id):
    """
    Query for all instances of current user following another user
    by user id, then query for those users in the User table.
    """

    followings = Follower.query.filter(Follower.follower_id == id)
    followings_obj = {}
    for following in followings:
        user = User.query.get(following.user_id)
        followings_obj[f'{user.id}'] = user.to_dict()

    return followings_obj

@user_routes.route('/<int:id>/followers')
@login_required
def followers(id):
    """
    Query for all instances of current user being followed by user id,
    then query for for those users in the User table
    """

    followers = Follower.query.filter(Follower.user_id == id)
    followers_obj = {}
    for follower in followers:
        user = User.query.get(follower.follower_id)
        followers_obj[f'{user.id}'] = user.to_dict()

    return followers_obj

@user_routes.route('/<int:id>/follow', methods=['POST'])
@login_required
def follow(id):
    """
    Create new instance of a follow using the id url parameter as
    the user the current logged in user is following.
    """

    new_follow = Follower(
        user_id = id,
        follower_id = current_user.id
    )

    db.session.add(new_follow)
    db.session.commit()

    return {'message': f'Successfully followed user {id}.'}

@user_routes.route('/<int:id>/unfollow', methods=['DELETE'])
@login_required
def unfollow(id):
    """
    Find following by the current logged in users id and the followee's id and remove it
    from the followers table
    """

    follows = Follower.query.filter(Follower.user_id == id, Follower.follower_id == current_user.id)
    # follow = follows.filter(Follower.follower_id == current_user.id)
    for follow in follows:
        db.session.delete(follow)
        db.session.commit()


    return {'message': f'Successfully unfollowed user {id}'}
