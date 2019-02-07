import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import matchers from './matchers';
import logging from '@akud/logging';
import 'jest-expect-message';

configure({ adapter: new Adapter() });

Object.assign(expect, matchers);

logging.setLevel(logging.TRACE);
