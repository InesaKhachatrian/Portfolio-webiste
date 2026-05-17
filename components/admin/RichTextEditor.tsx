'use client';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

// Simple textarea-based editor (no external deps needed)
export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  rows = 6,
}: RichTextEditorProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="tall"
      style={{ fontFamily: 'var(--admin-font)', lineHeight: 1.6 }}
    />
  );
}
