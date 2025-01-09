import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
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

  await page.goto('https://test.k6.io/');

  await page.keyboard.down('ControlOrMeta');

  // Open the link in a new tab with the help of the meta key.
  // Wait for the new page to be created.
  const browserContext = browser.context();
  const [newTab] = await Promise.all([
    browserContext.waitForEvent('page'),
    page.locator('a[href="/my_messages.php"]').click(),
  ]);

  await page.keyboard.up('ControlOrMeta');

  // Wait for the new page (tab) to load.
  await newTab.waitForLoadState('load');

  // Take screenshots of each page.
  await page.screenshot({ path: `screenshot-page.png` });
  await newTab.screenshot({ path: `screenshot-newTab.png` });

  await newTab.close();
  await page.close();
}