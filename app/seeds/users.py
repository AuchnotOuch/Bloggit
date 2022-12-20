from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        profile_photo_url='https://cdn.pixabay.com/photo/2016/04/01/09/09/animal-1299179_1280.png',
        blog_title='Demolition Zone',
        description='Welcome to my blog. Remember to wear a hard hat!',
        email='demo@aa.io',
        password='password'
        )
    marnie = User(
        username='marnie',
        profile_photo_url='https://cdn.pixabay.com/photo/2013/07/12/19/22/cat-154642_1280.png',
        blog_title="Marnie's Madness",
        description='Visitiors beware! This blog documents the darkest corners of my mind',
        email='marnie@aa.io',
        password='password'
        )
    bobbie = User(
        username='bobbie',
        profile_photo_url='https://cdn.pixabay.com/photo/2013/07/12/19/22/cat-154641_1280.png',
        blog_title="Bob's Blog",
        description='Serving up the dankest memes and the spiciest takes.',
        email='bobbie@aa.io',
        password='password'
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
