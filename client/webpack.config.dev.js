var path = require('path'),
    webpack = require('webpack')

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        './client/src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
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
                test: /\.js?$/,
                loader: 'babel',
                include: path.join(__dirname, 'src'),
                query: {
                    stage: 0,
                    plugins: ['react-transform'],
                    extra: {
                        'react-transform': [
                            {
                                'target': 'react-transform-hmr',
                                'imports': ['react'],
                                'locals': ['module']
                            }
                        ]
                    }
                }
            }
        ]
    }
}
