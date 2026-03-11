'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import TechStack from './TechStack';

const CLI = [
    { cmd: 'based',     out: 'Paris, France' },
    { cmd: 'school',    out: 'EDHEC · MSc Data Analytics & AI · 2025' },
    { cmd: 'expertise', out: 'AI products · data · engineering' },
    { cmd: 'interests', out: 'tennis · cooking · F1 · travelling' },
];

const spring = { type: 'spring' as const, stiffness: 290, damping: 28 };

export default function LeftPanel() {
    return (
        <>
            <style>{`
                @keyframes breatheDot {
                    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(0,113,227,0.4); }
                    65%       { opacity: 0.75; box-shadow: 0 0 0 5px rgba(0,113,227,0); }
                }
                @keyframes cursorBlink {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
                }

                /* ── Left panel ───────────────────────────────── */
                .left-panel {
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                }

                /* ── Name block ───────────────────────────────── */
                .name-block { margin-bottom: 16px; }

                .name-photo-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    margin-bottom: 10px;
                }

                .name-photo-left { flex: 1; min-width: 0; }

                .display-name {
                    font-family: -apple-system, 'SF Pro Display', BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
                    font-size: clamp(26px, 3vw, 38px);
                    font-weight: 700;
                    letter-spacing: -0.04em;
                    color: #1d1d1f;
                    line-height: 1.04;
                    margin: 0 0 10px;
                    transition: color 0.4s ease;
                }

                .intro-photo {
                    width: 120px;
                    height: 148px;
                    border-radius: 14px;
                    object-fit: cover;
                    object-position: center center;
                    flex-shrink: 0;
                    box-shadow:
                        0 2px 6px rgba(0,0,0,0.12),
                        0 8px 24px rgba(0,0,0,0.10);
                    transition: box-shadow 0.4s ease;
                }

                [data-theme="dark"] .intro-photo {
                    box-shadow:
                        0 2px 6px rgba(0,0,0,0.4),
                        0 8px 24px rgba(0,0,0,0.35);
                }

                .role-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 0;
                    flex-wrap: wrap;
                }

                .role-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(0,113,227,0.07);
                    border: 1px solid rgba(0,113,227,0.18);
                    border-radius: 20px;
                    padding: 4px 10px 4px 8px;
                    color: #0071e3;
                    font-family: -apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: -0.01em;
                    white-space: nowrap;
                    transition: background 0.4s ease, border-color 0.4s ease, color 0.4s ease;
                }

                .role-dot {
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #0071e3;
                    flex-shrink: 0;
                    animation: breatheDot 2.6s ease-in-out infinite;
                }

                .display-location {
                    font-family: -apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif;
                    font-size: 13px;
                    font-weight: 400;
                    color: #86868b;
                    letter-spacing: -0.01em;
                    transition: color 0.4s ease;
                }

                .display-bio {
                    font-family: -apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif;
                    font-size: 14.5px;
                    line-height: 1.7;
                    color: #3a3a3c;
                    margin: 0;
                    letter-spacing: -0.012em;
                    transition: color 0.4s ease;
                }

                /* ── Terminal ─────────────────────────────────── */
                .terminal-card {
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow:
                        0 1px 3px rgba(0,0,0,0.06),
                        0 8px 20px rgba(0,0,0,0.13),
                        0 20px 44px rgba(0,0,0,0.09);
                    font-family: 'SF Mono', Menlo, Monaco, 'Fira Code', 'Cascadia Code', monospace;
                    margin-bottom: 10px;
                }

                .terminal-bar {
                    height: 38px;
                    background: #323234;
                    display: flex;
                    align-items: center;
                    padding: 0 14px;
                    position: relative;
                    user-select: none;
                }
                .traffic { display: flex; gap: 7px; align-items: center; }
                .tl { width: 11px; height: 11px; border-radius: 50%; }
                .tl-r { background: #ff5f57; }
                .tl-y { background: #ffbd2e; }
                .tl-g { background: #28c940; }
                .bar-title {
                    position: absolute;
                    left: 50%; transform: translateX(-50%);
                    font-size: 11px;
                    color: rgba(255,255,255,0.3);
                    letter-spacing: 0.02em;
                }

                .terminal-body {
                    background: #1c1c1e;
                    padding: 18px 20px 22px;
                }

                .cli-pair { margin-bottom: 11px; }
                .cli-pair:last-child { margin-bottom: 0; }

                .cli-prompt-row {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    margin-bottom: 1px;
                }
                .cli-prompt {
                    color: #30d158;
                    font-size: 11.5px;
                    font-weight: 600;
                    white-space: nowrap;
                    flex-shrink: 0;
                }
                .cli-cmd { color: rgba(255,255,255,0.35); font-size: 11.5px; }
                .cli-out { color: rgba(255,255,255,0.85); font-size: 11.5px; line-height: 1.45; }

                .cli-cursor {
                    display: inline-block;
                    width: 6px; height: 13px;
                    background: #30d158;
                    vertical-align: middle;
                    margin-left: 1px;
                    border-radius: 1px;
                    animation: cursorBlink 1.1s step-end infinite;
                }

                /* ── Links ────────────────────────────────────── */
                .links-row {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }

                .intro-link {
                    font-family: -apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif;
                    font-size: 13px;
                    font-weight: 500;
                    color: #48484a;
                    text-decoration: none;
                    letter-spacing: -0.01em;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    transition: color 0.15s ease;
                    cursor: pointer;
                }
                .intro-link:hover { color: #1d1d1f; }
                .intro-link .arrow {
                    font-size: 11px;
                    display: inline-block;
                    transition: transform 0.15s ease;
                }
                .intro-link:hover .arrow { transform: translateX(2px); }

                /* ── Dark mode overrides ──────────────────────── */
                [data-theme="dark"] .display-name   { color: #f5f5f7; }
                [data-theme="dark"] .display-location { color: #636366; }
                [data-theme="dark"] .display-bio    { color: #a1a1a6; }
                [data-theme="dark"] .role-badge {
                    background: rgba(10,132,255,0.12);
                    border-color: rgba(10,132,255,0.22);
                    color: #0a84ff;
                }
                [data-theme="dark"] .role-dot { background: #0a84ff; }
                [data-theme="dark"] .intro-link       { color: #8e8e93; }
                [data-theme="dark"] .intro-link:hover { color: #f5f5f7; }

                /* ── Responsive ───────────────────────────────── */
                @media (max-width: 860px) {
                    .left-panel   { align-items: center; text-align: center; }
                    .role-row     { justify-content: center; }
                    .links-row    { justify-content: center; }
                    .name-photo-row { flex-direction: column-reverse; align-items: center; }
                    .intro-photo  { width: 100px; height: 123px; }
                }

                /* ── Reduced motion ───────────────────────────── */
                @media (prefers-reduced-motion: reduce) {
                    .role-dot    { animation: none !important; }
                    .cli-cursor  { animation: none !important; }
                }
            `}</style>

            <div className="left-panel">

                {/* Name + role badge + bio */}
                <div className="name-block">
                    <div className="name-photo-row">
                        <div className="name-photo-left">
                            <h1 className="display-name" aria-label="Vidyen Wadgave">
                                {'Vidyen Wadgave'.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 270,
                                            damping: 22,
                                            delay: 0.06 + i * 0.038,
                                        }}
                                        style={{ display: 'inline-block' }}
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </motion.span>
                                ))}
                            </h1>

                            <motion.div
                                className="role-row"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...spring, delay: 0.72 }}
                            >
                                <span className="role-badge">
                                    <span className="role-dot" />
                                    AI Product Manager
                                </span>
                                <span className="display-location">Paris · France</span>
                            </motion.div>
                        </div>

                        {/* Photo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.88, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{ type: 'spring', stiffness: 220, damping: 24, delay: 0.30 }}
                        >
                            <Image
                                src="/vidyen-cropped.jpeg"
                                alt="Vidyen Wadgave"
                                width={120}
                                height={148}
                                className="intro-photo"
                                priority
                            />
                        </motion.div>
                    </div>

                    <motion.p
                        className="display-bio"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...spring, delay: 0.88 }}
                    >
                        Product Manager by title, builder by curiosity. I work at the
                        intersection of AI, data, and engineering, turning messy problems
                        into products that actually ship.
                    </motion.p>
                </div>

                {/* Terminal */}
                <motion.div
                    className="terminal-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring, delay: 0.18 }}
                >
                    <div className="terminal-bar">
                        <div className="traffic">
                            <div className="tl tl-r" />
                            <div className="tl tl-y" />
                            <div className="tl tl-g" />
                        </div>
                        <span className="bar-title">vidyen@twin:~$</span>
                    </div>
                    <div className="terminal-body">
                        {CLI.map(({ cmd, out }, i) => (
                            <motion.div
                                key={cmd}
                                className="cli-pair"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 32,
                                    delay: 0.38 + i * 0.13,
                                }}
                            >
                                <div className="cli-prompt-row">
                                    <span className="cli-prompt">vidyen@twin:~$</span>
                                    <span className="cli-cmd">{cmd}</span>
                                </div>
                                <div className="cli-out">{out}</div>
                            </motion.div>
                        ))}
                        <motion.div
                            className="cli-pair"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 32,
                                delay: 0.38 + CLI.length * 0.13,
                            }}
                        >
                            <div className="cli-prompt-row">
                                <span className="cli-prompt">vidyen@twin:~$</span>
                                <span className="cli-cursor" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Links */}
                <motion.div
                    className="links-row"
                    style={{ marginBottom: '14px' }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring, delay: 0.30 }}
                >
                    <a
                        href="https://www.linkedin.com/in/vidyen-wadgave/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="intro-link"
                    >
                        LinkedIn <span className="arrow">→</span>
                    </a>
                    <a href="mailto:vidyen.wadgave@edhec.com" className="intro-link">
                        Email <span className="arrow">→</span>
                    </a>
                </motion.div>

                {/* Tech stack ticker */}
                <motion.div
                    style={{ width: '100%' }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring, delay: 0.42 }}
                >
                    <TechStack />
                </motion.div>

            </div>
        </>
    );
}
