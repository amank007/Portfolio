import { useState, useCallback } from 'react';
import './index.css';
import './animations.css';
import { useTheme } from './hooks/useEffects';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleNetwork from './components/ParticleNetwork';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [isContactTyping, setIsContactTyping] = useState(false);
  const typingTimeoutRef = { current: null };

  const handleContactTyping = useCallback(() => {
    setIsContactTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => setIsContactTyping(false), 1500);
  }, []);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {loaded && (
        <>
          <CustomCursor />
          <ParticleNetwork theme={theme} />

          <Navbar theme={theme} toggleTheme={toggleTheme} />

          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Certifications />
            <Contact onTyping={handleContactTyping} />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
