import React from 'react';

import Link, { wrapInLink } from '../Link';
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

  describe('wrapInLink', () => {
    it('returns the component is the link argument is not present', () => {
      const wrapper = shallow(wrapInLink('', <Circle />));
      expect(wrapper.find('a').length).toBe(0);
      expect(wrapper.find('circle').length).toBe(1);
    });

    it('wraps the component in a link when provided a url', () => {
      const wrapper = shallow(
        wrapInLink('https://example.com/foo/bar', <Circle />)
      );

      const a = wrapper.find('a');
      expect(a.length).toBe(1);
      expect(a.prop('href')).toEqual('https://example.com/foo/bar');
      expect(a.prop('target')).toEqual('_blank');
      expect(a.find(Circle).length).toBe(1);
    });

    it('wraps the component in a link when provided a link object', () => {
      const wrapper = shallow(
        wrapInLink(
          { href: 'https://example.com/foo/bar', inline: true },
          <Circle />
        )
      );

      const a = wrapper.find('a');
      expect(a.length).toBe(1);
      expect(a.prop('href')).toEqual('https://example.com/foo/bar');
      expect(a.prop('target')).toEqual('_self');
      expect(a.find(Circle).length).toBe(1);
    });
  });
});
