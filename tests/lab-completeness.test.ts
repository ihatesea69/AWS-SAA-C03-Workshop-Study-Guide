import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';

const ROOT = resolve(__dirname, '..');
const CONTENT = resolve(ROOT, 'content');

function getTaskPageFiles(): string[] {
  const files: string[] = [];
  const domainDirs = readdirSync(CONTENT, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name.match(/domain/))
    .map(d => join(CONTENT, d.name));

  for (const domainDir of domainDirs) {
    const subDirs = readdirSync(domainDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && d.name.match(/task/i))
      .map(d => join(domainDir, d.name));
    for (const dir of subDirs) {
      const enFile = join(dir, '_index.md');
      if (existsSync(enFile)) files.push(enFile);
    }
  }
  return files;
}

/**
 * Feature: aws-saa-c03-study-plan, Property 4: Lab Section Completeness
 * Validates: Requirements 6.1, 6.2
 */
describe('Property 4: Lab Section Completeness', () => {
  const taskFiles = getTaskPageFiles();

  it('found task page files', () => {
    expect(taskFiles.length).toBeGreaterThan(0);
  });

  it('every task page with a Hands-On Lab section has Objective, Prerequisites, Estimated Time, Steps, and Cleanup', () => {
    for (const file of taskFiles) {
      const content = readFileSync(file, 'utf-8');
      if (content.match(/##\s*Hands-On Lab/i)) {
        expect(content, `Missing Objective in ${file}`).toMatch(/###\s*Objective/i);
        expect(content, `Missing Prerequisites in ${file}`).toMatch(/###\s*Prerequisites/i);
        expect(content, `Missing Estimated Time in ${file}`).toMatch(/###\s*Estimated Time/i);
        expect(content, `Missing Steps in ${file}`).toMatch(/###\s*Step/i);
        expect(content, `Missing Cleanup in ${file}`).toMatch(/###\s*Cleanup/i);
      }
    }
  });

  it('every task page with a Hands-On Lab contains at least one CLI command', () => {
    for (const file of taskFiles) {
      const content = readFileSync(file, 'utf-8');
      if (content.match(/##\s*Hands-On Lab/i)) {
        expect(content, `Missing CLI command in ${file}`).toMatch(/```bash/);
      }
    }
  });
});
