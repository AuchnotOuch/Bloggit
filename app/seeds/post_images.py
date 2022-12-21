from app.models import db, PostImage, environment, SCHEMA


def seed_post_images():
    post_three_1 = PostImage(
        post_id = 3,
        url = "https://i.redd.it/6mkf2fwat6461.jpg",
        text = "Lmaooooooooo"
    )
    post_three_2 = PostImage(
        post_id = 3,
        url = "https://i.redd.it/0gsv9rijxpn51.jpg",
        text = "So true hahaha"
    )
    post_three_3 = PostImage(
        post_id = 3,
        url = "https://i.redd.it/6az7dr5fqsn31.jpg",
        text = "You know exactly what this meme is about XD"
    )

    db.session.add(post_three_1)
    db.session.add(post_three_2)
    db.session.add(post_three_3)
    db.session.commit()


def undo_post_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM post_images")

    db.session.commit()
