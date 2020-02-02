import React from 'react';
import linkable from '../linkable';

import { shallow } from 'enzyme';

class BasicComponent extends React.Component {
  render() {
    return null;
  }
}
const LinkableComponent = linkable(BasicComponent);

describe('linkable', () => {
  it('renders the child with props if no link is provided', () => {
    const wrapper = shallow(<LinkableComponent foo='bar' n={23} />);
    expect(wrapper.find('Link').length).toBe(0);
    expect(wrapper.find('BasicComponent').length).toBe(1);
    expect(wrapper.find('BasicComponent').prop('foo')).toEqual('bar');
    expect(wrapper.find('BasicComponent').prop('n')).toBe(23);
  });

  it('wraps the child in a link if provided', () => {
    const wrapper = shallow(
      <LinkableComponent
        foo='bar'
        n={23}
        link={{ href: 'http://example.com', inline: true }}
      />
    );
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toEqual('http://example.com');
    expect(wrapper.find('Link').prop('inline')).toBe(true);

    expect(wrapper.find('BasicComponent').length).toBe(1);
    expect(wrapper.find('BasicComponent').prop('foo')).toEqual('bar');
    expect(wrapper.find('BasicComponent').prop('n')).toBe(23);
  });

  it('handles string links', () => {
    const link = 'http://example.com';
    const wrapper = shallow(
      <LinkableComponent
        foo='bar'
        n={23}
        link='http://example.com'
      />
    );
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('Link').prop('href')).toEqual('http://example.com');
    expect(wrapper.find('Link').prop('inline')).toBe(false);

    expect(wrapper.find('BasicComponent').length).toBe(1);
    expect(wrapper.find('BasicComponent').prop('foo')).toEqual('bar');
    expect(wrapper.find('BasicComponent').prop('n')).toBe(23);
  });

});
