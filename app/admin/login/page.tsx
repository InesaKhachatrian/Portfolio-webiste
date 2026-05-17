'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      setError('Incorrect password. Please try again.');
    }

    setLoading(false);
  }

  return (
    <div className="admin-login-wrap" style={{ minHeight: '100vh' }}>
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <span className="dot" />
          <span>Inesa Khachatryan</span>
        </div>

        <h1 className="admin-login-title">Admin access</h1>
        <p className="admin-login-sub">Enter your password to continue.</p>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: 16 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '10px 16px' }}
          >
            {loading ? 'Checking...' : 'Sign in →'}
          </button>
        </form>
      </div>
    </div>
  );
}
