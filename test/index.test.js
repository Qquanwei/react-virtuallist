import React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Test, { FoldableWindowVirtualScroll } from '../src/index';

configure({ adapter: new Adapter() });

describe('shallow', () => {
    test('Test show', () => {
        const items = [{name: 'a'}, { name: 'b'}];
        const app = shallow(<Test className="test" height={30} items={items} getKey={() => Math.random()} render={a => a} />);
        const foldApp = shallow(<FoldableWindowVirtualScroll enableFold={false} foldChildren={() => {}} className="test" height={30} items={items} getKey={() => Math.random()} render={a => a} />)
        expect(app.find('.test').text()).toBe('');
    });

    test('test scroll', (done) => {
        const items = [{name: 'a'}, { name: 'b'}];

        function makeEntries(toppx) {
            return [{
                boundingClientRect: { top: toppx, bottom: toppx },
                rootBounds: { top: 0, bottom: 100}
            }]
        }
        global.window.innerHeight = 100;
        global.window.IntersectionObserver = function (callback) {
            setTimeout(() => {
                expect(() => {
                    callback(makeEntries(10));
                    callback(makeEntries(100));
                    callback(makeEntries(1000));
                }).not.toThrow();

                expect(() => {
                    callback(makeEntries(100));
                    callback(makeEntries(10));
                    callback(makeEntries(0));
                }).not.toThrow();
                done();
            }, 100);

            return { observe: () => {}, disconnect: () => {}};
        };

        mount(<Test className="test" height={30} items={items} getKey={() => Math.random()} render={a => a.name } />);
    })


    test('test foldablevirtualscroll', (done) => {
        const items = [{name: 'a'}, { name: 'b'}];

        function makeEntries(toppx) {
            return [{
                boundingClientRect: { top: toppx, bottom: toppx + 10},
                rootBounds: { top: 0, bottom: 100}
            }]
        }

        global.window.IntersectionObserver = function (callback) {
            setTimeout(() => {
                expect(() => {
                    callback(makeEntries(10));
                    callback(makeEntries(100));
                    callback(makeEntries(1000));
                }).not.toThrow();

                expect(() => {
                    callback(makeEntries(100));
                    callback(makeEntries(10));
                    callback(makeEntries(0));
                }).not.toThrow();
                done();
            }, 100);

            return { observe: () => {}, disconnect: () => {}};
        };

        mount(<FoldableWindowVirtualScroll
                  className="test"
                  enableFold={true}
                  foldStart={0}
                  foldEnd={10}
                  foldHeight={30}
                  foldChildren={()=> <div>hello</div>}
                  height={() => 30}
                  items={items}
                  getKey={() => Math.random()} render={a => a.name } />);
    })
});
