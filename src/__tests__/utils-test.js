import utils from '../utils';

describe('utils', () => {
  describe('requirePresent', () => {
    it('throws if the argument is not present', () => {
      expect(() => utils.requirePresent('coolArg', null)).toThrow('coolArg is required');
      expect(() => utils.requirePresent('coolArg', undefined)).toThrow('coolArg is required');
    });

    it('returns the argument if present', () => {
      expect(utils.requirePresent('coolArg', 'asdf')).toEqual('asdf');
    });

    it('handles only one argument', () => {
      expect(utils.requirePresent('asdf')).toEqual('asdf');
      expect(() => utils.requirePresent(null)).toThrow('is required');
      expect(() => utils.requirePresent(undefined)).toThrow('is required');
    });
  });
});
