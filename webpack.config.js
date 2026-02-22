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
    alias: {
      '@controllers': path.resolve(__dirname, 'src/server/controllers'),
      '@clients': path.resolve(__dirname, 'src/server/clients'),
      '@domain': path.resolve(__dirname, 'src/server/domain'),
      '@use-cases': path.resolve(__dirname, 'src/server/use-cases'),
      '@repository': path.resolve(__dirname, 'src/server/repository'),
      '@stores': path.resolve(__dirname, 'src/server/stores'),
    },
  },
  externals: {
    '@prisma/client': 'commonjs @prisma/client',
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
