import { rmSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const pathsToRemove = [
  resolve(projectRoot, 'dist', 'adk'),
  resolve(projectRoot, 'dist', 'client'),
];

for (const targetPath of pathsToRemove) {
  rmSync(targetPath, { recursive: true, force: true });
}
