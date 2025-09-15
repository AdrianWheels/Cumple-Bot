import { TwitterApi } from 'twitter-api-v2';

export async function postToX(text, imageBuffer, dryRun, config) {
  if (dryRun) {
    console.log('[DRY RUN] Tweet:', text);
    if (imageBuffer) console.log('[DRY RUN] image bytes:', imageBuffer.length);
    return;
  }
  const client = new TwitterApi({
    appKey: config.xKey,
    appSecret: config.xSecret,
    accessToken: config.xAccessToken,
    accessSecret: config.xAccessSecret
  });
  const rw = client.readWrite;
  let mediaId;
  if (imageBuffer) {
    mediaId = await rw.v1.uploadMedia(imageBuffer, { type: 'image/png' });
  }
  await rw.v2.tweet({ text, media: mediaId ? { media_ids: [mediaId] } : undefined });
}
