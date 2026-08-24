const puppeteer = require('puppeteer');
const fs = require('fs');

// CONFIGURATION: Set to your exact e-ink display dimensions
const WIDTH = 800;   // Change to match your display width
const HEIGHT = 480;  // Change to match your display height

// Array of web page URLs you want to cycle through or capture
const TARGET_URL = process.env.URL_TO_CAPTURE || 'https://wttr.in/NewYork?0';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set viewport to screen dimensions
  await page.setViewport({ width: WIDTH, height: HEIGHT });

  // Navigate to your webpage
  await page.goto(TARGET_URL, { waitUntil: 'networkidle0' });

  // Take screenshot
  await page.screenshot({ path: 'dashboard.png' });

  await browser.close();
  console.log('Screenshot captured successfully!');
})();
