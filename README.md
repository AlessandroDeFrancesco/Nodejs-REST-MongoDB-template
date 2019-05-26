# Deploy Your Own REST API in 30 Mins Using mLabs and Heroku

A template to easily deploy a REST server with a MongoDB database to Heroku or on your local machine.

## Heroku Deploy
## Requirements

* [GIT](https://git-scm.com/downloads)
* [Heroku Account](https://signup.heroku.com/)
* [Heroku CLI] (https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
* [mLab account](https://mlab.com/signup/)

## Installation

1. Create a MongoDB database in mLab
2. Create in the MongoDB database a collection named "games"
3. Open a shell and Run `git clone https://github.com/AlessandroDeFrancesco/Nodejs-REST-MongoDB-template.git`
4. Run `heroku create`
5. Run `heroku config:set MONGODB_URI="mongodb://{db_account_username}:{db_account_password}@{db_host}:{db_port}/{db_name}"`. You can find this in the info page in mlab for your db.
6. Run `git push heroku master`
7. Run `heroku ps:scale web=1`
8. Run `heroku open`

## Local Deploy
## Requirements

* [GIT](https://git-scm.com/downloads)
* [Node.js](http://nodejs.org/)
* [MongoDB](https://www.mongodb.com/download-center/community)

## Installation

1. Open a shell and Run `mongo`
2. Run `use gamesDB`
2. Run `db.games.insertOne( { name: "pacman", createDate: new Date() } )`
3. Run `quit()`
4. Run `git clone https://github.com/AlessandroDeFrancesco/Nodejs-REST-MongoDB-template.git`
5. Run `npm install`
6.1 On Linux Ubuntu Run `export MONGODB_URI="mongodb://localhost:27017/gamesDB"`.
6.2 On Windows Powershell Run `$env:MONGODB_URI="mongodb://localhost:27017/gamesDB"`
7. Run `npm start`
8. Open a browser and type the URL "http://localhost:8080/games"
