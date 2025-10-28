import {useCallback} from "react";

export default function useScroll(): () => void {
    return useCallback(() => {
        if (window.scrollY === window.innerHeight) window.scrollBy({left: 0, top: window.innerHeight * 1000});
    }, []);
}