import { useEffect, useRef, useCallback } from "react";

const CustomCursor = () => {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const outerPos = useRef({ x: 0, y: 0 });
    const isHovering = useRef(false);
    const rafId = useRef<number>(0);

    const animate = useCallback(() => {
        // Lerp the outer ring toward mouse position for smooth trailing effect
        outerPos.current.x += (mousePos.current.x - outerPos.current.x) * 0.15;
        outerPos.current.y += (mousePos.current.y - outerPos.current.y) * 0.15;

        if (outerRef.current) {
            const scale = isHovering.current ? 1.5 : 1;
            outerRef.current.style.transform = `translate3d(${outerPos.current.x - 16}px, ${outerPos.current.y - 16}px, 0) scale(${scale})`;
        }

        if (innerRef.current) {
            innerRef.current.style.transform = `translate3d(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px, 0)`;
        }

        rafId.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        // Don't render on touch/mobile devices at all
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const onMouseMove = (e: MouseEvent) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            isHovering.current =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                !!target.closest("a, button, [role='button']") ||
                window.getComputedStyle(target).cursor === "pointer";
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseover", onMouseOver, { passive: true });
        rafId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            cancelAnimationFrame(rafId.current);
        };
    }, [animate]);

    // Don't render on mobile
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            <div
                ref={outerRef}
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] bg-foreground/20 mix-blend-difference outline outline-1 outline-foreground/50 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                style={{ willChange: "transform", transition: "width 0.2s, height 0.2s" }}
            />
            <div
                ref={innerRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000] bg-white"
                style={{ willChange: "transform" }}
            />
        </>
    );
};

export default CustomCursor;
