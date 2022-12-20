from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id'), nullable=False))
    type = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(500), nullable=False)
    content = db.Column(db.String(10000))
    quote_source = db.Column(db.String(100))
    created_at = db.Column(db.DateTime(), server_default=func.now())
    updated_at = db.Column(db.DateTime(), onupdate=func.now())

    owner = relationship("User", back_populates="posts")
