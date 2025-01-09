import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js';

import { Homepage } from './22-homepage.js';
import { bookingData } from '../data/booking-data.js';

export default async function () {
  const page = await browser.newPage();

  const { name } = bookingData;

  const homepage = new Homepage(page);
  await homepage.goto();
  await homepage.submitForm();

  expect(await homepage.getVerificationMessage()).to.contain(name);

  await page.close();
}