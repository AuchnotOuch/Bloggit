from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .user import User

class Follower(db.Model):
    __tablename__ = "followers"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    follower_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    follower_index = Index('follower_index', 'user_id', 'follower_id')
