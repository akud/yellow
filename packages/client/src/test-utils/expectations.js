const diff = require('jest-diff');
const deepEqual = require('deep-equal');

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

export const toHaveBeenCalledOnceWith = function(mock, ...expectedArgs) {
  if (!this) { return; }
  const callCount = mock.mock.calls.length;
  if (callCount !== 1) {
    return expectationResult.call(this, {
      expected: 1,
      received: callCount,
      pass: this.isNot ? true : false,
      name: 'toHaveBeenCalledOnceWith',
      description: 'one call with ' + this.utils.stringify(expectedArgs),
    });
  }

  const actualArgs = mock.mock.calls[0];

  return expectationResult.call(this, {
    expected: expectedArgs,
    received: actualArgs,
    pass: this.equals(expectedArgs, actualArgs),
    name: 'toHaveBeenCalledOnceWith',
    description: 'one call with ' + this.utils.stringify(expectedArgs),
  });
};

export const toAlmostEqual = function(received, expected, precision) {
  if (!this) { return; }

  precision = precision || 4;

  let pass = deepAlmostEqual(received, expected, precision);
  pass = this.isNot ? !pass : pass;

  return expectationResult.call(this, {
    expected,
    received,
    pass,
    name: 'toAlmostEqual',
    description: 'almost ' + JSON.stringify(expected)
  });
}


export const toEqualWithoutOrder = function(received, expected) {
  if (!this) { return; }

  let pass;
  if (Array.isArray(received)) {
    pass = (received.length == expected.length) && expected.every(
      (element, index) => {
        const expectedCount = expected
          .filter(e => deepEqual(element, e))
          .reduce((c, a) => c + 1, 0)
        const actualCount = received
          .filter(e => deepEqual(element, e))
          .reduce((c, a) => c + 1, 0)
        return expectedCount == actualCount;
      }
    );
  } else {
    pass = false;
  }

  pass = this.isNot ? !pass : pass;

  const sorter = (a, b) => {
    const stringifiedA = JSON.stringify(a);
    const stringifiedB = JSON.stringify(b);
    return stringifiedA.localeCompare(stringifiedB);
  };

  return expectationResult.call(this, {
    expected: expected.sort(sorter),
    received: Array.isArray(received) ? received.sort(sorter) : received,
    pass,
    name: 'toEqualWithoutOrder',
    description: 'equalWithoutOrderTo ' + JSON.stringify(expected)
  });
}


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
          ? `Difference:\n\n${difference}`
          : `Expected: ${this.utils.printExpected(expected)}\n` +
          `Received: ${this.utils.printReceived(received)}`)
      );
    };

  return {actual: received, message, pass};
}

const deepAlmostEqual = (a, b, precision) => {
  if (a === undefined || a === null) {
    return b === undefined || b === null;
  } else if (typeof a == 'number') {
    return a.toFixed(precision) === (b || 0).toFixed(precision);
  } else if (typeof a == 'string') {
    return a === b;
  } else if (Array.isArray(a)) {
    return Array.isArray(b) && a.every(
      (element, index) => deepAlmostEqual(element, b[index], precision)
    );
  } else {
    return Object.keys(a).every(
      key => deepAlmostEqual(a[key], (b || {})[key], precision)
    );
  }
}

export default {
  toHaveBeenCalledTimes,
  toHaveBeenCalledOnce,
  toHaveBeenCalledOnceWith,
  toAlmostEqual,
  toEqualWithoutOrder,
}
