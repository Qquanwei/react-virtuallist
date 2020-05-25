"use strict";

exports.__esModule = true;
exports.default = useRem;

var _react = require("react");

function pxToRem(px) {
  var width = Math.min(window.innerWidth, 600);
  return px / 375 * width;
}

function useRem(px) {
  var _useState = (0, _react.useState)(function () {
    return pxToRem(px);
  }),
      state = _useState[0],
      setState = _useState[1];

  (0, _react.useEffect)(function () {
    var a = function a() {
      return setState(pxToRem(px));
    };

    window.addEventListener('resize', a);
    return function () {
      window.removeEventListener('resize', a);
    };
  }, [px]);
  return state;
}