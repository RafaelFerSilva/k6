import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

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
    // Setting up the example that will mutate the h1 element by setting the
    // h1 elements text value to "Hello".
    await page.evaluate(() => {
      setTimeout(() => {
        const el = document.createElement('h1');
        el.innerHTML = 'Hello';
        document.body.appendChild(el);
      }, 1000);
    });

    // Waiting until the h1 element has mutated.
    const ok = await page.waitForFunction("document.querySelector('h1')", {
      polling: 'mutation',
      timeout: 2000,
    });

    await check(ok, {
      'waitForFunction successfully resolved': async (ok) => (await ok.innerHTML()) == 'Hello',
    });
  } finally {
    await page.close();
  }
}