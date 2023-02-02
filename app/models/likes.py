from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import Column, ForeignKey, Table

likes_table = Table('likes',
                    db.Model.metadata,
                    Column('user_id', ForeignKey(add_prefix_for_prod('users.id'))),
                    Column('post_id', ForeignKey(add_prefix_for_prod('posts.id'))))

if environment == 'production':
    likes_table.schema = SCHEMA
