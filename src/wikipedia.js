import fetch from 'node-fetch';

const USER_AGENT = 'CumpleBot/1.0 (https://github.com/your/repo)';

export async function getBirths(lang, month, day) {
  const url = `https://api.wikimedia.org/feed/v1/wikipedia/${lang}/onthisday/births/${month}/${day}`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`Wikimedia API error ${res.status}`);
  const data = await res.json();
  return data.births;
}

export function pickRandom(births, posted) {
  const unposted = births.filter(b => !posted.includes(b.pages[0]?.pageid));
  if (unposted.length === 0) return null;
  const withImage = unposted.filter(b => b.pages[0]?.originalimage || b.pages[0]?.thumbnail);
  const pool = withImage.length ? withImage : unposted;
  return pool[Math.floor(Math.random() * pool.length)];
}
