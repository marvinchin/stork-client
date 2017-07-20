const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "index.html",
  inject: "body"
});

const ExtractTextPluginConfig = new ExtractTextPlugin("styles.css");

const JQueryPlugin = new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery"
});

module.exports = {
  entry: {
    js: ["babel-polyfill", "whatwg-fetch", "./src/index.jsx"]
  },
  output: {
    path: path.resolve("dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]"
        }
      },
      {
        test: /\.(jpg|png)$/,
        loader: "file-loader",
        options: {
          name: "images/[path][name].[hash].[ext]"
        }
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, ExtractTextPluginConfig, JQueryPlugin],
  devServer: {
    historyApiFallback: {
      index: "/"
    }
  }
};
