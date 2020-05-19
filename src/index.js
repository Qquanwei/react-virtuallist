import React, {
    memo,
    useEffect,
    useCallback,
    useState,
    useLayoutEffect,
    useRef
} from 'react';
import PropTypes from 'prop-types';
import 'intersection-observer';
import useRem from './use-rem';

const BOTTOM_EXTRA_NUMS = 1;
const TOP_EXTRA_NUMS = 1;

// 向下滚动策略, 返回新元素offset
function scrollBottomStrategy(itemHeight, boundingClientRect, rootBounds) {
    const dist = (rootBounds.bottom + itemHeight * BOTTOM_EXTRA_NUMS) - boundingClientRect.bottom;
    const n = Math.floor(dist / itemHeight);
    return currentOffset => currentOffset + n;
}

function scrollTopStrategy(itemHeight, boundingClientRect, rootBounds) {
    const dist = boundingClientRect.top - (rootBounds.top - itemHeight * TOP_EXTRA_NUMS);
    const n = Math.floor(dist / itemHeight);
    return currentOffset => currentOffset - n;
}

function WindowVirtualScroll({
    items, height: itemHeight, className, render, children, getKey
}) {
    const virtualContainerRef = useRef();
    const height = useRem(itemHeight);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [numOfOneScrren, setNumOfOneScreen] = useState(100000);

    const containerHeight = items.length * height;

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
                    if (initT <= boundingClientRect.top) {
                        updateStrategy = scrollBottomStrategy;
                    } else {
                        updateStrategy = scrollTopStrategy;
                    }
                    const update = updateStrategy(height, boundingClientRect, rootBounds);
                    setCurrentIndex(n => Math.min(
                        Math.max(0, update(n)),
                        items.length - numOfOneScrren
                    ));
                }

                initT = boundingClientRect.top;
            });
        }, options);

        containerObserver.observe(virtualContainerRef.current);

        return () => containerObserver.disconnect();
    }, [height, numOfOneScrren, items]);

    useEffect(() => registerIntersectionObserver(), [numOfOneScrren]);

    useLayoutEffect(() => {
        function calcParams() {
            const num = Math.ceil(window.innerHeight / height);
            setNumOfOneScreen(num);
        }

        window.addEventListener('resize', calcParams);

        calcParams();

        return () => {
            window.removeEventListener('resize', calcParams);
        };
    }, [items, height]);

    const begin = Math.max(currentIndex - TOP_EXTRA_NUMS, 0);
    const end = Math.max(currentIndex + numOfOneScrren + BOTTOM_EXTRA_NUMS, begin + numOfOneScrren);

    return (
        <div
            style={{
                height: items.length ? containerHeight : 'auto',
                paddingTop: begin * height,
                boxSizing: 'border-box'
            }}
            className={className}>
            <div ref={virtualContainerRef}>
                {
                    items.slice(begin, end).map((i) => {
                        const params = { item: i };
                        return (
                            <div style={{ height }} key={getKey(params)}>
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
