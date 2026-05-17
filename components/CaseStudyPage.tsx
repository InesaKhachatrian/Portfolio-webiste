import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';

// ── Screen mocks ──────────────────────────────────────────────────────
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
      <div className="meta"><i className="a" /><i className="b" /><i className="c" /></div>
      <div className="meta" style={{ marginTop: 6 }}><i className="a" /><i className="b" /></div>
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
        <div className="b gold" /><div className="b" /><div className="b" /><div className="b" />
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
    <div className="phone" style={{ width: '70%' }}>
      <div className="notch" />
      <div className="screen">
        {variant === 'hhi' && <ScrHHI />}
        {variant === 'idram' && <ScrIdram />}
        {variant === 'auto' && <ScrAuto />}
      </div>
    </div>
  );
}

// ── Banner ────────────────────────────────────────────────────────────
function CsBanner({ cs }: { cs: CaseStudy }) {
  if (cs.images?.banner) {
    return (
      <div className="cs-banner" style={{ aspectRatio: 'unset' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cs.images.banner} alt={cs.hero.bannerLabel || cs.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {cs.hero.bannerLabel && <span className="mock-label">{cs.hero.bannerLabel}</span>}
      </div>
    );
  }
  return (
    <div className="cs-banner">
      <div className="hhi-banner">
        <div className="left">
          <span className="label">{cs.title}</span>
          <div className="title">
            For buyers,{' '}
            <span className="gold" style={{ color: 'rgb(217, 119, 87)' }}>not</span> agents.
          </div>
        </div>
        <div className="right">
          <PhoneMock variant={cs.mockVariant} />
        </div>
      </div>
    </div>
  );
}

// ── Affinity map mock ─────────────────────────────────────────────────
function AffinityMapMock() {
  return (
    <div className="cs-fig">
      <div className="mock">
        <div className="stripes" />
        <div style={{ position: 'absolute', inset: 14, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(6, 1fr)', gap: 4 }}>
          <i style={{ background: 'color-mix(in oklab, var(--gold) 50%, var(--ink-2))', borderRadius: 1 }} />
          <i style={{ background: 'var(--ink-3)', borderRadius: 1 }} />
          <i style={{ background: 'var(--ink-3)', borderRadius: 1 }} />
          <i style={{ background: 'color-mix(in oklab, var(--gold) 30%, var(--ink-2))', borderRadius: 1, gridColumn: 'span 2' }} />
          <i style={{ background: 'var(--ink-3)', borderRadius: 1 }} />
          <i style={{ background: 'var(--ink-3)', borderRadius: 1 }} />
          <i style={{ background: 'color-mix(in oklab, var(--gold) 50%, var(--ink-2))', borderRadius: 1, gridColumn: 'span 2' }} />
          <i style={{ background: 'var(--ink-3)', borderRadius: 1 }} />
          <i style={{ background: 'var(--ink-3)', borderRadius: 1 }} />
          <i style={{ background: 'var(--ink-3)', borderRadius: 1 }} />
          <i style={{ background: 'var(--ink-3)', borderRadius: 1 }} />
          <i style={{ background: 'color-mix(in oklab, var(--gold) 30%, var(--ink-2))', borderRadius: 1 }} />
          <i style={{ background: 'var(--ink-3)', borderRadius: 1 }} />
          <i style={{ background: 'var(--ink-3)', borderRadius: 1 }} />
          <i style={{ background: 'var(--ink-3)', borderRadius: 1 }} />
          <i style={{ background: 'var(--ink-3)', borderRadius: 1 }} />
          <i style={{ background: 'var(--ink-3)', borderRadius: 1 }} />
          <i style={{ background: 'color-mix(in oklab, var(--gold) 60%, var(--ink-2))', borderRadius: 1 }} />
          <i style={{ background: 'var(--ink-3)', borderRadius: 1 }} />
        </div>
      </div>
      <span className="cap">Affinity map · pain themes</span>
    </div>
  );
}

function JtbdMock() {
  return (
    <div className="cs-fig">
      <div className="mock">
        <div className="stripes" />
        <div style={{ position: 'absolute', inset: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgb(217, 119, 87)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Top jobs · prioritized</div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 4 }}>01 · When I find a listing →</div>
            <div style={{ height: 6, background: 'var(--gold)', width: '92%', borderRadius: 1 }} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 4 }}>02 · When I compare →</div>
            <div style={{ height: 6, background: 'var(--gold)', width: '78%', opacity: 0.85, borderRadius: 1 }} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 4 }}>03 · When I&apos;m ready →</div>
            <div style={{ height: 6, background: 'var(--gold)', width: '56%', opacity: 0.7, borderRadius: 1 }} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 4 }}>04 · When I doubt →</div>
            <div style={{ height: 6, background: 'var(--gold)', width: '38%', opacity: 0.55, borderRadius: 1 }} />
          </div>
        </div>
      </div>
      <span className="cap">JTBD prioritization</span>
    </div>
  );
}

