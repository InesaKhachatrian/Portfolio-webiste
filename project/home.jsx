// home.jsx — Inesa Khachatryan portfolio homepage
// Editorial dark, gold accent, subtle chess metaphor.

const { useEffect, useRef, useState } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "accent": "#d9a857",
  "density": "two",
  "fontPair": "editorial"
} /*EDITMODE-END*/;

// ── Reveal-on-scroll hook ─────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add("is-in");});
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

// ── Page transition wrapper ───────────────────────────────────────────────
function Page({ children }) {
  return <div className="page-fade-in">{children}</div>;
}

// ── Knight signature ──────────────────────────────────────────────────────
function KnightTrace() {
  // 4x4 mini board; one piece traces an L-move
  const cells = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      cells.push(
        <span key={`${r}-${c}`} className="cell" style={{ left: c * 14 + "px", top: r * 14 + "px" }} />
      );
    }
  }
  return (
    <div className="knight-trace" aria-hidden="true">
      <div className="board">
        {cells}
        <span className="pulse" />
      </div>
      <span>Thinking · several moves ahead</span>
    </div>);

}

// ── Nav ───────────────────────────────────────────────────────────────────
function Nav({ accent }) {
  return (
    <nav className="nav">
      <a href="index.html" className="nav-brand">
        <span className="dot" style={{ ...{ background: accent }, background: "rgb(217, 119, 87)" }} />
        <span>Inesa Khachatryan</span>
      </a>
      <div className="nav-links">
        <a href="#work" className="is-active">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="https://www.linkedin.com/in/inesa-khachatryan/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
      </div>
    </nav>);

}

// ── Splash ────────────────────────────────────────────────────────────────
function Splash() {
  return (
    <header className="splash wrap" data-screen-label="01 Splash" style={{ padding: "64px 35.68px 89.2px" }}>
      <div className="splash-grid">
        <div>
          <h1 className="h-display" style={{ color: "rgb(0, 0, 0)", fontSize: "80px", lineHeight: 1.05, margin: 0 }}>
            Senior Product Designer<br />
            crafting <span className="gold italic" style={{ color: "rgb(217, 119, 87)", fontSize: "80px" }}>scalable</span> digital<br />
            interfaces for Fintech<br />
            <span style={{ color: "var(--muted)", fontSize: "80px" }}>&amp; beyond.</span>
          </h1>
        </div>
        <aside className="splash-meta" style={{ paddingTop: "136px" }}>
          <image-slot
            id="ik-portrait"
            class="tile-peach"
            shape="rounded"
            radius="6"
            placeholder="Drop a portrait — square works best"
            style={{ width: "100%", aspectRatio: "1 / 1", marginBottom: 8 }}>
          </image-slot>
          <KnightTrace />
          <div className="row"><span>Currently</span><span>Available · Q3 2026</span></div>
          <div className="row"><span>Focus</span><span>Fintech · Platforms</span></div>
          <div className="row"><span>Based</span><span>Yerevan, AM</span></div>
        </aside>
      </div>

      <div className="splash-foot" style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
        <p className="lede">
          Six years leveraging systems-thinking to design web, mobile, and back-office
          platforms — anticipating the next user move before it happens.
        </p>
        <a href="#work" className="mono" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
          See selected work <span style={{ color: "var(--gold)" }}>↓</span>
        </a>
      </div>
    </header>);

}

// ── Mock builders ─────────────────────────────────────────────────────────
function PhoneMock({ variant }) {
  return (
    <div className="phone">
      <div className="notch" />
      <div className="screen">
        {variant === "hhi" && <ScrHHI />}
        {variant === "idram" && <ScrIdram />}
        {variant === "auto" && <ScrAuto />}
      </div>
    </div>);

}

function ScrHHI() {
  return (
    <div className="scr-hhi-search">
      <div className="topbar"><i /><i style={{ width: "12%", marginLeft: "auto", background: "var(--gold)", opacity: 0.7 }} /></div>
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
    </div>);

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
        <div className="it"><i /><span className="a" style={{ width: "30%" }} /><span className="b" style={{ width: "14%" }} /></div>
        <div className="it"><i /><span className="a" style={{ width: "44%" }} /><span className="b" /></div>
        <div className="it"><i /><span className="a" style={{ width: "28%" }} /><span className="b" style={{ width: "20%" }} /></div>
      </div>
    </div>);

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
    </div>);

}

