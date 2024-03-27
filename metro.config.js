// metro.config.js
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();
  return {
    ...defaultConfig,
    // Add any additional configuration here
  };
})();