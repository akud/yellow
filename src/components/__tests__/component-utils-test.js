jest.mock('react');

import React from 'react';

import { withExtraProps } from '../component-utils';

describe('component-utils', () => {
  describe('withExtraProps', () => {
    it('clones the children with results from the prop providing function', () => {
      const propProvider = jest.fn().mockImplementation(oldProps => ({
        newProp: oldProps.originalProp + '-new'
      }));

      React.cloneElement.mockImplementation(
        (element, newProps) => ({
          props: Object.assign({}, newProps, element.props)
        })
      );

      React.Children.map.mockImplementation((chidren, mapper) => children.map(mapper));

      const children = [
        { props: { originalProp: 'foo1' } },
        { props: { originalProp: 'foo2' } },
        { props: { originalProp: 'foo3' } },
      ];

      const results = withExtraProps(
        children,
        propProvider
      );

      expect(results).toEqual([
        {
          props: {
            originalProp: 'foo1',
            newProp: 'foo1-new',
          },
        },
        {
          props: {
            originalProp: 'foo2',
            newProp: 'foo2-new',
          },
        },
        {
          props: {
            originalProp: 'foo3',
            newProp: 'foo3-new',
          },
        },
      ]);
      expect(propProvider).toHaveBeenCalledWith(children[0].props);
      expect(propProvider).toHaveBeenCalledWith(children[1].props);
      expect(propProvider).toHaveBeenCalledWith(children[2].props);
      expect(propProvider.mock.calls.length).toBe(3);

      expect(React.Children.map).toHaveBeenCalledWith(children, expect.any(Function));
      expect(React.Children.map.mock.calls.length).toBe(1);

      expect(React.cloneElement).toHaveBeenCalledWith(
        children[0],
        { newProp: 'foo1-new' }
      );
      expect(React.cloneElement).toHaveBeenCalledWith(
        children[1],
        { newProp: 'foo2-new' }
      );
      expect(React.cloneElement).toHaveBeenCalledWith(
        children[2],
        { newProp: 'foo3-new' }
      );
      expect(React.cloneElement.mock.calls.length).toBe(3);
    });
  });
});
