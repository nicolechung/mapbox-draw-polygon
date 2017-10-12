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
    extensions: ['.js', '.json']
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
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('style-loader')
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[path][name]__[local]_[hash:base64:5]'
            }
          }
        ]
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
