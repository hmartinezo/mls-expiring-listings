# MLS Expiring Listings UI

Front end for searching expiring and expired MLS listings by zip code, with classic filters and paged results. The current data is mocked in the browser until MLS access details are ready.

## Run locally

```bash
npm install
npm run dev
```

## Notes

- The mock MLS data lives in `src/api/listings.ts`.
- Expiring means the listing expiration date is within the next 30 days; expired means the date is in the past.
- Default sort is soonest expiration first.
