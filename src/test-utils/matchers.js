import { AsymmetricMatcher } from 'expect/build/asymmetric_matchers';

class FunctionReturnValueMatcher extends AsymmetricMatcher {
  constructor(testCases) {
    super();
    this.testCases = testCases;
  }

  asymmetricMatch(fn) {
    if (typeof fn !== 'function') {
      return false;
    }
    return this.testCases.every(testCase => fn(testCase.input) == testCase.output);
  }

  toAsymmetricMatcher(){
    return 'Function that maps ' + this.testCases.map(t => `${JSON.stringify(t.input)} => ${JSON.stringify(t.output)}`).join(', ');
  }
}

class FunctionSideEffectMatcher extends AsymmetricMatcher {
  constructor({ before, after, reset }) {
    super();
    this.before = before;
    this.after = after;
    this.reset = reset;
  }

  asymmetricMatch(fn) {
    if (typeof fn !== 'function') {
      return false;
    }
    this.before();
    fn();
    this.after();
    this.reset();
    return true;
  }

  toAsymmetricMatcher(){
    return 'Function with side effects';
  }


}

export default {
  functionThatReturns: testCases => new FunctionReturnValueMatcher(testCases),
  functionWithSideEffect: options => new FunctionSideEffectMatcher(options),
};
