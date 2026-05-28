const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer to a directory inside the project
  // so that Render includes it in the deployed build.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
