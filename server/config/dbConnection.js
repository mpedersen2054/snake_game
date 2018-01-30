
let db
let mongoose = require('mongoose')
let connectionStr = (process.env.NODE_ENV == 'production')
        ? process.env.PROD_DB_STR
        : process.env.DEV_DB_STR

mongoose.connect(connectionStr)

mongoose.Promise = global.Promise

db = mongoose.connection
db.on('error', console.error.bind(console, 'There was an error connecting to MongoDB.'))
db.once('open', () => console.log('Successfully connected to MongoDB.'))
