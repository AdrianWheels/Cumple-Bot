import fetch from 'node-fetch';

async function getCommonsMeta(url) {
  try {
    const filename = decodeURIComponent(url.split('/').pop());
    const api = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${filename}&prop=imageinfo&iiprop=extmetadata&format=json&origin=*`;
    const res = await fetch(api);
    if (!res.ok) return {};
    const data = await res.json();
    const page = Object.values(data.query.pages)[0];
    const meta = page.imageinfo?.[0]?.extmetadata || {};
    const artist = meta.Artist?.value?.replace(/<[^>]+>/g, '') || 'Autor desconocido';
    const license = meta.LicenseShortName?.value || '';
    return { artist, license };
  } catch {
    return {};
  }
}

export async function getImage(entry, geminiKey) {
  const page = entry.pages[0];
  if (page?.originalimage) {
    try {
      const imgRes = await fetch(page.originalimage.source);
      if (imgRes.ok) {
        const buffer = Buffer.from(await imgRes.arrayBuffer());
        const meta = await getCommonsMeta(page.originalimage.source);
        const attribution = meta.license ? `Foto: ${meta.artist} – ${meta.license}, Wikimedia Commons` : 'Foto: Wikimedia Commons';
        return { buffer, attribution };
      }
    } catch (e) {
      console.error('Wikimedia image error', e);
    }
  }
  if (!geminiKey) return null;
  try {
    const prompt = `Minimalist poster, typographic focus, the name "${entry.text}", clean vector style, soft gradient background`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
    const body = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { response_mime_type: 'image/png' }
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const json = await res.json();
    const b64 = json.candidates?.[0]?.content?.parts?.[0]?.inline_data?.data;
    if (b64) {
      return { buffer: Buffer.from(b64, 'base64'), attribution: '' };
    }
  } catch (e) {
    console.error('Gemini image error', e);
  }
  return null;
}
