import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    // Goto a SPA
    await page.goto('<url>');

    // ... perform some actions that reload part of the page.

    // waits for the default `load` event.
    await page.waitForLoadState();
  } finally {
    await page.close();
  }
}