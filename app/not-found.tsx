import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      background: 'var(--ink)',
      color: 'var(--paper)',
      gap: 24,
      padding: 40,
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
      }}>
        404
      </div>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(48px, 8vw, 96px)',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        margin: 0,
      }}>
        Page not found.
      </h1>
      <p style={{ color: 'var(--muted)', maxWidth: '32ch', fontSize: 18 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--paper)',
        borderBottom: '1px solid var(--paper)',
        paddingBottom: 4,
      }}>
        ← Back to home
      </Link>
    </div>
  );
}
