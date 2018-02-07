require('dotenv').config()

var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    PORT = 5000;

var app = express()
require('./server/config/dbConnection')
app.use(bodyParser.json())

// api routes
require('./server/config/routes')(app)

app.use(express.static(path.join(__dirname, 'client', 'dist')))
// app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html')))

app.listen(PORT, 'localhost', (err) => {
    if (err) {
        console.log('there was an error!', err)
        return
    } else {
        console.log(`Server running on port ${PORT}`)
    }
})
