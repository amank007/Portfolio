import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const trailsRef = useRef([]);
    const posRef = useRef({ x: -100, y: -100 });
    const TRAIL_LENGTH = 8;

    useEffect(() => {
        // Don't show on touch devices
        if ('ontouchstart' in window || window.innerWidth < 768) return;

        // Create trail elements
        const trailContainer = document.createElement('div');
        document.body.appendChild(trailContainer);

        for (let i = 0; i < TRAIL_LENGTH; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.opacity = (1 - i / TRAIL_LENGTH) * 0.3;
            trail.style.width = `${Math.max(3, 6 - i)}px`;
            trail.style.height = `${Math.max(3, 6 - i)}px`;
            trailContainer.appendChild(trail);
            trailsRef.current.push({
                el: trail,
                x: -100,
                y: -100,
            });
        }

        const handleMouseMove = (e) => {
            posRef.current = { x: e.clientX, y: e.clientY };

            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };

        // Animate trail
        let animId;
        const animateTrail = () => {
            let prevX = posRef.current.x;
            let prevY = posRef.current.y;

            trailsRef.current.forEach((trail) => {
                const dx = prevX - trail.x;
                const dy = prevY - trail.y;
                trail.x += dx * 0.3;
                trail.y += dy * 0.3;
                trail.el.style.left = `${trail.x}px`;
                trail.el.style.top = `${trail.y}px`;
                prevX = trail.x;
                prevY = trail.y;
            });

            animId = requestAnimationFrame(animateTrail);
        };
        animateTrail();

        // Detect hovering over interactive elements
        const handleHoverCheck = (e) => {
            const target = e.target;
            const isInteractive = target.closest('a, button, input, textarea, .glass-card, .skill-item, .cert-card, .social-icon, .btn, .project-card');
            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseover', handleHoverCheck, { passive: true });

        // Hide default cursor
        document.body.style.cursor = 'none';

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleHoverCheck);
            document.body.style.cursor = '';
            if (trailContainer.parentNode) {
                trailContainer.parentNode.removeChild(trailContainer);
            }
        };
    }, []);

    // Don't render on mobile
    if (typeof window !== 'undefined' && ('ontouchstart' in window || window.innerWidth < 768)) {
        return null;
    }

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        />
    );
}
