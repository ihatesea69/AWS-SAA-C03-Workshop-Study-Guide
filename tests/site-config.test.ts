import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(__dirname, '..');

describe('Site Configuration', () => {
  it('hugo.toml exists and has correct baseURL', () => {
    const configPath = resolve(ROOT, 'hugo.toml');
    expect(existsSync(configPath)).toBe(true);
    const content = readFileSync(configPath, 'utf-8');
    expect(content).toContain('baseURL = "https://ihatesea69.github.io/AWS-SAA-C03-Workshop-Study-Guide/"');
  });

  it('hugo.toml has English and Vietnamese language config', () => {
    const content = readFileSync(resolve(ROOT, 'hugo.toml'), 'utf-8');
    expect(content).toContain('[languages.en]');
    expect(content).toContain('[languages.vi]');
  });

  it('hugo.toml uses hugo-theme-learn', () => {
    const content = readFileSync(resolve(ROOT, 'hugo.toml'), 'utf-8');
    expect(content).toContain('theme = "hugo-theme-learn"');
  });

  it('hugo-theme-learn submodule exists', () => {
    const themePath = resolve(ROOT, 'themes', 'hugo-theme-learn');
    expect(existsSync(themePath)).toBe(true);
  });
});

describe('GitHub Actions Workflow', () => {
  it('.github/workflows/hugo.yml exists', () => {
    const workflowPath = resolve(ROOT, '.github', 'workflows', 'hugo.yml');
    expect(existsSync(workflowPath)).toBe(true);
  });

  it('workflow uses Hugo v0.128.0', () => {
    const content = readFileSync(resolve(ROOT, '.github', 'workflows', 'hugo.yml'), 'utf-8');
    expect(content).toContain('HUGO_VERSION: 0.128.0');
  });

  it('workflow deploys to GitHub Pages', () => {
    const content = readFileSync(resolve(ROOT, '.github', 'workflows', 'hugo.yml'), 'utf-8');
    expect(content).toContain('actions/deploy-pages@v4');
  });
});

describe('README.md', () => {
  it('README.md exists', () => {
    expect(existsSync(resolve(ROOT, 'README.md'))).toBe(true);
  });

  it('README contains Hugo badge', () => {
    const content = readFileSync(resolve(ROOT, 'README.md'), 'utf-8');
    expect(content).toContain('Hugo-0.128.0');
  });

  it('README contains live demo link', () => {
    const content = readFileSync(resolve(ROOT, 'README.md'), 'utf-8');
    expect(content).toContain('https://ihatesea69.github.io/AWS-SAA-C03-Workshop-Study-Guide/');
  });

  it('README contains local development instructions', () => {
    const content = readFileSync(resolve(ROOT, 'README.md'), 'utf-8');
    expect(content).toContain('hugo server');
  });

  it('README contains license section', () => {
    const content = readFileSync(resolve(ROOT, 'README.md'), 'utf-8');
    expect(content).toContain('License');
  });
});
