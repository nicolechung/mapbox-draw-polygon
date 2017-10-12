const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const env = require('./env')
const config = require('../webpack/dev.config.js')
const path = require('path')

config.plugins =
[new webpack.HotModuleReplacementPlugin()].concat(config.plugins || [])

for (let entryName in config.entry) {
  config.entry[entryName] =
    [
      ('webpack-dev-server/client?http://localhost:' + env.PORT),
      'webpack/hot/dev-server'
    ].concat(config.entry[entryName])
}

const compiler = webpack(config)

const server =
new WebpackDevServer(compiler, {
  hot: true,
  contentBase: path.join(__dirname, '../dev'),
  headers: { 'Access-Control-Allow-Origin': '*' }
})

server.listen(env.PORT)
