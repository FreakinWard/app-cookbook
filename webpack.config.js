module.exports = {
    target: "node",
    entry: './src/index.js',
    output: {
        path: `${__dirname}/dist`,
        filename: 'index.js',
        library: 'my-library-name',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
};
