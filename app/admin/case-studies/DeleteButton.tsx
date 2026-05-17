'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteButtonProps {
  id: string;
  title: string;
}

export default function DeleteButton({ id, title }: DeleteButtonProps) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const res = await fetch(`/api/case-studies/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh();
    } else {
      alert('Failed to delete case study');
    }
    setLoading(false);
    setConfirm(false);
  }

  if (confirm) {
    return (
      <div style={{ display: 'flex', gap: 4 }}>
        <button className="btn btn-danger btn-sm" onClick={handleDelete} disabled={loading}>
          {loading ? '...' : 'Confirm'}
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => setConfirm(false)}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button className="btn btn-ghost btn-sm" onClick={() => setConfirm(true)} style={{ color: 'var(--admin-danger)' }}>
      Delete
    </button>
  );
}
