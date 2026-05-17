'use client';

import { useState, useRef } from 'react';
import type { SiteContent } from '@/lib/types';

interface ImagesClientProps {
  initialContent: SiteContent;
  initialImages: string[];
}

interface SiteImageSlot {
  key: keyof SiteContent['images'];
  label: string;
  sub: string;
  tileColor: string;
}

const SITE_SLOTS: SiteImageSlot[] = [
  {
    key: 'portrait',
    label: 'Portrait',
    sub: 'Used in splash section sidebar. Square format works best.',
    tileColor: '#f4c8a8',
  },
  {
    key: 'about',
    label: 'About Feature',
    sub: 'Wide banner image in the about section. 16:7 ratio.',
    tileColor: '#a8d4c1',
  },
  {
    key: 'footer',
    label: 'Footer Lifestyle',
    sub: 'Shown in footer contact section. 4:3 ratio.',
    tileColor: '#cdb3df',
  },
];

export default function ImagesClient({ initialContent, initialImages }: ImagesClientProps) {
  const [content, setContent] = useState(initialContent);
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const slotInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  async function uploadFile(file: File, slotKey?: keyof SiteContent['images']) {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/images', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Upload failed');
    }

    const data = await res.json();
    return data.url as string;
  }

  async function handleGeneralUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    setMessage('');

    try {
      for (const file of files) {
        await uploadFile(file);
      }
      // Refresh image list
      const res = await fetch('/api/images');
      const data = await res.json();
      setImages(data.images || []);
      setMessage(`${files.length} image${files.length > 1 ? 's' : ''} uploaded!`);
    } catch {
      setMessage('Upload failed. Please try again.');
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSlotUpload(e: React.ChangeEvent<HTMLInputElement>, slotKey: keyof SiteContent['images']) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage('');

    try {
      const url = await uploadFile(file, slotKey);

      // Save the URL to content
      const newImages = { ...content.images, [slotKey]: url };
      const newContent = { ...content, images: newImages };

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent),
      });

      if (res.ok) {
        setContent(newContent);
        setMessage(`${slotKey} image updated!`);
        // Also refresh the images list
        const imgRes = await fetch('/api/images');
        const imgData = await imgRes.json();
        setImages(imgData.images || []);
      }
    } catch {
      setMessage('Upload failed. Please try again.');
    }

    setUploading(false);
    if (slotInputRefs.current[slotKey]) {
      slotInputRefs.current[slotKey]!.value = '';
    }
  }

  async function handleDeleteImage(filename: string) {
    if (!confirm(`Delete ${filename}?`)) return;

    const res = await fetch(`/api/images/${encodeURIComponent(filename)}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setImages((prev) => prev.filter((f) => f !== filename));
      setMessage('Image deleted.');
    } else {
      setMessage('Failed to delete image.');
    }
  }

  async function handleClearSlot(slotKey: keyof SiteContent['images']) {
    const newImages = { ...content.images, [slotKey]: null };
    const newContent = { ...content, images: newImages };

    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContent),
    });

    if (res.ok) {
      setContent(newContent);
      setMessage(`${slotKey} image cleared.`);
    }
  }

  async function handleSetSlotFromLibrary(slotKey: keyof SiteContent['images'], filename: string) {
    const url = `/uploads/${filename}`;
    const newImages = { ...content.images, [slotKey]: url };
    const newContent = { ...content, images: newImages };

    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContent),
    });

    if (res.ok) {
      setContent(newContent);
      setMessage(`${slotKey} set to ${filename}`);
    }
  }

  return (
    <div>
      {message && (
        <div className={`alert ${message.includes('fail') || message.includes('Failed') ? 'alert-error' : 'alert-success'}`}
          style={{ marginBottom: 24 }}>
          {message}
        </div>
      )}

      {/* Site image slots */}
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Site Image Slots</h2>
      <p style={{ fontSize: 13, color: 'var(--admin-muted)', marginBottom: 24 }}>
        These images appear on the portfolio homepage. Upload an image or pick one from the library below.
      </p>

      <div className="site-images-grid">
        {SITE_SLOTS.map((slot) => {
          const currentSrc = content.images[slot.key];
          return (
            <div key={slot.key} className="site-image-slot">
              <div
                className="site-image-slot-thumb"
                style={{ background: currentSrc ? undefined : slot.tileColor + '55' }}
              >
                {currentSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={currentSrc} alt={slot.label} />
                ) : (
                  <span style={{ opacity: 0.5 }}>No image</span>
                )}
              </div>
              <div className="site-image-slot-info">
                <div className="site-image-slot-label">{slot.label}</div>
                <div className="site-image-slot-sub">{slot.sub}</div>
                {currentSrc && (
                  <div style={{ fontSize: 11, fontFamily: 'var(--admin-mono)', color: 'var(--admin-muted)', marginBottom: 8, wordBreak: 'break-all' }}>
                    {currentSrc}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                    Upload image
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      ref={(el) => { slotInputRefs.current[slot.key] = el; }}
                      onChange={(e) => handleSlotUpload(e, slot.key)}
                    />
                  </label>
                  {currentSrc && (
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleClearSlot(slot.key)}
                      style={{ color: 'var(--admin-danger)' }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="admin-separator" />

      {/* Upload zone */}
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Upload New Images</h2>
      <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
        <div className="upload-zone-icon">↑</div>
        <div className="upload-zone-text">Click to upload or drag and drop</div>
        <div className="upload-zone-sub">JPG, PNG, WebP, GIF, SVG — max 10MB</div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleGeneralUpload}
        />
      </div>

      {uploading && <div className="loading">Uploading...</div>}

      <div className="admin-separator" />

      {/* Image library */}
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
        Image Library ({images.length})
      </h2>

      {images.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-title">No images yet</div>
          <div className="admin-empty-sub">Upload images using the area above.</div>
        </div>
      ) : (
        <div className="image-grid">
          {images.map((filename) => (
            <div key={filename} className="image-card">
              <div className="image-card-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/uploads/${filename}`} alt={filename} />
              </div>
              <div className="image-card-info">
                <div className="image-card-name">{filename}</div>
                <div className="image-card-size">/uploads/{filename}</div>
              </div>
              <div className="image-card-actions">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {SITE_SLOTS.map((slot) => (
                    <button
                      key={slot.key}
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleSetSlotFromLibrary(slot.key, filename)}
                      title={`Set as ${slot.label}`}
                    >
                      → {slot.label}
                    </button>
                  ))}
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleDeleteImage(filename)}
                    style={{ color: 'var(--admin-danger)' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
