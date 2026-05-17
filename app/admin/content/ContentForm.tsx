'use client';

import { useState } from 'react';
import type { SiteContent, Fact } from '@/lib/types';

interface ContentFormProps {
  initial: SiteContent;
}

export default function ContentForm({ initial }: ContentFormProps) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  function update(path: string, value: unknown) {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as SiteContent;
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

  async function handleSave() {
    setSaving(true);
    setMessage('');

    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });

    if (res.ok) {
      setMessage('Saved successfully!');
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

      {/* Splash */}
      <div className="form-section">
        <div className="form-section-header">
          <h2 className="form-section-title">Splash / Hero</h2>
          <span className="form-section-badge">Homepage top section</span>
        </div>
        <div className="form-section-body">
          <div className="form-group">
            <label>Headline Line 1</label>
            <input
              type="text"
              value={content.splash.headline1}
              onChange={(e) => update('splash.headline1', e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Headline Line 2 (before accent)</label>
              <input
                type="text"
                value={content.splash.headline2}
                onChange={(e) => update('splash.headline2', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Accent Word (coral italic)</label>
              <input
                type="text"
                value={content.splash.headlineAccent}
                onChange={(e) => update('splash.headlineAccent', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Headline Line 3</label>
              <input
                type="text"
                value={content.splash.headline3}
                onChange={(e) => update('splash.headline3', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Headline Line 4</label>
              <input
                type="text"
                value={content.splash.headline4}
                onChange={(e) => update('splash.headline4', e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Headline Line 5 (muted)</label>
            <input
              type="text"
              value={content.splash.headline5}
              onChange={(e) => update('splash.headline5', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Lede paragraph</label>
            <textarea
              value={content.splash.lede}
              onChange={(e) => update('splash.lede', e.target.value)}
              rows={3}
            />
          </div>
          <div className="form-row-3">
            <div className="form-group">
              <label>Available status</label>
              <input
                type="text"
                value={content.splash.available}
                onChange={(e) => update('splash.available', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Focus</label>
              <input
                type="text"
                value={content.splash.focus}
                onChange={(e) => update('splash.focus', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Based</label>
              <input
                type="text"
                value={content.splash.based}
                onChange={(e) => update('splash.based', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="form-section">
        <div className="form-section-header">
          <h2 className="form-section-title">About Section</h2>
        </div>
        <div className="form-section-body">
          <div className="form-group">
            <label>Bio paragraph 1</label>
            <textarea
              value={content.about.bio}
              onChange={(e) => update('about.bio', e.target.value)}
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Bio paragraph 2</label>
            <textarea
              value={content.about.bio2}
              onChange={(e) => update('about.bio2', e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8 }}>Facts / Credentials</label>
            <div className="list-items">
              {content.about.facts.map((fact, i) => (
                <div key={i} style={{ background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: 6, padding: 12, display: 'grid', gap: 10 }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Key</label>
                      <input
                        type="text"
                        value={fact.key}
                        onChange={(e) => {
                          const next = [...content.about.facts];
                          next[i] = { ...next[i], key: e.target.value };
                          update('about.facts', next);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Accent text (optional, shown in gold)</label>
                      <input
                        type="text"
                        value={fact.accent || ''}
                        onChange={(e) => {
                          const next = [...content.about.facts];
                          next[i] = { ...next[i], accent: e.target.value || null };
                          update('about.facts', next);
                        }}
                        placeholder="Leave empty for no accent"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Value</label>
                    <textarea
                      value={fact.value}
                      onChange={(e) => {
                        const next = [...content.about.facts];
                        next[i] = { ...next[i], value: e.target.value };
                        update('about.facts', next);
                      }}
                      rows={2}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      update('about.facts', content.about.facts.filter((_, idx) => idx !== i));
                    }}
                    style={{ justifySelf: 'start' }}
                  >
                    Remove fact
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn-add-item"
                onClick={() => {
                  update('about.facts', [
                    ...content.about.facts,
                    { key: '', value: '', accent: null } as Fact,
                  ]);
                }}
              >
                + Add fact
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="form-section">
        <div className="form-section-header">
          <h2 className="form-section-title">Contact / Footer</h2>
        </div>
        <div className="form-section-body">
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={content.contact.email}
                onChange={(e) => update('contact.email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>LinkedIn URL</label>
              <input
                type="url"
                value={content.contact.linkedin}
                onChange={(e) => update('contact.linkedin', e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>CTA Text</label>
            <input
              type="text"
              value={content.contact.cta}
              onChange={(e) => update('contact.cta', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Copyright</label>
            <input
              type="text"
              value={content.contact.copyright}
              onChange={(e) => update('contact.copyright', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <div />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}
