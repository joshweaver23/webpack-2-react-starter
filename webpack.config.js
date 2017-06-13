const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');

// Set CSS loaders based on Production or Development
let isProd =  process.argv.indexOf('-p') !== -1;
let cssDev = ['style-loader','css-loader', 'sass-loader'];
let cssProd = ExtractTextPlugin.extract({
								fallback: 'style-loader',
								use: ['css-loader', 'sass-loader'],
								publicPath: '/dist'
							});

module.exports = {
	entry: {
		app: './src/app.js',
		bootstrap: isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev,
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: isProd ? cssProd : cssDev
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'file-loader?name=[name].[ext]&publicPath=/&outputPath=images/',
					'image-webpack-loader'
					]
			},
			// { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
    	// { test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
			{ test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?&name=fonts/[name].[ext]" }
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
  	compress: true,
		hot: true,
 		port: 9000,
		stats: 'errors-only'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Josh Weaver Portfolio',
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			excludeChunks: ['contact'],
			template: './src/index.html'
		}),
		new ExtractTextPlugin('/styles/[name].css'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
}