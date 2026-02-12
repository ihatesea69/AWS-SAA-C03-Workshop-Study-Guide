import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, existsSync, statSync } from 'fs';
import { resolve, join } from 'path';

const ROOT = resolve(__dirname, '..');
const CONTENT = resolve(ROOT, 'content');

function getContentDirs(base: string): string[] {
  if (!existsSync(base)) return [];
  const entries = readdirSync(base, { withFileTypes: true });
  let dirs: string[] = [];
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      const fullPath = join(base, entry.name);
      dirs.push(fullPath);
      dirs = dirs.concat(getContentDirs(fullPath));
    }
  }
  return dirs;
}

function getAllContentFiles(base: string): string[] {
  const dirs = getContentDirs(base);
  const files: string[] = [];
  // Check root content dir
  if (existsSync(join(base, '_index.md'))) files.push(join(base, '_index.md'));
  if (existsSync(join(base, '_index.vi.md'))) files.push(join(base, '_index.vi.md'));
  for (const dir of dirs) {
    const entries = readdirSync(dir).filter(f => f.endsWith('.md'));
    for (const f of entries) {
      files.push(join(dir, f));
    }
  }
  return files;
}

function getTaskPageDirs(): string[] {
  const taskDirs: string[] = [];
  const domainDirs = readdirSync(CONTENT, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name.match(/domain/))
    .map(d => join(CONTENT, d.name));

  for (const domainDir of domainDirs) {
    const subDirs = readdirSync(domainDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && d.name.match(/task/i))
      .map(d => join(domainDir, d.name));
    taskDirs.push(...subDirs);
  }
  return taskDirs;
}

/**
 * Feature: aws-saa-c03-study-plan, Property 1: Bilingual Completeness
 * Validates: Requirements 1.2
 */
describe('Property 1: Bilingual Completeness', () => {
  const contentDirs = getContentDirs(CONTENT);

  it('every content directory with _index.md also has _index.vi.md', () => {
    for (const dir of contentDirs) {
      const hasEn = existsSync(join(dir, '_index.md'));
      const hasVi = existsSync(join(dir, '_index.vi.md'));
      if (hasEn) {
        expect(hasVi, `Missing _index.vi.md in ${dir}`).toBe(true);
      }
    }
  });

  it('root content has both _index.md and _index.vi.md', () => {
    expect(existsSync(join(CONTENT, '_index.md'))).toBe(true);
    expect(existsSync(join(CONTENT, '_index.vi.md'))).toBe(true);
  });
});

/**
 * Feature: aws-saa-c03-study-plan, Property 2: Frontmatter Validity
 * Validates: Requirements 1.3
 */
describe('Property 2: Frontmatter Validity', () => {
  const allFiles = getAllContentFiles(CONTENT);

  it('every content file has TOML frontmatter with title, date, weight', () => {
    for (const file of allFiles) {
      const content = readFileSync(file, 'utf-8');
      const match = content.match(/^\+\+\+\r?\n([\s\S]*?)\r?\n\+\+\+/);
      expect(match, `Missing TOML frontmatter in ${file}`).not.toBeNull();
      if (match) {
        const fm = match[1];
        expect(fm, `Missing title in ${file}`).toMatch(/title\s*=/);
        expect(fm, `Missing date in ${file}`).toMatch(/date\s*=/);
        expect(fm, `Missing weight in ${file}`).toMatch(/weight\s*=/);
      }
    }
  });
});

/**
 * Feature: aws-saa-c03-study-plan, Property 3: Task Page Completeness
 * Validates: Requirements 2.2, 2.3, 2.4
 */
describe('Property 3: Task Page Completeness', () => {
  const taskDirs = getTaskPageDirs();

  it('found task page directories', () => {
    expect(taskDirs.length).toBeGreaterThan(0);
  });

  it('every task page EN has Theory, Flashcards, Mock Exam Questions, and References sections', () => {
    for (const dir of taskDirs) {
      const enFile = join(dir, '_index.md');
      if (!existsSync(enFile)) continue;
      const content = readFileSync(enFile, 'utf-8');
      expect(content, `Missing Theory section in ${enFile}`).toMatch(/##\s*(Theory|Ly thuyet)/i);
      expect(content, `Missing Flashcards section in ${enFile}`).toMatch(/##\s*Flashcards/i);
      expect(content, `Missing Mock Exam Questions section in ${enFile}`).toMatch(/##\s*Mock Exam Questions/i);
      expect(content, `Missing References section in ${enFile}`).toMatch(/##\s*(References|Tai lieu tham khao)/i);
    }
  });
});
