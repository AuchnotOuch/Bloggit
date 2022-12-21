from app.models import db, Post, environment, SCHEMA


def seed_posts():
    post_one = Post(
        owner_id = 1,
        type = "text",
        title = "First Post!",
        content = "This is my first post on Blogsta!",
    )
    post_two = Post(
        owner_id = 2,
        type = "quote",
        content = "Evil begins when you begin to treat people as things.",
        quote_source = "Terry Pratchett, I Shall Wear Midnight"
    )
    post_three = Post(
        owner_id = 3,
        type = "photo",
        content = "Some dank memes"
    )

    db.session.add(post_one)
    db.session.add(post_two)
    db.session.add(post_three)
    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
