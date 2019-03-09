import React from 'react';

import { FixedDistanceConstraint, PreventCollisionsConstraint } from '../Constraints';

import SimulationConfig from 'simulation/SimulationConfig';
import {
  FixedDistanceConstraintDefinition,
  PreventCollisionsConstraintDefinition
} from 'simulation/ConstraintDefinition';

import { shallow } from 'enzyme';

describe('Constraints', () => {
  describe('FixedDistanceConstraint', () => {
    it('returns config with a fixed distance constraint', () => {
      const wrapper = shallow(
        <FixedDistanceConstraint
          firstElementId='91'
          secondElementId='465'
          distance={50}
        />
      );
      expect(wrapper.instance().getSimulationConfig()).toEqual(
        new SimulationConfig({
          constraints: [
            new FixedDistanceConstraintDefinition({
              between: ['91', '465'],
              distance: 50
            })
          ],
        })
      );
    });
  });

  describe('PreventCollisionsConstraint', () => {
    it('returns config with a prevent collisions constraint', () => {
      const wrapper = shallow(
        <PreventCollisionsConstraint elementId='434' />
      );
      expect(wrapper.instance().getSimulationConfig()).toEqual(
        new SimulationConfig({
          constraints: [
            new PreventCollisionsConstraintDefinition({
              elementId: '434',
            })
          ],
        })
      );
    });
  });
});
