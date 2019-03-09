const diff = require('jest-diff');

export const toHaveBeenCalledTimes = function(mock, n) {
  if (!this) { return; }
  const received = mock.mock.calls.length;

  const pass = this.isNot ? received !== n : received === n;

  return expectationResult.call(this, {
    expected: n,
    received,
    pass,
    name: 'toHaveBeenCalledTimes',
    description: n + ' calls',
  });
}

export const toHaveBeenCalledOnce = function(mock) {
  if (!this) { return; }
  const received = mock.mock.calls.length;

  const pass = this.isNot ? received !== 1 : received === 1;

  return expectationResult.call(this, {
    expected: 1,
    received,
    pass,
    name: 'toHaveBeenCalledOnce',
    description: 'one call',
  });
};

const expectationResult = function({ expected, received, pass, name, description }) {
  const options = {
    comment: description,
    isNot: this.isNot,
    promise: this.promise,
  };

  const message = pass
    ? () =>
    this.utils.matcherHint(name, undefined, undefined, options) +
    '\n\n' +
    `Expected: ${this.utils.printExpected(expected)}\n` +
    `Received: ${this.utils.printReceived(received)}`
    : () => {
      const difference = diff(expected, received, {
        expand: this.expand,
      });
      return (
        this.utils.matcherHint(name, undefined, undefined, options) +
        '\n\n' +
        (difference && difference.includes('- Expect')
          ? `Difference:\n\n${diffString}`
          : `Expected: ${this.utils.printExpected(expected)}\n` +
          `Received: ${this.utils.printReceived(received)}`)
      );
    };

  return {actual: received, message, pass};
}


export default {
  toHaveBeenCalledTimes,
  toHaveBeenCalledOnce,
}
