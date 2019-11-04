const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const moduleFileExtensions = [
	"js",
	"json"
];

module.exports = {
	mode: "development",
	entry: "./app/index",
	devtool: "cheap-module-source-map",

	output: {
		path: path.resolve(__dirname, "public"),
		filename: "assets/js/[name].js",
		publicPath: "/"
	},

	resolve: {
		modules: [ "node_modules" ].concat([
			path.resolve(__dirname, "app"),
			path.resolve(__dirname, "assets/scss")
		]),

		extensions: moduleFileExtensions.map(ext => `.${ext}`)
	},

	target: "web",

	module: {
		rules: [
			{
				oneOf: [
					{
						test: /\.js$/,
						include: path.resolve(__dirname, "app"),
						loader: "babel-loader",
						options: {
							cacheDirectory: true,
							cacheCompression: false,
							compact: false,
							
							presets: [ "@babel/preset-env" ],
							plugins: [
								"@babel/plugin-proposal-class-properties"
							]
						}
					}
				]
			}
		]
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin(
			Object.assign({}, {
				inject: true,
				template: path.resolve(__dirname, "assets/index.html")
			})
		),
		new webpack.HotModuleReplacementPlugin()
	],

	devServer: {
		compress: true,
		contentBase: path.resolve(__dirname, "public"),
		watchContentBase: true,
		hot: true,
		publicPath: "/",
		quiet: true,
		https: false,
		overlay: false,
		historyApiFallback: {
			disableDotRule: true
		},
		port: 9000
	}
};
