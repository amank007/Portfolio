import { useState, useCallback } from 'react';
import { navLinks } from '../data/portfolioData';
import { useScrollSpy, useNavScroll } from '../hooks/useEffects';

export default function Navbar({ theme, toggleTheme }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrolled } = useNavScroll();
    const sectionIds = navLinks.map(l => l.href.replace('#', ''));
    const activeSection = useScrollSpy(sectionIds);

    const handleNavClick = useCallback((e, href) => {
        e.preventDefault();
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
                <div className="container">
                    <span className="nav-logo glitch-hover" onClick={scrollToTop}>
                        {'<AK/>'}
                    </span>

                    <ul className="nav-links">
                        {navLinks.map(link => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className={activeSection === link.href.replace('#', '') ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>

                        <button
                            className={`hamburger ${mobileOpen ? 'open' : ''}`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Nav */}
            <div
                className={`mobile-overlay ${mobileOpen ? 'open' : ''}`}
                onClick={() => setMobileOpen(false)}
            />
            <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
                {navLinks.map(link => (
                    <a
                        key={link.href}
                        href={link.href}
                        className={activeSection === link.href.replace('#', '') ? 'active' : ''}
                        onClick={(e) => handleNavClick(e, link.href)}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </>
    );
}
