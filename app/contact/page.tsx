'use client';

import { useState, FormEvent, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
    name: string;
    email: string;
    message: string;
}

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');

            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="min-h-screen bg-[#f8f6f1] dark:bg-zinc-950 relative overflow-hidden transition-colors duration-500">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f8f6f1] via-[#ede8dd] to-[#f4efe6] dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 animate-gradient" />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <section ref={sectionRef} className="relative z-10 container mx-auto px-4 py-24 min-h-screen flex items-center justify-center">
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="w-full max-w-2xl"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-900 dark:text-zinc-100 mb-4 tracking-tight">
                            Get in Touch
                        </h1>
                        <p className="text-gray-600 dark:text-zinc-400 text-lg font-light">
                            Let's create something extraordinary together
                        </p>
                    </motion.div>

                    {/* Glass Card */}
                    <motion.div
                        variants={itemVariants}
                        className="relative group"
                        style={{ perspective: '1000px' }}
                    >
                        <div className="relative bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-zinc-800/40 shadow-[0_8px_32px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] p-8 md:p-12 transition-all duration-500">
                            {/* Subtle inner glow */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

                            <form onSubmit={handleSubmit} className="relative space-y-8">
                                {/* Name Field */}
                                <motion.div variants={itemVariants} className="relative">
                                    <label
                                        htmlFor="name"
                                        className={cn(
                                            "absolute left-4 transition-all duration-300 ease-out pointer-events-none text-gray-500",
                                            focusedField === 'name' || formData.name
                                                ? "-top-2.5 text-xs bg-white/90 dark:bg-zinc-800 px-2 rounded-full text-gray-700 dark:text-zinc-300 font-medium"
                                                : "top-4 text-base"
                                        )}
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        disabled={status === 'loading'}
                                        className={cn(
                                            "w-full px-4 py-4 bg-white/50 dark:bg-zinc-950/50 border-2 rounded-2xl transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-zinc-100",
                                            focusedField === 'name'
                                                ? "border-gray-400 dark:border-zinc-500 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                                                : "border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700"
                                        )}
                                    />
                                </motion.div>

                                {/* Email Field */}
                                <motion.div variants={itemVariants} className="relative">
                                    <label
                                        htmlFor="email"
                                        className={cn(
                                            "absolute left-4 transition-all duration-300 ease-out pointer-events-none text-gray-500",
                                            focusedField === 'email' || formData.email
                                                ? "-top-2.5 text-xs bg-white/90 dark:bg-zinc-800 px-2 rounded-full text-gray-700 dark:text-zinc-300 font-medium"
                                                : "top-4 text-base"
                                        )}
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        disabled={status === 'loading'}
                                        className={cn(
                                            "w-full px-4 py-4 bg-white/50 dark:bg-zinc-950/50 border-2 rounded-2xl transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-zinc-100",
                                            focusedField === 'email'
                                                ? "border-gray-400 dark:border-zinc-500 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                                                : "border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700"
                                        )}
                                    />
                                </motion.div>

                                {/* Message Field */}
                                <motion.div variants={itemVariants} className="relative">
                                    <label
                                        htmlFor="message"
                                        className={cn(
                                            "absolute left-4 transition-all duration-300 ease-out pointer-events-none text-gray-500",
                                            focusedField === 'message' || formData.message
                                                ? "-top-2.5 text-xs bg-white/90 dark:bg-zinc-800 px-2 rounded-full text-gray-700 dark:text-zinc-300 font-medium"
                                                : "top-4 text-base"
                                        )}
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        disabled={status === 'loading'}
                                        rows={5}
                                        className={cn(
                                            "w-full px-4 py-4 bg-white/50 dark:bg-zinc-950/50 border-2 rounded-2xl transition-all duration-300 outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-zinc-100",
                                            focusedField === 'message'
                                                ? "border-gray-400 dark:border-zinc-500 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                                                : "border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700"
                                        )}
                                    />
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div variants={itemVariants}>
                                    <motion.button
                                        type="submit"
                                        disabled={status === 'loading' || status === 'success'}
                                        whileHover={status === 'idle' || status === 'error' ? { scale: 1.02 } : {}}
                                        whileTap={status === 'idle' || status === 'error' ? { scale: 0.98 } : {}}
                                        className={cn(
                                            "w-full py-4 px-6 rounded-2xl font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden",
                                            status === 'loading'
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : status === 'success'
                                                    ? "bg-green-500 cursor-default"
                                                    : status === 'error'
                                                        ? "bg-red-500 hover:bg-red-600 hover:shadow-[0_8px_24px_rgba(239,68,68,0.3)]"
                                                        : "bg-gray-900 dark:bg-zinc-100 dark:text-zinc-950 hover:bg-gray-800 dark:hover:bg-zinc-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
                                        )}
                                    >
                                        {status === 'loading' && (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending...
                                            </>
                                        )}
                                        {status === 'success' && (
                                            <>
                                                <CheckCircle2 className="w-5 h-5" />
                                                Message Sent!
                                            </>
                                        )}
                                        {status === 'error' && (
                                            <>
                                                <AlertCircle className="w-5 h-5" />
                                                Try Again
                                            </>
                                        )}
                                        {status === 'idle' && (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </motion.button>
                                </motion.div>

                                {/* Error/Success Messages */}
                                {status === 'error' && errorMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{
                                            opacity: 1,
                                            x: [0, -10, 10, -10, 10, 0],
                                        }}
                                        transition={{
                                            x: { duration: 0.5 },
                                            opacity: { duration: 0.3 }
                                        }}
                                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
                                    >
                                        {errorMessage}
                                    </motion.div>
                                )}

                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm text-center"
                                    >
                                        Thank you! Your message has been sent successfully.
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}
