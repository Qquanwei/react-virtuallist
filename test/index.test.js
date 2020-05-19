import React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Test from '../src/index';

configure({ adapter: new Adapter() });

describe('shallow', () => {
    test('Test show', () => {
        const items = [{name: 'a'}, { name: 'b'}];
        const app = shallow(<Test className="test" items={items} getKey={() => Math.random()} render={a => a} />);
        expect(app.find('.test').text()).toBe('');
    });
});
