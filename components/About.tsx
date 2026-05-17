import ImageSlot from './ImageSlot';
import type { SiteContent } from '@/lib/types';

interface AboutProps {
  content: SiteContent;
}

export default function About({ content }: AboutProps) {
  const { about, images } = content;

  return (
    <section className="section wrap" id="about">
      <div className="eyebrow" style={{ marginBottom: 32 }}>03 · About</div>

      <ImageSlot
        id="ik-about-feature"
        tileClass="tile-mint"
        placeholder="Drop a working / studio photo — wide format works best"
        aspectRatio="16 / 7"
        src={images.about}
        style={{ width: '100%', marginBottom: 'clamp(40px, 6vw, 80px)' }}
        alt="Inesa at work"
      />

      <div className="about">
        <div className="about-text">
          <h2 className="h-1" style={{ marginBottom: 32 }}>
            About me
          </h2>
          <p style={{ fontFamily: 'ui-sans-serif', fontSize: 18, fontWeight: 400, margin: '18px 18px 18px 0px' }}>
            {about.bio}
          </p>
          <p style={{ fontFamily: 'ui-sans-serif', fontSize: 18, fontWeight: 400 }}>
            {about.bio2}
          </p>
        </div>

        <div className="facts">
          {about.facts.map((fact, i) => (
            <div key={i} className="fact">
              <div className="k">{fact.key}</div>
              <div className="v">
                {fact.accent ? (
                  <>
                    <span className="em" style={{ color: 'rgb(217, 119, 87)' }}>{fact.accent}</span>
                    {fact.value.replace(fact.accent, '')}
                  </>
                ) : (
                  fact.value
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
