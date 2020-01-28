import path from 'path';

import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SVGSpritemapPlugin from 'svg-spritemap-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import sass from 'sass';

export default (argv, mode) => ({
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `scripts/[name].[hash:8].js`,
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMaps: true
          }
        },
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          inlineRequires: '/images/',
          rootRelative: './src/templates/',
          partialDirs: ['./src/templates/']
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sourceMap: true
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        include: [
          path.resolve(__dirname, 'src/assets/images')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'images/',
              esModule: false
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {}
      }
    }),
    new MiniCssExtractPlugin({
      filename: `styles/[name].[hash:8].css`,
      esModule: true,
    }),
    new SVGSpritemapPlugin(
      path.resolve(__dirname, 'src/assets/images/icons/**/*.svg'), {
        output: {
          filename: 'images/icons.svg',
          svgo: true
        },
        sprite: {
          prefix: 'svg-'
        }
      }
    ),
    new ImageminPlugin({
      test: '/\.(jpe?g|png|gif)$/i'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.hbs'),
      preload: false,
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/images/favicon.png',
      outputPath: '/images/',
      prefix: '/images/',
      cache: mode !== 'development'
    })
  ]
})
