const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: '/'
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
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            }
        ]
    }
}