import HtmlNode from '../HtmlNode';
import React from 'react';

import { mount } from 'enzyme';

describe('HtmlNode', () => {
  it('renders the children inside an HtmlFragment inside a Node', () => {
    const wrapper = mount(
      <HtmlNode nodeId='1' >
        <p>hello!</p>
      </HtmlNode>
    );
    const node = wrapper.find('Node');
    expect(node.length).toBe(1);

    const htmlFragment = node.find('HtmlFragment');
    expect(htmlFragment.length).toBe(1);

    expect(htmlFragment.find('p').length).toBe(1);
    expect(htmlFragment.find('p').text()).toEqual('hello!');
  });
});
