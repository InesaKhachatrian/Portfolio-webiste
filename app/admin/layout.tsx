import '../../styles/admin.css';
import AdminLayoutWrapper from './AdminLayoutWrapper';

export const metadata = {
  title: 'Admin — Inesa Khachatryan Portfolio',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
