import Link from 'next/link';
import { getCaseStudies } from '@/lib/data';
import DeleteButton from './DeleteButton';

export const dynamic = 'force-dynamic';

export default function CaseStudiesAdmin() {
  const caseStudies = getCaseStudies().sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Case Studies</h1>
          <p className="admin-page-sub">{caseStudies.length} total · {caseStudies.filter((cs) => cs.published).length} published</p>
        </div>
        <Link href="/admin/case-studies/new" className="btn btn-primary">
          + New case study
        </Link>
      </div>

      {caseStudies.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-title">No case studies yet</div>
          <div className="admin-empty-sub">Create your first case study to showcase your work.</div>
          <Link href="/admin/case-studies/new" className="btn btn-primary">
            New case study
          </Link>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Year</th>
                <th>Tile</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {caseStudies.map((cs) => (
                <tr key={cs.id}>
                  <td style={{ color: 'var(--admin-muted)', fontFamily: 'var(--admin-mono)', fontSize: 12 }}>
                    {cs.order}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <strong>{cs.title}</strong>
                      {cs.featured && (
                        <span className="badge badge-featured">Featured</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--admin-muted)', marginTop: 2 }}>
                      /case/{cs.slug}
                    </div>
                  </td>
                  <td>{cs.category}</td>
                  <td>{cs.year}</td>
                  <td>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 12,
                      fontFamily: 'var(--admin-mono)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}>
                      <span style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: cs.tile === 'gold' ? '#d9a857' :
                          cs.tile === 'mint' ? '#a8d4c1' :
                          cs.tile === 'lavender' ? '#cdb3df' :
                          cs.tile === 'peach' ? '#f4c8a8' :
                          cs.tile === 'sky' ? '#bcd6e3' : '#ccc',
                        flexShrink: 0,
                      }} />
                      {cs.tile}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${cs.published ? 'badge-published' : 'badge-draft'}`}>
                      {cs.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <Link href={`/admin/case-studies/${cs.id}`} className="btn btn-secondary btn-sm">
                        Edit
                      </Link>
                      <Link href={`/case/${cs.slug}`} target="_blank" className="btn btn-ghost btn-sm">
                        View ↗
                      </Link>
                      <DeleteButton id={cs.id} title={cs.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
