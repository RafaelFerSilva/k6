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
    await page.goto('https://test.k6.io');

    // Slow the test down to mimic a user looking for the element on the page.
    await page.waitForTimeout(1000);

    // ... perform the next action
  } finally {
    await page.close();
  }
}