import utils from '../utils';

describe('utils', () => {
  describe('requirePresent', () => {
    it('requires the argument to be present', () => {
      expectThrows(utils.requirePresent, ['coolArg', undefined], 'Expected coolArg to be present; got undefined.');
      expectThrows(utils.requirePresent, ['coolArg', null], 'Expected coolArg to be present; got null.');
      expectReturnsArgument(utils.requirePresent, ['coolArg', 'asdf']);
    });

    it('handles only one argument', () => {
      expectHandlesOnlyOneArgument(utils.requirePresent, [
        { input: undefined, isValid: false},
        { input: null, isValid: false},
        { input: 'asdf', isValid: true},
      ]);
    });
  });

  describe('requireArray', () => {
    it('requires the argument to be an array', () => {
      expectThrows(utils.requireArray, ['name', undefined], 'Expected name to be an array; got undefined.');
      expectThrows(utils.requireArray, ['name', 'asdf'], 'Expected name to be an array; got "asdf".');
      expectReturnsArgument(utils.requireArray, ['name', []]);
      expectReturnsArgument(utils.requireArray, ['name', ['1']]);
      expectReturnsArgument(utils.requireArray, ['name', ['1', '2']]);

      expectHandlesOnlyOneArgument(utils.requireArray, [
        { input: undefined, isValid: false},
        { input: 'asdf', isValid: false},
        { input: ['asdf'], isValid: true},
      ]);
    });
  });

  describe('requireArrayOfLength', () => {
    it('requires the argument to be an array of the specified length', () => {
      const requireWithLengthOne = (...input) => {
        input = input.concat([1]);
        return utils.requireArrayOfLength(...input)
      };

      expectThrows(requireWithLengthOne, ['name', undefined], 'Expected name to be an array; got undefined.');
      expectThrows(requireWithLengthOne, ['name', 'asdf'], 'Expected name to be an array; got "asdf".');
      expectThrows(requireWithLengthOne, ['name', []], 'Expected name to be an array of length 1; got [].');
      expectThrows(requireWithLengthOne, ['name', ['1', '2']], 'Expected name to be an array of length 1; got ["1","2"].');
      expectReturnsArgument(requireWithLengthOne, ['name', ['1']]);
      expectReturnsArgument(requireWithLengthOne, [['1']]);
    });
  });

  const expectHandlesOnlyOneArgument = (func, testCases) => {
    testCases.forEach(testCase => {
      testCase = Object.assign(
        {},
        testCase,
        { input: [testCase.input] }
      );
      return expectHandlesTestCase(func, testCase)
    });
  };

  const expectHandlesTestCase = (func, testCase) => {
    if (testCase.isValid) {
      expectReturnsArgument(func, testCase.input);
    } else {
      expectThrows(func, testCase.input, testCase.message);
    }
  };

  const expectThrowsOnOneInput = (func, input, expectedMessage) => {
    expectThrows(func, [input], expectedMessage);
  }

  const expectThrows = (func, input, expectedMessage) => {
    if (!Array.isArray(input)) {
      input = [input];
    }
    expectedMessage = expectedMessage || 'Expected';
    const assertionError = `Expected an error containing '${expectedMessage}' on input ${input}`;
    expect(() => func(...input), assertionError).toThrow(expectedMessage);
  };

  const expectReturnsArgument = (func, input) => {
    if (!Array.isArray(input)) {
      input = [input];
    }

    const expected = input[input.length - 1];
    const assertionErrorMessage = `Expected to return input value ${JSON.stringify(expected)} on input ${JSON.stringify(input)}`;
    expect(func(...input), assertionErrorMessage).toEqual(expected);
  };
});
