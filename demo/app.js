import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import SmartList from '../src/index';
import FoldableSmartList from '../src/FoldableWindowVirtualScroll';

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
    const [toggle, setToggle] = useState(true);

    const onClick = useCallback(() => {
        setList(i => (i === list1 ? list2 : list1));
    }, []);

    return (
        <div>
            <div onClick={onClick}>switch list</div>
            <div style={{position: 'relative', paddingTop: '30px'}}>
                <div style={{ position: 'absolute', width: '50%', left: 0, top: 0}}>
                    <div>WindowVirtualScroll</div>
                    <SmartList items={list} render={renderItem} getKey={getKey} height={100}>
                        <div>empty1</div>
                    </SmartList>
                    <div style={{height: '600px'}}>worldismine</div>
                </div>
                <div style={{ position: 'absolute', width: '50%', left: '50%', top: 0}}>
                    <div>FoldableWindowVirtualScroll</div>
                    <FoldableSmartList
                        enableFold={true}
                        foldStart={1}
                        foldEnd={20}
                        foldHeight={200}
                        foldChildren={({ toggleFold }) => <div onClick={toggleFold}>fold children</div>}
                        items={list}
                        render={renderItem}
                        getKey={getKey}
                        height={100}
                    />
                </div>
            </div>
        </div>
    );
};
ReactDOM.render(
    <div>
        <App />
    </div>,
    document.getElementById('J_wrap')
);
