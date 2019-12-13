/* eslint-disable @typescript-eslint/no-var-requires */
const eslint = require('eslint');
const path = require('path');
const webpack = require('webpack');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const SvgStore = require('webpack-svgstore-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const UnusedFilesWebpackPlugin = require('unused-files-webpack-plugin').UnusedFilesWebpackPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const CopyPlugin = require('copy-webpack-plugin');

const checkWhy = () => {
	return process.argv.filter(arg => arg === '--why').length > 0;
};

const envs = {
	development: 'dev',
	production: 'prod',
};

const env = envs[process.env.NODE_ENV || 'development'];

module.exports = {
	entry: path.resolve(__dirname, '../', 'src/index.tsx'),
	serve: {
		add: app => {
			app.use(convert(history()));
		},
		content: path.resolve(__dirname, '../', 'src/index.tsx'),
		dev: { publicPath: path.resolve(__dirname, '../', 'dist') },
		open: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		alias: {
			api: path.resolve(__dirname, '../src/api'),
			config: path.resolve(__dirname, '../src/config'),
			scss: path.resolve(__dirname, '../src/scss'),
			components: path.resolve(__dirname, '../src/components'),
			common: path.resolve(__dirname, '../src/components/common'),
			ducks: path.resolve(__dirname, '../src/ducks'),
			utils: path.resolve(__dirname, '../src/utils'),
		},
		plugins: [new DirectoryNamedWebpackPlugin()],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../', `src/index.${env}.html`),
		}),
		new ProgressBarPlugin(),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: 'async',
		}),
		new SvgStore({
			svgoOptions: {
				plugins: [{ removeTitle: true }],
			},
			prefix: 'icon-',
		}),
		new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /en|ru/),
		new UnusedFilesWebpackPlugin({
			globOptions: {
				cwd: path.resolve(__dirname, '../src'),
				ignore: [
					'node_modules/**/*',
					'assets/icon.png', // Favicon
					'assets/*-icon.png', // PWA icon
					'assets/svgSprite/*.svg',
					'index.dev.html',
					'index.prod.html',
				],
			},
		}),
		// new CopyPlugin([
		// 	{
		// 		from: path.resolve(__dirname, '../', 'src/assets/offer.xlsx'),
		// 		to: path.resolve(__dirname, '../', 'dist/offer.xlsx'),
		// 	},
		// ]),
	],
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(ts|tsx)$/,
				loader: 'eslint-loader',
				exclude: /(node_modules)/,
				options: {
					// fix: true,
					formatter: eslint.CLIEngine.getFormatter('stylish'),
					emitWarning: process.env.NODE_ENV !== 'production',
				},
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
						},
					},
				],
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
			{
				test: /\.svg$/,
				rules: [
					{
						issuer: /\.js$/,
						use: 'svg-sprite-loader',
					},
					{
						issuer: /\.scss$/,
						use: 'svg-url-loader',
					},
				],
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8000,
							name: 'images/[hash:8]-[name].[ext]',
						},
					},
				],
			},
		],
	},
};

if (checkWhy()) {
	module.exports.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8890 }));
}
