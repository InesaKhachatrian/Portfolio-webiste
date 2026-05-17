import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCaseStudy } from '@/lib/data';
import CaseStudyForm from '../CaseStudyForm';

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export default function EditCaseStudyPage({ params }: Props) {
  const csData = getCaseStudy(params.id);
  if (!csData) notFound();
  const cs = csData;

  return (
    <>
      <div className="admin-breadcrumb">
        <Link href="/admin">Dashboard</Link>
        <span>›</span>
        <Link href="/admin/case-studies">Case Studies</Link>
        <span>›</span>
        <span>{cs.title}</span>
      </div>

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit: {cs.title}</h1>
          <p className="admin-page-sub">
            /case/{cs.slug} ·{' '}
            <span className={cs.published ? 'badge badge-published' : 'badge badge-draft'}>
              {cs.published ? 'Published' : 'Draft'}
            </span>
          </p>
        </div>
        {cs.published && (
          <Link href={`/case/${cs.slug}`} target="_blank" className="btn btn-secondary btn-sm">
            View live ↗
          </Link>
        )}
      </div>

      <CaseStudyForm initial={cs} mode="edit" />
    </>
  );
}
