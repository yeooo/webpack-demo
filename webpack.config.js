var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: {
    // index: './src/pages/index/entry.js',
    // my: './src/pages/my/entry.js',
    es6: './src/pages/es6/entry.js'
  },
  output: {
    // path: path.join(__dirname, "js"),
    // filename: "[name].bundle.js",
    // chunkFilename: "[id].chunk.js"
    //chunkFilename: '[id].bundle.js',
    path: __dirname + '/build/',
    filename: '[name]/[name].js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader'
        /*exclude: path.resolve(__dirname, 'node_modules'), //编译时，不需要编译哪些文件*/
        /*include: path.resolve(__dirname, 'src'),//在config中查看 编译时，需要包含哪些文件*/
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      //name=images/[hash:8].[name].[ext] = images/48a0e9f1.1.jpg
      loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
    }, {
      test: /\.(html|htm)$/,
      loader: 'html-loader',
      query: {
        minimize: true
      }
    }, {
      test: /\.jade$/,
      loader: 'pug-loader'
    }]
  },
  devServer: {
    contentBase: './build', //实时刷新目录
    inline: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //输出页面
      minify: {
        "removeAttributeQuotes": true, //删除属性引号
        "removeComments": true,
        "removeEmptyAttributes": true
      },
      chunks: ['es6'],
      template: './src/pages/es6/index.html' //模板文件
    }),
    // new HtmlWebpackPlugin({
    //   filename : 'my/index.html',  //输出页面
    //   chunks : ['my'],
    //   template : './src/pages/my/index.html'  //模板文件
    // }),
    // new HtmlWebpackPlugin({
    //   filename : 'header/index.html',  //输出页面
    //   chunks : [''],
    //   template : './src/module/header/index.html'  //模板文件
    // }),
    // new HtmlWebpackPlugin({
    //   filename : 'es6/index.html',  //输出页面
    //   chunks : ['es6'],
    //   template : './src/pages/es6/index.html'  //模板文件
    // }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    })
  ]
};