// ── Wireframe placeholders ────────────────────────────────────────────
function WireframeMock() {
  return (
    <div className="wires">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="wire">
          <i className="big" />
          <i className="long" />
          <i className="short" />
          <i className="long" />
          <i className="short" />
          <i className="line" />
          <i className="long" />
          <i className="short" />
        </div>
      ))}
    </div>
  );
}

// ── Hi-fi phone mocks ─────────────────────────────────────────────────
function HifiMocks({ variant }: { variant: string }) {
  return (
    <div className="cs-pair">
      <div className="cs-fig tall" style={{ display: 'grid', placeItems: 'center', padding: 24 }}>
        <div className="phone" style={{ width: '70%' }}>
          <div className="notch" />
          <div className="screen">
            {variant === 'hhi' && <ScrHHI />}
            {variant === 'idram' && <ScrIdram />}
            {variant === 'auto' && <ScrAuto />}
          </div>
        </div>
        <span className="cap">Primary screen</span>
      </div>
      <div className="cs-fig tall" style={{ display: 'grid', placeItems: 'center', padding: 24 }}>
        <div className="phone" style={{ width: '70%' }}>
          <div className="notch" />
          <div className="screen">
            {variant === 'hhi' && <ScrHHI />}
            {variant === 'idram' && <ScrIdram />}
            {variant === 'auto' && <ScrAuto />}
          </div>
        </div>
        <span className="cap">Detail screen</span>
      </div>
    </div>
  );
}

// ── Main case study component ─────────────────────────────────────────
interface CaseStudyPageProps {
  cs: CaseStudy;
  nextCs?: CaseStudy;
}

