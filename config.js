module.exports = {
  port: process.env.PORT || 3000,
  //db: process.env.MONGODB_URI || 'mongodb://localhost:27017/letflix',
  db: process.env.MONGODB_URI || 
  	'mongodb://heroku_6llnkqvl:heroku_6llnkqvl@ds121535.mlab.com:21535/heroku_6llnkqvl',
  SECRET_TOKEN: 'letflixapp'
}
