'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Github, Linkedin, Code2, Palette, Zap, Database, Server, GitBranch, Phone } from 'lucide-react';
import ParticleSphere from '@/components/ParticleSphere';

const skills = [
    { name: 'Java', icon: Code2 },
    { name: 'Spring Boot', icon: Server },
    { name: 'React.js', icon: Code2 },
    { name: 'MySQL', icon: Database },
    { name: 'REST APIs', icon: Zap },
    { name: 'Git & GitHub', icon: GitBranch },
];

const experience = [
    {
        period: 'One week',
        role: 'Software Engineer Trainee',
        company: 'Zensar Technologies',
        description: 'Developing full stack applications using React, Spring Boot, and MySQL. Building REST APIs and integrating frontend components with backend services.',
    },
];

const projects = [
    {
        title: 'DevAssist AI',
        description: 'AI-Powered Developer Tool with code review and error explanation.',
        tech: ['React', 'Spring Boot', 'GenAI'],
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    },
    {
        title: 'TaskFlow',
        description: 'Full-stack task management system with status workflows.',
        tech: ['React', 'Spring Boot', 'MySQL'],
        image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=1200',
    },
    {
        title: 'WNextGen Attendance',
        description: 'Attendance portal with role-based access and dashboards.',
        tech: ['React', 'Spring Boot', 'Security'],
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1200',
    },
];

function TextReveal({ text, className }: { text: string; className?: string }) {
    const words = text.split(' ');

    return (
        <span className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                    <motion.span
                        initial={{ y: '100%' }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.5,
                            delay: i * 0.05,
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}

function FloatingShape({ className, delay = 0, yOffset = 100 }: { className?: string; delay?: number; yOffset?: number }) {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, yOffset]);

    return (
        <motion.div
            style={{ y }}
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay }}
        />
    );
}

