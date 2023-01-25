from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .likes import likes_table


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(500))
    content = db.Column(db.String(10000))
    quote_source = db.Column(db.String(100))
    link_url = db.Column(db.String(300))
    created_at = db.Column(db.DateTime(), server_default=func.now())
    updated_at = db.Column(db.DateTime(), onupdate=func.now())

    owner = relationship("User", back_populates="posts")
    photos = relationship("PostImage", back_populates="post", cascade="all, delete")
    comments = relationship("Comment", back_populates="post", cascade="all, delete")
    user_like = relationship('User', secondary=likes_table, back_populates='post_like', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'type': self.type,
            'title': self.title,
            'content': self.content,
            'quote_source': self.quote_source,
            'link_url': self.link_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'owner': self.owner.to_dict(),
            'photos': [photo.to_dict() for photo in self.photos],
            'comments': [comment.to_dict() for comment in self.comments],
            'likes': len(self.user_like)
        }
