import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(__dirname, '..');
const COMPARISON_FILE = resolve(ROOT, 'content', '7-comparison-tables', '_index.md');

/**
 * Feature: aws-saa-c03-study-plan, Property 7: Comparison Table Format
 * Validates: Requirements 11.2
 */
describe('Property 7: Comparison Table Format', () => {
  it('comparison tables file exists', () => {
    expect(existsSync(COMPARISON_FILE)).toBe(true);
  });

  it('every comparison table has Use Case, Pricing, Performance, and Exam Tip columns', () => {
    const content = readFileSync(COMPARISON_FILE, 'utf-8');
    // Split by ### headers to get individual tables
    const sections = content.split(/### /);
    const tableSections = sections.filter(s => s.includes('|'));

    expect(tableSections.length).toBeGreaterThanOrEqual(8);

    for (const section of tableSections) {
      const title = section.split('\n')[0].trim();
      // Each table should have these column headers
      expect(section, `${title}: missing Use Case`).toMatch(/Use Case/i);
      expect(section, `${title}: missing Pricing`).toMatch(/Pric/i);
      expect(section, `${title}: missing Performance`).toMatch(/Performance|Trang thai/i);
      expect(section, `${title}: missing Exam Tip`).toMatch(/Exam Tip/i);
    }
  });
});
