const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    server: './src/server/server.ts',
    'public/bundle': './src/react/index.tsx',
  },
  target: 'node',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      'mongodb-client-encryption': false,
      aws4: false,
      socks: false,
      snappy: false,
      'gcp-metadata': false,
      '@aws-sdk/credential-providers': false,
      '@mongodb-js/zstd': false,
      kerberos: false,
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/index.html', to: './' },
        { from: 'public', to: './public' },
      ],
    }),
  ],
}
