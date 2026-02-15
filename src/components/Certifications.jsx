import { motion } from 'framer-motion';
import { certifications } from '../data/portfolioData';
import SectionTitle from './SectionTitle';

const badgeVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, delay: i * 0.1 }
    })
};

export default function Certifications() {
    return (
        <section className="section" id="certifications">
            <div className="container">
                <SectionTitle prefix=">" title="certifications" />

                <div className="certs-grid">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={badgeVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="cert-card glass-card"
                        >
                            <div className="cert-icon">{cert.icon}</div>
                            <h4>{cert.name}</h4>
                            <span className="cert-issuer">{cert.issuer}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
