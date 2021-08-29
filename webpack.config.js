const { resolve } = require('path');
const { BannerPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { name, homepage, version, license } = require('./package.json');

const camelize = (string) => {
  const result = string.replace(/[^a-z]+([a-z])?/gi, (_, letter) =>
    letter ? letter.toUpperCase() : ''
  );
  return result[0].toLowerCase() + result.slice(1);
};

const camelName = camelize(name);

const info = [
  { item: homepage, prefix: '@link' },
  { item: version, prefix: '@version' },
  { item: license, prefix: '@licence' },
];
const banner = info
  .filter(({ item }) => !!item)
  .map(({ item, prefix }) => `${prefix} ${item}`)
  .join(', ');

module.exports = {
  target: 'browserslist',
  entry: {
    [name]: './src/index.ts',
  },
  output: {
    path: resolve(__dirname, 'build'),
    clean: true,
    library: camelName,
    libraryTarget: 'umd',
  },
  plugins: [new MiniCssExtractPlugin(), new BannerPlugin(banner)],
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ca]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.[tj]s$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