// ── Project card ──────────────────────────────────────────────────────────
function Project({ num, year, title, sub, tags, mock, href, variant, tile }) {
  const cls = ["proj"];
  if (variant === "alt") cls.push("alt");
  if (tile) cls.push("tile-" + tile);
  return (
    <a className={cls.join(" ")} href={href}>
      <div className="proj-frame">
        <div className="mock">
          <div className="stripes" />
          {mock}
        </div>
        <span className="mock-corner">{year}</span>
      </div>
      <div className="proj-meta">
        <div>
          <h3 className="proj-title">
            <span className="num">{num}</span>{title}
          </h3>
          <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 6, maxWidth: "44ch" }}>{sub}</div>
        </div>
        <div className="proj-tags">{tags.map((t, i) => <div key={i}>{t}</div>)}</div>
      </div>
      <div className="proj-arrow">
        Read case <span aria-hidden="true">→</span>
      </div>
    </a>);

}

// ── Hero project block (large, full-width) ────────────────────────────────
function HeroProject() {
  return (
    <a href="case-hhi.html" className="proj reveal tile-gold" style={{ display: "block" }}>
      <div className="proj-frame" style={{ aspectRatio: "16 / 8" }}>
        <div className="mock">
          <div className="stripes" />
          <div className="phone-cluster" style={{ paddingBottom: "8%" }}>
            <PhoneMock variant="hhi" />
            <div style={{ width: "26%", aspectRatio: "9/19" }}>
              <div className="desk" style={{ width: "100%", aspectRatio: "9/16" }}>
                <div className="bar"><span className="dot" /><span className="dot" /><span className="dot" /></div>
                <div className="desk-content" style={{ padding: 12 }}>
                  <div style={{ height: 8, background: "var(--gold)", opacity: 0.6, width: "40%", marginBottom: 10 }} />
                  <div style={{ height: 5, background: "var(--ink-3)", width: "80%", marginBottom: 6 }} />
                  <div style={{ height: 5, background: "var(--ink-3)", width: "60%", marginBottom: 14 }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    <div style={{ aspectRatio: "1/1", background: "var(--ink-3)" }} />
                    <div style={{ aspectRatio: "1/1", background: "var(--ink-3)" }} />
                    <div style={{ aspectRatio: "1/1", background: "var(--ink-3)" }} />
                    <div style={{ aspectRatio: "1/1", background: "color-mix(in oklab, var(--gold) 40%, var(--ink-3))" }} />
                  </div>
                </div>
              </div>
            </div>
            <PhoneMock variant="hhi" />
          </div>
        </div>
        <span className="mock-corner">2024 — 2025 · FEATURED</span>
        <span className="mock-label">Listing · Insights · Transparency layer</span>
      </div>
      <div className="proj-meta">
        <div>
          <h3 className="proj-title" style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>
            <span className="num">01 / FEATURED</span>The Happy Home Initiative
          </h3>
          <div style={{ color: "var(--muted)", fontSize: 16, marginTop: 10, maxWidth: "60ch", lineHeight: 1.5 }}>
            Revolutionizing real estate through transparency — a buyer-facing platform that
            surfaces the data agents won't.
          </div>
        </div>
        <div className="proj-tags">
          <div>Real Estate</div>
          <div>Mobile · Web</div>
          <div>2024 — 2025</div>
        </div>
      </div>
      <div className="proj-arrow">
        Read case <span aria-hidden="true">→</span>
      </div>
    </a>);

}

// ── Work section ──────────────────────────────────────────────────────────
function Work({ density }) {
  return (
    <section className="section wrap" id="work" data-screen-label="02 Work">
      <div className="work-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 18 }}>02 · Selected work</div>
          <h2 className="h-1">
            Projects, played out <br />
            <span style={{ fontStyle: "italic", color: "rgb(217, 119, 87)" }}>several moves</span> ahead.
          </h2>
        </div>
        <p className="lede">
          A small selection across fintech, real-estate, and on-demand services —
          each shipped, measured, and iterated against real users.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 6vw, 88px)" }}>
        <HeroProject />

        <div className={"work-grid " + (density === "three" ? "cols-3" : "cols-2")}>
          <Project
            num="02"
            year="2023"
            title="Idram"
            sub="Mobile banking for Armenia's largest fintech — a calmer, denser feed for power users."
            tags={["Fintech", "Mobile", "2023"]}
            tile="lavender"
            mock={<div className="phone-cluster" style={{ padding: 0 }}>
              <PhoneMock variant="idram" />
            </div>}
            href="#" />
          
          <Project
            num="03"
            year="2025"
            title="Auto — Roadside"
            sub="On-demand mechanics for stranded drivers, freelance pros, and fleet managers."
            tags={["On-demand", "Mobile · Back-office", "2025"]}
            tile="mint"
            mock={<div className="phone-cluster" style={{ padding: 0 }}>
              <PhoneMock variant="auto" />
            </div>}
            href="#" />
          
          {density === "three" &&
          <Project
            num="04"
            year="2022"
            title="Back-office · Internal"
            sub="A 14-tool consolidation for an ops team of 60 — fewer tabs, faster decisions."
            tags={["Platform", "Web", "2022"]}
            tile="peach"
            mock={
            <div className="desk" style={{ width: "82%" }}>
                  <div className="bar"><span className="dot" /><span className="dot" /><span className="dot" /></div>
                  <div className="desk-content" style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 0, height: "calc(100% - 22px)" }}>
                    <div style={{ borderRight: "1px solid var(--line)", padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                      <i style={{ display: "block", height: 4, background: "var(--gold)", opacity: 0.7, width: "70%" }} />
                      <i style={{ display: "block", height: 4, background: "var(--ink-3)", width: "60%" }} />
                      <i style={{ display: "block", height: 4, background: "var(--ink-3)", width: "80%" }} />
                      <i style={{ display: "block", height: 4, background: "var(--ink-3)", width: "50%" }} />
                    </div>
                    <div style={{ padding: 10, display: "grid", gridTemplateRows: "auto 1fr", gap: 8 }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <i style={{ height: 8, width: 80, background: "var(--ink-3)" }} />
                        <i style={{ height: 8, width: 40, background: "var(--gold)", opacity: 0.6, marginLeft: "auto" }} />
                      </div>
                      <div style={{ background: "var(--ink-3)", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 1, alignContent: "start", padding: 4 }}>
                        {Array.from({ length: 18 }).map((_, i) =>
                    <i key={i} style={{ height: 4, background: i % 5 === 0 ? "var(--gold)" : "color-mix(in oklab, var(--paper) 8%, var(--ink-2))", opacity: i % 5 === 0 ? 0.8 : 1 }} />
                    )}
                      </div>
                    </div>
                  </div>
                </div>
            }
            href="#"
            variant="alt" />

          }
        </div>
      </div>
    </section>);

}

// ── About ─────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="section wrap" id="about" data-screen-label="03 About">
      <div className="eyebrow" style={{ marginBottom: 32 }}>03 · About</div>

      <image-slot
        id="ik-about-feature"
        class="tile-mint"
        shape="rounded"
        radius="6"
        placeholder="Drop a working / studio photo — wide format works best"
        style={{ width: "100%", aspectRatio: "16 / 7", marginBottom: "clamp(40px, 6vw, 80px)" }}>
      </image-slot>

      <div className="about">
        <div className="about-text">
          <h2 className="h-1 reveal" style={{ marginBottom: 32, height: "65px", padding: "0px" }}>
            About me
          </h2>
          <p className="reveal" style={{ fontFamily: "ui-sans-serif", fontSize: 18, fontWeight: 400, margin: "18px 18px 18px 0px" }}>
            I am a Senior Product Designer based in Yerevan with over 6 years of experience crafting scalable digital interfaces, primarily for fintech, backoffice, and mobile platforms
          </p>
          <p className="reveal" style={{ fontFamily: "ui-sans-serif", fontSize: 18, fontWeight: 400 }}>Outside of design, I enjoy playing chess, taking creative classes like ceramics or macrame, and recharging in nature.

          </p>
        </div>

        <div className="facts reveal">
          <div className="fact">
            <div className="k">Experience</div>
            <div className="v"><span className="em" style={{ color: "rgb(217, 119, 87)" }}>6+ years</span> across fintech, real-estate, on-demand services and internal tooling.</div>
          </div>
          <div className="fact">
            <div className="k">Specialty</div>
            <div className="v">Fintech - mobile banking, payments, back-office, compliance flows.</div>
          </div>
          <div className="fact">
            <div className="k">Toolkit</div>
            <div className="v">Figma · Figma Make · Maze · Mixpanel · Notion · Linear · enough HTML/CSS </div>
          </div>
          <div className="fact">
            <div className="k">Methods</div>
            <div className="v">Generative research, usability studies, design systems, accessibility audits, JTBD.</div>
          </div>
          <div className="fact">
            <div className="k">Languages</div>
            <div className="v">Armenian · Russian · English · enough Figma plugins to count.</div>
          </div>
          <div className="fact">
            <div className="k">Off-screen</div>
            <div className="v">Chess, new cities, slow trains.</div>
          </div>
        </div>
      </div>
    </section>);

}

