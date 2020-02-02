jest.mock('../geometry/monitor-element-shape');

import React from 'react';
import monitored from '../monitored';
import PointDefinition from '../geometry/PointDefinition';
import RectangleDefinition from '../geometry/RectangleDefinition';
import ElementContext from '../ElementContext';
import WindowContext from '../WindowContext';
import monitorElementShape, {
  getMonitoringListener,
  resetMockElementShapeMonitor,
  setMockElementShape,
} from '../geometry/monitor-element-shape';

import { mount } from 'enzyme';

class BasicComponent extends React.Component {
  render() {
    return <text />;
  }
}
const MonitoredComponent = monitored(BasicComponent);

describe('monitored', () => {
  let context;

  const baseElementProps = opts => Object.assign({
    id: '123',
    position: newPosition(),
  }, opts);

  beforeEach(() => {
    resetMockElementShapeMonitor();
    context = {
      registerShape: jest.fn()
    };
  });

  it('passes correct props to children', () => {
    setMockElementShape({
      width: 42,
      height: 24
    });

    let passedProps;
    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <MonitoredComponent position={{ x: 123, y: -94 }} className='foo' />
      </ElementContext.Provider>
    ).update();

    expect(wrapper.find(BasicComponent).length).toBe(1);
    expect(wrapper.find(BasicComponent).prop('position')).toEqual(
      { x: 123, y: -94 }
    );
    expect(wrapper.find(BasicComponent).prop('width')).toBe(42);
    expect(wrapper.find(BasicComponent).prop('height')).toBe(24);
    expect(wrapper.find(BasicComponent).prop('shapeRef')).toBeDefined();
  });

  it('passes props to the component component class', () => {
    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <MonitoredComponent
          id='124'
          className='foobar'
          link='https://example.com'
        />
      </ElementContext.Provider>
    );

    expect(wrapper.find(BasicComponent).length).toBe(1);
    expect(wrapper.find(BasicComponent).prop('id')).toEqual('124');
    expect(wrapper.find(BasicComponent).prop('className')).toEqual('foobar');
    expect(wrapper.find(BasicComponent).prop('link')).toEqual('https://example.com');
  });

  it('renders initially with full width and height', () => {
    monitorElementShape.mockImplementation(() => {});
    const wrapper = mount(
      <WindowContext.Provider value={{ width: 500, height: 1000 }}>
        <ElementContext.Provider value={context}>
          <MonitoredComponent
            id='124'
            className='foobar'
            link='https://example.com'
          />
        </ElementContext.Provider>
      </WindowContext.Provider>
    );

    expect(wrapper.find(BasicComponent).prop('width')).toBe(500);
    expect(wrapper.find(BasicComponent).prop('height')).toBe(1000);
  });

  it('registers the shape from the monitor in the context', () => {
    setMockElementShape({
      width: 100,
      height: 29
    });
    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <MonitoredComponent id='asdf' />
      </ElementContext.Provider>
    );
    expect(context.registerShape).lastCalledWith(
      'asdf', new RectangleDefinition({ width: 100, height: 29 })
    );
  });

  it('picks up new shapes from the monitor', () => {
    setMockElementShape({
      width: 100,
      height: 29
    });

    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <MonitoredComponent id='hijk' />
      </ElementContext.Provider>
    );

    expect(context.registerShape).lastCalledWith(
      'hijk', new RectangleDefinition({ width: 100, height: 29 })
    );

    const listener = getMonitoringListener();
    listener({ width: 400, height: 100 });
    wrapper.update();

    expect(context.registerShape).lastCalledWith(
      'hijk', new RectangleDefinition({ width: 400, height: 100 })
    );
  });

  it('handles an empty shape', () => {
    setMockElementShape({
      width: 0,
      height: 0
    });

    const wrapper = mount(
      <ElementContext.Provider value={context}>
        <MonitoredComponent id='lmns' position={{ x: 123, y: -94 }} />
      </ElementContext.Provider>
    ).update();

    expect(wrapper.find(BasicComponent).length).toBe(1);
    expect(context.registerShape).lastCalledWith('lmns', new PointDefinition());
  });
});
