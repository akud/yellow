jest.mock('d3-force');
jest.mock('../ForceSimulation');

import {
  clearLinkCache,
  createLinkRule,
} from '../LinkRule';

import * as d3 from 'd3-force';

import MockSimulation, {
  getElementData,
  registerElement,
  registerRule,
  resetMockSimulation,
} from '../ForceSimulation'

describe('LinkRule', () => {

  beforeEach(() => {
    resetMockSimulation();
    clearLinkCache();
    d3.forceLink.mockReset();
    d3.forceLink.mockReturnValue(createLinkForce());
  });

  const createLinkForce = () => {
    let links = [];
    const linkForce = {
      id: jest.fn(),
      distance: jest.fn(),
      links: jest.fn(),
      defaultStrengthFunction: jest.fn().mockReturnValue(10),
      strength: jest.fn(),
    };
    linkForce.id.mockReturnValue(linkForce);
    linkForce.distance.mockReturnValue(linkForce);
    linkForce.links.mockImplementation(function() {
      if (arguments.length) {
        links = arguments[0];
        return linkForce;
      } else {
        return links;
      }
    });
    linkForce.strength.mockImplementation(function() {
      if(arguments.length) {
        return linkForce;
      } else {
        return linkForce.defaultStrengthFunction;
      }
    });
    return linkForce;
  };

  it('returns a function', () => {
    const linkRule = createLinkRule({
      contextId: 'context-1',
      between: [ 'element-1', 'element-2' ],
      distance: 6,
    });
    expect(linkRule).toBeInstanceOf(Function);
  });

  it('aggregates links per context', () => {
    let linkForce1 = createLinkForce();
    let linkForce2 = createLinkForce();

    d3.forceLink
      .mockReturnValueOnce(linkForce1)
      .mockReturnValueOnce(linkForce2);

    createLinkRule({
      contextId: 'context-1',
      between: [ 'element-1', 'element-2' ],
      distance: 42,
    });
    expect(d3.forceLink).toHaveBeenCalledTimes(1);
    expect(linkForce1.links).toHaveBeenCalledTimes(2);
    expect(linkForce2.links).not.toHaveBeenCalled();
    expect(linkForce1.links).toHaveBeenCalledWith();
    expect(linkForce1.links).toHaveBeenCalledWith([
      {
        source: 'element-1',
        target: 'element-2',
        distance: 42,
        strength: 1.0,
      }
    ]);

    createLinkRule({
      contextId: 'context-1',
      between: [ 'element-2', 'element-3' ],
      distance: 192,
      strength: 5.0
    });
    expect(d3.forceLink).toHaveBeenCalledTimes(1);
    expect(linkForce2.links).not.toHaveBeenCalled();
    expect(linkForce1.links).toHaveBeenCalledTimes(4);
    expect(linkForce1.links).toHaveBeenCalledWith();
    expect(linkForce1.links).toHaveBeenCalledWith([
      {
        source: 'element-1',
        target: 'element-2',
        distance: 42,
        strength: 1.0,
      },
      {
        source: 'element-2',
        target: 'element-3',
        distance: 192,
        strength: 5.0,
      },
    ]);

    createLinkRule({
      contextId: 'context-2',
      between: [ 'element-1', 'element-2' ],
      distance: 5,
      strength: 2.0
    });
    expect(d3.forceLink).toHaveBeenCalledTimes(2);
    expect(linkForce1.links).toHaveBeenCalledTimes(4);
    expect(linkForce2.links).toHaveBeenCalledTimes(2);
    expect(linkForce2.links).toHaveBeenCalledWith();
    expect(linkForce2.links).toHaveBeenCalledWith([
      {
        source: 'element-1',
        target: 'element-2',
        distance: 5,
        strength: 2.0,
      }
    ]);
  });

  it('initializes the linkForce when the number of nodes changes', () => {

  });

  it('uses d3.forceLink to calculate forces', () => {

    

  });
});
