const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/main/webapp/javascript/Main.jsx'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve('./src/main/resources/static', 'dist')
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader'
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};