'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CaseStudy } from '@/lib/types';

interface CaseStudyFormProps {
  initial?: CaseStudy;
  mode: 'new' | 'edit';
}

function emptyCS(): CaseStudy {
  return {
    id: '',
    slug: '',
    title: '',
    featured: false,
    num: '',
    year: '',
    category: '',
    tags: ['', '', ''],
    tile: 'gold',
    mockVariant: 'hhi',
    sub: '',
    published: false,
    order: 99,
    hero: { eyebrow: '', title: '', accentWord: '', bannerLabel: '' },
    tldr: {
      stats: [
        { n: '', label: '' }, { n: '', label: '' },
        { n: '', label: '' }, { n: '', label: '' },
      ],
      summary: '',
    },
    challenge: {
      label: '', heading: '', lede: '', body: '',
      researchLabel: 'RESEARCH', researchFindings: '',
      affinityLabel: '', jtbdLabel: '',
    },
    process: {
      label: '', heading: '', methodLabel: 'METHOD',
      steps: Array.from({ length: 6 }, (_, i) => ({ n: `0${i + 1}.`, title: '', desc: '' })),
      wireframeLabel: 'WIREFRAMES',
      iterations: [
        { v: '', desc: '' }, { v: '', desc: '' }, { v: '', desc: '' },
      ],
      hifiLabel: 'HI-FI',
    },
    impact: {
      label: '', heading: '',
      stats: [
        { n: '', label: '' }, { n: '', label: '' },
        { n: '', label: '' }, { n: '', label: '' },
      ],
      quote: '', quoteAuthor: '',
      takeaways: ['', '', ''],
      nextMoves: ['', '', ''],
    },
  };
}

