import puppeteer from 'puppeteer';

export async function generatePDF(url: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 2200, deviceScaleFactor: 1 });
    
    // Wait for network idle to ensure React has mounted and fetched data
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the paper container and web fonts so the full layout is stable before printing.
    await page.waitForSelector('#pdf-paper', { visible: true, timeout: 30000 });
    await page.evaluate(async () => {
      const fonts = (document as any).fonts;
      if (fonts?.ready) {
        await fonts.ready;
      }
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    });

    // Set page format to A4
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true, // Preserve background colors
      preferCSSPageSize: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}
