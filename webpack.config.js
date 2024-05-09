/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    alias: {
      react: path.join(__dirname, "node_modules", "react"),
    },
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    static: {
      directory: path.join(__dirname, "build"),
      publicPath: "/",
    },
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  // eslint-disable-next-line no-dupe-keys
  resolve: { extensions: [".*", ".js", ".jsx", ".ts", ".tsx"] },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};
