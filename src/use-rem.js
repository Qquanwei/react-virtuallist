import { useState, useEffect } from 'react';

function pxToRem(px, maxWidth) {
    const width = (maxWidth === 0) ? window.innerWidth : Math.min(window.innerWidth, maxWidth);
    if (typeof px === 'function') {
        return (...args) => {
            const realPx = px.call(null, ...args);
            return realPx / 375 * width;
        };
    }
    return () => px / 375 * width;
}

// px: number | func
export default function useRem(px, maxWidth) {
    const [state, setState] = useState(() => pxToRem(px, maxWidth));

    useEffect(() => {
        const a = () => setState(() => pxToRem(px, maxWidth));
        window.addEventListener('resize', a);
        return () => {
            window.removeEventListener('resize', a);
        };
    }, [px, maxWidth]);

    return state;
}
