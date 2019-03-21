import { mount } from 'enzyme';

export const point = (x, y) => ({ x, y });
export const newPosition = () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
});


export const render = async jsx => {
  const wrapper = mount(jsx).update();
  await Promise.resolve();
  return wrapper.update();
};

export default {
  point,
  render,
  newPosition,
};
