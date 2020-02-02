import React from 'react';

import Link from '../Link';
import Circle from '../Circle';

import { shallow } from 'enzyme';

describe('Link', () => {
  it('renders children inside an a tag', () => {
    const wrapper = shallow(
      <Link href='https://example.com/foo/bar'>
        <Circle />
      </Link>
    );
    const a = wrapper.find('a');
    expect(a.length).toBe(1);
    expect(a.prop('href')).toEqual('https://example.com/foo/bar');
    expect(a.prop('target')).toEqual('_blank');
    expect(a.find(Circle).length).toBe(1);
  });

  it('passes extra props to children', () => {
    const wrapper = shallow(
      <Link href='https://example.com/foo/bar' position={{ x: 42, y: -23 }}>
        <Circle />
      </Link>
    );
    expect(wrapper.find(Circle).prop('position')).toEqual({ x: 42, y: -23 });
  });

  it('sets the target attribute for inline links', () => {
    const wrapper = shallow(
      <Link href='https://example.com/foo/bar' inline={true}>
        <Circle />
      </Link>
    );
    const a = wrapper.find('a');
    expect(a.length).toBe(1);
    expect(a.prop('href')).toEqual('https://example.com/foo/bar');
    expect(a.prop('target')).toEqual('_self');
    expect(a.find(Circle).length).toBe(1);
  });
});
