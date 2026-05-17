import { getContent, getUploadedImages } from '@/lib/data';
import ImagesClient from './ImagesClient';

export const dynamic = 'force-dynamic';

export default function ImagesAdminPage() {
  const content = getContent();
  const uploadedImages = getUploadedImages();

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Image Library</h1>
          <p className="admin-page-sub">Manage site images and uploaded files.</p>
        </div>
      </div>

      <ImagesClient
        initialContent={content}
        initialImages={uploadedImages}
      />
    </>
  );
}
