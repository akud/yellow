import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import matchers from './matchers';
import expectations from './expectations';
import utils from './utils';
import logging from '@akud/logging';
import 'jest-expect-message';

configure({ adapter: new Adapter() });

Object.assign(expect, matchers);
expect.extend(expectations);

Object.assign(global, utils);

logging.setLevel(logging.TRACE);

if (process.env.TEST_TIMEOUT) {
  jest.setTimeout(parseInt(process.env.TEST_TIMEOUT));
}
