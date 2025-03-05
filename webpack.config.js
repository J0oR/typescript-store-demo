const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const loader = require('sass-loader');

module.exports = {
    entry: {
        index: './src/javascript/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(webp|png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'typescript-store-demo',
            template: './src/html/index.html',
            inject: 'body',
        })
    ],
    devServer: {
        port: 8080,
        open: true,
        static: path.resolve(__dirname, 'dist'),
        hot: true,
        watchFiles: ['src/**/*.{html,css,js,ts,png, webp,jpg,jpeg,gif,svg,json}']
    },
    mode: 'development'
}