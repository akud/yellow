jest.mock('d3-force');
jest.mock('simulation/SimulatedEdge');
jest.mock('simulation/SimulatedNode');

import * as forces from '../forces';

import * as d3 from 'd3-force';
import MockSimulatedEdge from 'simulation/SimulatedEdge';
import MockSimulatedNode from 'simulation/SimulatedNode';

describe('forces', () => {
  describe('LinkForce', () => {
    let d3ForceLink;

    beforeEach(() => {
      d3ForceLink = {
        distance: jest.fn(),
        id: jest.fn(),
      };
      d3ForceLink.distance.mockReturnValue(d3ForceLink);
      d3ForceLink.id.mockReturnValue(d3ForceLink);
      d3.forceLink.mockReturnValue(d3ForceLink);
    });

    it('passes distance and id to d3', () => {
      const edges = [
        new MockSimulatedEdge(),
        new MockSimulatedEdge(),
        new MockSimulatedEdge(),
      ];

      const linkForce = new forces.LinkForce(edges);

      expect(linkForce.getName()).toEqual('link');
      expect(linkForce.getForce()).toBe(d3ForceLink);

      expect(d3.forceLink).toHaveBeenCalledWith(edges);
      expect(d3ForceLink.distance).toHaveBeenCalledWith(expect.functionThatReturns([
        { input: { getDistance: () => 1 }, output: 1 },
        { input: { getDistance: () => 45 }, output: 45 },
      ]));
      expect(d3ForceLink.id).toHaveBeenCalledWith(expect.functionThatReturns([
        { input: { id: 1 }, output: 1 },
        { input: { id: 45 }, output: 45 },
      ]));
    });
  });

  describe('CollisionForce', () => {
    let d3ForceCollide;

    beforeEach(() => {
      d3ForceCollide = {
        radius: jest.fn(),
      };
      d3ForceCollide.radius.mockReturnValue(d3ForceCollide);
      d3.forceCollide.mockReturnValue(d3ForceCollide);
    });

    it('passes the radius to d3', () => {
      const collisionForce = new forces.CollisionForce();

      expect(collisionForce.getName()).toEqual('collision');
      expect(collisionForce.getForce()).toBe(d3ForceCollide);

      expect(d3ForceCollide.radius).toHaveBeenCalledWith(expect.functionThatReturns([
        { input: new MockSimulatedNode({ radius: 1 }), output: 1 },
        { input: new MockSimulatedNode({ radius: 45 }), output: 45 },
      ]));
    });
  });

  describe('CenteringForce', () => {
    it('creates a force towards the provided center', () => {
      const d3ForceCenter = jest.fn();
      d3.forceCenter.mockReturnValue(d3ForceCenter);

      const centeringForce = new forces.CenteringForce({ x: 25, y: 50 });

      expect(centeringForce.getName()).toEqual('center');
      expect(centeringForce.getForce()).toBe(d3ForceCenter);

      expect(d3.forceCenter).toHaveBeenCalledWith(25, 50);
    });
  });

  describe('RepellingForce', () => {
    it('creates a forceManyBody', () => {
      const d3ForceManyBody = jest.fn();
      d3.forceManyBody.mockReturnValue(d3ForceManyBody);

      const repellingForce = new forces.RepellingForce();

      expect(repellingForce.getName()).toEqual('charge');
      expect(repellingForce.getForce()).toBe(d3ForceManyBody);

      expect(d3.forceManyBody).toHaveBeenCalled();
    });
  });
});
