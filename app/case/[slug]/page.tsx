import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import CaseStudyPage from '@/components/CaseStudyPage';
import { getCaseStudy, getCaseStudies } from '@/lib/data';

// Always re-read from JSON so admin changes reflect immediately
export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const studies = getCaseStudies();
  return studies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = getCaseStudy(params.slug);
  if (!cs) return { title: 'Case Study Not Found' };
  return {
    title: `${cs.title} — Case Study · Inesa Khachatryan`,
    description: cs.sub,
  };
}

export default function CaseStudyRoute({ params }: Props) {
  const csData = getCaseStudy(params.slug);
  if (!csData || !csData.published) notFound();
  const cs = csData;

  // Find next case study
  const allPublished = getCaseStudies()
    .filter((s) => s.published)
    .sort((a, b) => a.order - b.order);

  const currentIdx = allPublished.findIndex((s) => s.slug === params.slug);
  const nextCs = currentIdx >= 0 ? allPublished[(currentIdx + 1) % allPublished.length] : undefined;
  const nextCsActual = nextCs?.slug !== cs.slug ? nextCs : undefined;

  return (
    <>
      <Nav />
      <CaseStudyPage cs={cs} nextCs={nextCsActual} />
    </>
  );
}
