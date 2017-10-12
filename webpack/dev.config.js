const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./base.config')

const config = baseConfig({
  output: { path: path.join(__dirname, '../dev') },
  globals: {
    'process_env': {
      NODE_ENV: '"development"'
    }
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]
})

config.watch = true

module.exports = config
