import { getContent } from '@/lib/data';
import ContentForm from './ContentForm';

export const dynamic = 'force-dynamic';

export default function ContentAdminPage() {
  const content = getContent();

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Site Content</h1>
          <p className="admin-page-sub">Edit homepage text, about section, and contact information.</p>
        </div>
      </div>

      <ContentForm initial={content} />
    </>
  );
}
