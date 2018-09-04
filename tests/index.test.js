const path = require('path');
const cached = require('../index');
const originalGot = require('got');

jest.mock('fs');
jest.mock('got', () => {
  const actual = require.requireActual('got');
  return jest.fn((...args) => actual(...args));
});

describe('cached-got', () => {
  it('saves the request to file', async () => {
    const { got, clear } = cached(path.join(__dirname, '../cache.json'));
    clear();

    // Expect the first request to go to got
    const firstResponse = await got('https://google.com');
    expect(originalGot).toHaveBeenCalledWith('https://google.com', undefined);

    // The second time it should be from cache
    jest.clearAllMocks();
    const secondResponse = await got('https://google.com');
    expect(originalGot).not.toHaveBeenCalled();
    expect(firstResponse.body).toEqual(secondResponse.body);
  });
});
