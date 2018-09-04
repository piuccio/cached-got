const got = require('got');
const fs = require('fs');

function openCache(file) {
  try {
    return require(file);
  } catch (ex) {
    return {};
  }
}

function flush(file, content) {
  if (!file) throw new Error('Missing file cache');
  fs.writeFileSync(file, JSON.stringify(content, null, '  '));
}

module.exports = (cacheFile) => {
  let cache = openCache(cacheFile);

  return {
    got: async (url, options) => {
      if (url in cache) {
        return {
          url,
          body: cache[url],
        };
      }

      const response = await got(url, options);
      cache[url] = response.body;
      // handles redirect
      cache[response.url] = response.body;
      flush(cacheFile, cache);
      return response;
    },
    clear() {
      cache = {};
      flush(cacheFile, cache);
    },
  };
};
