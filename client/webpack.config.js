const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point of your React app
  output: {
    path: path.resolve(__dirname, 'build'), // Output directory
    filename: 'bundle.js', // Output bundle file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel to transpile JavaScript
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Use CSS loaders for importing CSS files
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML template for injecting script tags
      favicon: './public/favicon.ico',
      manifest: './public/manifest.json',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'), // Serve from the build directory
    },
    hot: true, // Enable HMR (Hot Module Replacement)
    port: 3000, // Port to run the dev server
  },
};
