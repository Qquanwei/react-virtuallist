'use strict';
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const args = require('yargs').argv;
const MiniCssPlugin = require('mini-css-extract-plugin');

const env = args.env;
const isDeploy = env === 'production';
const config = {
    entry: {
        test: path.resolve(__dirname, 'app.js')
    },
    output: {
        path: path.resolve(__dirname, '../demo'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    fix: true
                }
            },
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.(css|less)?$/,
                use: [
                    MiniCssPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|cur)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 2560,
                        name: '[path][name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssPlugin({
            filename: '[name].css'
        })
    ],
    devtool: isDeploy ? false : 'inline-source-map'
};
if (isDeploy) {
    config.plugins.push (
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env)
            }
        })
    );
}
module.exports = config;