// ── Footer / Contact ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="foot wrap" id="contact" data-screen-label="04 Contact">
      <div className="eyebrow" style={{ marginBottom: 24 }}>04 · Let's connect</div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "clamp(32px, 5vw, 64px)", alignItems: "end" }} className="foot-grid">
        <div className="foot-cta">
          <h2 className="h-display">
            Your <span className="gold" style={{ color: "rgb(217, 119, 87)" }}>next move</span>,<br />
            played together.
          </h2>
          <a href="mailto:inesa.khachatrian@gmail.com" className="mail">
            inesa.khachatrian@gmail.com <span aria-hidden="true" style={{ color: "var(--gold)" }}>→</span>
          </a>
        </div>
        <image-slot
          id="ik-contact"
          class="tile-lavender"
          shape="rounded"
          radius="6"
          placeholder="Drop a casual / lifestyle photo"
          style={{ width: "100%", aspectRatio: "4 / 3", maxWidth: 420, justifySelf: "end" }}>
        </image-slot>
      </div>
      <div className="foot-end">
        <div>© 2026 Inesa Khachatryan · Designed &amp; built in Yerevan</div>
        <div className="foot-links">
          <a href="https://www.linkedin.com/in/inesa-khachatryan/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="mailto:inesa.khachatrian@gmail.com">Email ↗</a>
          <a href="#" onClick={(e) => {e.preventDefault();window.scrollTo({ top: 0, behavior: "smooth" });}}>Back to top ↑</a>
        </div>
      </div>
    </footer>);

}

