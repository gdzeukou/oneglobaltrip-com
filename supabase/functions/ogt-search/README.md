# ogt-search

Live prices for the trip board (`/trip`): flights and stays through Duffel,
activities through Viator.

It has not been run against the real providers yet. It was written from their
public documentation, without keys. Expect to fix field names on the first
real call; the function logs every provider error.

## Turn it on

1. **Duffel** (flights and stays): create an account at duffel.com and make an
   access token.
   - A `duffel_test_…` token works at once, on a made-up airline. The site
     labels those results as samples.
   - A `duffel_live_…` token needs Duffel to activate the account. Stays is a
     separate request to Duffel.
2. **Viator** (activities): create an affiliate account at
   partnerresources.viator.com. Basic access gives an API key at once.
3. In Supabase → Edge Functions → Secrets, set:

   ```
   DUFFEL_ACCESS_TOKEN
   VIATOR_API_KEY
   ```

4. Deploy:

   ```bash
   supabase functions deploy ogt-search --project-ref sdeyqojklszwarfrputz
   ```

Until a key is set, the function answers `{ "live": false }` for that kind of
search and the site shows labelled estimates.

## Check it

```bash
curl -s https://sdeyqojklszwarfrputz.supabase.co/functions/v1/ogt-search \
  -H 'Content-Type: application/json' \
  -d '{"kind":"status"}'
```

```bash
curl -s https://sdeyqojklszwarfrputz.supabase.co/functions/v1/ogt-search \
  -H 'Content-Type: application/json' \
  -d '{"kind":"flights","from":"Lagos","to":"Tokyo","depart":"2027-01-15","adults":1}'
```

## Not covered

- **Booking.** This searches. A person still confirms and books.
- **Cars and cruises.** No provider with open sign-up sells these by API.
  The trip board sends them to a person for a quote.
- **The old functions** `agent-search-flights`, `ogt-hotel-search` and
  `ogt-activities-search` call Amadeus Self-Service, which closed on
  17 July 2026. Nothing on the site calls them any more.
