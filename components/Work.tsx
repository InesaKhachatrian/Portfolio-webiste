import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';

// ── Screen content components ──────────────────────────────────────────
function ScrHHI() {
  return (
    <div className="scr-hhi-search">
      <div className="topbar">
        <i />
        <i style={{ width: '12%', marginLeft: 'auto', background: 'var(--gold)', opacity: 0.7 }} />
      </div>
      <div className="img" />
      <div className="row2">
        <span className="price">$489K</span>
        <span className="pill">NEW</span>
      </div>
      <div className="meta">
        <i className="a" /><i className="b" /><i className="c" />
      </div>
      <div className="meta" style={{ marginTop: 6 }}>
        <i className="a" /><i className="b" />
      </div>
      <div className="barchart">
        <b style={{ height: 8 }} /><b style={{ height: 14 }} /><b style={{ height: 20 }} />
        <b style={{ height: 12 }} /><b style={{ height: 18 }} /><b style={{ height: 24, opacity: 1 }} />
        <b style={{ height: 16 }} /><b style={{ height: 10 }} />
      </div>
    </div>
  );
}

function ScrIdram() {
  return (
    <div className="scr-idram">
      <div className="bal">
        <span className="lbl">Total balance</span>
        <span className="n">֏ 482,150</span>
      </div>
      <div className="row">
        <div className="b gold" />
        <div className="b" />
        <div className="b" />
        <div className="b" />
      </div>
      <div className="list">
        <div className="it"><i /><span className="a" /><span className="b" /></div>
        <div className="it"><i /><span className="a" style={{ width: '30%' }} /><span className="b" style={{ width: '14%' }} /></div>
        <div className="it"><i /><span className="a" style={{ width: '44%' }} /><span className="b" /></div>
        <div className="it"><i /><span className="a" style={{ width: '28%' }} /><span className="b" style={{ width: '20%' }} /></div>
      </div>
    </div>
  );
}

function ScrAuto() {
  return (
    <div className="scr-auto">
      <div className="map">
        <span className="route" />
        <span className="pin" />
      </div>
      <div className="panel">
        <span className="s">ETA · 6 min</span>
        <span className="h">Roadside help dispatched</span>
        <div className="cta" />
      </div>
    </div>
  );
}

function PhoneMock({ variant }: { variant: string }) {
  return (
    <div className="phone">
      <div className="notch" />
      <div className="screen">
        {variant === 'hhi' && <ScrHHI />}
        {variant === 'idram' && <ScrIdram />}
        {variant === 'auto' && <ScrAuto />}
      </div>
    </div>
  );
}

// ── Hero project (full width) ─────────────────────────────────────────
function HeroProject({ cs }: { cs: CaseStudy }) {
  return (
    <Link href={`/case/${cs.slug}`} className={`proj tile-${cs.tile}`} style={{ display: 'block' }}>
      <div className="proj-frame" style={{ aspectRatio: '16 / 8' }}>
        <div className="mock">
          <div className="stripes" />
          <div className="phone-cluster" style={{ paddingBottom: '8%' }}>
            <PhoneMock variant={cs.mockVariant} />
            <div style={{ width: '26%', aspectRatio: '9/19' }}>
              <div className="desk" style={{ width: '100%', aspectRatio: '9/16' }}>
                <div className="bar">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
                <div className="desk-content" style={{ padding: 12 }}>
                  <div style={{ height: 8, background: 'var(--gold)', opacity: 0.6, width: '40%', marginBottom: 10 }} />
                  <div style={{ height: 5, background: 'var(--ink-3)', width: '80%', marginBottom: 6 }} />
                  <div style={{ height: 5, background: 'var(--ink-3)', width: '60%', marginBottom: 14 }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    <div style={{ aspectRatio: '1/1', background: 'var(--ink-3)' }} />
                    <div style={{ aspectRatio: '1/1', background: 'var(--ink-3)' }} />
                    <div style={{ aspectRatio: '1/1', background: 'var(--ink-3)' }} />
                    <div style={{ aspectRatio: '1/1', background: 'color-mix(in oklab, var(--gold) 40%, var(--ink-3))' }} />
                  </div>
                </div>
              </div>
            </div>
            <PhoneMock variant={cs.mockVariant} />
          </div>
        </div>
        <span className="mock-corner">{cs.year} · FEATURED</span>
        <span className="mock-label">{cs.hero.bannerLabel}</span>
      </div>
      <div className="proj-meta">
        <div>
          <h3 className="proj-title" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
            <span className="num">{cs.num}</span>{cs.title}
          </h3>
          <div style={{ color: 'var(--muted)', fontSize: 16, marginTop: 10, maxWidth: '60ch', lineHeight: 1.5 }}>
            {cs.sub}
          </div>
        </div>
        <div className="proj-tags">
          {cs.tags.map((t, i) => <div key={i}>{t}</div>)}
        </div>
      </div>
      <div className="proj-arrow">
        Read case <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}

// ── Regular project card ──────────────────────────────────────────────
function ProjectCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link href={`/case/${cs.slug}`} className={`proj tile-${cs.tile}`}>
      <div className="proj-frame">
        <div className="mock">
          <div className="stripes" />
          <div className="phone-cluster" style={{ padding: 0 }}>
            <PhoneMock variant={cs.mockVariant} />
          </div>
        </div>
        <span className="mock-corner">{cs.year}</span>
      </div>
      <div className="proj-meta">
        <div>
          <h3 className="proj-title">
            <span className="num">{cs.num}</span>{cs.title}
          </h3>
          <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 6, maxWidth: '44ch' }}>
            {cs.sub}
          </div>
        </div>
        <div className="proj-tags">
          {cs.tags.map((t, i) => <div key={i}>{t}</div>)}
        </div>
      </div>
      <div className="proj-arrow">
        Read case <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}

// ── Work section ──────────────────────────────────────────────────────
interface WorkProps {
  caseStudies: CaseStudy[];
}

export default function Work({ caseStudies }: WorkProps) {
  const published = caseStudies.filter((cs) => cs.published).sort((a, b) => a.order - b.order);
  const featured = published.find((cs) => cs.featured);
  const rest = published.filter((cs) => !cs.featured);

  return (
    <section className="section wrap" id="work">
      <div className="work-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 18 }}>02 · Selected work</div>
          <h2 className="h-1">
            Projects, played out <br />
            <span style={{ fontStyle: 'italic', color: 'rgb(217, 119, 87)' }}>several moves</span> ahead.
          </h2>
        </div>
        <p className="lede">
          A small selection across fintech, real-estate, and on-demand services —
          each shipped, measured, and iterated against real users.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(56px, 6vw, 88px)' }}>
        {featured && <HeroProject cs={featured} />}

        {rest.length > 0 && (
          <div className="work-grid cols-2">
            {rest.map((cs) => (
              <ProjectCard key={cs.id} cs={cs} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
