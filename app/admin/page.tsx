import Link from 'next/link';
import { getCaseStudies, getUploadedImages } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const caseStudies = getCaseStudies();
  const images = getUploadedImages();
  const publishedCount = caseStudies.filter((cs) => cs.published).length;

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-sub">Welcome back. Here&apos;s what&apos;s going on.</p>
        </div>
        <Link href="/" target="_blank" className="btn btn-secondary btn-sm">
          View live site ↗
        </Link>
      </div>

      <div className="admin-cards">
        <Link href="/admin/case-studies" className="admin-card">
          <div className="admin-card-label">Case Studies</div>
          <div className="admin-card-value">{caseStudies.length}</div>
          <div className="admin-card-desc">
            {publishedCount} published · {caseStudies.length - publishedCount} drafts
          </div>
          <div className="admin-card-arrow">
            Manage case studies →
          </div>
        </Link>

        <Link href="/admin/content" className="admin-card">
          <div className="admin-card-label">Site Content</div>
          <div className="admin-card-value">✏</div>
          <div className="admin-card-desc">
            Edit homepage text, about section, and contact info.
          </div>
          <div className="admin-card-arrow">
            Edit content →
          </div>
        </Link>

        <Link href="/admin/images" className="admin-card">
          <div className="admin-card-label">Image Library</div>
          <div className="admin-card-value">{images.length}</div>
          <div className="admin-card-desc">
            Uploaded images in /public/uploads/
          </div>
          <div className="admin-card-arrow">
            Manage images →
          </div>
        </Link>
      </div>

      <div className="admin-separator" />

      <div>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Recent case studies</h2>
        {caseStudies.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-title">No case studies yet</div>
            <div className="admin-empty-sub">Create your first case study to get started.</div>
            <Link href="/admin/case-studies/new" className="btn btn-primary">
              New case study
            </Link>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {caseStudies.slice(0, 5).map((cs) => (
                  <tr key={cs.id}>
                    <td>
                      <strong>{cs.title}</strong>
                      {cs.featured && (
                        <span className="badge badge-featured" style={{ marginLeft: 8 }}>
                          Featured
                        </span>
                      )}
                    </td>
                    <td>{cs.category}</td>
                    <td>{cs.year}</td>
                    <td>
                      <span className={`badge ${cs.published ? 'badge-published' : 'badge-draft'}`}>
                        {cs.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <Link href={`/admin/case-studies/${cs.id}`} className="btn btn-ghost btn-sm">
                          Edit
                        </Link>
                        <Link href={`/case/${cs.slug}`} target="_blank" className="btn btn-ghost btn-sm">
                          View ↗
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
