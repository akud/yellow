jest.mock('../ForceSimulation');

import ElementSelector from '../ElementSelector';

import MockSimulation, {
  resetMockSimulation,
  getElementIds,
  getGroupElementIds,
} from '../ForceSimulation';

describe('ElementSelector', () => {
  let simulation;

  beforeEach(() => {
    resetMockSimulation();
    simulation = new MockSimulation();
  });

  describe('validate', () => {
    it('allows only valid definitions', () => {
      expect(ElementSelector.validate('all')).toEqual('all');
      expect(ElementSelector.validate({ id: 'asdf' })).toEqual({ id: 'asdf' });
      expect(ElementSelector.validate({ ids: ['asdf'] })).toEqual({ ids: ['asdf'] });
      expect(ElementSelector.validate({ groupId: 'asdf' })).toEqual({ groupId: 'asdf' });
      expect(ElementSelector.validate({ groupIds: ['asdf'] })).toEqual({ groupIds: ['asdf'] });

      expect(() => ElementSelector.validate({ foo: ['asdf'] })).toThrow();
      expect(() => ElementSelector.validate()).toThrow();
    });
  });

  describe('select', () => {
    it('can select all elements', () => {
      getElementIds.mockReturnValue([ '1', '3' ]);
      expect(ElementSelector.select('all', simulation)).toEqual(['1', '3']);
      expect(getElementIds).toHaveBeenCalledOnce();
      expect(getGroupElementIds).not.toHaveBeenCalled();
    });

    it('can select elements by id', () => {
      expect(ElementSelector.select({ id: 'e1' }, simulation)).toEqual(['e1']);
      expect(getElementIds).not.toHaveBeenCalled();
      expect(getGroupElementIds).not.toHaveBeenCalled();
    });

    it('can select elements by id array', () => {
      expect(
        ElementSelector.select({ ids: [ 'e1', 'e45' ], }, simulation)
      ).toEqual(['e1', 'e45']);
      expect(getElementIds).not.toHaveBeenCalled();
      expect(getGroupElementIds).not.toHaveBeenCalled();
    });

    it('can select elements by group id', () => {
      getGroupElementIds.mockReturnValue(['45', 'gr']);
      expect(ElementSelector.select({ groupId: 'g1' }, simulation)).toEqual(['45', 'gr']);
      expect(getElementIds).not.toHaveBeenCalled();
      expect(getGroupElementIds).toHaveBeenCalledOnceWith('g1');
    });

    it('can select elements by array of group ids', () => {
      getGroupElementIds
        .mockReturnValueOnce([ 'e1', 'e3', 'e67' ])
        .mockReturnValueOnce([ 'e9', 'e8', 'e7' ])
        .mockReturnValueOnce([ 'e98', 'e19234' ]);

      expect(
        ElementSelector.select({ groupIds: [ 'g1', 'g45', 'g_ab' ], }, simulation)
      ).toEqual([
        'e1',
        'e3',
        'e67',
        'e9',
        'e8',
        'e7',
        'e98',
        'e19234',
      ]);
      expect(ElementSelector.select({ id: 'e1' }, simulation)).toEqual(['e1']);
      expect(getElementIds).not.toHaveBeenCalled();
      expect(getGroupElementIds).toHaveBeenCalledWith('g1');
      expect(getGroupElementIds).toHaveBeenCalledWith('g45');
      expect(getGroupElementIds).toHaveBeenCalledWith('g_ab');
      expect(getGroupElementIds).toHaveBeenCalledTimes(3);
    });
  });
});
