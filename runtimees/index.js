import React, { memo, useEffect, useCallback, useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import 'intersection-observer';
import useRem from './use-rem';
var BOTTOM_EXTRA_NUMS = 1;
var TOP_EXTRA_NUMS = 1; // 向下滚动策略, 返回新元素offset

function scrollBottomStrategy(itemHeight, boundingClientRect, rootBounds) {
  var dist = rootBounds.bottom + itemHeight * BOTTOM_EXTRA_NUMS - boundingClientRect.bottom;
  var n = Math.floor(dist / itemHeight);
  return function (currentOffset) {
    return currentOffset + n;
  };
}

function scrollTopStrategy(itemHeight, boundingClientRect, rootBounds) {
  var dist = boundingClientRect.top - (rootBounds.top - itemHeight * TOP_EXTRA_NUMS);
  var n = Math.floor(dist / itemHeight);
  return function (currentOffset) {
    return currentOffset - n;
  };
}

function WindowVirtualScroll(_ref) {
  var items = _ref.items,
      itemHeight = _ref.height,
      className = _ref.className,
      render = _ref.render,
      children = _ref.children,
      getKey = _ref.getKey;
  var virtualContainerRef = useRef();
  var height = useRem(itemHeight);

  var _useState = useState(0),
      currentIndex = _useState[0],
      setCurrentIndex = _useState[1];

  var _useState2 = useState(100000),
      numOfOneScrren = _useState2[0],
      setNumOfOneScreen = _useState2[1];

  var containerHeight = items.length * height;
  var registerIntersectionObserver = useCallback(function () {
    var options = {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: '50px 0px'
    };
    var initT = 0;
    var containerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var boundingClientRect = entry.boundingClientRect,
            rootBounds = entry.rootBounds;

        var updateStrategy = function updateStrategy() {
          return function (x) {
            return x;
          };
        };

        if (initT !== null) {
          if (initT <= boundingClientRect.top) {
            updateStrategy = scrollBottomStrategy;
          } else {
            updateStrategy = scrollTopStrategy;
          }

          var update = updateStrategy(height, boundingClientRect, rootBounds);
          setCurrentIndex(function (n) {
            return Math.min(Math.max(0, update(n)), items.length - numOfOneScrren);
          });
        }

        initT = boundingClientRect.top;
      });
    }, options);
    containerObserver.observe(virtualContainerRef.current);
    return function () {
      return containerObserver.disconnect();
    };
  }, [height, numOfOneScrren, items]);
  useEffect(function () {
    return registerIntersectionObserver();
  }, [numOfOneScrren]);
  useLayoutEffect(function () {
    function calcParams() {
      var num = Math.ceil(window.innerHeight / height);
      setNumOfOneScreen(num);
    }

    window.addEventListener('resize', calcParams);
    calcParams();
    return function () {
      window.removeEventListener('resize', calcParams);
    };
  }, [items, height]);
  var begin = Math.max(currentIndex - TOP_EXTRA_NUMS, 0);
  var end = Math.max(currentIndex + numOfOneScrren + BOTTOM_EXTRA_NUMS, begin + numOfOneScrren);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: items.length ? containerHeight : 'auto',
      paddingTop: begin * height,
      boxSizing: 'border-box'
    },
    className: className
  }, /*#__PURE__*/React.createElement("div", {
    ref: virtualContainerRef
  }, items.slice(begin, end).map(function (i) {
    var params = {
      item: i
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: height
      },
      key: getKey(params)
    }, render(params));
  })), items.length === 0 ? children : null);
}

WindowVirtualScroll.propTypes = {
  // ({ item }) => number | string
  getKey: PropTypes.func.isRequired,
  // 375 下高度px
  height: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  className: PropTypes.string,
  // ({ item }) => ReactElement
  render: PropTypes.func.isRequired,
  children: PropTypes.element
};
export default memo(WindowVirtualScroll);