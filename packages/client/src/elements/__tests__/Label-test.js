import React from 'react';
import { Label } from '../Label';
import RectangleDefinition from '../geometry/RectangleDefinition';

import { shallow } from 'enzyme';

describe('Label', () => {
  const makeProps = (args) => Object.assign({
    text: 'hello',
    position: newPosition(),
    width: 100,
    height: 20,
  }, args);

  it('renders the provided text', () => {
    const wrapper = shallow(
        <Label {...makeProps({ text: "Hello World!" })} />
    );

    expect(wrapper.find('text').length).toBe(1);
    expect(wrapper.find('text').text()).toEqual('Hello World!');
  });

  it('adjusts the text position based on width and height', () => {
    const wrapper = shallow(
      <Label
        {
          ...makeProps({
            position: point(10, 56),
            width: 42,
            height: 24
          })
        }
      />
    ).update();

    expect(wrapper.find('text').prop('x')).toEqual(-11);
    expect(wrapper.find('text').prop('y')).toEqual(62);
  });
});
