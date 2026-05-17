'use client';

import { useEffect, useState } from 'react';

interface NavProps {
  activeSection?: string;
}

export default function Nav({ activeSection }: NavProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Read preference from localStorage
    try {
      const stored = localStorage.getItem('ik-dark');
      if (stored === 'true') {
        setIsDark(true);
        document.documentElement.classList.add('theme-dark');
      }
    } catch {}
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('theme-dark', next);
    try {
      localStorage.setItem('ik-dark', String(next));
    } catch {}
  };

  return (
    <nav className="nav">
      <a href="/" className="nav-brand">
        <span className="dot" style={{ background: 'rgb(217, 119, 87)' }} />
        <span>Inesa Khachatryan</span>
      </a>
      <div className="nav-links">
        <a href="/#work" className={activeSection === 'work' ? 'is-active' : ''}>Work</a>
        <a href="/#about" className={activeSection === 'about' ? 'is-active' : ''}>About</a>
        <a href="/#contact" className={activeSection === 'contact' ? 'is-active' : ''}>Contact</a>
        <a
          href="https://www.linkedin.com/in/inesa-khachatryan/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn ↗
        </a>
        <button
          onClick={toggleDark}
          aria-label="Toggle dark mode"
          style={{
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            background: 'none',
            border: 'none',
            padding: 0,
          }}
        >
          {isDark ? 'Light' : 'Dark'}
        </button>
      </div>
    </nav>
  );
}
