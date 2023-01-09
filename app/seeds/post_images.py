from app.models import db, PostImage, environment, SCHEMA


def seed_post_images():
    post_three = PostImage(
        post_id = 3,
        url = "https://i.redd.it/6mkf2fwat6461.jpg",
        text = "Lmaooooooooo"
    )
    post_five = PostImage(
        post_id = 5,
        url = "https://images.unsplash.com/photo-1506699311528-5be252edc26a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
        text = "<3"
    )

    db.session.add(post_three)
    db.session.add(post_five)
    db.session.commit()


def undo_post_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM post_images")

    db.session.commit()
