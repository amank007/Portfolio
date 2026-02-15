import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import SectionTitle from './SectionTitle';
import TiltCard from './TiltCard';

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, delay: i * 0.15 }
    })
};

export default function Projects() {
    return (
        <section className="section" id="projects">
            <div className="container">
                <SectionTitle prefix=">" title="my_projects" />

                <div className="projects-grid">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <TiltCard>
                                <div className="project-card glass-card">
                                    <div className="project-card-gradient"></div>
                                    <div className="project-card-body">
                                        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>
                                            {project.icon}
                                        </div>
                                        <h3>{project.title}</h3>
                                        <p className="project-date">{project.date}</p>
                                        <div className="project-description">
                                            <ul>
                                                {project.description.map((point, j) => (
                                                    <li key={j}>{point}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="project-tags">
                                            {project.tags.map((tag, j) => (
                                                <span key={j} className="tech-tag">{tag}</span>
                                            ))}
                                        </div>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                                            View on GitHub →
                                        </a>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
