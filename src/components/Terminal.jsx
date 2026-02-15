import { useState, useRef, useEffect, useCallback } from 'react';
import { terminalCommands } from '../data/portfolioData';

export default function Terminal({ onTyping }) {
    const [lines, setLines] = useState([]);
    const [input, setInput] = useState('');
    const [greeting, setGreeting] = useState('');
    const inputRef = useRef(null);
    const bodyRef = useRef(null);
    const hasGreeted = useRef(false);

    // Auto-type greeting
    useEffect(() => {
        if (hasGreeted.current) return;
        hasGreeted.current = true;

        const greetingText = 'Welcome to my portfolio. Type "help" for commands.';
        let i = 0;
        const interval = setInterval(() => {
            i++;
            setGreeting(greetingText.slice(0, i));
            if (i >= greetingText.length) clearInterval(interval);
        }, 35);

        return () => clearInterval(interval);
    }, []);

    // Auto-scroll terminal
    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [lines, greeting]);

    const handleCommand = useCallback((cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        let output = '';

        if (trimmed === 'clear') {
            setLines([]);
            setGreeting('');
            return;
        }

        if (trimmed === 'hack') {
            output = '🔓 Initiating hack sequence... Just kidding! 😄\n> But I can hack into your heart with my projects!\n> Type "projects" to see them.';
        } else if (terminalCommands[trimmed]) {
            output = terminalCommands[trimmed];
        } else if (trimmed === '') {
            output = '';
        } else {
            output = `Command not found: "${trimmed}". Type "help" for available commands.`;
        }

        setLines(prev => [
            ...prev,
            { type: 'command', text: cmd },
            ...(output ? [{ type: 'output', text: output }] : []),
        ]);
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        handleCommand(input);
        setInput('');
    }, [input, handleCommand]);

    const handleInputChange = useCallback((e) => {
        setInput(e.target.value);
        if (onTyping) onTyping();
    }, [onTyping]);

    const focusInput = useCallback(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    return (
        <div className="terminal" onClick={focusInput}>
            <div className="terminal-header">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
                <span className="terminal-title">aman@portfolio:~$</span>
            </div>
            <div className="terminal-body" ref={bodyRef}>
                {/* Auto greeting */}
                {greeting && (
                    <div className="terminal-line">
                        <span className="output" style={{ color: 'var(--accent-secondary)' }}>
                            {greeting}
                            {greeting.length < 50 && <span className="typing-cursor"></span>}
                        </span>
                    </div>
                )}

                {/* Command history */}
                {lines.map((line, i) => (
                    <div className="terminal-line" key={i}>
                        {line.type === 'command' ? (
                            <>
                                <span className="prompt">❯ </span>
                                <span className="command">{line.text}</span>
                            </>
                        ) : (
                            <span className="output" style={{ whiteSpace: 'pre-wrap' }}>
                                {line.text}
                            </span>
                        )}
                    </div>
                ))}

                {/* Input */}
                <form onSubmit={handleSubmit} className="terminal-input-line">
                    <span className="prompt">❯ </span>
                    <input
                        ref={inputRef}
                        type="text"
                        className="terminal-input"
                        value={input}
                        onChange={handleInputChange}
                        spellCheck={false}
                        autoComplete="off"
                        aria-label="Terminal input"
                    />
                </form>
            </div>
        </div>
    );
}
