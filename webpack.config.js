const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = process.env.NODE_ENV
const isPro = env === 'production'

module.exports = {
  entry: './js/index.js',
  mode: env, // 打包环境---开发环境
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
    publicPath: isPro ? './' : '', // 打包后的文件路径
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // 指定HTML模板文件的位置
      filename: 'index.html', // 输出的HTML文件名
      inject: 'body', // 将JS文件注入到body标签中
      options: {
        // 可以在这里添加额外的HTML选项
        baseurl: env === 'development' ? 'dist' : 'public',
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist/public'),
        },
        {
          from: path.resolve(__dirname, 'images'),
          to: path.resolve(__dirname, 'dist/images'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // 使用babel-loader来转译JS文件
          options: {
            presets: ['@babel/preset-env'], // 使用env预设来转译现代JS语法到旧版本浏览器兼容的代码
          },
        },
      },
    ],
  },
  devServer: {
    static: './dist', // 指定静态文件目录
    hot: true, // 启用热模块替换（HMR）功能
    host: '127.0.0.1',
    port: 8081,
    open: true, // 自动打开浏览器
  },
}
