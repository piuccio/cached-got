const cached = require('./index');

const { got } = cached('cache.json');

got('https://google.com');
