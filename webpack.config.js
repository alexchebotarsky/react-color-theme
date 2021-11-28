const { resolve } = require('path');
const { BannerPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { name, homepage, version, license } = require('./package.json');

/**
 * Split a string into an array of words
 * @param string String to split
 * @returns Array of words
 */
const getWords = (string) => {
  const result = string
    // Separate all first uppercase letters with a dash
    .replace(/([A-Z])[A-Z]*/g, (match) => `-${match}`)
    // Separate all first uppercase letters of that are part of coming after an uppercase word
    .replace(
      /([A-Z]+)([A-Z])(?=[a-z])/g,
      (_, start, letter) => `${start}-${letter}`
    )
    // Split by all non-alphabetical and non-numerical characters
    .split(/[^a-z0-9]/gi)
    // Filter out empty strings (in the beginning or in the end)
    .filter((item) => item !== '');
  return result;
};

/**
 * Convert any string to camelCase
 * @param string String to convert
 * @returns camelCase string
 */
const camelCase = (string) =>
  getWords(string)
    .map((word, i) => {
      if (i === 0) {
        return word.toLowerCase();
      }
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');

const camelName = camelCase(name);

const info = [
  { content: homepage, prefix: '@link ' },
  { content: version, prefix: '@version ' },
  { content: license, prefix: '@licence ' },
];
const banner = info
  .filter(({ content }) => !!content)
  .map(({ content, prefix, postfix }) =>
    [prefix, content, postfix].filter((item) => !!item).join('')
  )
  .join(', ');

module.exports = {
  target: 'browserslist',
  entry: {
    [name]: './src/index.ts',
  },
  output: {
    path: resolve(__dirname, 'build'),
    clean: true,
    // library setup
    library: camelName,
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [new MiniCssExtractPlugin(), new BannerPlugin(banner)],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
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
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  externals: {
    react: 'react',
  },
};
