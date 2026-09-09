import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const root = path.resolve(process.argv[2] || '.');
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async entry => entry.isDirectory()
    ? files(path.join(directory, entry.name))
    : [path.join(directory, entry.name)]))).flat();
}
const rows = await Promise.all((await files(path.join(root, '.next/static')))
  .filter(file => /\.(js|css|woff2)$/.test(file))
  .map(async file => {
    const bytes = await readFile(file);
    return { file: path.relative(root, file).replaceAll('\\', '/'), bytes: bytes.length, gzip: gzipSync(bytes).length };
  }));
const report = {
  description: 'Sum of individual production .next/static files, not per-route transfer; gzip level default. Fonts reported separately.',
  totals: Object.fromEntries(['js', 'css', 'woff2'].map(ext => [ext, rows.filter(row => row.file.endsWith('.' + ext)).reduce((total, row) => ({ files: total.files + 1, bytes: total.bytes + row.bytes, gzip: total.gzip + row.gzip }), { files: 0, bytes: 0, gzip: 0 })])),
  largestJavaScript: rows.filter(row => row.file.endsWith('.js')).sort((a, b) => b.gzip - a.gzip).slice(0, 8),
};
const json = JSON.stringify(report, null, 2) + '\n';
if (process.argv[3]) await writeFile(process.argv[3], json);
console.log(json);
