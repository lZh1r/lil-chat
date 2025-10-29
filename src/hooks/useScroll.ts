import {useCallback, useEffect, useState} from "react";

export default function useScroll(): [(conditional?: boolean) => void, (newState: boolean) => void] {
    const [active, setActive] = useState(true);

    useEffect(() => {
        function scrollHandler() {
            if (!active) {
                if (document.body.scrollHeight - window.scrollY <= window.innerHeight + 50) setActive(true);
            } else setActive(false);
        }
        document.addEventListener("wheel", scrollHandler);
        return () => document.removeEventListener("wheel", scrollHandler);
    }, [active]);

    const scroll = useCallback((conditional?: boolean) => {
        if (active && conditional) {
            window.scrollBy({left: 0, top: window.innerHeight * 1000});
        }
        if (!conditional) window.scrollBy({left: 0, top: window.innerHeight * 1000});
    }, [active]);
    return [scroll, setActive];
}