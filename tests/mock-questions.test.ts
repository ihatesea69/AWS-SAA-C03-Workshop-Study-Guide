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
 * Feature: aws-saa-c03-study-plan, Property 5: Mock Question Format
 * Validates: Requirements 7.2
 */
describe('Property 5: Mock Question Format', () => {
  const taskFiles = getTaskPageFiles();

  it('found task page files', () => {
    expect(taskFiles.length).toBeGreaterThan(0);
  });

  it('every mock exam question has question text, 4+ options, and answer details block', () => {
    for (const file of taskFiles) {
      const content = readFileSync(file, 'utf-8');
      // Find all question blocks (### Question N)
      const questions = content.match(/### Question \d+/g);
      if (!questions) continue;

      for (const q of questions) {
        // Extract the question number
        const num = q.match(/\d+/)![0];
        // Check that options exist (A, B, C, D)
        const hasOptions = content.includes(`- A)`) && content.includes(`- B)`) && content.includes(`- C)`) && content.includes(`- D)`);
        expect(hasOptions, `Question ${num} in ${file} missing options A-D`).toBe(true);
      }

      // Check that answer blocks exist
      const answerBlocks = content.match(/<details><summary>Answer<\/summary>/g);
      expect(
        answerBlocks?.length,
        `Mismatch between questions and answers in ${file}`
      ).toBe(questions.length);
    }
  });

  it('every task page has at least 5 mock exam questions', () => {
    for (const file of taskFiles) {
      const content = readFileSync(file, 'utf-8');
      const questions = content.match(/### Question \d+/g);
      expect(
        questions?.length ?? 0,
        `${file} has fewer than 5 mock questions`
      ).toBeGreaterThanOrEqual(5);
    }
  });
});
