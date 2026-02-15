import { motion } from 'framer-motion';
import { aboutText, stats } from '../data/portfolioData';
import { useInView, useCountUp } from '../hooks/useEffects';
import SectionTitle from './SectionTitle';

function StatCard({ value, label, delay, inView }) {
    const count = useCountUp(value, 1500, inView);
    const isNumeric = !isNaN(parseInt(value));

    return (
        <motion.div
            className="stat-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
        >
            <span className="stat-number">
                {isNumeric ? count : value}
                {isNumeric && value.toString().includes('+') ? '+' : ''}
            </span>
            <span className="stat-label">{label}</span>
        </motion.div>
    );
}

export default function About() {
    const [ref, inView] = useInView();

    return (
        <section className="section" id="about">
            <div className="container">
                <SectionTitle prefix=">" title="about_me" />
                <div className="about-content" ref={ref}>
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        {aboutText.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </motion.div>

                    <div className="stats-grid">
                        {stats.map((stat, i) => (
                            <StatCard
                                key={i}
                                value={stat.value}
                                label={stat.label}
                                delay={i * 0.1}
                                inView={inView}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
