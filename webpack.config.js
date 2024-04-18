const path = require('path');

module.exports = {
  resolve: {
    alias: {
      electron: path.resolve(__dirname, 'dummy-electron.js'),
    },
  },
};