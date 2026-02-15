import { motion } from 'framer-motion';
import { experience } from '../data/portfolioData';
import SectionTitle from './SectionTitle';

export default function Experience() {
    return (
        <section className="section" id="experience">
            <div className="container">
                <SectionTitle prefix=">" title="work_experience" />

                <div className="timeline">
                    {experience.map((exp, i) => (
                        <motion.div
                            key={i}
                            className="timeline-item"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="timeline-card glass-card">
                                <h3>{exp.role}</h3>
                                <p className="company">{exp.company}</p>
                                <p className="date">{exp.date}</p>
                                <p className="description">{exp.description}</p>
                                {exp.tags && (
                                    <div className="project-tags" style={{ marginTop: '16px' }}>
                                        {exp.tags.map((tag, j) => (
                                            <span key={j} className="tech-tag">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
