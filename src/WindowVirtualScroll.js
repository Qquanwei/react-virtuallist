import React, {
    memo,
    useMemo,
    useEffect,
    useCallback,
    useState,
    useLayoutEffect,
    useRef
} from 'react';
import PropTypes from 'prop-types';
import 'intersection-observer';
import useRem from './use-rem';

// 向下滚动策略, 返回新元素offset
function scrollBottomStrategy(
    itemHeightArray,
    getNumOfOneScreen,
    boundingClientRect,
    rootBounds) {
    return currentOffset => {
        const numOfOneScreen = getNumOfOneScreen(currentOffset);
        const end = currentOffset + numOfOneScreen + 1;

        if (end > itemHeightArray.length) {
            return currentOffset;
        }

        let sum = boundingClientRect.bottom;
        let step = 0;

        if (sum >= rootBounds.bottom) {
            return currentOffset;
        }

        for (let i = end;i < itemHeightArray.length; ++i) {
            step += 1;
            sum += itemHeightArray[i];
            if (sum >= rootBounds.bottom) {
                return currentOffset + step;
            }
        }
        return currentOffset;
    }
}

function scrollTopStrategy(
    itemHeightArray,
    getNumOfOneScreen,
    boundingClientRect,
    rootBounds) {
    return currentOffset => {
        let sum = boundingClientRect.top;

        if (sum <= rootBounds.top) {
            return currentOffset;
        }

        for (let i = currentOffset - 1;i >= 0; --i) {
            sum -= itemHeightArray[i];
            if (sum <= rootBounds.top) {
                return i;
            }
        }
        return 0;
    }
}

function WindowVirtualScroll({
    items, height: itemHeight, className, render, children, getKey, maxWidth
}) {
    const virtualContainerRef = useRef();
    const height = useRem(itemHeight, maxWidth);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [itemHeightArray, containerHeight] = useMemo(() => {
        const ary = items.map(height);
        const totalHeight = ary.reduce((sum, i) => sum + i, 0);

        return [ary, totalHeight];
    }, [height, items]);

    const numOfOneScreen = useCallback((currentIndex) => {
        let sum = 0;
        let i = currentIndex;
        for (; i < items.length; ++i) {
            sum += itemHeightArray[i];

            if (sum >= window.innerHeight) {
                break;
            }
        }
        return i - currentIndex;
    }, [items, itemHeightArray]);

    const registerIntersectionObserver = useCallback(() => {
        const options = {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            rootMargin: '50px 0px'
        };

        let initT = 0;
        const containerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const { boundingClientRect, rootBounds } = entry;
                let updateStrategy = () => x => x;

                if (initT !== null) {
                    if (initT > boundingClientRect.top) {
                        updateStrategy = scrollBottomStrategy;
                    } else {
                        updateStrategy = scrollTopStrategy;
                    }
                    const update = updateStrategy(
                        itemHeightArray,
                        numOfOneScreen,
                        boundingClientRect,
                        rootBounds
                    );
                    setCurrentIndex(update);
                }

                initT = boundingClientRect.top;
            });
        }, options);

        containerObserver.observe(virtualContainerRef.current);

        return () => containerObserver.disconnect();
    }, [itemHeightArray, numOfOneScreen, items]);

    useEffect(registerIntersectionObserver, []);

    const begin = Math.max(0, currentIndex - 1);
    const end = currentIndex + numOfOneScreen(currentIndex) + 2;

    const paddingTop = (() => {
        let sum = 0;
        for (let i = 0; i < begin; ++i) {
            sum += itemHeightArray[i];
        }
        return sum;
    })();

    return (
        <div
            style={{
                height: items.length ? containerHeight : 'auto',
                paddingTop: paddingTop,
                boxSizing: 'border-box'
            }}
            className={className}>
            <div ref={virtualContainerRef}>
                {
                    items.slice(begin, end).map((i, index) => {
                        const realIndex = begin + index;
                        const params = { item: i };
                        return (
                            <div style={{ height: itemHeightArray[realIndex] }} key={getKey(params)}>
                                { render(params) }
                            </div>
                        );
                    })
                }
            </div>
            {
                items.length === 0 ? children : null
            }
        </div>
    );
}

WindowVirtualScroll.defaultProps = {
    maxWidth: 0
};

WindowVirtualScroll.propTypes = {
    maxWidth: PropTypes.number,
    // ({ item }) => number | string
    getKey: PropTypes.func.isRequired,
    // 375 下高度px
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.func
    ]).isRequired,
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    className: PropTypes.string,
    // ({ item }) => ReactElement
    render: PropTypes.func.isRequired,
    children: PropTypes.element,

};

export default memo(WindowVirtualScroll);
