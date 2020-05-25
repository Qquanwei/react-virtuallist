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

    test('test scroll', (done) => {
        const items = [{name: 'a'}, { name: 'b'}];

        function makeEntries(toppx) {
            return [{
                boundingClientRect: { top: toppx },
                rootBounds: { top: 0}
            }]
        }
        global.window.IntersectionObserver = function (callback) {
            setTimeout(() => {
                expect(() => {
                    callback(makeEntries(10));
                    callback(makeEntries(100));
                }).not.toThrow();

                expect(() => {
                    callback(makeEntries(100));
                    callback(makeEntries(10));
                }).not.toThrow();
                done();
            }, 100);

            return { observe: () => {}, disconnect: () => {}};
        };

        mount(<Test className="test" items={items} getKey={() => Math.random()} render={a => a.name } />);
    })
});