// ── App ───────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  // Apply tweaks to <html> + persist for case-study page
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("theme-dark", !!t.dark);
    html.classList.remove("theme-light"); // legacy
    html.classList.remove("fp-editorial", "fp-modern", "fp-technical");
    html.classList.add("fp-" + (t.fontPair || "editorial"));
    html.style.setProperty("--gold", t.accent);
    html.style.setProperty("--gold-soft",
    `color-mix(in oklab, ${t.accent} 25%, transparent)`);
    try {
      localStorage.setItem("ik-dark", String(!!t.dark));
      localStorage.setItem("ik-fp", t.fontPair || "editorial");
      localStorage.setItem("ik-accent", t.accent);
    } catch (e) {}
  }, [t.dark, t.fontPair, t.accent]);

  return (
    <Page>
      <Nav accent={t.accent} />
      <main>
        <Splash />
        <div className="wrap"><div className="rule" /></div>
        <Work density={t.density} />
        <div className="wrap"><div className="rule" /></div>
        <About />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak("dark", v)} />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={["#d9a857", "#b88533", "#a8d4c1", "#cdb3df", "#f4c8a8", "#bcd6e3"]}
          onChange={(v) => setTweak("accent", v)} />
        

        <TweakSection label="Layout" />
        <TweakRadio
          label="Grid density"
          value={t.density}
          options={["two", "three"]}
          onChange={(v) => setTweak("density", v)} />
        

        <TweakSection label="Typography" />
        <TweakSelect
          label="Font pair"
          value={t.fontPair}
          options={[
          { value: "editorial", label: "Editorial · Instrument + Geist" },
          { value: "modern", label: "Modern · Newsreader + Inter" },
          { value: "technical", label: "Technical · Geist + JetBrains" }]
          }
          onChange={(v) => setTweak("fontPair", v)} />
        
      </TweaksPanel>
    </Page>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);