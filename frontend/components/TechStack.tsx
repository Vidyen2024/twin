'use client';

import { SiPython, SiOpenai, SiGooglecloud, SiVercel, SiFigma, SiJira, SiMiro,
         SiConfluence, SiPostman, SiZapier, SiStreamlit, SiHuggingface,
         SiSalesforce, SiLangchain, SiAlteryx } from 'react-icons/si';
import { FaAws, FaMicrosoft } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

interface Tech {
    name: string;
    Icon: IconType;
    color: string;
}

const TECHS: Tech[] = [
    { name: 'Python',       Icon: SiPython,      color: '#3776AB' },
    { name: 'LangChain',    Icon: SiLangchain,   color: '#1C3C3C' },
    { name: 'OpenAI',       Icon: SiOpenai,      color: '#10A37F' },
    { name: 'AWS',          Icon: FaAws,         color: '#FF9900' },
    { name: 'Google Cloud', Icon: SiGooglecloud, color: '#4285F4' },
    { name: 'Azure',        Icon: FaMicrosoft,   color: '#0078D4' },
    { name: 'Figma',        Icon: SiFigma,       color: '#F24E1E' },
    { name: 'Streamlit',    Icon: SiStreamlit,   color: '#FF4B4B' },
    { name: 'Postman',      Icon: SiPostman,     color: '#FF6C37' },
    { name: 'Jira',         Icon: SiJira,        color: '#0052CC' },
    { name: 'Salesforce',   Icon: SiSalesforce,  color: '#00A1E0' },
    { name: 'Hugging Face', Icon: SiHuggingface, color: '#D4A017' },
    { name: 'Zapier',       Icon: SiZapier,      color: '#FF4A00' },
    { name: 'Miro',         Icon: SiMiro,        color: '#050038' },
    { name: 'Confluence',   Icon: SiConfluence,  color: '#0052CC' },
    { name: 'Vercel',       Icon: SiVercel,      color: '#000000' },
    { name: 'Alteryx',      Icon: SiAlteryx,     color: '#0177C0' },
];

// Duplicate for seamless infinite loop
const TICKER = [...TECHS, ...TECHS];

export default function TechStack() {
    return (
        <>
            <style>{`
                /* ── Divider ─────────────────────────────────── */
                .ts-divider {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 14px;
                }
                .ts-divider-line {
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(to right, transparent, rgba(0,0,0,0.1), transparent);
                }
                .ts-label {
                    font-family: -apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #6e6e73;
                    white-space: nowrap;
                    transition: color 0.4s ease;
                }

                /* ── Ticker ──────────────────────────────────── */
                .ts-ticker-wrapper {
                    overflow: hidden;
                    width: 100%;
                    -webkit-mask-image: linear-gradient(
                        to right,
                        transparent 0%,
                        black 10%,
                        black 90%,
                        transparent 100%
                    );
                    mask-image: linear-gradient(
                        to right,
                        transparent 0%,
                        black 10%,
                        black 90%,
                        transparent 100%
                    );
                }

                @keyframes ts-marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .ts-ticker-track {
                    display: flex;
                    gap: 10px;
                    width: max-content;
                    animation: ts-marquee 34s linear infinite;
                    padding: 4px 0 10px;
                }

                .ts-ticker-wrapper:hover .ts-ticker-track {
                    animation-play-state: paused;
                }

                /* ── Logo card ───────────────────────────────── */
                .ts-logo-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    width: 70px;
                    height: 70px;
                    border-radius: 14px;
                    background: rgba(255,255,255,0.86);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    flex-shrink: 0;
                    cursor: default;
                    transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1),
                                box-shadow 0.22s ease;
                }

                .ts-logo-card:hover {
                    transform: translateY(-4px) scale(1.07);
                }

                .ts-logo-name {
                    font-family: -apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif;
                    font-size: 7.5px;
                    font-weight: 500;
                    color: #6e6e73;
                    text-align: center;
                    line-height: 1.2;
                    white-space: nowrap;
                    letter-spacing: 0.01em;
                    transition: color 0.4s ease;
                }

                /* ── Dark mode ────────────────────────────────── */
                [data-theme="dark"] .ts-divider-line {
                    background: linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent);
                }
                [data-theme="dark"] .ts-label   { color: #636366; }
                [data-theme="dark"] .ts-logo-card {
                    background: rgba(44,44,46,0.88);
                }
                [data-theme="dark"] .ts-logo-name { color: #8e8e93; }

                /* ── Reduced motion ───────────────────────────── */
                @media (prefers-reduced-motion: reduce) {
                    .ts-ticker-track { animation: none !important; }
                }
            `}</style>

            <div>
                <div className="ts-divider">
                    <div className="ts-divider-line" />
                    <span className="ts-label">Stack</span>
                    <div className="ts-divider-line" />
                </div>

                <div className="ts-ticker-wrapper">
                    <div className="ts-ticker-track">
                        {TICKER.map(({ name, Icon, color }, i) => (
                            <div
                                key={`${name}-${i}`}
                                className="ts-logo-card"
                                style={{
                                    border: `1px solid ${color}28`,
                                    boxShadow: `0 1px 3px rgba(0,0,0,0.05), 0 4px 14px ${color}18`,
                                }}
                            >
                                <Icon size={26} color={color} />
                                <span className="ts-logo-name">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