export default function Home() {
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const experienceRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);

    const { scrollYProgress } = useScroll();
    const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -500]);
    const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

    const heroInView = useInView(heroRef, { once: true, amount: 0.1 });
    const aboutInView = useInView(aboutRef, { once: true, amount: 0.1 });
    const experienceInView = useInView(experienceRef, { once: true, amount: 0.1 });
    const skillsInView = useInView(skillsRef, { once: true, amount: 0.1 });
    const projectsInView = useInView(projectsRef, { once: true, amount: 0.1 });

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const staggerItem = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
    };

    return (
        <div className="min-h-screen bg-[#f8f6f1] dark:bg-zinc-950 overflow-x-hidden transition-colors duration-500">
            {/* Noise texture */}
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Floating Background Elements */}
            <FloatingShape
                className="fixed top-[10%] left-[5%] w-64 h-64 border border-gray-200 dark:border-zinc-800 rounded-full z-0"
                yOffset={200}
            />
            <FloatingShape
                className="fixed top-[60%] right-[10%] w-96 h-96 border border-gray-200 dark:border-zinc-800 rounded-full z-0"
                yOffset={-300}
                delay={0.5}
            />

            {/* Background Scroll Text */}
            <motion.div
                style={{ y: bgTextY }}
                className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.05] select-none whitespace-nowrap"
            >
                <h2 className="text-[10vw] font-serif font-black uppercase tracking-tighter dark:text-white">
                    HUMAN × MACHINE
                </h2>
            </motion.div>

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
                    <motion.div
                        initial="hidden"
                        animate={heroInView ? 'visible' : 'hidden'}
                        variants={staggerContainer}
                        className="text-center lg:text-left"
                    >
                        <div className="mb-4 overflow-hidden">
                            <motion.span
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="inline-block text-sm uppercase tracking-[0.3em] text-primary font-medium"
                            >
                                Java Full Stack Developer
                            </motion.span>
                        </div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-7xl md:text-9xl font-serif font-light text-gray-900 dark:text-zinc-100 mb-8 tracking-tighter leading-none"
                        >
                            <TextReveal text="Rishikesh Suryakant Pawar" />
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-xl md:text-2xl text-gray-600 dark:text-zinc-400 mb-6 font-light italic font-serif"
                        >
                            React — Spring Boot — REST APIs — MySQL
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className="text-lg text-gray-500 dark:text-zinc-500 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            Elevating digital landscapes through <span className="text-gray-900 dark:text-zinc-100 font-medium">precision engineering</span> and <span className="text-gray-900 dark:text-zinc-100 font-medium">masterful design</span>. Based in India, working globally.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-6">
                            <Link
                                href="/projects"
                                className="group px-10 py-5 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-500 flex items-center gap-3 relative overflow-hidden"
                            >
                                <span className="relative z-10 font-medium">Explore Works</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-500" />
                                <motion.div
                                    className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                                />
                            </Link>
                            <Link
                                href="/contact"
                                className="px-10 py-5 bg-transparent border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-zinc-100 rounded-full hover:bg-white dark:hover:bg-zinc-900 transition-all duration-500"
                            >
                                Let's Connect
                            </Link>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-8 mt-16">
                            {[
                                { icon: Mail, href: "mailto:rishipawar0101@gmail.com" },
                                { icon: Phone, href: "tel:+919021363384" },
                                { icon: Github, href: "https://github.com" },
                                { icon: Linkedin, href: "https://linkedin.com" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative"
                                >
                                    <social.icon className="w-6 h-6 text-gray-400 dark:text-zinc-600 group-hover:text-primary transition-colors duration-500" />
                                    <motion.div className="absolute -inset-2 bg-gray-100 dark:bg-zinc-800 scale-0 group-hover:scale-100 rounded-full -z-10 transition-transform duration-500" />
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-[600px] w-full hidden lg:block"
                    >
                        <ParticleSphere />
                    </motion.div>
                </div>

                {/* Scrolldown indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 rotate-90 mb-8">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-gray-200 to-transparent" />
                </motion.div>
            </section>

            {/* About Section */}
            <section ref={aboutRef} className="relative py-32 px-4 z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row gap-16 items-start">
                        <div className="flex-1">
                            <h2 className="text-sm uppercase tracking-[0.4em] text-gray-400 dark:text-zinc-600 font-medium mb-12">
                                / Philosophy
                            </h2>
                            <h3 className="text-4xl md:text-6xl font-serif font-light text-gray-900 dark:text-zinc-100 mb-12 leading-tight">
                                <TextReveal text="Designing with purpose, coding for scale." />
                            </h3>
                        </div>
                        <div className="flex-1 pt-12">
                            <div className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/50 dark:border-zinc-800/50 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.05)] p-10 md:p-14 relative overflow-hidden group">
                                <p className="text-xl text-gray-600 dark:text-zinc-400 leading-relaxed font-light relative z-10">
                                    Java Full Stack Developer with experience building end-to-end web applications using React and Spring Boot. Strong in REST API design, frontend-backend integration, and database modeling with MySQL.
                                </p>
                                <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700">
                                    <Zap className="w-24 h-24 text-gray-900 dark:text-zinc-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Experience Section */}
            <section ref={experienceRef} className="relative py-32 px-4 z-10">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        className="mb-20"
                    >
                        <h2 className="text-sm uppercase tracking-[0.4em] text-gray-400 dark:text-zinc-600 font-medium mb-4">
                            / Journey
                        </h2>
                        <h3 className="text-5xl md:text-7xl font-serif font-light text-gray-900 dark:text-zinc-100 tracking-tight">
                            Experience
                        </h3>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="grid gap-8"
                    >
                        {experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                variants={staggerItem}
                                className="group relative bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/50 dark:border-zinc-800/50 p-10 md:p-16 hover:bg-white/60 dark:hover:bg-zinc-800/60 transition-all duration-700 flex flex-col md:flex-row gap-12"
                            >
                                <div className="md:w-1/3">
                                    <p className="text-sm font-medium text-gray-400 dark:text-zinc-600 mb-2 uppercase tracking-widest">{exp.period}</p>
                                    <h4 className="text-3xl font-serif text-gray-900 dark:text-zinc-100 group-hover:text-primary group-hover:translate-x-2 transition-all duration-700">{exp.company}</h4>
                                </div>
                                <div className="md:w-2/3">
                                    <h5 className="text-xl font-medium text-gray-900 dark:text-zinc-200 mb-6">{exp.role}</h5>
                                    <p className="text-lg text-gray-500 dark:text-zinc-500 leading-relaxed font-light">{exp.description}</p>
                                </div>
                                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-zinc-800 flex items-center justify-center">
                                        <ArrowRight className="w-5 h-5 text-secondary -rotate-45" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Skills Section */}
            <section ref={skillsRef} className="relative py-32 px-4 bg-[#ede8dd]/20 dark:bg-zinc-900/20 z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        className="mb-20 text-center"
                    >
                        <h2 className="text-sm uppercase tracking-[0.4em] text-gray-400 dark:text-zinc-600 font-medium mb-4">
                            / Arsenal
                        </h2>
                        <h3 className="text-5xl md:text-7xl font-serif font-light text-gray-900 dark:text-zinc-100 tracking-tight">
                            Mastered Skills
                        </h3>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {skills.map((skill, index) => {
                            const Icon = skill.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={staggerItem}
                                    className="group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-3xl rounded-[2rem] border border-white/50 dark:border-zinc-800/50 p-10 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-700"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-[#f8f6f1] dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 flex items-center justify-center mb-8 group-hover:rotate-[10deg] transition-transform duration-700 shadow-sm">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <p className="text-2xl font-serif text-gray-900 dark:text-zinc-100">{skill.name}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section >

            {/* Featured Projects Preview */}
            <section ref={projectsRef} className="relative py-32 px-4 z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        className="flex items-end justify-between mb-24"
                    >
                        <div>
                            <h2 className="text-sm uppercase tracking-[0.4em] text-gray-400 dark:text-zinc-600 font-medium mb-">
                                / Selected Works
                            </h2>
                            <h3 className="text-5xl md:text-7xl font-serif font-light text-gray-900 dark:text-zinc-100 tracking-tight">
                                Featured
                            </h3>
                        </div>
                        <Link
                            href="/projects"
                            className="group flex flex-col items-end gap-2 mb-2"
                        >
                            <span className="text-sm font-medium text-gray-900 dark:text-zinc-100">View Catalog</span>
                            <div className="w-12 h-0.5 bg-gray-900 dark:bg-zinc-100 group-hover:w-24 transition-all duration-700" />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-12 lg:gap-20"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={staggerItem}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[4/5] bg-[#ede8dd]/50 dark:bg-zinc-900/50 rounded-[3rem] overflow-hidden mb-8 relative">
                                    <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-1000">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 dark:opacity-40 dark:group-hover:opacity-100 transition-all duration-700"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/40 transition-colors duration-700 flex items-center justify-center">
                                        <div className="w-20 h-20 bg-white dark:bg-zinc-100 rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-700 shadow-xl">
                                            <ArrowRight className="w-8 h-8 text-secondary dark:text-gray-900 -rotate-45" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h4 className="text-3xl font-serif text-gray-900 dark:text-zinc-100 mb-4">{project.title}</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {project.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-zinc-600"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest text-gray-300 dark:text-zinc-700">0{index + 1}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section >

            {/* CTA Section */}
            <section className="relative py-48 px-4 z-10 overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-[15vw] md:text-[10vw] font-serif font-light text-gray-900 dark:text-zinc-100 mb-12 tracking-tighter leading-[0.8]">
                            Let's Build.
                        </h2>
                        <p className="text-xl text-gray-500 dark:text-zinc-500 mb-16 max-w-xl mx-auto font-light">
                            Currently available for new projects or agency partnerships. Reach out and let's discuss your vision.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-4 px-12 py-6 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-700 font-medium text-lg"
                        >
                            Start a Conversation
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </motion.div>
                </div>

                {/* Background Large Text Section Footer */}
                <div className="absolute bottom-0 left-0 right-0 py-12 border-t border-gray-200/50 dark:border-zinc-800/50 flex justify-between px-8 text-[10px] uppercase tracking-[0.5em] text-gray-400 dark:text-zinc-600">
                    <span>© 2026 Rishikesh Pawar</span>
                    <span>Loc: India / GMT+5:30</span>
                </div>
            </section>
        </div >
    );
}
