import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATE_PATH = join(__dirname, '../data/posted.json');

export function loadState() {
  try {
    const data = readFileSync(STATE_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveState(state) {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n');
}
