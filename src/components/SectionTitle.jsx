import { useInView, useTextScramble } from '../hooks/useEffects';

export default function SectionTitle({ prefix = '>', title, id }) {
    const [ref, inView] = useInView();
    const scrambled = useTextScramble(title, inView, 25);

    return (
        <h2 className="section-title" ref={ref} id={id ? `${id}-title` : undefined}>
            <span className="terminal-prefix">{prefix}</span>
            <span className="scramble-text">{scrambled || title}</span>
        </h2>
    );
}
