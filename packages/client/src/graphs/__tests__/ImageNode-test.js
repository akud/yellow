import ImageNode from '../ImageNode';
import React from 'react';

import Image from '../../elements/Image';

import { shallow } from 'enzyme';

describe('ImageNode', () => {
  it('renders an Image inside a Node', () => {
    const wrapper = shallow(
      <ImageNode
        nodeId='1'
        src='image_src'
        width={345}
        height={8678}
      />
    );
    const node = wrapper.find('Node');
    expect(node.length).toBe(1);
    expect(node.find(Image).length).toBe(1);
    expect(node.find(Image).prop('src')).toEqual('image_src');
    expect(node.find(Image).prop('width')).toBe(345);
    expect(node.find(Image).prop('height')).toBe(8678);
  });
});
