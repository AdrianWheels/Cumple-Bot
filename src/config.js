export const config = {
  xKey: process.env.X_API_KEY,
  xSecret: process.env.X_API_SECRET,
  xAccessToken: process.env.X_ACCESS_TOKEN,
  xAccessSecret: process.env.X_ACCESS_SECRET,
  geminiKey: process.env.GEMINI_API_KEY
};

export const isDryRun = process.argv.includes('--dry-run');
