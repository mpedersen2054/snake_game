
var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    config = require('./webpack.config.dev'),
    PORT = 5000;

var app = express(),
    compiler= webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.listen(PORT, 'localhost', (err) => {
    if (err) {
        console.log('there was an error!', err)
        return
    } else {
        console.log(`Server running on port ${PORT}`)
    }
})
