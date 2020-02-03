const path = require('path'),
	  webpack = require('webpack'),
	  HtmlWebPackPlugin = require('html-webpack-plugin'),
	  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	  {CleanWebpackPlugin} = require('clean-webpack-plugin'),
	  CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = function(env, argv) {
    const devMode = env.NODE_ENV !== 'production';

    const plugins = [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, './src/index.html'), // path to index tpl file
            filename: 'index.html', // the name which we want to have in build folder
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : 'assets/css/[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : 'assets/css/[id].[hash].css',
        }),
        new CopyWebpackPlugin([
            { from: 'app/assets/images', to: 'assets/images' },
            { from: 'app/assets/fonts', to: 'assets/fonts' },
        ]),
        new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
    ];

    const definedVariables = {
        'process.env': {
            NODE_ENV: JSON.stringify(env.NODE_ENV) || 'development',
        },
    };

    if (!devMode) {
        definedVariables['process.env'].NODE_ENV = JSON.stringify(env.NODE_ENV) || 'production';
    }

    plugins.push(new webpack.DefinePlugin(definedVariables));

    const rules = [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            },
        },
        {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: { minimize: true },
            }, ],
        },
        {
            test: /\.(sa|sc)ss$/,
            use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader', // translates CSS into CommonJS
                'sass-loader', // compiles Sass to CSS
                'postcss-loader',
            ],
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
            ],
        },
    ];

    return {
        mode: devMode ? 'development' : 'production',
        devtool: devMode ? 'eval' : 'source-maps', // https://webpack.js.org/configuration/devtool/
        context: path.resolve(__dirname, 'src'),
        entry: [
            './app/index.js',
            './app/assets/styles/main.scss',
        ],
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'assets/js/[name].[contenthash:8].js',
           // filename: 'assets/js/bundle.js',
            publicPath: '/',
        },
        module: {
            rules: rules,
        },
       devServer: {
            historyApiFallback: true,
            disableHostCheck: true,
            port: 8080,
            proxy: {
                '/api/*': {
                    target: 'http://localhost:3000',
                    pathRewrite: {
                        '/api': '',
                    },
                },
            },
        },
        plugins: plugins,
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 300,
            poll: 1000
        },

    };
};