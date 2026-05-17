import Nav from '@/components/Nav';
import Splash from '@/components/Splash';
import Work from '@/components/Work';
import About from '@/components/About';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';
import { getContent, getCaseStudies } from '@/lib/data';

// Always re-read from JSON so admin changes reflect immediately
export const dynamic = 'force-dynamic';

export default function HomePage() {
  const content = getContent();
  const caseStudies = getCaseStudies();

  return (
    <>
      <Nav activeSection="work" />
      <RevealObserver />
      <div className="page-fade-in">
        <main>
          <Splash content={content} />
          <div className="wrap"><div className="rule" /></div>
          <Work caseStudies={caseStudies} />
          <div className="wrap"><div className="rule" /></div>
          <About content={content} />
        </main>
        <Footer content={content} />
      </div>
    </>
  );
}
