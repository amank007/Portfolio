import { useState, useEffect, useRef, useCallback } from 'react';

const BOOT_LINES = [
    { prefix: '[OK]', text: ' Initializing neural network...' },
    { prefix: '[OK]', text: ' Loading security protocols...' },
    { prefix: '[OK]', text: ' Scanning for vulnerabilities...' },
    { prefix: '[OK]', text: ' Encrypting secure channels...' },
    { prefix: '[OK]', text: ' Compiling threat database...' },
    { prefix: '[OK]', text: ' Decrypting portfolio data...' },
    { prefix: '[OK]', text: ' Establishing secure connection...' },
];

export default function Loader({ onComplete }) {
    const [visibleLines, setVisibleLines] = useState(0);
    const [progress, setProgress] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const timeoutsRef = useRef([]);

    const stableOnComplete = useCallback(onComplete, []);

    useEffect(() => {
        // Skip loader if already seen this session
        if (sessionStorage.getItem('loader-shown')) {
            stableOnComplete();
            return;
        }

        // Clear any previous timeouts (handles StrictMode remount)
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];

        // Schedule each line to appear
        BOOT_LINES.forEach((_, i) => {
            const t = setTimeout(() => {
                setVisibleLines(i + 1);
                setProgress(((i + 1) / BOOT_LINES.length) * 100);
            }, (i + 1) * 280);
            timeoutsRef.current.push(t);
        });

        // After all lines, show message
        const totalLineTime = BOOT_LINES.length * 280;

        const msgTimeout = setTimeout(() => {
            setShowMessage(true);
        }, totalLineTime + 300);
        timeoutsRef.current.push(msgTimeout);

        // Fade out and complete
        const fadeTimeout = setTimeout(() => {
            setFadeOut(true);
            sessionStorage.setItem('loader-shown', 'true');
        }, totalLineTime + 1200);
        timeoutsRef.current.push(fadeTimeout);

        const doneTimeout = setTimeout(() => {
            stableOnComplete();
        }, totalLineTime + 1700);
        timeoutsRef.current.push(doneTimeout);

        return () => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
        };
    }, [stableOnComplete]);

    // Don't render if already shown in this session
    if (sessionStorage.getItem('loader-shown') && !fadeOut && visibleLines === 0) {
        return null;
    }

    return (
        <div className={`loader-screen ${fadeOut ? 'fade-out' : ''}`}>
            <div className="loader-lines">
                {BOOT_LINES.map((line, i) => (
                    <div
                        key={i}
                        className={`loader-line ${i < visibleLines ? 'visible' : ''}`}
                    >
                        <span className="ok">{line.prefix}</span>
                        <span className="text">{line.text}</span>
                    </div>
                ))}
            </div>
            <div className="loader-progress">
                <div
                    className="loader-progress-bar"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className={`loader-message ${showMessage ? 'visible' : ''}`}>
                {'> Access Granted. Welcome.'}
            </div>
        </div>
    );
}
