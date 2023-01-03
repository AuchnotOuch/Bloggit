from app.models import db, Comment, environment, SCHEMA


def seed_comments():
    comment_1 = Comment(
        post_id = 1,
        user_id = 2,
        comment = "awesome post!"
    )
    comment_2 = Comment(
        post_id = 2,
        user_id = 3,
        comment = "awesome post!"
    )
    comment_3 = Comment(
        post_id = 3,
        user_id = 1,
        comment = "awesome post!"
    )

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
