const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const sourcePath = path.join(__dirname, '../src/')
const rootPath = path.join(__dirname, '../')
const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2'
]

const alias = {
  src: path.join(__dirname, '../src/'),
  components: path.join(__dirname, '../src/components')
}

const options = params => ({
  entry: params.input || {
    background: `${sourcePath}index`
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: params.output.path
  },
  resolve: {
    alias: alias,
    extensions: ['.js']
  },
  module: {
    rules: [
      ...(params.loaders
        ? params.loaders
        : [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                'loader':'babel-loader',
                options: {
                  presets: ['env', 'react'],
                  plugins: [require('babel-plugin-transform-class-properties')]
                }
              }
            }
          ]),
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/,
        modules: true,
        options: {
          includePaths: [
            path.join(__dirname, '../src/')
          ]
        }
      },
      {
        test: new RegExp('(' + fileExtensions.join('|') + ')$'),
        loader: 'file-loader?name=[name].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${rootPath}/index.html`,
      inject: true /* for webpack dev server */
    })
  ].concat(params.plugins),
  node: {
    fs: "empty"
  }
})

module.exports = options
