'use client';

import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import LeftPanel from './LeftPanel';
import Twin from './twin';

export default function PageClient() {
    const [dark, setDark] = useState(false);

    return (
        <>
            <style>{`
                * { box-sizing: border-box; }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes blobDrift {
                    0%,100% { transform: translate(0,0) scale(1); }
                    40%     { transform: translate(18px,-12px) scale(1.03); }
                    70%     { transform: translate(-10px,8px) scale(0.98); }
                }
                @keyframes heartbeat {
                    0%, 100% { transform: scale(1); }
                    50%      { transform: scale(1.25); }
                }

                /* ── Page root ───────────────────────────────── */
                .page-root {
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px 24px;
                    position: relative;
                    overflow: hidden;
                    transition: background 0.45s ease;
                }
                .page-root.light {
                    background: linear-gradient(150deg, #e8e8ed 0%, #f5f5f7 45%, #ebebf0 100%);
                }
                .page-root.dark {
                    background: linear-gradient(150deg, #0f0f12 0%, #1c1c1e 45%, #0f0f12 100%);
                }

                /* ── Blobs ───────────────────────────────────── */
                .blob {
                    position: fixed;
                    border-radius: 50%;
                    pointer-events: none;
                    transition: background 0.45s ease;
                }
                .blob-1 { animation: blobDrift 18s ease-in-out infinite; }
                .blob-2 { animation: blobDrift 22s ease-in-out infinite reverse; animation-delay: -8s; }

                /* ── Glow frame ──────────────────────────────── */
                .page-frame {
                    width: 100%;
                    max-width: 1100px;
                    max-height: calc(100vh - 40px);
                    display: flex;
                    flex-direction: column;
                    border-radius: 24px;
                    overflow: hidden;
                    transition: border-color 0.45s ease, box-shadow 0.45s ease, background 0.45s ease;
                }
                .page-frame.light {
                    border: 1px solid rgba(0,0,0,0.07);
                    background: rgba(255,255,255,0.28);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow:
                        inset 0 0 0 1px rgba(255,255,255,0.55),
                        0 4px 16px rgba(0,0,0,0.04),
                        0 24px 64px rgba(0,0,0,0.07);
                }
                .page-frame.dark {
                    border: 1px solid rgba(255,255,255,0.07);
                    background: rgba(28,28,30,0.55);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow:
                        inset 0 0 0 1px rgba(255,255,255,0.04),
                        0 4px 16px rgba(0,0,0,0.5),
                        0 24px 64px rgba(0,0,60,0.18);
                }

                /* ── Grid ────────────────────────────────────── */
                .page-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 48px;
                    width: 100%;
                    padding: 24px 36px 16px;
                    align-items: stretch;
                    flex: 1;
                    min-height: 0;
                    overflow: hidden;
                }

                /* ── Chat wrapper ────────────────────────────── */
                .chat-wrapper {
                    opacity: 0;
                    animation: fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) 0.16s both;
                    height: 100%;
                    min-height: 0;
                    overflow: hidden;
                }

                /* ── Footer ──────────────────────────────────── */
                .page-footer {
                    padding: 14px 36px 20px;
                    text-align: center;
                    font-family: -apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif;
                    font-size: 12px;
                    letter-spacing: -0.01em;
                    transition: color 0.45s ease, border-color 0.45s ease;
                }
                .page-footer.light {
                    color: #86868b;
                    border-top: 1px solid rgba(0,0,0,0.05);
                }
                .page-footer.dark {
                    color: #48484a;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }
                .footer-heart {
                    display: inline-block;
                    color: #ff3b30;
                    animation: heartbeat 2.4s ease-in-out infinite;
                }

                /* ── Floating toggle ─────────────────────────── */
                .theme-float-btn {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    border: 1px solid;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 200;
                    padding: 0;
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    transition: background 0.3s ease, border-color 0.3s ease,
                                box-shadow 0.3s ease, transform 0.15s ease;
                }
                .theme-float-btn:hover  { transform: scale(1.08); }
                .theme-float-btn:active { transform: scale(0.92); }
                .theme-float-btn.light {
                    background: rgba(255,255,255,0.88);
                    border-color: rgba(0,0,0,0.09);
                    color: #1d1d1f;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
                }
                .theme-float-btn.dark {
                    background: rgba(44,44,46,0.92);
                    border-color: rgba(255,255,255,0.1);
                    color: #f5f5f7;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.45);
                }

                /* ── Responsive ──────────────────────────────── */
                @media (max-width: 860px) {
                    .page-root  { padding: 20px 16px; height: auto; min-height: 100vh; overflow: auto; }
                    .page-frame { max-height: none; overflow: visible; }
                    .page-grid  { grid-template-columns: 1fr; gap: 20px; padding: 20px 20px 0; flex: none; overflow: visible; }
                    .page-footer { padding: 12px 20px 20px; }
                    .chat-wrapper { height: min(480px, 70vh); overflow: hidden; }
                }

                /* ── Reduced motion ───────────────────────────── */
                @media (prefers-reduced-motion: reduce) {
                    .chat-wrapper { animation: none !important; opacity: 1 !important; }
                    .blob-1, .blob-2 { animation: none !important; }
                    .footer-heart { animation: none !important; }
                }
            `}</style>

            <main
                className={`page-root ${dark ? 'dark' : 'light'}`}
                data-theme={dark ? 'dark' : 'light'}
            >
                {/* Blobs */}
                <div className="blob blob-1" style={{
                    top: '-100px', left: '-100px',
                    width: '400px', height: '400px',
                    background: dark
                        ? 'radial-gradient(circle, rgba(80,80,140,0.08) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(140,140,160,0.06) 0%, transparent 70%)',
                }} />
                <div className="blob blob-2" style={{
                    bottom: '-80px', right: '-80px',
                    width: '360px', height: '360px',
                    background: dark
                        ? 'radial-gradient(circle, rgba(60,60,110,0.07) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(100,100,130,0.05) 0%, transparent 70%)',
                }} />

                {/* Floating theme toggle */}
                <button
                    className={`theme-float-btn ${dark ? 'dark' : 'light'}`}
                    onClick={() => setDark(d => !d)}
                    aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {dark ? <Sun size={15} /> : <Moon size={15} />}
                </button>

                {/* Glow frame wrapping both panels */}
                <div className={`page-frame ${dark ? 'dark' : 'light'}`}>
                    <div className="page-grid">
                        <LeftPanel />
                        <div className="chat-wrapper">
                            <Twin dark={dark} />
                        </div>
                    </div>

                    <footer className={`page-footer ${dark ? 'dark' : 'light'}`}>
                        Made with <span className="footer-heart">♥</span> &amp; curiosity by Vidyen &middot; Paris, 2026
                    </footer>
                </div>
            </main>
        </>
    );
}
