import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import matchers from './matchers';
import expectations from './expectations';
import logging from '@akud/logging';
import 'jest-expect-message';

configure({ adapter: new Adapter() });

Object.assign(expect, matchers);

expect.extend(expectations);

logging.setLevel(logging.TRACE);
