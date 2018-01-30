require('dotenv').config()

var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    webpack = require('webpack'),
    config = require('./webpack.config.dev'),
    PORT = 5000;

var app = express(),
    compiler= webpack(config);

require('./server/config/dbConnection')

app.use(bodyParser.json())
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))
app.use(require('webpack-hot-middleware')(compiler))

// api routes
require('./server/config/routes')(app)

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.listen(PORT, 'localhost', (err) => {
    if (err) {
        console.log('there was an error!', err)
        return
    } else {
        console.log(`Server running on port ${PORT}`)
    }
})
