const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { integrateWith } = require("./configuration");

module.exports = {
	entry: path.join(path.resolve(__dirname, "src/js"), "app.js"),
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "app.bundle.js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(path.resolve(__dirname, "src"), "index.html")
		}),
		new ExtractTextPlugin("style.bundle.css")
	],
	resolveLoader: {
		alias: {
			"prelude-loader": path.join(__dirname, "custom-loader", "prelude-loader.js")
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader"
					},
					{
						loader: "prelude-loader",
						options: {
							integrateWith,
							pluginDirectory: "src/plugins"
						}
					}
				]
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					use: "css-loader"
				})
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: ["file-loader"]
			}
		]
	},
	resolve: {
		modules: [path.resolve("./"), path.resolve("./node_modules")],
		extensions: [".js", ".jsx"]
	}
};
