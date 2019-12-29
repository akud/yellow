import React from 'react';

import GraphStyle from '../GraphStyle';
import Rules from '../../simulation/Rules';

import { shallow } from 'enzyme';

describe('GraphStyle', () => {
  describe('Default', () => {
    it('renders a centering rule and repelling rule', () => {
      const wrapper = shallow(<GraphStyle.Default />);
      expect(wrapper.find(Rules.CenteringRule).length).toBe(1);
      expect(wrapper.find(Rules.RepellingRule).length).toBe(1);
      expect(wrapper.find(Rules.RepellingRule).prop('strength')).toBe(10);
    });
  });
});
