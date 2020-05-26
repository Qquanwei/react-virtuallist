"use strict";

exports.__esModule = true;
exports.default = useRem;

var _react = require("react");

function pxToRem(px, maxWidth) {
  var width = maxWidth === 0 ? window.innerWidth : Math.min(window.innerWidth, maxWidth);

  if (typeof px === 'function') {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var realPx = px.call.apply(px, [null].concat(args));
      return realPx / 375 * width;
    };
  }

  return function () {
    return px / 375 * width;
  };
} // px: number | func


function useRem(px, maxWidth) {
  var _useState = (0, _react.useState)(function () {
    return pxToRem(px, maxWidth);
  }),
      state = _useState[0],
      setState = _useState[1];

  (0, _react.useEffect)(function () {
    var a = function a() {
      return setState(function () {
        return pxToRem(px, maxWidth);
      });
    };

    window.addEventListener('resize', a);
    return function () {
      window.removeEventListener('resize', a);
    };
  }, [px, maxWidth]);
  return state;
}