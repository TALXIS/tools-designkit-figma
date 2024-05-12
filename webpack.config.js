const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',
  
  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map',
      entry: {
          ui: './src/index.tsx', // The entry point for your UI code
          code: './src/plugin/controller.ts', // The entry point for your plugin code
      },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        { 
          test: /\.css$/, 
          use: ['style-loader', 
          { 
            loader: 'css-loader' 
          }] 
        },
        { 
          test: /\.(png|jpg|gif|webp|svg)$/, 
          loader: 'url-loader' 
        },
      ]
    },
    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.css'],
      fallback: {
        process:false,
        "http": false,
        https:false,
        buffer: require.resolve('buffer/')
      },
    },
    output: {
      filename: '[name].js',
      sourceMapFilename: "[name].js.map",
      path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production',
    optimization: {
      nodeEnv: argv.mode === 'production' ? 'production' : 'development',
      minimize: argv.mode === 'production',
      usedExports: true,
      concatenateModules: true
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        filename: 'ui.html',
        chunks: ['ui'],
        cache: argv.mode === 'production',
      }),
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  });