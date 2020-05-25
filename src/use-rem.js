import { useState, useEffect } from 'react';

function pxToRem(px, maxWidth) {
    const width = (maxWidth === 0) ? window.innerWidth : Math.min(window.innerWidth, maxWidth);
    return px / 375 * width;
}
export default function useRem(px, maxWidth) {
    const [state, setState] = useState(() => pxToRem(px, maxWidth));

    useEffect(() => {
        const a = () => setState(pxToRem(px, maxWidth));
        window.addEventListener('resize', a);
        return () => {
            window.removeEventListener('resize', a);
        };
    }, [px]);

    return state;
}
