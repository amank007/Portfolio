import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import SectionTitle from './SectionTitle';

export default function Contact({ onTyping }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState('');
    const [sending, setSending] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (onTyping) onTyping();
    }, [onTyping]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setStatus('error');
            setTimeout(() => setStatus(''), 3000);
            return;
        }

        setSending(true);
        setStatus('');

        try {
            // Using Web3Forms (free, no server needed)
            // Replace YOUR_ACCESS_KEY with a real key from web3forms.com
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
                    ...formData,
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }

        setSending(false);
        setTimeout(() => setStatus(''), 5000);
    }, [formData]);

    return (
        <section className="section" id="contact">
            <div className="container">
                <SectionTitle prefix=">" title="contact_me" />

                <div className="contact-content">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3>Let's Work Together</h3>
                        <p className="contact-subtitle">
                            Have a project idea, a cybersecurity challenge, or just want to connect?
                            I'd love to hear from you. Drop a message and I'll get back to you soon!
                        </p>

                        <ul className="contact-details">
                            <li>
                                <span className="contact-icon">📧</span>
                                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                            </li>
                            <li>
                                <span className="contact-icon">📱</span>
                                <span>{personalInfo.phone}</span>
                            </li>
                            <li>
                                <span className="contact-icon">🔗</span>
                                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <span className="contact-icon">🐙</span>
                                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <span className="contact-icon">📍</span>
                                <span>{personalInfo.location}</span>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.form
                        className="contact-form glass-card"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="form-group">
                            <label htmlFor="contact-name">Name</label>
                            <input
                                id="contact-name"
                                type="text"
                                name="name"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-email">Email</label>
                            <input
                                id="contact-email"
                                type="email"
                                name="email"
                                placeholder="your.email@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-subject">Subject</label>
                            <input
                                id="contact-subject"
                                type="text"
                                name="subject"
                                placeholder="What's this about?"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-message">Message</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                placeholder="Your message..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={sending}
                        >
                            {sending ? '⏳ Sending...' : '🚀 Send Message'}
                        </button>

                        {status === 'success' && (
                            <p className="form-status success">✅ Message sent successfully!</p>
                        )}
                        {status === 'error' && (
                            <p className="form-status error">❌ Please fill all required fields or try again.</p>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
