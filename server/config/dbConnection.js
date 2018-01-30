
let mongoose = require('mongoose')
let connectionStr = (process.env.NODE_ENV == 'production')
        ? process.env.DEV_DB_STR
        : process.env.PROD_DB_STR

mongoose.connect(connectionStr)

mongoose.Promise = global.Promise
