// webpack.config.js
module.exports = {
  // other configurations...
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          /node_modules\/@tatumio\/tatum/,
        ],
        options: {
          suppress: true,
        },
      },
    ],
  },
  resolve: {
    fallback: {
      "source-map-support": false,
    },
  },
  // other configurations...
};
