const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

const jsLoaders = () => {
  const loaders = ['babel-loader'];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

module.exports = {
  mode: 'development',
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js'),
    assetModuleFilename: 'images/[hash][ext][query]',
    publicPath: '',
  },

  resolve: {
    alias: {
      blocks: path.resolve(__dirname, 'src/blocks'),
      icons: path.resolve(__dirname, 'src/icons'),
      images: path.resolve(__dirname, 'src/images'),
      components: path.resolve(__dirname, 'src/components'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },

  devtool: isDev ? 'source-map' : false,
  // Настройки dev server
  devServer: {
    // static - туда, куда будет смотреть сервер
    static: path.resolve(__dirname, './dist'),
    compress: true,
    hot: isDev,
    port: 8080,
    open: false,
  },

  module: {
    rules: [
      // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: jsLoaders(),
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: /node_modules/,
      },

      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
};
