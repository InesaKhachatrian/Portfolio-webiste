'use client';

import ImageSlot from './ImageSlot';
import type { SiteContent } from '@/lib/types';

interface FooterProps {
  content: SiteContent;
}

export default function Footer({ content }: FooterProps) {
  const { contact, images } = content;

  return (
    <footer className="foot wrap" id="contact">
      <div className="eyebrow" style={{ marginBottom: 24 }}>04 · Let&apos;s connect</div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'end',
        }}
        className="foot-grid"
      >
        <div className="foot-cta">
          <h2 className="h-display">
            Your <span className="gold" style={{ color: 'rgb(217, 119, 87)' }}>next move</span>,<br />
            played together.
          </h2>
          <a href={`mailto:${contact.email}`} className="mail">
            {contact.email}{' '}
            <span aria-hidden="true" style={{ color: 'var(--gold)' }}>→</span>
          </a>
        </div>

        <ImageSlot
          id="ik-contact"
          tileClass="tile-lavender"
          placeholder="Drop a casual / lifestyle photo"
          aspectRatio="4 / 3"
          src={images.footer}
          style={{ width: '100%', maxWidth: 420, justifySelf: 'end' }}
          alt="Lifestyle photo"
        />
      </div>

      <div className="foot-end">
        <div>{contact.copyright}</div>
        <div className="foot-links">
          <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={`mailto:${contact.email}`}>Email ↗</a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
