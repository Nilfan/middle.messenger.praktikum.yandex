// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
const production = (process.env.WEBPACK_ENV || process.env.NODE_ENV) === 'production'

module.exports = {
  mode: production ? 'production' : 'development',
  entry: path.join(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'messenger.bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'handlebars': 'handlebars/dist/cjs/handlebars',
    }
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html',
    hash: true,
  })],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    proxy: [{
      context: ['/proxy-api/**'],
      target: 'https://proxy-api/api/',
      pathRewrite: {
        '^/api/': '/'
      },
      secure: false,
      onProxyReq: proxyReq => {
        proxyReq.setHeader('Host', 'my-custom-host');
      },
    }],
    https: true,
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
          },
        }, ],
        exclude: /(node_modules)/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ]
  },
}