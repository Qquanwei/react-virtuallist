import { useState, useEffect } from 'react';

function pxToRem(px) {
    const width = Math.min(window.innerWidth, 600);
    return px / 375 * width;
}
export default function useRem(px) {
    const [state, setState] = useState(() => pxToRem(px));

    useEffect(() => {
        const a = () => setState(pxToRem(px));
        window.addEventListener('resize', a);
        return () => {
            window.removeEventListener('resize', a);
        };
    }, [px]);

    return state;
}
