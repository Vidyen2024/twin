import Twin from '@/components/twin';

export default function Home() {
    return (
        <main style={{
            minHeight: '100vh',
            background: 'linear-gradient(145deg, #f0f4ff 0%, #fafafa 40%, #f5f0ff 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 16px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{
                position: 'fixed', top: '-80px', left: '-80px',
                width: '360px', height: '360px',
                background: 'radial-gradient(circle, rgba(0,113,227,0.06) 0%, transparent 70%)',
                pointerEvents: 'none', borderRadius: '50%',
            }} />
            <div style={{
                position: 'fixed', bottom: '-60px', right: '-60px',
                width: '300px', height: '300px',
                background: 'radial-gradient(circle, rgba(88,86,214,0.05) 0%, transparent 70%)',
                pointerEvents: 'none', borderRadius: '50%',
            }} />
            <div style={{
                width: '100%',
                maxWidth: '660px',
                height: 'min(680px, calc(100vh - 48px))',
            }}>
                <Twin />
            </div>
        </main>
    );
}