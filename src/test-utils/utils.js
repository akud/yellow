import { mount } from 'enzyme';

export const point = (x, y) => ({ x, y });
export const render = jsx => mount(jsx).setState({'FORCE_RENDER_ID': Math.random()}).update();
export const newPosition = () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
});


export default {
  point,
  render,
  newPosition,
};
