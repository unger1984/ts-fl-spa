/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');
const uuid = require('uuid');

require('dotenv').config();

module.exports = {
	mode: 'production',
	output: {
		filename: `js/[name].js?v=[chunkhash:4]`,
		path: path.resolve(__dirname, '../', 'dist'),
		chunkFilename: `js/[name].[chunkhash].js`,
		publicPath: '/',
	},
	devtool: 'source-map',
	optimization: {
		minimizer: [
			new TerserPlugin({
				// Use multi-process parallel running to improve the build speed
				// Default number of concurrent runs: os.cpus().length - 1
				parallel: true,
				// Enable file caching
				cache: true,
				sourceMap: true,
			}),
			new OptimizeCSSAssetsPlugin(),
		],
		// Automatically split vendor and commons
		// https://twitter.com/wSokra/status/969633336732905474
		// https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
						const packageName = match ? match[1] : uuid();

						// npm package names are URL-safe, but some servers don't like @ symbols
						return `npm.${packageName.replace('@', '')}`;
					},
				},
			},
		},
		// Keep the runtime chunk seperated to enable long term caching
		// https://twitter.com/wSokra/status/969679223278505985
		runtimeChunk: true,
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			__URL_BACKEND__: JSON.stringify(''),
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `css/[name].[contenthash].css`,
			chunkFilename: `css/[id].[contenthash].css`,
		}),
	],
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: function() {
								return [autoprefixer('last 2 versions')];
							},
						},
					},
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [path.resolve(__dirname, '../src/scss/_mixins.scss')],
						},
					},
				],
			},
		],
	},
};
