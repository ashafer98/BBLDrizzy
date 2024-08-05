// webpack.config.js
const path = require('path');
const process = require('process');

module.exports = {
  // other configurations...
  resolve: {
    fallback: {
      "process": require.resolve("process/browser")
    }
  },
  // other configurations...
};
