const {
  override,
  fixBabelImports,
  addWebpackAlias
} = require('customize-cra')
const path = require('path')

module.exports = override(
  // enable legacy decorators babel plugin
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  })
)