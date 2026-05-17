import Link from 'next/link';
import CaseStudyForm from '../CaseStudyForm';

export default function NewCaseStudyPage() {
  return (
    <>
      <div className="admin-breadcrumb">
        <Link href="/admin">Dashboard</Link>
        <span>›</span>
        <Link href="/admin/case-studies">Case Studies</Link>
        <span>›</span>
        <span>New</span>
      </div>

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">New Case Study</h1>
          <p className="admin-page-sub">Fill in the details below to create a new case study.</p>
        </div>
      </div>

      <CaseStudyForm mode="new" />
    </>
  );
}
