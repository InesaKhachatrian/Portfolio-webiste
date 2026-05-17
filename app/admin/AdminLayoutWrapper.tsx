'use client';

import { usePathname } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) {
    return <div className="admin-layout">{children}</div>;
  }

  return (
    <div className="admin-layout">
      <AdminNav />
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}
