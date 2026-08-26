/**
 * PDF generation service using Playwright (Chromium pre-installed at /opt/pw-browsers).
 * Renders the CV as an A4 PDF via a headless browser.
 */

import { chromium } from 'playwright-core';

const CHROMIUM_PATH =
  process.env.CHROMIUM_PATH ||
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

let browserInstance: Awaited<ReturnType<typeof chromium.launch>> | null = null;

async function getBrowser() {
  if (!browserInstance) {
    browserInstance = await chromium.launch({
      executablePath: CHROMIUM_PATH,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      headless: true,
    });
  }
  return browserInstance;
}

export async function generateCVPdf(cvId: string, authToken: string): Promise<Buffer> {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    // Navigate to the print-optimized CV page
    const url = `${CLIENT_URL}/cv/${cvId}/print`;
    await page.setExtraHTTPHeaders({ Authorization: `Bearer ${authToken}` });

    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for the CV content to render
    await page.waitForSelector('[data-cv-ready]', { timeout: 15000 }).catch(() => {
      // Fallback: just wait a moment if no ready signal
    });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

    return Buffer.from(pdf);
  } finally {
    await page.close();
  }
}
