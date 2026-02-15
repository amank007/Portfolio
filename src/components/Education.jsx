import { motion } from 'framer-motion';
import { education } from '../data/portfolioData';
import { useInView } from '../hooks/useEffects';
import SectionTitle from './SectionTitle';
import TiltCard from './TiltCard';

function CGPARing({ cgpa, maxCgpa }) {
    const [ref, inView] = useInView();
    const circumference = 2 * Math.PI * 45; // r=45
    const percentage = cgpa / maxCgpa;
    const offset = circumference * (1 - percentage);

    return (
        <div className="cgpa-ring" ref={ref}>
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="ring-bg" />
                <circle
                    cx="50" cy="50" r="45"
                    className="ring-fill"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: inView ? offset : circumference,
                    }}
                />
            </svg>
            <div className="cgpa-text">
                <span className="cgpa-value">{cgpa}</span>
                <span className="cgpa-label">CGPA</span>
            </div>
        </div>
    );
}

export default function Education() {
    return (
        <section className="section" id="education">
            <div className="container">
                <SectionTitle prefix=">" title="education" />

                <div className="education-grid">
                    {education.map((edu, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            viewport={{ once: true }}
                        >
                            <TiltCard>
                                <div className="education-card glass-card">
                                    <h3>{edu.degree}</h3>
                                    <p className="institution">{edu.institution}</p>
                                    <p className="edu-date">{edu.location} | {edu.date}</p>
                                    <CGPARing cgpa={edu.cgpa} maxCgpa={edu.maxCgpa} />
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
