'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const projects = [
    {
        title: 'E-Commerce Platform',
        description:
            'A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard. Built with modern technologies for optimal performance.',
        tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200',
        link: '#',
        github: '#',
    },
    {
        title: 'AI Content Generator',
        description:
            'AI-powered content generation tool leveraging OpenAI API. Features include blog post generation, SEO optimization, and multi-language support.',
        tech: ['React', 'Node.js', 'OpenAI', 'MongoDB'],
        image: 'https://images.unsplash.com/photo-1675557009875-436f595b1853?auto=format&fit=crop&q=80&w=1200',
        link: '#',
        github: '#',
    },
    {
        title: 'Real-Time Chat App',
        description:
            'Scalable real-time messaging platform with WebSocket support, end-to-end encryption, and media sharing capabilities.',
        tech: ['Next.js', 'Socket.io', 'PostgreSQL', 'AWS'],
        image: 'https://images.unsplash.com/photo-1577563906417-45a11b3f9f7c?auto=format&fit=crop&q=80&w=1200',
        link: '#',
        github: '#',
    },
    {
        title: 'Project Dashboard',
        description:
            'Collaborative project management tool with Kanban boards, time tracking, team chat, and analytics dashboard.',
        tech: ['Next.js', 'Prisma', 'tRPC', 'Tailwind'],
        image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1200',
        link: '#',
        github: '#',
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
                            duration: 0.8,
                            delay: i * 0.1,
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
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay }}
        />
    );
}

export default function ProjectsPage() {
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    const { scrollYProgress } = useScroll();
    const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -300]);

    const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
    const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const staggerItem = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
    };

    return (
        <div className="min-h-screen bg-[#f8f6f1] dark:bg-zinc-950 pt-32 pb-16 overflow-x-hidden transition-colors duration-500">
            {/* Noise texture */}
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Background Scroll Text */}
            <motion.div
                style={{ y: bgTextY }}
                className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.02] dark:opacity-[0.04] select-none whitespace-nowrap"
            >
                <h2 className="text-[30vw] font-serif font-black uppercase tracking-tighter dark:text-white">
                    Selected Works
                </h2>
            </motion.div>

            <FloatingShape
                className="fixed top-[20%] right-[5%] w-64 h-64 border border-gray-200 dark:border-zinc-800 rounded-full z-0"
                yOffset={150}
            />

            <div className="relative container mx-auto px-4 z-10">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial="hidden"
                    animate={headerInView ? 'visible' : 'hidden'}
                    variants={fadeInUp}
                    className="max-w-4xl mb-32"
                >
                    <h2 className="text-sm uppercase tracking-[0.4em] text-gray-400 dark:text-zinc-600 font-medium mb-8">
                        / Portfolio
                    </h2>
                    <h1 className="text-7xl md:text-9xl font-serif font-light text-gray-900 dark:text-zinc-100 mb-12 tracking-tighter">
                        <TextReveal text="Projects" />
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-zinc-500 leading-relaxed max-w-2xl font-light">
                        Exploring the intersection of efficiency and aesthetics through custom digital architecture.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    ref={gridRef}
                    initial="hidden"
                    animate={gridInView ? 'visible' : 'hidden'}
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 gap-16 lg:gap-24"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={staggerItem}
                            className="group relative"
                        >
                            <div className="aspect-[4/5] bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl rounded-[3rem] border border-white/50 dark:border-zinc-800/50 overflow-hidden mb-8 relative group">
                                <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-1000">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 dark:opacity-40 dark:group-hover:opacity-100 transition-all duration-700"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/40 dark:group-hover:bg-zinc-950/60 transition-colors duration-700 flex items-center justify-center">
                                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                                        <a
                                            href={project.link}
                                            className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                                        >
                                            <ExternalLink className="w-6 h-6 text-gray-900 dark:text-zinc-100" />
                                        </a>
                                        <a
                                            href={project.github}
                                            className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                                        >
                                            <Github className="w-6 h-6 text-gray-900 dark:text-zinc-100" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <h3 className="text-4xl font-serif text-gray-900 dark:text-zinc-100 mb-4 group-hover:translate-x-2 transition-transform duration-700">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-500 dark:text-zinc-400 mb-6 leading-relaxed font-light text-lg">{project.description}</p>
                                    <div className="flex flex-wrap gap-4">
                                        {project.tech.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-600"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-gray-300 dark:text-zinc-700">Project_0{index + 1}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mt-48 text-center"
                >
                    <h2 className="text-[10vw] font-serif font-light text-gray-900 dark:text-zinc-100 mb-12 tracking-tighter leading-none">
                        Next Chapter?
                    </h2>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-4 px-12 py-6 bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-950 rounded-full hover:bg-gray-800 dark:hover:bg-zinc-200 transition-all duration-700 font-medium text-lg"
                    >
                        Start Your Project
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
