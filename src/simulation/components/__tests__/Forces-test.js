import React from 'react';

import { CenteringForce, RepellingForce } from '../Forces';

import SimulationConfig from 'simulation/SimulationConfig';
import { CenteringForceDefinition, RepellingForceDefinition } from 'simulation/ForceDefinition';

import { shallow } from 'enzyme';

describe('Forces', () => {
  describe('CenteringForce', () => {
    it('returns config with a centering force definition', () => {
      const wrapper = shallow(<CenteringForce center={{ x: 45, y: 91 }} />);
      expect(wrapper.instance().getSimulationConfig()).toEqual(
        new SimulationConfig({
          forces: [new CenteringForceDefinition({ x: 45, y: 91 })],
        })
      );
    });
  });

  describe('RepellingForce', () => {
    it('returns config with a repelling force definition', () => {
      const wrapper = shallow(<RepellingForce />);
      expect(wrapper.instance().getSimulationConfig()).toEqual(
        new SimulationConfig({
          forces: [new RepellingForceDefinition()],
        })
      );
    });
  });
});
