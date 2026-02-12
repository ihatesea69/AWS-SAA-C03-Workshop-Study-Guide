import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';

const ROOT = resolve(__dirname, '..');
const CONTENT = resolve(ROOT, 'content');

interface DomainFlashcards {
  domain: string;
  count: number;
}

function countFlashcardsInFile(filePath: string): number {
  const content = readFileSync(filePath, 'utf-8');
  // Count table rows in Flashcards section (lines starting with | that have a number)
  const flashcardSection = content.split(/##\s*Flashcards/i)[1];
  if (!flashcardSection) return 0;
  // Stop at next ## section
  const sectionContent = flashcardSection.split(/\n##\s/)[0];
  const rows = sectionContent.match(/^\|\s*\d+\s*\|/gm);
  return rows ? rows.length : 0;
}

function getDomainFlashcardCounts(): DomainFlashcards[] {
  const results: DomainFlashcards[] = [];
  const domainDirs = readdirSync(CONTENT, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name.match(/domain/))
    .map(d => ({ name: d.name, path: join(CONTENT, d.name) }));

  for (const domain of domainDirs) {
    let totalCount = 0;
    const subDirs = readdirSync(domain.path, { withFileTypes: true })
      .filter(d => d.isDirectory() && d.name.match(/task/i))
      .map(d => join(domain.path, d.name));

    for (const dir of subDirs) {
      const enFile = join(dir, '_index.md');
      if (existsSync(enFile)) {
        totalCount += countFlashcardsInFile(enFile);
      }
    }
    results.push({ domain: domain.name, count: totalCount });
  }
  return results;
}

/**
 * Feature: aws-saa-c03-study-plan, Property 6: Flashcard Coverage
 * Validates: Requirements 10.2
 */
describe('Property 6: Flashcard Coverage', () => {
  const domainCounts = getDomainFlashcardCounts();

  it('found domain directories', () => {
    expect(domainCounts.length).toBeGreaterThan(0);
  });

  it('each domain has at least 20 flashcard Q&A pairs across its task pages', () => {
    for (const dc of domainCounts) {
      expect(
        dc.count,
        `${dc.domain} has only ${dc.count} flashcards (need >= 20)`
      ).toBeGreaterThanOrEqual(20);
    }
  });
});
