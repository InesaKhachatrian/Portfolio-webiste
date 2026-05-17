import type { CSSProperties } from 'react';

interface ImageSlotProps {
  id?: string;
  className?: string;
  tileClass?: string;
  placeholder?: string;
  aspectRatio?: string;
  src?: string | null;
  style?: CSSProperties;
  alt?: string;
}

export default function ImageSlot({
  id,
  className,
  tileClass,
  placeholder,
  aspectRatio,
  src,
  style,
  alt = '',
}: ImageSlotProps) {
  const classes = ['image-slot', tileClass, className].filter(Boolean).join(' ');

  return (
    <div
      id={id}
      className={classes}
      style={{ aspectRatio, ...style }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} />
      ) : (
        <div className="image-slot-placeholder">
          {placeholder || 'Image'}
        </div>
      )}
    </div>
  );
}
