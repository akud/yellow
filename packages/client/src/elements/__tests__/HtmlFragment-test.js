import React from 'react';

import { HtmlFragment } from '../HtmlFragment';
import WindowContext from '../WindowContext';

import { mount } from 'enzyme';

describe('HtmlFragment', () => {
  const newContext = (args) => Object.assign({
    center: newPosition(),
    width: 1000,
    height: 1000,
  }, args);

  const makeProps = (args) => Object.assign({
    position: newPosition(),
    width: 100,
    height: 20,
  }, args);

  it('renders the children inside a foreignObject', () => {
    const wrapper = mount(
      <WindowContext.Provider value={newContext()}>
        <HtmlFragment {...makeProps()}>
          <p>hello!</p>
        </HtmlFragment>
      </WindowContext.Provider>
    );

    const foreignObject = wrapper.find('foreignObject');
    expect(foreignObject.length).toBe(1);

    const body = foreignObject.find('body');
    expect(body.prop('xmlns')).toEqual('http://www.w3.org/1999/xhtml');
    expect(body.prop('style')).toEqual({
      padding: 0,
      margin: 0,
      background: 'transparent'
    });

    const div = body.find('div');
    expect(div.length).toBe(1);
    expect(div.prop('style')).toEqual({ display: 'inline-block' });

    expect(div.find('p').length).toBe(1);
    expect(div.find('p').text()).toEqual('hello!');
  });

  it('positions the foreignObject based on width and height', () => {
    const wrapper = mount(
      <WindowContext.Provider value={newContext()}>
        <HtmlFragment
          {
            ...makeProps({
              position: point(10, 56),
              width: 42,
              height: 24
            })
          }
        >
          <p>hello!</p>
        </HtmlFragment>
      </WindowContext.Provider>
    );

    const foreignObject = wrapper.find('foreignObject');
    expect(wrapper.find('foreignObject').prop('x')).toBe(-11);
    expect(wrapper.find('foreignObject').prop('y')).toBe(44);
  });
});
