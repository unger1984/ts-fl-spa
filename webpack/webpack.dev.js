/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
	mode: 'development',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../', 'dist'),
		chunkFilename: '[name].js',
		publicPath: '/',
	},
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		contentBase: path.resolve(__dirname, '../', 'dist'),
		compress: true,
		hot: true,
		port: process.env.PORT || 8443,
		https: true,
		cert: path.resolve(__dirname, '../', 'certs/server.crt'),
		key: path.resolve(__dirname, '../', 'certs/server.key'),
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin({
			debug: true,
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			__URL_BACKEND__: JSON.stringify(process.env.URL_BACKEND),
		}),
	],
	module: {
		rules: [
			{
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [path.resolve(__dirname, '../src/scss/_mixins.scss')],
						},
					},
				],
				test: /\.scss$/,
				exclude: /node_modules/,
			},
			{
				use: ['style-loader', 'css-loader'],
				test: /\.css$/,
			},
		],
	},
};
