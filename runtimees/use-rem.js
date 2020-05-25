import { useState, useEffect } from 'react';

function pxToRem(px) {
  var width = Math.min(window.innerWidth, 600);
  return px / 375 * width;
}

export default function useRem(px) {
  var _useState = useState(function () {
    return pxToRem(px);
  }),
      state = _useState[0],
      setState = _useState[1];

  useEffect(function () {
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