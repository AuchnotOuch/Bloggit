# Blogsta
Blogsta, a clone of Tumblr, is a microblogging site that allows users to share their thoughts, ideas, passions, and more. Blogsta lets users create text, image, and quote posts that other users can comment on.

##Live Site: https://blogsta.onrender.com

## Wiki
* [User Stories](https://github.com/AuchnotOuch/Blogsta/wiki/User-Stories)
* [Database Schema](https://github.com/AuchnotOuch/Blogsta/wiki/Database-Schema)
* [Feature List](https://github.com/AuchnotOuch/Blogsta/wiki/Features)
* [Wireframes](https://github.com/AuchnotOuch/Blogsta/wiki/Wireframes)

## Built With:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

# Features

## Posts

View all posts:

![view-posts](https://i.imgur.com/xtDZSHe.png)

Create a post:

![create-text-post](https://i.imgur.com/nl0s05u.png)
![create-image-post](https://i.imgur.com/5JXPD6S.png)
![create-quote-post](https://i.imgur.com/oPhr4tb.png)

Edit a post:

![edit-post](https://i.imgur.com/gtz6oZc.png)

Delete a post:

![delete-post](https://i.imgur.com/BfonEHp.png)

## Comments

Get all comments for a post:

![all-comments](https://i.imgur.com/9eYA5mi.png)

Create a comment for a post:

![create-comment](https://i.imgur.com/1UECfUI.png)

Edit or delete a comment for a post:

![edit-comment](https://i.imgur.com/cFfqJld.png)

# Future Offerings
* Like a post
* Follower system
* Reblogging posts

# Setup
* Clone repo [here](https://github.com/AuchnotOuch/Blogsta)
* CD into the app directory and run `pipenv install` to install back-end dependencies
* Run `flask db upgrade` to run migrations and `flask seed all` to seed database
* Run `flask run` to start server
* CD in the react-app directory and run `npm install` to install front-end dependencies
* Run `npm start`
