import fs from 'fs';
import path from 'path';
import type { CaseStudy, SiteContent } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');

function readJSON<T>(filename: string): T {
  const filepath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(raw) as T;
}

function writeJSON(filename: string, data: unknown): void {
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

export function getCaseStudies(): CaseStudy[] {
  return readJSON<CaseStudy[]>('case-studies.json');
}

export function getCaseStudy(idOrSlug: string): CaseStudy | undefined {
  const studies = getCaseStudies();
  return studies.find((s) => s.id === idOrSlug || s.slug === idOrSlug);
}

export function saveCaseStudies(studies: CaseStudy[]): void {
  writeJSON('case-studies.json', studies);
}

export function createCaseStudy(study: CaseStudy): CaseStudy {
  const studies = getCaseStudies();
  studies.push(study);
  saveCaseStudies(studies);
  return study;
}

export function updateCaseStudy(id: string, updates: Partial<CaseStudy>): CaseStudy | null {
  const studies = getCaseStudies();
  const idx = studies.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  studies[idx] = { ...studies[idx], ...updates };
  saveCaseStudies(studies);
  return studies[idx];
}

export function deleteCaseStudy(id: string): boolean {
  const studies = getCaseStudies();
  const idx = studies.findIndex((s) => s.id === id);
  if (idx === -1) return false;
  studies.splice(idx, 1);
  saveCaseStudies(studies);
  return true;
}

export function getContent(): SiteContent {
  return readJSON<SiteContent>('content.json');
}

export function saveContent(content: SiteContent): void {
  writeJSON('content.json', content);
}

export function getUploadedImages(): string[] {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    return [];
  }
  return fs.readdirSync(uploadsDir).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'].includes(ext);
  });
}

export function deleteUploadedImage(filename: string): boolean {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const filepath = path.join(uploadsDir, filename);
  if (!fs.existsSync(filepath)) return false;
  fs.unlinkSync(filepath);
  return true;
}
