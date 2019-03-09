import React from 'react';
import { shallow } from 'enzyme';
import PointNode from '../PointNode';

import Point from 'shapes/Point';
import SimulationConfig from 'simulation/SimulationConfig';

describe('PointNode', () => {
  describe('getSimulationConfig', () => {
    it('returns a simple point configuration', () => {
      const wrapper = shallow(<PointNode nodeId='1234' />);
      expect(wrapper.instance().getSimulationConfig()).toEqual(new SimulationConfig({
        elementIds: ['1234'],
        elementShapes: {
          '1234': new Point(),
        }
      }));
    });
  });
});
