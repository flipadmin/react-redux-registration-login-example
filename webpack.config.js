var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve("cs_admin"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-3"]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body"
    })
  ],
  devServer: {
    historyApiFallback: true,
    publicPath: "/cs_admin/"
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "http://localhost:4000",
      testUrl: "http://api.local.rewardsmatrix.com:8080"
    })
  }
};
