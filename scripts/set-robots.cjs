const fs = require('node:fs');
const path = require('node:path');

const mode = process.argv[2] === 'dev' ? 'dev' : 'prod';
const root = path.resolve(__dirname, '..');

const sourceFile = mode === 'dev' ? 'robots.dev.txt' : 'robots.txt';
const sourcePath = path.join(root, 'src', sourceFile);

const candidateTargets = [
  path.join(root, 'dist', 'tama-project', 'browser', 'robots.txt'),
  path.join(root, 'dist', 'tama-project', 'robots.txt')
];

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Source robots file not found: ${sourcePath}`);
}

const targetPath = candidateTargets.find((filePath) => fs.existsSync(path.dirname(filePath)));

if (!targetPath) {
  throw new Error('Build output folder not found. Run ng build before setting robots file.');
}

fs.copyFileSync(sourcePath, targetPath);
console.log(`[set-robots] Mode: ${mode}. Copied ${sourceFile} -> ${targetPath}`);
