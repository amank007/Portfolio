import { motion } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';
import SectionTitle from './SectionTitle';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
};

// CSS 3D rotating cube icon for each skill
function SkillCube({ name, delay }) {
    const label = name.length <= 2 ? name : name.slice(0, 2);
    return (
        <div className="skill-icon-3d">
            <div
                className="skill-cube"
                style={{ animationDelay: `${delay * -0.8}s` }}
            >
                <div className="skill-cube-face skill-cube-face--front">{label}</div>
                <div className="skill-cube-face skill-cube-face--back">{label}</div>
                <div className="skill-cube-face skill-cube-face--left">{label}</div>
                <div className="skill-cube-face skill-cube-face--right">{label}</div>
                <div className="skill-cube-face skill-cube-face--top"></div>
                <div className="skill-cube-face skill-cube-face--bottom"></div>
            </div>
        </div>
    );
}

export default function Skills() {
    return (
        <section className="section" id="skills">
            <div className="container">
                <SectionTitle prefix=">" title="technical_skills" />

                <motion.div
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    {skillCategories.map((category, i) => (
                        <motion.div
                            key={i}
                            className="skill-category glass-card"
                            variants={cardVariants}
                        >
                            <h3>{category.icon} {category.title}</h3>
                            <motion.div
                                className="skill-items"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {category.skills.map((skill, j) => (
                                    <motion.div
                                        key={j}
                                        className="skill-item"
                                        variants={skillVariants}
                                        transition={{ duration: 0.3, delay: j * 0.05 }}
                                    >
                                        <SkillCube name={skill} delay={j} />
                                        {skill}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
