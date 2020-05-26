import React, { memo, useMemo, useEffect, useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import 'intersection-observer';
import useRem from './use-rem'; // 向下滚动策略, 返回新元素offset

function scrollBottomStrategy(itemHeightArray, getNumOfOneScreen, boundingClientRect, rootBounds) {
  return function (currentOffset) {
    var numOfOneScreen = getNumOfOneScreen(currentOffset);
    var end = currentOffset + numOfOneScreen + 1;

    if (end > itemHeightArray.length) {
      return currentOffset;
    }

    var sum = boundingClientRect.bottom;
    var step = 0;

    if (sum >= rootBounds.bottom) {
      return currentOffset;
    }

    for (var i = end; i < itemHeightArray.length; ++i) {
      step += 1;
      sum += itemHeightArray[i];

      if (sum >= rootBounds.bottom) {
        return currentOffset + step;
      }
    }

    return currentOffset;
  };
}

function scrollTopStrategy(itemHeightArray, getNumOfOneScreen, boundingClientRect, rootBounds) {
  return function (currentOffset) {
    var sum = boundingClientRect.top;

    if (sum <= rootBounds.top) {
      return currentOffset;
    }

    for (var i = currentOffset - 1; i >= 0; --i) {
      sum -= itemHeightArray[i];

      if (sum <= rootBounds.top) {
        return i;
      }
    }

    return 0;
  };
}

function WindowVirtualScroll(_ref) {
  var items = _ref.items,
      itemHeight = _ref.height,
      className = _ref.className,
      render = _ref.render,
      children = _ref.children,
      getKey = _ref.getKey,
      maxWidth = _ref.maxWidth;
  var virtualContainerRef = useRef();
  var height = useRem(itemHeight, maxWidth);

  var _useState = useState(0),
      currentIndex = _useState[0],
      setCurrentIndex = _useState[1];

  var _useMemo = useMemo(function () {
    var ary = items.map(function (item, index) {
      return height({
        item: item,
        index: index
      });
    });
    var totalHeight = ary.reduce(function (sum, i) {
      return sum + i;
    }, 0);
    return [ary, totalHeight];
  }, [height, items]),
      itemHeightArray = _useMemo[0],
      containerHeight = _useMemo[1];

  var numOfOneScreen = useCallback(function (index) {
    var sum = 0;
    var i = index;

    for (; i < items.length; ++i) {
      sum += itemHeightArray[i];

      if (sum >= window.innerHeight) {
        break;
      }
    }

    return i - index;
  }, [items, itemHeightArray]);
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
          if (initT > boundingClientRect.top) {
            updateStrategy = scrollBottomStrategy;
          } else {
            updateStrategy = scrollTopStrategy;
          }

          var update = updateStrategy(itemHeightArray, numOfOneScreen, boundingClientRect, rootBounds);
          setCurrentIndex(update);
        }

        initT = boundingClientRect.top;
      });
    }, options);
    containerObserver.observe(virtualContainerRef.current);
    return function () {
      return containerObserver.disconnect();
    };
  }, [itemHeightArray, numOfOneScreen, items]);
  useEffect(registerIntersectionObserver, []);
  var begin = Math.max(0, currentIndex - 1);
  var end = currentIndex + numOfOneScreen(currentIndex) + 2;

  var paddingTop = function () {
    var sum = 0;

    for (var i = 0; i < begin; ++i) {
      sum += itemHeightArray[i];
    }

    return sum;
  }();

  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: items.length ? containerHeight : 'auto',
      paddingTop: paddingTop,
      boxSizing: 'border-box'
    },
    className: className
  }, /*#__PURE__*/React.createElement("div", {
    ref: virtualContainerRef
  }, items.slice(begin, end).map(function (i, index) {
    var realIndex = begin + index;
    var params = {
      item: i
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: itemHeightArray[realIndex]
      },
      key: getKey(params)
    }, render(params));
  })), items.length === 0 ? children : null);
}

WindowVirtualScroll.defaultProps = {
  maxWidth: 0,
  className: '',
  children: null
};
WindowVirtualScroll.propTypes = {
  maxWidth: PropTypes.number,
  // ({ item }) => number | string
  getKey: PropTypes.func.isRequired,
  // 375 下高度px
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  className: PropTypes.string,
  // ({ item }) => ReactElement
  render: PropTypes.func.isRequired,
  children: PropTypes.element
};
export default memo(WindowVirtualScroll);