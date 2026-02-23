'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className={cn(
                    "pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-700 backdrop-blur-2xl shadow-sm",
                    scrolled
                        ? "bg-white/60 dark:bg-zinc-900/60 border-white/50 dark:border-zinc-800/50 shadow-xl"
                        : "bg-white/30 dark:bg-zinc-900/30 border-white/20 dark:border-zinc-800/20"
                )}
            >
                {/* Logo / Home Link */}
                <Link
                    href="/"
                    className="text-lg font-serif italic text-gray-900 dark:text-zinc-100 pr-4 border-r border-gray-200/50 dark:border-white/10 hover:opacity-70 transition-opacity"
                >
                    R.P.
                </Link>

                {/* Links */}
                <div className="flex items-center gap-1">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-500",
                                    isActive ? "text-gray-900 dark:text-zinc-100" : "text-gray-400 hover:text-gray-900 dark:hover:text-zinc-100"
                                )}
                            >
                                <span className="relative z-10">{link.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm -z-0 border dark:border-zinc-700"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Theme Toggle */}
                <div className="pl-4 border-l border-gray-200/50 dark:border-white/10">
                    <ThemeToggle />
                </div>
            </motion.nav>
        </div>
    );
}
