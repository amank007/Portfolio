import { useState, useEffect, useRef, useCallback } from 'react';

// ---- Theme Hook ----
export function useTheme() {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('portfolio-theme');
        return saved || 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    return { theme, toggleTheme };
}

// ---- Scroll Spy Hook ----
export function useScrollSpy(sectionIds, offset = 100) {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + offset;
            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const el = document.getElementById(sectionIds[i]);
                if (el && el.offsetTop <= scrollPos) {
                    setActiveSection(sectionIds[i]);
                    return;
                }
            }
            setActiveSection('');
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, offset]);

    return activeSection;
}

// ---- Scroll Visibility (Intersection Observer) ----
export function useInView(options = {}) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(element); // Only trigger once
                }
            },
            { threshold: 0.15, ...options }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return [ref, isInView];
}

// ---- Navbar Scroll ----
export function useNavScroll(threshold = 50) {
    const [scrolled, setScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > threshold);
            setShowBackToTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return { scrolled, showBackToTop };
}

// ---- Mouse Position (for tilt / magnetic) ----
export function useMousePosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return position;
}

// ---- Count Up Animation ----
export function useCountUp(target, duration = 1500, shouldStart = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldStart) return;

        // Handle non-numeric targets like "GATE"
        const numericTarget = parseInt(target);
        if (isNaN(numericTarget)) {
            setCount(target);
            return;
        }

        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * numericTarget));
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [target, duration, shouldStart]);

    return count;
}

// ---- Tilt Effect ----
export function useTilt(ref, options = {}) {
    const { max = 12, speed = 300, scale = 1.02 } = options;

    const handleMouseMove = useCallback((e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -max;
        const rotateY = ((x - centerX) / centerX) * max;

        ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
        ref.current.style.transition = `transform ${speed}ms ease`;
    }, [max, speed, scale]);

    const handleMouseLeave = useCallback(() => {
        if (!ref.current) return;
        ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }, []);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);
}

// ---- Text Scramble ----
export function useTextScramble(text, shouldStart = false, speed = 30) {
    const [display, setDisplay] = useState('');
    const chars = '!@#$%^&*()_+{}|:<>?░▒▓█▀▄▌▐';

    useEffect(() => {
        if (!shouldStart || !text) return;

        let iteration = 0;
        const totalIterations = text.length * 3;

        const interval = setInterval(() => {
            setDisplay(
                text.split('').map((char, idx) => {
                    if (char === ' ') return ' ';
                    if (idx < iteration / 3) return char;
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('')
            );

            iteration++;
            if (iteration > totalIterations) {
                setDisplay(text);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, shouldStart, speed]);

    return display || (shouldStart ? '' : '');
}
