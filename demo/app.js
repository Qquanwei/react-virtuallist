import React from 'react';
import ReactDOM from 'react-dom';
import SmartList from '../src/index';

const list = (() => {
    const ary = [];
    for (let i = 0; i < 1000; ++i) {
        ary.push({ name: `index ${i}` });
    }

    return ary;
})();

function getKey({ item }) {
    return item.name;
}

function renderItem({ item }) {
    return item.name;
}
const App = () => (
    <SmartList items={list} render={renderItem} getKey={getKey} height={50} />
);
ReactDOM.render(
    <div style={{ paddingTop: '500px' }}>
        <App />
    </div>,
    document.getElementById('J_wrap')
);
