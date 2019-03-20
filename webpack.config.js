const path = require('path');

const root = pathname => path.resolve(__dirname, pathname);
const devMode = process.env.NODE_ENV !== 'production';
const excludePaths = [/node_modules/];

module.exports = {
    mode: process.env.NODE_ENV,

    devtool: devMode ? 'source-map' : false,

    context: root('src'),

    entry: {
        index: root('src/sunglass.js')
    },

    output: {
        path: root('dist'),
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: excludePaths,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread',
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }
            }
        ]
    },

    plugins: [
    ]
}
