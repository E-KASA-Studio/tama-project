const fs = require('node:fs');
const path = require('node:path');

const mode = process.argv[2];

if (mode !== 'dev' && mode !== 'prod') {
  throw new Error('Invalid mode. Use: node scripts/set-robots.cjs <dev|prod>');
}

const expectedRobotsByMode = {
  dev: 'User-agent: *\nDisallow: /',
  prod: 'User-agent: *\nAllow: /',
};

const normalizeContent = (content) => content.replace(/\r\n/g, '\n').trim();
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

const sourceContent = fs.readFileSync(sourcePath, 'utf8');
const normalizedSource = normalizeContent(sourceContent);
const expectedContent = expectedRobotsByMode[mode];

if (normalizedSource !== expectedContent) {
  throw new Error(
    `[set-robots] Source content validation failed for ${sourceFile}. ` +
      `Expected:\n${expectedContent}\n\nGot:\n${normalizedSource}`
  );
}

fs.copyFileSync(sourcePath, targetPath);

const targetContent = fs.readFileSync(targetPath, 'utf8');
const normalizedTarget = normalizeContent(targetContent);

if (normalizedTarget !== expectedContent) {
  throw new Error(
    `[set-robots] Target content validation failed for mode=${mode}. ` +
      `Expected:\n${expectedContent}\n\nGot:\n${normalizedTarget}`
  );
}

console.log(`[set-robots] Mode: ${mode}. Copied and validated ${sourceFile} -> ${targetPath}`);
