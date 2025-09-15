import { today } from './src/time.js';
import { getBirths, pickRandom } from './src/wikipedia.js';
import { getImage } from './src/image.js';
import { postToX } from './src/post.js';
import { loadState, saveState } from './src/state.js';
import { config, isDryRun } from './src/config.js';

async function main() {
  const { day, month } = today();
  const posted = loadState();
  let births = await getBirths('es', month, day);
  let entry = pickRandom(births, posted);
  if (!entry) {
    births = await getBirths('en', month, day);
    entry = pickRandom(births, posted);
  }
  if (!entry) {
    console.log('No suitable entry found.');
    return;
  }
  const dateStr = `${day}/${month}`;
  const base = `🎂 ${dateStr} — Nació en ${entry.year}: ${entry.text}`;
  let tweet = `${base} #OnThisDay`;
  const image = await getImage(entry, config.geminiKey);
  if (image?.attribution) {
    const extra = `\n${image.attribution}`;
    if (base.length + extra.length + 11 <= 260) {
      tweet = `${base}${extra} #OnThisDay`;
    }
  }
  await postToX(tweet, image?.buffer, isDryRun, config);
  if (!isDryRun) {
    posted.push(entry.pages[0].pageid);
    saveState(posted);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
