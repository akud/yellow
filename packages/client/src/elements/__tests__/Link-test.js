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
    expect(a.find(Circle).length).toBe(1);
  });
});
