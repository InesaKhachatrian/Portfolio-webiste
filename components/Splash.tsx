import KnightTrace from './KnightTrace';
import ImageSlot from './ImageSlot';
import type { SiteContent } from '@/lib/types';

interface SplashProps {
  content: SiteContent;
}

export default function Splash({ content }: SplashProps) {
  const { splash, images } = content;

  return (
    <header className="splash wrap">
      <div className="splash-grid">
        <div>
          <h1 className="h-display" style={{ margin: 0 }}>
            {splash.headline1}<br />
            {splash.headline2}{' '}
            <span style={{ color: 'rgb(217, 119, 87)', fontStyle: 'italic' }}>
              {splash.headlineAccent}
            </span>{' '}
            {splash.headline3}<br />
            {splash.headline4}<br />
            <span style={{ color: 'var(--muted)' }}>{splash.headline5}</span>
          </h1>
        </div>

        <aside className="splash-meta" style={{ paddingTop: '136px' }}>
          <ImageSlot
            id="ik-portrait"
            tileClass="tile-peach"
            placeholder="Drop a portrait — square works best"
            aspectRatio="1 / 1"
            src={images.portrait}
            style={{ width: '100%', marginBottom: 8 }}
            alt="Inesa Khachatryan portrait"
          />
          <KnightTrace />
          <div className="row">
            <span>Currently</span>
            <span>{splash.available}</span>
          </div>
          <div className="row">
            <span>Focus</span>
            <span>{splash.focus}</span>
          </div>
          <div className="row">
            <span>Based</span>
            <span>{splash.based}</span>
          </div>
        </aside>
      </div>

      <div className="splash-foot" style={{ marginTop: 'clamp(24px, 3vw, 40px)' }}>
        <p className="lede">{splash.lede}</p>
        <a
          href="#work"
          className="mono"
          style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}
        >
          See selected work <span style={{ color: 'var(--gold)' }}>↓</span>
        </a>
      </div>
    </header>
  );
}
