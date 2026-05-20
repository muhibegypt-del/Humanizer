# KDP Author Copy Estimator

A small React + Vite webapp that estimates the price and delivery date for
ordering Amazon KDP author copies.

## What it does

Pick a book (or "all 3"), enter a quantity, pick a marketplace — get an
instant total cost and estimated arrival date.

## Run it

```bash
cd kdp-estimator
npm install
npm run dev
```

Dev server runs at <http://localhost:5174>.

## How the numbers work

- `copyPrice = basePriceGBP × marketplace.rate`
- `shippingCost = baseShipping + (quantity × perCopyShipping)`
- `total = (copyPrice × quantity) + shippingCost`
- `arrivalDate = today + dispatchDays + transitDays` (business days only)

Books, marketplaces and rates live in `src/data.js` — edit there to update
prices, add titles, or tweak exchange rates / shipping fees.

> Estimates only — actual shipping is calculated at Amazon checkout.
