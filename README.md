# cached-got

Incredibly simple caching wrapper around [got](https://github.com/sindresorhus/got).

## Install

This module has a peerDependency on `got` so you can use whatever version you want.

```
$ yarn add cached-got got
```


## Usage

```js
const cached = require('cached-got');
const { got } = cached('file-cache.json');

await got('http://google.com');
```

The function `cached` takes the path of a file that will be used to store the response body of your requests.
