const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const entry = {
    login: './src/auth/login',
    // booking: './src/admin/booking.ts',
    main: './src'
}

const htmlWebpackPlugIn = [];
for (const key in entry) {
    htmlWebpackPlugIn.push(new HtmlWebpackPlugin({
        template: 'src/html/chunk.html',
        publicPath: '/dist',
        filename: path.join('..', '..', 'dist', `${key}_chunk.html`),
        scriptLoading: 'blocking',
        chunks: [key]
    }))
}

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry,
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                use: 'ts-loader',
                exclude: [
                    /node_modules/
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader', 
                    'css-loader'
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias: {
            '@common': path.resolve(__dirname, 'src', 'common')
        },        
        extensions: ['.js', '.ts']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public', 'dist'),
        publicPath: 'dist'
    },
};