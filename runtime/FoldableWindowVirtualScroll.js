"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _WindowVirtualScroll = _interopRequireDefault(require("./WindowVirtualScroll"));

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

  var _useState = (0, _react.useState)(enableFold),
      fold = _useState[0],
      toggleFold = _useState[1];

  var foldElement = (0, _react.useMemo)(function () {
    return foldChildren({
      toggleFold: toggleFold
    });
  }, [toggleFold]);
  var items = (0, _react.useMemo)(function () {
    if (fold === true) {
      return [].concat(props.items.slice(0, foldStart), [foldElement], props.items.slice(foldEnd + 1));
    }

    return props.items;
  }, [fold, toggleFold, foldElement, props.items]);
  var decorateHeight = (0, _react.useCallback)(decorateWhenPropEq('item', foldElement, props.height, foldHeight), [foldElement, props.height, foldHeight]);
  var decorateRender = (0, _react.useCallback)(decorateWhenPropEq('item', foldElement, props.render, function (obj) {
    return obj.item;
  }), [foldElement, props.render]);
  var decorateGetKey = (0, _react.useCallback)(decorateWhenPropEq('item', foldElement, props.getKey, 'foldable_virtuallist_magic'), [foldElement, props.getKey]);
  return /*#__PURE__*/_react.default.createElement(_WindowVirtualScroll.default, (0, _extends2.default)({}, props, {
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
    return /*#__PURE__*/_react.default.createElement("div", {
      onClick: params.toggleFold
    }, "fold");
  }
};
FoldableWindowVirtualScroll.propTypes = {
  enableFold: _propTypes.default.bool.isRequired,
  foldStart: _propTypes.default.number,
  foldEnd: _propTypes.default.number,
  foldHeight: _propTypes.default.number,
  foldChildren: _propTypes.default.func
};
var _default = FoldableWindowVirtualScroll;
exports.default = _default;