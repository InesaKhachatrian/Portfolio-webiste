'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/case-studies', label: 'Case Studies' },
    { href: '/admin/content', label: 'Content' },
    { href: '/admin/images', label: 'Images' },
  ];

  function handleLogout() {
    fetch('/api/auth', { method: 'DELETE' }).then(() => {
      window.location.href = '/admin/login';
    });
  }

  return (
    <nav className="admin-nav">
      <Link href="/admin" className="admin-nav-brand">
        <span className="dot" />
        <span>IK · Admin</span>
      </Link>

      <div className="admin-nav-links">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`admin-nav-link ${
              pathname === link.href ||
              (link.href !== '/admin' && pathname.startsWith(link.href))
                ? 'active'
                : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="admin-nav-actions">
        <Link href="/" target="_blank" className="admin-nav-view">
          View site ↗
        </Link>
        <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
