import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import SmartList from '../src/index';

const list1 = (() => {
    const ary = [];
    for (let i = 0; i < 1000; ++i) {
        ary.push({ name: `index ${i}` });
    }

    return ary;
})();

const list2 = (() => {
    const ary = [];
    for (let i = 2000; i < 3000; ++i) {
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
const App = () => {
    const [list, setList] = useState(list1);

    const onClick = useCallback(() => {
        setList(i => {
            return i === list1 ? list2 : list1;
        });
    }, []);

    return (
        <div>
            <div onClick={onClick}>switch list</div>
            <SmartList items={list} render={renderItem} getKey={getKey} height={50} />
        </div>
    );
};
ReactDOM.render(
    <div>
        <App />
    </div>,
    document.getElementById('J_wrap')
);
