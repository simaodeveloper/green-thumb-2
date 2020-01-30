import path from 'path';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HandlebarsWebpackPlugin from 'handlebars-webpack-plugin';
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
            sourceMaps: true,
          },
        },
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          inlineRequires: '/images/',
          rootRelative: './src/templates/',
          partialDirs: [
            './src/templates/includes',
            './src/templates/components',
          ],
        },
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
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        include: [path.resolve(__dirname, 'src/assets/images')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'images/',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `styles/[name].[hash:8].css`,
      esModule: true,
    }),
    new SVGSpritemapPlugin(
      path.resolve(__dirname, 'src/assets/images/icons/**/*.svg'),
      {
        output: {
          filename: 'images/icons.svg',
          svgo: true,
        },
        sprite: {
          prefix: 'svg-',
        },
      }
    ),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/images/',
        to: 'images/[name].[ext]',
        ignore: ['icons/'],
      },
    ]),
    new ImageminPlugin({
      test: '/.(jpe?g|png|gif|svg)$/i',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'dist', 'index.html'),
      filename: path.join(__dirname, 'dist', 'index.html'),
      inject: true,
    }),
    new HandlebarsWebpackPlugin({
      entry: path.join(process.cwd(), 'src', 'templates', 'index.hbs'),
      output: path.join(process.cwd(), 'dist', '[name].html'),
      data: path.join(__dirname, 'src/data.json'),
      partials: [
        path.join(process.cwd(), 'src', 'templates', 'includes', '*.hbs'),
        path.join(process.cwd(), 'src', 'templates', 'components', '*.hbs'),
      ],
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/images/favicon.png',
      outputPath: '/images/',
      prefix: '/images/',
      cache: mode !== 'development',
    }),
  ],
});
