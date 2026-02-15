import { useRef } from 'react';
import { useTilt } from '../hooks/useEffects';

export default function TiltCard({ children, className = '', ...props }) {
    const ref = useRef(null);
    useTilt(ref, { max: 10, speed: 400, scale: 1.02 });

    return (
        <div ref={ref} className={`tilt-card ${className}`} {...props}>
            <div className="tilt-shine"></div>
            {children}
        </div>
    );
}
