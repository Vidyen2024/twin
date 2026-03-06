'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, ArrowRight, Sun, Moon } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
    "What kind of AI products have you built?",
    "Tell me about your background",
    "What are you working on right now?",
];

export default function Twin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const [mounted, setMounted] = useState(false);
    const [dark, setDark] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTimeout(() => setMounted(true), 80);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (text?: string) => {
        const messageText = text || input;
        if (!messageText.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: messageText,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage.content,
                    session_id: sessionId || undefined,
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');
            const data = await response.json();
            if (!sessionId) setSessionId(data.session_id);

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
            }]);
        } catch {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, something went wrong. Please try again.',
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // ── Tokens ──────────────────────────────────────────────
    const t = dark ? {
        // Dark mode
        cardBg:          'rgba(28,28,30,0.92)',
        cardBorder:      'rgba(255,255,255,0.08)',
        cardShadow:      '0 2px 4px rgba(0,0,0,0.4), 0 12px 32px rgba(0,0,0,0.5), 0 40px 80px rgba(0,0,0,0.4)',
        headerBg:        'rgba(28,28,30,0.96)',
        headerBorder:    'rgba(255,255,255,0.07)',
        nameColor:       '#f5f5f7',
        titleColor:      '#636366',
        msgBg:           'rgba(28,28,30,0.0)',
        bubbleAiBg:      '#2c2c2e',
        bubbleAiColor:   '#f5f5f7',
        bubbleUserBg:    '#0a84ff',
        bubbleUserColor: '#fff',
        timeColor:       'rgba(255,255,255,0.35)',
        typingBg:        '#2c2c2e',
        typingDot:       '#636366',
        inputAreaBg:     'rgba(28,28,30,0.97)',
        inputAreaBorder: 'rgba(255,255,255,0.07)',
        inputRowBg:      '#2c2c2e',
        inputRowFocusBg: '#3a3a3c',
        inputRowFocusBorder: 'rgba(10,132,255,0.45)',
        inputRowFocusShadow: '0 0 0 3px rgba(10,132,255,0.12)',
        inputColor:      '#f5f5f7',
        inputPlaceholder:'#636366',
        sendBg:          '#0a84ff',
        sendDisabled:    '#3a3a3c',
        footerColor:     '#48484a',
        suggestionBg:    '#2c2c2e',
        suggestionHover: '#3a3a3c',
        suggestionColor: '#f5f5f7',
        suggestionIcon:  '#636366',
        welcomeName:     '#f5f5f7',
        welcomeSub:      '#8e8e93',
        toggleBg:        '#2c2c2e',
        toggleColor:     '#f5f5f7',
        toggleBorder:    'rgba(255,255,255,0.1)',
    } : {
        // Light mode
        cardBg:          'rgba(255,255,255,0.85)',
        cardBorder:      'rgba(0,0,0,0.07)',
        cardShadow:      '0 2px 4px rgba(0,0,0,0.03), 0 12px 32px rgba(0,0,0,0.07), 0 40px 80px rgba(0,0,0,0.09)',
        headerBg:        'rgba(255,255,255,0.92)',
        headerBorder:    'rgba(0,0,0,0.06)',
        nameColor:       '#1d1d1f',
        titleColor:      '#8e8e93',
        msgBg:           'transparent',
        bubbleAiBg:      '#f5f5f7',
        bubbleAiColor:   '#1d1d1f',
        bubbleUserBg:    '#0071e3',
        bubbleUserColor: '#fff',
        timeColor:       'rgba(0,0,0,0.35)',
        typingBg:        '#f5f5f7',
        typingDot:       '#aeaeb2',
        inputAreaBg:     'rgba(255,255,255,0.95)',
        inputAreaBorder: 'rgba(0,0,0,0.06)',
        inputRowBg:      '#f5f5f7',
        inputRowFocusBg: '#fff',
        inputRowFocusBorder: 'rgba(0,113,227,0.3)',
        inputRowFocusShadow: '0 0 0 3px rgba(0,113,227,0.08)',
        inputColor:      '#1d1d1f',
        inputPlaceholder:'#aeaeb2',
        sendBg:          '#0071e3',
        sendDisabled:    '#d1d1d6',
        footerColor:     '#c7c7cc',
        suggestionBg:    '#f5f5f7',
        suggestionHover: '#ebebef',
        suggestionColor: '#1d1d1f',
        suggestionIcon:  '#aeaeb2',
        welcomeName:     '#1d1d1f',
        welcomeSub:      '#8e8e93',
        toggleBg:        '#f5f5f7',
        toggleColor:     '#1d1d1f',
        toggleBorder:    'rgba(0,0,0,0.08)',
    };

    return (
        <>
            <style>{`
                * { box-sizing: border-box; }

                .tw {
                    font-family: -apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    border-radius: 20px;
                    overflow: hidden;
                    transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
                    backdrop-filter: blur(32px) saturate(200%);
                    -webkit-backdrop-filter: blur(32px) saturate(200%);
                }

                .tw-header {
                    padding: 18px 22px 16px;
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    transition: background 0.3s ease, border-color 0.3s ease;
                }

                .tw-avatar {
                    width: 42px; height: 42px;
                    border-radius: 50%;
                    object-fit: cover;
                    flex-shrink: 0;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
                }

                .tw-header-info { flex: 1; min-width: 0; }

                .tw-header-name {
                    font-size: 15px;
                    font-weight: 600;
                    letter-spacing: -0.022em;
                    margin: 0 0 2px;
                    line-height: 1.2;
                    transition: color 0.3s ease;
                }

                .tw-header-title {
                    font-size: 12px;
                    font-weight: 400;
                    margin: 0;
                    transition: color 0.3s ease;
                }

                .tw-header-right {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .tw-online {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 11.5px;
                    color: #34c759;
                    font-weight: 500;
                    white-space: nowrap;
                }

                .tw-online-dot {
                    width: 7px; height: 7px;
                    border-radius: 50%;
                    background: #34c759;
                    animation: tw-pulse 2.5s ease-in-out infinite;
                }

                @keyframes tw-pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }

                .tw-toggle {
                    width: 32px; height: 32px;
                    border-radius: 50%;
                    border: 1px solid;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    flex-shrink: 0;
                    transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
                    padding: 0;
                }

                .tw-toggle:hover { transform: scale(1.08); }
                .tw-toggle:active { transform: scale(0.94); }

                .tw-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 28px 22px 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                    transition: background 0.3s ease;
                }

                .tw-messages::-webkit-scrollbar { width: 0; }

                .tw-welcome {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 8px 0 4px;
                    opacity: 0;
                    transform: translateY(14px);
                    transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1);
                }

                .tw-welcome.in { opacity: 1; transform: translateY(0); }

                .tw-welcome-avatar {
                    width: 60px; height: 60px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 14px;
                    box-shadow: 0 4px 14px rgba(0,0,0,0.12);
                }

                .tw-welcome-name {
                    font-size: 18px;
                    font-weight: 600;
                    letter-spacing: -0.028em;
                    margin: 0 0 6px;
                    text-align: center;
                    transition: color 0.3s ease;
                }

                .tw-welcome-sub {
                    font-size: 14px;
                    margin: 0 0 26px;
                    text-align: center;
                    line-height: 1.45;
                    font-weight: 400;
                    transition: color 0.3s ease;
                }

                .tw-suggestions {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                    width: 100%;
                    max-width: 360px;
                }

                .tw-suggestion {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border: none;
                    border-radius: 11px;
                    padding: 11px 13px;
                    cursor: pointer;
                    font-family: -apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
                    font-size: 13.5px;
                    text-align: left;
                    font-weight: 400;
                    letter-spacing: -0.012em;
                    width: 100%;
                    transition: background 0.15s ease, transform 0.12s ease;
                }

                .tw-suggestion:hover { transform: scale(0.988); }

                .tw-row {
                    display: flex;
                    gap: 9px;
                    align-items: flex-end;
                    animation: tw-in 0.28s cubic-bezier(0.16,1,0.3,1) both;
                }

                .tw-row.user { justify-content: flex-end; }

                @keyframes tw-in {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .tw-msg-avatar {
                    width: 26px; height: 26px;
                    border-radius: 50%;
                    object-fit: cover;
                    flex-shrink: 0;
                    margin-bottom: 2px;
                }

                .tw-bubble {
                    max-width: 70%;
                    padding: 10px 14px;
                    border-radius: 18px;
                    font-size: 14.5px;
                    line-height: 1.5;
                    letter-spacing: -0.012em;
                    transition: background 0.3s ease, color 0.3s ease;
                }

                .tw-bubble.assistant { border-bottom-left-radius: 5px; }
                .tw-bubble.user      { border-bottom-right-radius: 5px; }

                .tw-time {
                    font-size: 10px;
                    display: block;
                    margin-top: 4px;
                    opacity: 0.38;
                }

                .tw-typing {
                    border-radius: 18px;
                    border-bottom-left-radius: 5px;
                    padding: 13px 15px;
                    display: flex;
                    gap: 4px;
                    align-items: center;
                    transition: background 0.3s ease;
                }

                .tw-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    animation: tw-bounce 1.1s ease-in-out infinite;
                }
                .tw-dot:nth-child(2) { animation-delay: 0.18s; }
                .tw-dot:nth-child(3) { animation-delay: 0.36s; }

                @keyframes tw-bounce {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                    30% { transform: translateY(-4px); opacity: 1; }
                }

                .tw-input-area {
                    padding: 12px 18px 16px;
                    transition: background 0.3s ease, border-color 0.3s ease;
                }

                .tw-input-row {
                    display: flex;
                    align-items: center;
                    border-radius: 12px;
                    padding: 3px 3px 3px 14px;
                    border: 1px solid transparent;
                    transition: all 0.18s ease;
                }

                .tw-input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    outline: none;
                    font-family: -apple-system, 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
                    font-size: 14.5px;
                    padding: 9px 0;
                    letter-spacing: -0.012em;
                    transition: color 0.3s ease;
                }

                .tw-send {
                    width: 34px; height: 34px;
                    border-radius: 9px;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: background 0.15s ease, transform 0.12s ease;
                }

                .tw-send:hover:not(:disabled) { transform: scale(1.05); }
                .tw-send:active:not(:disabled) { transform: scale(0.96); }
                .tw-send:disabled { cursor: not-allowed; transform: none; }
                .tw-send svg { color: #fff; }

                .tw-footer {
                    text-align: center;
                    margin-top: 9px;
                    font-size: 11px;
                    letter-spacing: 0;
                    transition: color 0.3s ease;
                }
            `}</style>

            <div className="tw" style={{
                background: t.cardBg,
                border: `1px solid ${t.cardBorder}`,
                boxShadow: t.cardShadow,
            }}>
                {/* Header */}
                <div className="tw-header" style={{
                    background: t.headerBg,
                    borderBottom: `1px solid ${t.headerBorder}`,
                }}>
                    <img src="/avatar.png" alt="Vidyen" className="tw-avatar" />
                    <div className="tw-header-info">
                        <p className="tw-header-name" style={{ color: t.nameColor }}>Vidyen Wadgave</p>
                        <p className="tw-header-title" style={{ color: t.titleColor }}>AI Product Manager</p>
                    </div>
                    <div className="tw-header-right">
                        <div className="tw-online">
                            <span className="tw-online-dot" />
                            Online
                        </div>
                        <button
                            className="tw-toggle"
                            onClick={() => setDark(d => !d)}
                            style={{
                                background: t.toggleBg,
                                borderColor: t.toggleBorder,
                                color: t.toggleColor,
                            }}
                            aria-label="Toggle dark mode"
                        >
                            {dark ? <Sun size={14} /> : <Moon size={14} />}
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="tw-messages" style={{ background: t.msgBg }}>
                    {messages.length === 0 && (
                        <div className={`tw-welcome ${mounted ? 'in' : ''}`}>
                            <img src="/avatar.png" alt="Vidyen" className="tw-welcome-avatar" />
                            <p className="tw-welcome-name" style={{ color: t.welcomeName }}>
                                Hi, I&apos;m Vidyen&apos;s Digital Twin
                            </p>
                            <p className="tw-welcome-sub" style={{ color: t.welcomeSub }}>
                                Ask me anything about my work,<br />projects, or background.
                            </p>
                            <div className="tw-suggestions">
                                {SUGGESTED_QUESTIONS.map((q) => (
                                    <button
                                        key={q}
                                        className="tw-suggestion"
                                        onClick={() => sendMessage(q)}
                                        style={{
                                            background: t.suggestionBg,
                                            color: t.suggestionColor,
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.background = t.suggestionHover)}
                                        onMouseLeave={e => (e.currentTarget.style.background = t.suggestionBg)}
                                    >
                                        {q}
                                        <ArrowRight size={13} style={{ color: t.suggestionIcon }} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map((message) => (
                        <div key={message.id} className={`tw-row ${message.role}`}>
                            {message.role === 'assistant' && (
                                <img src="/avatar.png" alt="V" className="tw-msg-avatar" />
                            )}
                            <div
                                className={`tw-bubble ${message.role}`}
                                style={{
                                    background: message.role === 'assistant' ? t.bubbleAiBg : t.bubbleUserBg,
                                    color: message.role === 'assistant' ? t.bubbleAiColor : t.bubbleUserColor,
                                }}
                            >
                                <span style={{ whiteSpace: 'pre-wrap' }}>{message.content}</span>
                                <span className="tw-time" style={{ color: t.timeColor }}>
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="tw-row">
                            <img src="/avatar.png" alt="V" className="tw-msg-avatar" />
                            <div className="tw-typing" style={{ background: t.typingBg }}>
                                <div className="tw-dot" style={{ background: t.typingDot }} />
                                <div className="tw-dot" style={{ background: t.typingDot }} />
                                <div className="tw-dot" style={{ background: t.typingDot }} />
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="tw-input-area" style={{
                    background: t.inputAreaBg,
                    borderTop: `1px solid ${t.inputAreaBorder}`,
                }}>
                    <div
                        className="tw-input-row"
                        style={{ background: t.inputRowBg }}
                        onFocus={e => {
                            const el = e.currentTarget;
                            el.style.background = t.inputRowFocusBg;
                            el.style.borderColor = t.inputRowFocusBorder;
                            el.style.boxShadow = t.inputRowFocusShadow;
                        }}
                        onBlur={e => {
                            const el = e.currentTarget;
                            el.style.background = t.inputRowBg;
                            el.style.borderColor = 'transparent';
                            el.style.boxShadow = 'none';
                        }}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Message Vidyen..."
                            className="tw-input"
                            disabled={isLoading}
                            autoFocus
                            style={{
                                color: t.inputColor,
                                '--placeholder-color': t.inputPlaceholder,
                            } as React.CSSProperties}
                        />
                        <button
                            onClick={() => sendMessage()}
                            disabled={!input.trim() || isLoading}
                            className="tw-send"
                            style={{
                                background: !input.trim() || isLoading ? t.sendDisabled : t.sendBg,
                            }}
                        >
                            <Send size={15} />
                        </button>
                    </div>
                    <p className="tw-footer" style={{ color: t.footerColor }}>Powered by AWS Bedrock</p>
                </div>
            </div>
        </>
    );
}