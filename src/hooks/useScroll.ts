export default function useScroll(): () => void {
    return () => {
        if (window.scrollY === window.innerHeight) window.scrollBy({left: 0, top: window.innerHeight * 1000});
    };
}