export default function CaseStudyPage({ cs, nextCs }: CaseStudyPageProps) {
  const accentStyle = { color: 'rgb(217, 119, 87)' };

  // Build title lines
  const titleLines = cs.hero.title.split('\n');

  return (
    <div className="page-fade-in">
      {/* Case study chapter nav */}
      <div className="cs-nav">
        <div className="cs-nav-inner">
          <Link href="/" className="cs-nav-back">← All work</Link>
          <div className="cs-nav-chapters">
            <a href="#challenge"><span className="num">01</span>Challenge</a>
            <a href="#process"><span className="num">02</span>Process</a>
            <a href="#impact"><span className="num">03</span>Impact</a>
          </div>
          <Link href="/#contact" className="cs-nav-back" style={accentStyle}>Hire ↗</Link>
        </div>
      </div>

      <main>
        {/* Hero */}
        <section className="cs-hero wrap">
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            {cs.hero.eyebrow.split(' · ').map((part, i, arr) => (
              <span key={i}>{part}{i < arr.length - 1 ? <> &nbsp;·&nbsp; </> : null}</span>
            ))}
          </div>

          <h1 className="h-display" style={{ maxWidth: '18ch' }}>
            {titleLines.map((line, i) => {
              const isLast = i === titleLines.length - 1;
              if (isLast && cs.hero.accentWord && line.includes(cs.hero.accentWord)) {
                const before = line.replace(cs.hero.accentWord, '');
                return (
                  <span key={i}>
                    {before && <>{before}</>}
                    <span style={accentStyle}>{cs.hero.accentWord}</span>
                    {i < titleLines.length - 1 && <br />}
                  </span>
                );
              }
              return <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>;
            })}
          </h1>

          <div className="cs-hero-meta">
            <div>
              <div className="k">Role</div>
              <div className="v">Lead Product Designer<br />Research → Ship</div>
            </div>
            <div>
              <div className="k">Team</div>
              <div className="v">1 PM · 4 Engineers · 1 Designer (me)</div>
            </div>
            <div>
              <div className="k">Duration</div>
              <div className="v">{cs.year}</div>
            </div>
            <div>
              <div className="k">Platforms</div>
              <div className="v">iOS · Android · Responsive web</div>
            </div>
          </div>

          <CsBanner cs={cs} />
        </section>

        {/* TL;DR */}
        <section className="section wrap">
          <div className="cs-block">
            <div className="left">
              <div className="label">TL;DR</div>
              <div className="num">↘</div>
              <div className="sub">The thirty-second version, for the impatient.</div>
            </div>
            <div className="cs-prose">
              <p className="lede">{cs.tldr.summary}</p>
              <div className="cs-stat-row" style={{ marginTop: 56 }}>
                {cs.tldr.stats.map((stat, i) => (
                  <div key={i} className="cs-stat">
                    <div className="n">{stat.n}</div>
                    <div className="l">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="wrap"><div className="rule" /></div>

        {/* Challenge */}
        <section className="section wrap" id="challenge">
          <div className="cs-block">
            <div className="left">
              <div className="label">{cs.challenge.label}</div>
              <div className="num">01.</div>
              <div className="sub">A fragmented market and an opaque transaction.</div>
            </div>
            <div className="cs-prose">
              <h2 className="h-1">
                {cs.challenge.heading.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h2>
              {cs.challenge.body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              <blockquote className="cs-quote">
                {cs.challenge.lede}
              </blockquote>
            </div>
          </div>

          {/* Research artefacts */}
          <div className="cs-block" style={{ marginTop: 'clamp(60px, 8vw, 100px)' }}>
            <div className="left">
              <div className="label">{cs.challenge.researchLabel}</div>
              <div className="num">3 mo.</div>
              <div className="sub">{cs.challenge.affinityLabel}</div>
            </div>
            <div className="cs-prose">
              {cs.images?.challenge ? (
                <div className="cs-fig wide" style={{ aspectRatio: 'unset', minHeight: 240 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cs.images.challenge} alt="Challenge research" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ) : (
                <div className="cs-pair">
                  <AffinityMapMock />
                  <JtbdMock />
                </div>
              )}
              <p style={{ marginTop: 28 }}>{cs.challenge.researchFindings}</p>
            </div>
          </div>
        </section>

        <div className="wrap"><div className="rule" /></div>

        {/* Process */}
        <section className="section wrap" id="process">
          <div className="cs-block">
            <div className="left">
              <div className="label">{cs.process.label}</div>
              <div className="num">02.</div>
              <div className="sub">Thinking transparency — every decision shown, not told.</div>
            </div>
            <div className="cs-prose">
              <h2 className="h-1">
                {cs.process.heading.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h2>
              <p>
                We started with the key screens, the highest-stake interactions in the product.
                Each direction was drawn three ways before writing a single line of copy.
              </p>
            </div>
          </div>

          {/* Process steps */}
          <div className="cs-block" style={{ marginTop: 'clamp(40px, 6vw, 64px)' }}>
            <div className="left">
              <div className="label">{cs.process.methodLabel}</div>
              <div className="sub">A loop, not a line. Each step fed the next.</div>
            </div>
            <div style={{ gridColumn: 2 }}>
              <div className="cs-steps">
                {cs.process.steps.map((step, i) => (
                  <div key={i} className="cs-step">
                    <div className="n">{step.n}</div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Wireframe evolution */}
          <div className="cs-block" style={{ marginTop: 'clamp(60px, 8vw, 100px)' }}>
            <div className="left">
              <div className="label">{cs.process.wireframeLabel}</div>
              <div className="num">v1 → v3</div>
              <div className="sub">Same screen, three rewrites. Negotiating density against narrative.</div>
            </div>
            <div className="cs-prose">
              {cs.images?.process ? (
                <div className="cs-fig wide" style={{ aspectRatio: 'unset', minHeight: 260 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cs.images.process} alt="Process / wireframes" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ) : (
                <div className="iters">
                  {cs.process.iterations.map((iter, i) => (
                    <div key={i} className="iter">
                      <div className="v">{iter.v}</div>
                      <div className="lines">
                        <i className="box" />
                        <i className="long" />
                        <i className="mid" />
                        <i className="short" />
                        {i > 0 && <i className="gold" />}
                        <i className="long" />
                        <i className="mid" />
                      </div>
                      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--muted)', lineHeight: 1.5 }}>
                        {iter.desc}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hi-fi mockups */}
          <div className="cs-block" style={{ marginTop: 'clamp(60px, 8vw, 100px)' }}>
            <div className="left">
              <div className="label">{cs.process.hifiLabel}</div>
              <div className="sub">The shipped flow.</div>
            </div>
            <div>
              {cs.images?.hifi ? (
                <div className="cs-fig wide" style={{ aspectRatio: 'unset', minHeight: 320 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cs.images.hifi} alt="Hi-fi mockups" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ) : (
                <>
                  <HifiMocks variant={cs.mockVariant} />
                  <div className="cs-fig wide" style={{ marginTop: 16, padding: 32, display: 'grid', placeItems: 'center' }}>
                    <div className="desk" style={{ width: '78%' }}>
                      <div className="bar">
                        <span className="dot" /><span className="dot" /><span className="dot" />
                      </div>
                      <div className="desk-content" style={{ display: 'grid', gridTemplateColumns: '220px 1fr 280px', height: 'calc(100% - 22px)' }}>
                        <div style={{ borderRight: '1px solid var(--line)', padding: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgb(217, 119, 87)', letterSpacing: '0.12em' }}>FILTERS</div>
                          <div style={{ height: 5, background: 'var(--ink-3)', width: '80%' }} />
                          <div style={{ height: 5, background: 'var(--ink-3)', width: '60%' }} />
                          <div style={{ height: 5, background: 'var(--ink-3)', width: '70%' }} />
                        </div>
                        <div style={{ padding: 18 }}>
                          <div style={{ height: 8, background: 'var(--gold)', opacity: 0.5, width: '30%', marginBottom: 12 }} />
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            <div style={{ aspectRatio: '4/3', background: 'var(--ink-3)' }} />
                            <div style={{ aspectRatio: '4/3', background: 'var(--ink-3)' }} />
                          </div>
                        </div>
                        <div style={{ borderLeft: '1px solid var(--line)', padding: 18 }}>
                          <div style={{ height: 5, background: 'var(--gold)', opacity: 0.6, width: '60%', marginBottom: 8 }} />
                          <div style={{ height: 4, background: 'var(--ink-3)', width: '90%', marginBottom: 4 }} />
                          <div style={{ height: 4, background: 'var(--ink-3)', width: '70%' }} />
                        </div>
                      </div>
                    </div>
                    <span className="cap">Web dashboard</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <div className="wrap"><div className="rule" /></div>

        {/* Impact */}
        <section className="section wrap" id="impact">
          <div className="cs-block">
            <div className="left">
              <div className="label">{cs.impact.label}</div>
              <div className="num">03.</div>
              <div className="sub">Measured outcomes, shipped and verified.</div>
            </div>
            <div className="cs-prose">
              <h2 className="h-1">
                {cs.impact.heading.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h2>

              <div className="cs-stat-row" style={{ marginTop: 40 }}>
                {cs.impact.stats.map((stat, i) => (
                  <div key={i} className="cs-stat">
                    <div className="n">{stat.n}</div>
                    <div className="l">{stat.label}</div>
                  </div>
                ))}
              </div>

              <blockquote className="cs-quote" style={{ marginTop: 48 }}>
                {cs.impact.quote}
                <cite>{cs.impact.quoteAuthor}</cite>
              </blockquote>

              <div style={{ marginTop: 40 }}>
                <div className="eyebrow" style={{ marginBottom: 20 }}>Key takeaways</div>
                {cs.impact.takeaways.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', flexShrink: 0, paddingTop: 4 }}>0{i + 1}.</span>
                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>{t}</p>
                  </div>
                ))}
              </div>

              {cs.impact.nextMoves.length > 0 && (
                <div style={{ marginTop: 40 }}>
                  <div className="eyebrow" style={{ marginBottom: 16 }}>Next moves</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {cs.impact.nextMoves.map((move, i) => (
                      <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15, color: 'var(--muted)' }}>
                        <span style={{ color: 'var(--gold)', flexShrink: 0 }}>→</span>
                        {move}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {cs.images?.impact && (
                <div className="cs-fig wide" style={{ marginTop: 48, aspectRatio: 'unset', minHeight: 280 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cs.images.impact} alt="Impact" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Custom Sections */}
        {(cs.customSections || []).map((section) => (
          <div key={section.id}>
            <div className="wrap"><div className="rule" /></div>
            <section className="section wrap">
              <div className="cs-block">
                <div className="left">
                  {section.label && <div className="label">{section.label}</div>}
                </div>
                <div className="cs-prose">
                  {section.title && (
                    <h2 className="h-1" style={{ marginBottom: 32 }}>{section.title}</h2>
                  )}
                  {section.body.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  {section.image && (
                    <div className="cs-fig wide" style={{ marginTop: 40, aspectRatio: 'unset', minHeight: 280 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={section.image} alt={section.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        ))}

        <div className="wrap"><div className="rule" /></div>

        {/* Next case study */}
        <div className="wrap">
          <div className="cs-next">
            <div>
              {nextCs ? (
                <>
                  <div className="eyebrow" style={{ marginBottom: 16 }}>Next case study</div>
                  <Link href={`/case/${nextCs.slug}`} className="next-link">
                    {nextCs.title}
                    <span className="arrow">→</span>
                  </Link>
                </>
              ) : (
                <>
                  <div className="eyebrow" style={{ marginBottom: 16 }}>Like what you see?</div>
                  <Link href="/#contact" className="next-link">
                    Let&apos;s connect
                    <span className="arrow">→</span>
                  </Link>
                </>
              )}
            </div>
            <Link href="/" className="cs-nav-back" style={{ fontSize: 13, color: 'var(--muted)' }}>
              ← Back to all work
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
