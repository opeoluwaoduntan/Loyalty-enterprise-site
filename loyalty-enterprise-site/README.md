# Loyalty Enterprise Nig. Ltd website

## Run it
1. Install Node.js (nodejs.org), then open this folder in VS Code.
2. In the terminal: `npm install`
3. Then: `npm run dev` and open the link it shows.

## Change the details
- `src/config.js`: company name, WhatsApp number (234 + number without the first 0), office addresses and phone numbers
- `src/data/parts.js`: parts, prices and stock (sample data for now)

## Put it on GitHub
```
git init
git add .
git commit -m "First version"
```
Create an empty repo on github.com, then run the two commands it shows (`git remote add origin ...` and `git push -u origin main`).

## Later: Supabase or Firebase
Only `src/data/parts.js` changes. Instead of the fixed PARTS list, fetch the parts from the database in `App.jsx`. Search, cart and WhatsApp stay the same. The admin page is added then.
