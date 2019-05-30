const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
	devtool: "devtool: 'source-map'",
	entry: ["babel-polyfill", "./src/index.js"],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [

			{
				test: /\.(js|jsx|mjs)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/react', '@babel/env']
					}
				}
			},

			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							options: {
								modules: true,
								camelCase: 'only',
								importLoaders: 2,
								localIdentName: '[local]'
							},
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							camelCase: 'only',
							importLoaders: 2,
							localIdentName: '[local]--[hash:base64:5]'
						},
					},
					'less-loader'
				]
			}
		]
	},
	devServer: {
		historyApiFallback: true,
		https: true,
		port: "443",
		allowedHosts: [
			'test.com'
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html',
			minify   : {
				html5                          : true,
				collapseWhitespace             : true,
				minifyCSS                      : true,
				minifyJS                       : true,
				minifyURLs                     : false,
				removeAttributeQuotes          : true,
				removeComments                 : true,
				removeEmptyAttributes          : true,
				removeOptionalTags             : true,
				removeRedundantAttributes      : true,
				removeScriptTypeAttributes     : true,
				removeStyleLinkTypeAttributese : true,
				useShortDoctype                : true
			}
		}),
		new ErrorOverlayPlugin()
	]
};
