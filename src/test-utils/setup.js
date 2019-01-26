import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import matchers from './matchers';

configure({ adapter: new Adapter() });

Object.assign(expect, matchers);
