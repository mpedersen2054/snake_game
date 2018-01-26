var path = require('path'),
    webpack = require('webpack')

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
                exclude: ['node_modules']
            },
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            }
        ]
    }
}
