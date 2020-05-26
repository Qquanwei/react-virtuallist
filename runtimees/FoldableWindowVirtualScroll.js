import _extends from "@babel/runtime/helpers/extends";
import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import WindowVirtualScroll from './WindowVirtualScroll';
/* eslint-disable-next-line */

function decorateLog(fn) {
  return function (obj) {
    var value = fn.call(this, obj);
    console.log('->', value);
    return value;
  };
}

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
  var enableFold = props.enableFold,
      foldChildren = props.foldChildren,
      foldStart = props.foldStart,
      foldEnd = props.foldEnd,
      foldHeight = props.foldHeight;

  var _useState = useState(enableFold),
      fold = _useState[0],
      toggleFold = _useState[1];

  var foldElement = useMemo(function () {
    return foldChildren({
      toggleFold: toggleFold
    });
  }, [toggleFold]);
  var items = useMemo(function () {
    if (fold === true) {
      return [].concat(props.items.slice(0, foldStart), [foldElement], props.items.slice(foldEnd + 1));
    }

    return props.items;
  }, [fold, toggleFold, foldElement, props.items]);
  var decorateHeight = useCallback(decorateWhenPropEq('item', foldElement, props.height, foldHeight), [foldElement, props.height, foldHeight]);
  var decorateRender = useCallback(decorateWhenPropEq('item', foldElement, props.render, function (obj) {
    return obj.item;
  }), [foldElement, props.render]);
  var decorateGetKey = useCallback(decorateWhenPropEq('item', foldElement, props.getKey, 'foldable_virtuallist_magic'), [foldElement, props.getKey]);
  return /*#__PURE__*/React.createElement(WindowVirtualScroll, _extends({}, props, {
    items: items,
    getKey: decorateGetKey,
    height: decorateHeight,
    render: decorateRender
  }));
}

FoldableWindowVirtualScroll.defaultProps = {
  foldStart: 2,
  foldEnd: 10,
  foldHeight: 50,
  foldChildren: function foldChildren(params) {
    return /*#__PURE__*/React.createElement("div", {
      onClick: params.toggleFold
    }, "fold");
  }
};
FoldableWindowVirtualScroll.propTypes = {
  enableFold: PropTypes.bool.isRequired,
  foldStart: PropTypes.number,
  foldEnd: PropTypes.number,
  foldHeight: PropTypes.number,
  foldChildren: PropTypes.func
};
export default FoldableWindowVirtualScroll;