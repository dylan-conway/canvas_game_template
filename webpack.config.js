const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'static/bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, 'templates'),
        compress: true,
        port: 5050
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg|ico)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: 'static/images/[name].[ext]'
                    }
                }]
            }
        ]
    }
}