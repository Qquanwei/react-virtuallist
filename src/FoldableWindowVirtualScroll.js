import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import WindowVirtualScroll from './WindowVirtualScroll';

/* eslint-disable-next-line */
/* function decorateLog(fn) {
 *     return function (obj) {
 *         const value = fn.call(this, obj);
 *         console.log('->', value);
 *         return value;
 *     };
 * } */

function decorateWhenPropEq(prop, eq, origin, callback) {
    return function (obj) {
        if (obj[prop] === eq) {
            if (typeof callback === 'function') {
                return callback.call(this, obj);
            }
            return callback;
        }
        if (typeof origin === 'function') {
            return origin.call(this, obj);
        }
        return origin;
    };
}

function FoldableWindowVirtualScroll(props) {
    const {
        enableFold, foldChildren, foldStart, foldEnd, foldHeight
    } = props;
    const [fold, toggleFold] = useState(enableFold);

    const foldElement = useMemo(() => foldChildren({ toggleFold }), [toggleFold]);

    const items = useMemo(() => {
        if (fold === true) {
            return [
                ...props.items.slice(0, foldStart),
                foldElement,
                ...props.items.slice(foldEnd + 1)
            ];
        }
        return props.items;
    }, [fold, toggleFold, foldElement, props.items]);

    const decorateHeight = useCallback(
        decorateWhenPropEq('item', foldElement, props.height, foldHeight),
        [foldElement, props.height, foldHeight]
    );

    const decorateRender = useCallback(
        decorateWhenPropEq('item', foldElement, props.render, obj => obj.item),
        [foldElement, props.render]
    );

    const decorateGetKey = useCallback(
        decorateWhenPropEq('item', foldElement, props.getKey, 'foldable_virtuallist_magic'),
        [foldElement, props.getKey]
    );

    return (
        <WindowVirtualScroll
            {...props}
            items={items}
            getKey={decorateGetKey}
            height={decorateHeight}
            render={decorateRender} />
    );
}


FoldableWindowVirtualScroll.defaultProps = {
    foldStart: 2,
    foldEnd: 10,
    foldHeight: 50,
    foldChildren: params => <div onClick={params.toggleFold}>fold</div>
};

FoldableWindowVirtualScroll.propTypes = {
    enableFold: PropTypes.bool.isRequired,
    foldStart: PropTypes.number,
    foldEnd: PropTypes.number,
    foldHeight: PropTypes.number,
    foldChildren: PropTypes.func
};


export default FoldableWindowVirtualScroll;
