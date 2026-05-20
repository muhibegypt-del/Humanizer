export const books = [
  { id: 'taqwa', name: 'Taqwa', basePriceGBP: 2.71 },
  { id: 'beyond-bilal', name: 'Beyond Bilal', basePriceGBP: 3.75 },
  { id: 'islam-modern-world', name: 'Islam & The Making of The Modern World', basePriceGBP: 2.42 }
];

export const marketplaces = [
  {
    id: 'uk',
    name: 'Amazon.co.uk',
    currency: 'GBP',
    symbol: '£',
    rate: 1.0,
    baseShipping: 3.5,
    perCopyShipping: 0.16,
    dispatchDays: 5,
    transitDays: 2
  },
  {
    id: 'de',
    name: 'Amazon.de',
    currency: 'EUR',
    symbol: '€',
    rate: 1.17,
    baseShipping: 2.49,
    perCopyShipping: 0.1,
    dispatchDays: 5,
    transitDays: 3
  },
  {
    id: 'us',
    name: 'Amazon.com',
    currency: 'USD',
    symbol: '$',
    rate: 1.27,
    baseShipping: 4.99,
    perCopyShipping: 0.2,
    dispatchDays: 5,
    transitDays: 5
  },
  {
    id: 'ca',
    name: 'Amazon.ca',
    currency: 'CAD',
    symbol: 'CA$',
    rate: 1.74,
    baseShipping: 6.99,
    perCopyShipping: 0.25,
    dispatchDays: 5,
    transitDays: 4
  }
];
