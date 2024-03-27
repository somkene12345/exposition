// metro.config.js
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();
  return {
    ...defaultConfig,
    // Specify the entry file for your React Native app
    entry: './App.js',
  };
})();