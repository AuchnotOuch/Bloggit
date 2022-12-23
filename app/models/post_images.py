from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class PostImage(db.Model):
    __tablename__ = 'post_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    url = db.Column(db.String(300), nullable=False)
    text = db.Column(db.String(1000))

    post = relationship("Post", back_populates="photos", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'url': self.url,
            'text': self.text
        }
