// Site-wide data for the portfolio
export const personalInfo = {
    name: 'Aman Kumar',
    title: 'Cybersecurity Researcher & Developer',
    tagline: 'Securing the digital frontier — one vulnerability at a time. M.Tech Cyber Security researcher at DIAT, building robust defences for tomorrow\'s threats.',
    email: 'kaman000k@gmail.com',
    phone: '+91 9305663953',
    github: 'https://github.com/amank007',
    linkedin: 'https://linkedin.com/in/k-aman7',
    location: 'New Delhi, India',
};

export const aboutText = [
    "I'm a Cybersecurity Researcher currently pursuing my M.Tech in Cyber Security at the Defence Institute of Advanced Technology (DIAT), Pune — a premier institute under the Ministry of Defence, Government of India.",
    "Currently interning at DRDO (Defence Research and Development Organisation), I work on real-world defence cybersecurity systems, applying cutting-edge techniques in penetration testing, reverse engineering, and threat analysis.",
    "With a B.Tech in Computer Science as my foundation, I combine strong programming skills with deep security knowledge to build resilient digital systems. I'm passionate about ethical hacking, malware analysis, and securing critical infrastructure.",
];

export const stats = [
    { value: '2+', label: 'Years in Cybersecurity' },
    { value: '3+', label: 'Projects Built' },
    { value: '5+', label: 'Certifications' },
    { value: 'GATE', label: 'CS Qualified' },
];

export const skillCategories = [
    {
        title: '// Languages',
        icon: '⚡',
        skills: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'Bash', 'SQL', 'HTML'],
    },
    {
        title: '// Security Tools',
        icon: '🔒',
        skills: ['Burp Suite', 'Nmap', 'Wireshark', 'Metasploit', 'Ghidra'],
    },
    {
        title: '// Cloud & DevOps',
        icon: '☁️',
        skills: ['AWS', 'Azure', 'Git', 'Docker', 'VMware'],
    },
    {
        title: '// Operating Systems',
        icon: '🖥️',
        skills: ['Linux', 'Windows'],
    },
    {
        title: '// Core Concepts',
        icon: '🧠',
        skills: ['TCP/IP', 'OSI Model', 'Network Security', 'Reverse Engineering', 'Web Pen Testing'],
    },
];

export const experience = [
    {
        role: 'Cyber Security Intern',
        company: 'DRDO — Defence Research & Development Organisation',
        date: 'Jul 2025 – Present',
        description: 'Working on cybersecurity solutions for India\'s defence infrastructure. Conducting vulnerability assessments, penetration testing, and developing secure protocols for classified defence systems.',
        tags: ['Penetration Testing', 'Network Security', 'Reverse Engineering', 'Python', 'Linux'],
    },
];

export const projects = [
    {
        title: 'Smart Hydroponics CPS',
        date: 'Mar 2025 – Apr 2025',
        icon: '🌱',
        description: [
            'Built a portable Cyber Physical System integrating environmental sensors for real-time monitoring.',
            'Implemented rule-based automation for pumps, fans, and lighting systems.',
            'Developed a web dashboard for visualization, analytics, and manual overrides.',
        ],
        tags: ['Python', 'MariaDB', 'HTML', 'CSS', 'JavaScript'],
        github: 'https://github.com/amank007/SmartHydroponics',
    },
    {
        title: 'Thesis Management System',
        date: 'Sep 2023 – Dec 2023',
        icon: '📄',
        description: [
            'Developed a centralized portal for thesis submission and SAC management.',
            'Implemented real-time tracking to monitor submission statuses efficiently.',
            'Digitally optimized university-wide thesis management procedures.',
        ],
        tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
        github: 'https://github.com/amank007/Thesis-Management-System',
    },
    {
        title: 'Malware Log Analysis',
        date: 'Mar 2023 – May 2023',
        icon: '🔍',
        description: [
            'Trained ML models to detect malware using system log analysis.',
            'Improved threat identification accuracy and reduced security risks.',
        ],
        tags: ['Python', 'Machine Learning'],
        github: 'https://github.com/amank007/malware-log-analysis',
    },
];

export const education = [
    {
        degree: 'M.Tech Cyber Security',
        institution: 'DIAT — Defence Institute of Advanced Technology',
        location: 'Pune, MH',
        date: 'Jul 2024 – Present',
        cgpa: 7.7,
        maxCgpa: 10,
    },
    {
        degree: 'B.Tech Computer Science',
        institution: 'SHUATS',
        location: 'Prayagraj, UP',
        date: 'Apr 2020 – Jun 2024',
        cgpa: 7.9,
        maxCgpa: 10,
    },
];

export const certifications = [
    { name: 'GATE CS 2024', issuer: 'Qualified', icon: '🏅' },
    { name: 'Ethical Hacking', issuer: 'IIT Kharagpur', icon: '🔓' },
    { name: 'Azure Fundamentals', issuer: 'Microsoft', icon: '☁️' },
    { name: 'Cybersecurity Tools & Cyber Attacks', issuer: 'IBM', icon: '🛡️' },
    { name: 'Cyber Security Management VEP', issuer: 'ANZ', icon: '📊' },
];

export const terminalCommands = {
    help: `Available commands:
  about      — Learn about me
  skills     — View my technical skills
  projects   — Browse my projects
  contact    — Get my contact info
  education  — My academic background
  certs      — Certifications & achievements
  clear      — Clear terminal
  sudo hire-me — You know you want to 😉`,

    about: `> Aman Kumar
  M.Tech Cyber Security @ DIAT, Pune
  Cybersecurity Intern @ DRDO
  Passionate about penetration testing,
  reverse engineering, and building
  secure digital systems.`,

    skills: `┌──────────────────────────────┐
│  Languages: C, C++, Java,   │
│  Python, JavaScript, Bash   │
│  Tools: Burp Suite, Nmap,   │
│  Wireshark, Metasploit      │
│  Cloud: AWS, Azure, Docker  │
│  OS: Linux, Windows         │
└──────────────────────────────┘`,

    projects: `[1] Smart Hydroponics CPS
    → IoT + Web Dashboard
[2] Thesis Management System
    → Full-Stack Portal
[3] Malware Log Analysis
    → ML-based Detection`,

    contact: `📧 kaman000k@gmail.com
📱 +91 9305663953
🔗 linkedin.com/in/k-aman7
🐙 github.com/amank007
📍 Pune, Maharashtra, India`,

    education: `🎓 M.Tech Cyber Security — DIAT
   CGPA: 7.8 (2024-Present)
🎓 B.Tech Computer Science — SHUATS
   CGPA: 7.9 (2020-2024)`,

    certs: `🏅 GATE CS 2024 — Qualified
🔓 Ethical Hacking — IIT Kharagpur
☁️ Azure Fundamentals — Microsoft
🛡️ Cybersecurity Tools — IBM
📊 Cyber Security Mgmt — ANZ`,

    'sudo hire-me': `[sudo] password for recruiter: ********
✅ Permission granted!
📧 Sending resume to your inbox...
🚀 Let's build something amazing together!`,

    hack: 'HACK_EASTER_EGG',
};

export const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#certifications', label: 'Certs' },
    { href: '#contact', label: 'Contact' },
];
