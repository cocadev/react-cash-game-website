const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
	devtool: "devtool: 'source-map'",
	mode: 'production',
	entry: ["babel-polyfill", "./src/index.js"],
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
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							options: {
								modules: true,
								camelCase: 'only',
								importLoaders: 2,
								localIdentName: '[hash:base64:5]',
								publicPath: '../'
							},
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules: true,
							camelCase: 'only',
							importLoaders: 2,
							localIdentName: '[hash:base64:5]'
						},
					},
					'less-loader'
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true, // webpack@1.x
							disable: true, // webpack@2.x and newer
							outputPath: 'images/'
						},
					},
				],
			}
		]
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
			}),
			new OptimizeCSSAssetsPlugin({}),
		],
		splitChunks: {
			chunks: 'all',
		},
	},
	output: {
		path: path.resolve(__dirname, 'build/app'),
		filename: 'bundle.js',
		publicPath: '/app',
		chunkFilename: '[name].[chunkhash].js'
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
			},
			favicon: 'src/images/favicon.png'
		}),
		new CompressionPlugin({
			filename: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[name].[contenthash].css',
		}),
		new ErrorOverlayPlugin(),
		new webpack.ProvidePlugin({
			TWEEN: path.resolve(__dirname, './src/helpers/libs/tween.js'),
		}),
		new CleanWebpackPlugin(path.resolve(__dirname, 'build')),
		new ImageminPlugin({}),
		new webpack.HashedModuleIdsPlugin(),

		new CopyWebpackPlugin([
			{ from: path.resolve(__dirname, './src/mainLoginPage'), to: path.resolve(__dirname, 'build')}
		])
	],
};
