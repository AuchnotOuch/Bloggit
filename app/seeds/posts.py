from app.models import db, Post, environment, SCHEMA


def seed_posts():
    post_one = Post(
        owner_id = 1,
        type = "text",
        title = "First Post!",
        content = "Hello World!",
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
        content = "A dank meme"
    )
    post_four = Post(
        owner_id = 4,
        type = "text",
        title = "I need a vacation",
        content = "I've been thinking that I need to get away for a bit. Any vacay spot recommendations?"
    )
    post_five = Post(
        owner_id = 5,
        type = "photo",
        content = "Had so much fun last night!"
    )
    post_six = Post(
        owner_id = 2,
        type = "photo"
    )

    db.session.add(post_one)
    db.session.add(post_two)
    db.session.add(post_three)
    db.session.add(post_four)
    db.session.add(post_five)
    db.session.add(post_six)

    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