export default function CaseStudyForm({ initial, mode }: CaseStudyFormProps) {
  const router = useRouter();
  const [cs, setCs] = useState<CaseStudy>(initial || emptyCS());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  function update(path: string, value: unknown) {
    setCs((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as CaseStudy;
      const parts = path.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = next;
      for (let i = 0; i < parts.length - 1; i++) {
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = value;
      return next;
    });
  }

  function updateArray(path: string, idx: number, subPath: string, value: unknown) {
    setCs((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as CaseStudy;
      const parts = path.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = next;
      for (const part of parts) { obj = obj[part]; }
      if (subPath) {
        obj[idx][subPath] = value;
      } else {
        obj[idx] = value;
      }
      return next;
    });
  }

  async function handleSave(publish?: boolean) {
    setSaving(true);
    setMessage('');

    const payload = { ...cs };
    if (publish !== undefined) payload.published = publish;

    // Auto-generate id/slug from title if new
    if (mode === 'new' && !payload.id) {
      const slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      payload.id = slug;
      payload.slug = slug;
    }

    const url = mode === 'new' ? '/api/case-studies' : `/api/case-studies/${cs.id}`;
    const method = mode === 'new' ? 'POST' : 'PUT';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setMessage('Saved successfully!');
      if (mode === 'new') {
        const data = await res.json();
        router.push(`/admin/case-studies/${data.id}`);
      }
    } else {
      setMessage('Error saving. Please try again.');
    }

    setSaving(false);
  }

  return (
    <div className="admin-form">
      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
          {message}
        </div>
      )}

      {/* Basic Info */}
      <div className="form-section">
        <div className="form-section-header">
          <h2 className="form-section-title">Basic Info</h2>
        </div>
        <div className="form-section-body">
          <div className="form-row">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={cs.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="e.g. The Happy Home Initiative"
              />
            </div>
            <div className="form-group">
              <label>Slug / ID</label>
              <input
                type="text"
                value={cs.slug}
                onChange={(e) => {
                  update('slug', e.target.value);
                  update('id', e.target.value);
                }}
                placeholder="e.g. hhi (auto-generated from title if empty)"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Year</label>
              <input
                type="text"
                value={cs.year}
                onChange={(e) => update('year', e.target.value)}
                placeholder="e.g. 2024 — 2025"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                value={cs.category}
                onChange={(e) => update('category', e.target.value)}
                placeholder="e.g. Real Estate"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Number Label</label>
              <input
                type="text"
                value={cs.num}
                onChange={(e) => update('num', e.target.value)}
                placeholder="e.g. 01 / FEATURED"
              />
            </div>
            <div className="form-group">
              <label>Order</label>
              <input
                type="number"
                value={cs.order}
                onChange={(e) => update('order', parseInt(e.target.value) || 99)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tile Color</label>
              <select value={cs.tile} onChange={(e) => update('tile', e.target.value)}>
                <option value="gold">Gold</option>
                <option value="mint">Mint</option>
                <option value="lavender">Lavender</option>
                <option value="peach">Peach</option>
                <option value="sky">Sky</option>
                <option value="rose">Rose</option>
                <option value="cream">Cream</option>
              </select>
            </div>
            <div className="form-group">
              <label>Mock Variant</label>
              <select value={cs.mockVariant} onChange={(e) => update('mockVariant', e.target.value)}>
                <option value="hhi">HHI</option>
                <option value="idram">Idram</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Subtitle / Sub</label>
            <textarea
              value={cs.sub}
              onChange={(e) => update('sub', e.target.value)}
              rows={2}
              placeholder="Short description shown on project card"
            />
          </div>

          <div className="form-group">
            <label>Tags (3 tags)</label>
            <div className="form-row-3">
              {cs.tags.map((tag, i) => (
                <input
                  key={i}
                  type="text"
                  value={tag}
                  onChange={(e) => {
                    const next = [...cs.tags];
                    next[i] = e.target.value;
                    update('tags', next);
                  }}
                  placeholder={`Tag ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 32 }}>
            <label className="toggle-group">
              <span className="toggle">
                <input
                  type="checkbox"
                  checked={cs.featured}
                  onChange={(e) => update('featured', e.target.checked)}
                />
                <span className="toggle-slider" />
              </span>
              <span className="toggle-label">Featured project</span>
            </label>

            <label className="toggle-group">
              <span className="toggle">
                <input
                  type="checkbox"
                  checked={cs.published}
                  onChange={(e) => update('published', e.target.checked)}
                />
                <span className="toggle-slider" />
              </span>
              <span className="toggle-label">Published</span>
            </label>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="form-section">
        <div className="form-section-header">
          <h2 className="form-section-title">Hero Section</h2>
        </div>
        <div className="form-section-body">
          <div className="form-group">
            <label>Eyebrow</label>
            <input
              type="text"
              value={cs.hero.eyebrow}
              onChange={(e) => update('hero.eyebrow', e.target.value)}
              placeholder="e.g. 01 / FEATURED · 2024 — 2025 · Real Estate"
            />
          </div>
          <div className="form-group">
            <label>Hero Title (use \n for line breaks)</label>
            <textarea
              value={cs.hero.title}
              onChange={(e) => update('hero.title', e.target.value)}
              rows={4}
              placeholder="Multi-line title"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Accent Word</label>
              <input
                type="text"
                value={cs.hero.accentWord}
                onChange={(e) => update('hero.accentWord', e.target.value)}
                placeholder="Word to highlight in coral"
              />
            </div>
            <div className="form-group">
              <label>Banner Label</label>
              <input
                type="text"
                value={cs.hero.bannerLabel}
                onChange={(e) => update('hero.bannerLabel', e.target.value)}
                placeholder="e.g. Listing · Insights · Transparency layer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* TL;DR */}
      <div className="form-section">
        <div className="form-section-header">
          <h2 className="form-section-title">TL;DR</h2>
        </div>
        <div className="form-section-body">
          <div className="form-group">
            <label>Summary</label>
            <textarea
              value={cs.tldr.summary}
              onChange={(e) => update('tldr.summary', e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8 }}>Stats (4)</label>
            <div className="stats-grid">
              {cs.tldr.stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="form-group">
                    <label>Number</label>
                    <input
                      type="text"
                      value={stat.n}
                      onChange={(e) => updateArray('tldr.stats', i, 'n', e.target.value)}
                      placeholder="+38%"
                    />
                  </div>
                  <div className="form-group">
                    <label>Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => updateArray('tldr.stats', i, 'label', e.target.value)}
                      placeholder="task completion rate"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Challenge */}
      <div className="form-section">
        <div className="form-section-header">
          <h2 className="form-section-title">01 · Challenge</h2>
        </div>
        <div className="form-section-body">
          <div className="form-row">
            <div className="form-group">
              <label>Section Label</label>
              <input
                type="text"
                value={cs.challenge.label}
                onChange={(e) => update('challenge.label', e.target.value)}
                placeholder="01 · THE CHALLENGE"
              />
            </div>
            <div className="form-group">
              <label>Heading (use \n for breaks)</label>
              <input
                type="text"
                value={cs.challenge.heading}
                onChange={(e) => update('challenge.heading', e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Lede (pull quote)</label>
            <textarea
              value={cs.challenge.lede}
              onChange={(e) => update('challenge.lede', e.target.value)}
              rows={2}
            />
          </div>
          <div className="form-group">
            <label>Body (use blank lines for paragraphs)</label>
            <textarea
              value={cs.challenge.body}
              onChange={(e) => update('challenge.body', e.target.value)}
              rows={5}
              className="tall"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Research Label</label>
              <input
                type="text"
                value={cs.challenge.researchLabel}
                onChange={(e) => update('challenge.researchLabel', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Affinity Map Label</label>
              <input
                type="text"
                value={cs.challenge.affinityLabel}
                onChange={(e) => update('challenge.affinityLabel', e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Research Findings</label>
            <textarea
              value={cs.challenge.researchFindings}
              onChange={(e) => update('challenge.researchFindings', e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="form-section">
        <div className="form-section-header">
          <h2 className="form-section-title">02 · Process</h2>
        </div>
        <div className="form-section-body">
          <div className="form-row">
            <div className="form-group">
              <label>Section Label</label>
              <input
                type="text"
                value={cs.process.label}
                onChange={(e) => update('process.label', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Heading</label>
              <input
                type="text"
                value={cs.process.heading}
                onChange={(e) => update('process.heading', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8 }}>Method Steps (6)</label>
            <div className="steps-grid">
              {cs.process.steps.map((step, i) => (
                <div key={i} className="step-item">
                  <div className="form-group">
                    <label>Num</label>
                    <input
                      type="text"
                      value={step.n}
                      onChange={(e) => updateArray('process.steps', i, 'n', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => updateArray('process.steps', i, 'title', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      value={step.desc}
                      onChange={(e) => updateArray('process.steps', i, 'desc', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8 }}>Iterations (3)</label>
            <div className="iterations-grid">
              {cs.process.iterations.map((iter, i) => (
                <div key={i} className="iteration-item">
                  <div className="form-group">
                    <label>Version Label</label>
                    <input
                      type="text"
                      value={iter.v}
                      onChange={(e) => updateArray('process.iterations', i, 'v', e.target.value)}
                      placeholder="V1 · STORY-LED"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={iter.desc}
                      onChange={(e) => updateArray('process.iterations', i, 'desc', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Impact */}
      <div className="form-section">
        <div className="form-section-header">
          <h2 className="form-section-title">03 · Impact</h2>
        </div>
        <div className="form-section-body">
          <div className="form-row">
            <div className="form-group">
              <label>Section Label</label>
              <input
                type="text"
                value={cs.impact.label}
                onChange={(e) => update('impact.label', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Heading</label>
              <input
                type="text"
                value={cs.impact.heading}
                onChange={(e) => update('impact.heading', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8 }}>Stats (4)</label>
            <div className="stats-grid">
              {cs.impact.stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="form-group">
                    <label>Number</label>
                    <input
                      type="text"
                      value={stat.n}
                      onChange={(e) => updateArray('impact.stats', i, 'n', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => updateArray('impact.stats', i, 'label', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Quote</label>
              <textarea
                value={cs.impact.quote}
                onChange={(e) => update('impact.quote', e.target.value)}
                rows={2}
              />
            </div>
            <div className="form-group">
              <label>Quote Author</label>
              <input
                type="text"
                value={cs.impact.quoteAuthor}
                onChange={(e) => update('impact.quoteAuthor', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Takeaways</label>
            <div className="list-items">
              {cs.impact.takeaways.map((t, i) => (
                <div key={i} className="list-item">
                  <textarea
                    value={t}
                    onChange={(e) => {
                      const next = [...cs.impact.takeaways];
                      next[i] = e.target.value;
                      update('impact.takeaways', next);
                    }}
                    rows={2}
                    placeholder={`Takeaway ${i + 1}`}
                  />
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => {
                      update('impact.takeaways', cs.impact.takeaways.filter((_, idx) => idx !== i));
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn-add-item"
                onClick={() => update('impact.takeaways', [...cs.impact.takeaways, ''])}
              >
                + Add takeaway
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Next Moves</label>
            <div className="list-items">
              {cs.impact.nextMoves.map((m, i) => (
                <div key={i} className="list-item">
                  <input
                    type="text"
                    value={m}
                    onChange={(e) => {
                      const next = [...cs.impact.nextMoves];
                      next[i] = e.target.value;
                      update('impact.nextMoves', next);
                    }}
                    placeholder={`Next move ${i + 1}`}
                  />
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => {
                      update('impact.nextMoves', cs.impact.nextMoves.filter((_, idx) => idx !== i));
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn-add-item"
                onClick={() => update('impact.nextMoves', [...cs.impact.nextMoves, ''])}
              >
                + Add next move
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.push('/admin/case-studies')}
        >
          Cancel
        </button>
        <div className="form-actions-right">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleSave(false)}
            disabled={saving}
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSave(true)}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save & Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}
